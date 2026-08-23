#!/usr/bin/env python3
"""Local, token-protected GA4 dashboard for Field Quick Calc."""
from __future__ import annotations

import argparse
import json
import os
import secrets
import socket
import threading
import time
import urllib.parse
import webbrowser
from datetime import date, timedelta
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

import google.auth
from google.auth.transport.requests import AuthorizedSession

ROOT = Path(__file__).resolve().parent
PROPERTY_ID = os.environ.get("FIELD_QUICK_CALC_PROPERTY_ID", "551037476")
API = f"https://analyticsdata.googleapis.com/v1beta/properties/{PROPERTY_ID}"
SCOPES = ["https://www.googleapis.com/auth/analytics.readonly"]
SEO_PAGES = {
    "/field-quick-calc-web/construction-calculator/": "Construction Calculator",
    "/field-quick-calc-web/contractor-calculator/": "Contractor Calculator",
    "/field-quick-calc-web/jobsite-calculator/": "Jobsite Calculator",
    "/field-quick-calc-web/slope-calculator/": "Slope Calculator",
    "/field-quick-calc-web/pitch-calculator/": "Pitch Calculator",
    "/field-quick-calc-web/stair-calculator/": "Stair Calculator",
    "/field-quick-calc-web/radius-calculator/": "Radius Calculator",
    "/field-quick-calc-web/arc-calculator/": "Arc Calculator",
    "/field-quick-calc-web/tapered-shape-calculator/": "Tapered Shape Calculator",
    "/field-quick-calc-web/material-weight-guide/": "Material Weight Guide",
}
CACHE: dict[str, tuple[float, dict]] = {}


def periods(days: int) -> tuple[dict, dict]:
    today = date.today()
    start = today - timedelta(days=days - 1)
    previous_end = start - timedelta(days=1)
    previous_start = previous_end - timedelta(days=days - 1)
    return ({"startDate": start.isoformat(), "endDate": today.isoformat()},
            {"startDate": previous_start.isoformat(), "endDate": previous_end.isoformat()})


def value(row: dict, kind: str, index: int) -> str:
    return row.get(f"{kind}Values", [{}])[index].get("value", "0")


def run(session: AuthorizedSession, body: dict) -> dict:
    response = session.post(f"{API}:runReport", json=body, timeout=30)
    response.raise_for_status()
    return response.json()


def single_metric(session: AuthorizedSession, metric: str, date_range: dict, event: str | None = None) -> int:
    body = {"dateRanges": [date_range], "metrics": [{"name": metric}]}
    if event:
        body["dimensionFilter"] = {"filter": {"fieldName": "eventName", "stringFilter": {"value": event, "matchType": "EXACT"}}}
    rows = run(session, body).get("rows", [])
    return int(float(value(rows[0], "metric", 0))) if rows else 0


def source_bucket(source: str, medium: str) -> str:
    text = f"{source} {medium}".lower()
    if "google" in text and "organic" in text:
        return "Google Organic"
    if "direct" in text or source == "(direct)":
        return "Direct"
    if "referral" in text:
        return "Referral"
    if any(word in text for word in ("social", "facebook", "instagram", "tiktok", "youtube", "linkedin", "x.com", "twitter")):
        return "Social"
    return "Other"


def device_bucket(os_name: str, category: str) -> str:
    if os_name.lower() in {"ios", "ipados"}:
        return "iPhone / iOS"
    if os_name.lower() == "android":
        return "Android"
    if category.lower() == "desktop":
        return "Desktop"
    return "Other"


def report(days: int) -> dict:
    key = str(days)
    cached = CACHE.get(key)
    if cached and time.time() - cached[0] < 300:
        return cached[1]
    credentials, _ = google.auth.default(scopes=SCOPES)
    session = AuthorizedSession(credentials)
    current, previous = periods(days)

    headline = {}
    for label, count in (("today_users", 1), ("seven_day_users", 7), ("thirty_day_users", 30)):
        headline[label] = single_metric(session, "activeUsers", periods(count)[0])
    sessions = single_metric(session, "sessions", current)
    page_views = single_metric(session, "screenPageViews", current)
    app_clicks = single_metric(session, "eventCount", current, "app_store_click")
    play_clicks = single_metric(session, "eventCount", current, "google_play_click")
    previous_values = {
        "sessions": single_metric(session, "sessions", previous),
        "page_views": single_metric(session, "screenPageViews", previous),
        "app_store_clicks": single_metric(session, "eventCount", previous, "app_store_click"),
        "google_play_clicks": single_metric(session, "eventCount", previous, "google_play_click"),
    }
    headline.update({
        "sessions": sessions, "page_views": page_views,
        "app_store_clicks": app_clicks, "google_play_clicks": play_clicks,
        "total_store_clicks": app_clicks + play_clicks,
        "store_click_rate": round((app_clicks + play_clicks) / sessions * 100, 1) if sessions else 0,
    })

    pages = {path: {"page": label, "path": path, "users": 0, "page_views": 0,
                    "app_store_clicks": 0, "google_play_clicks": 0}
             for path, label in SEO_PAGES.items()}
    page_data = run(session, {"dateRanges": [current], "dimensions": [{"name": "pagePath"}],
                              "metrics": [{"name": "activeUsers"}, {"name": "screenPageViews"}], "limit": 1000})
    for row in page_data.get("rows", []):
        path = value(row, "dimension", 0)
        if path in pages:
            pages[path]["users"] = int(float(value(row, "metric", 0)))
            pages[path]["page_views"] = int(float(value(row, "metric", 1)))
    click_data = run(session, {"dateRanges": [current], "dimensions": [{"name": "pagePath"}, {"name": "eventName"}],
                               "metrics": [{"name": "eventCount"}],
                               "dimensionFilter": {"filter": {"fieldName": "eventName", "inListFilter": {"values": ["app_store_click", "google_play_click"]}}}, "limit": 1000})
    for row in click_data.get("rows", []):
        path, event = value(row, "dimension", 0), value(row, "dimension", 1)
        if path in pages:
            pages[path][f"{event}s"] = int(float(value(row, "metric", 0)))
    for row in pages.values():
        row["total_store_clicks"] = row["app_store_clicks"] + row["google_play_clicks"]
        row["store_click_rate"] = round(row["total_store_clicks"] / row["users"] * 100, 1) if row["users"] else 0

    sources = {name: 0 for name in ("Google Organic", "Direct", "Referral", "Social", "Other")}
    source_data = run(session, {"dateRanges": [current], "dimensions": [{"name": "sessionSource"}, {"name": "sessionMedium"}],
                                "metrics": [{"name": "sessions"}], "limit": 1000})
    for row in source_data.get("rows", []):
        sources[source_bucket(value(row, "dimension", 0), value(row, "dimension", 1))] += int(float(value(row, "metric", 0)))

    devices = {name: {"users": 0, "app_store_clicks": 0, "google_play_clicks": 0}
               for name in ("iPhone / iOS", "Android", "Desktop", "Other")}
    device_data = run(session, {"dateRanges": [current], "dimensions": [{"name": "operatingSystem"}, {"name": "deviceCategory"}],
                                "metrics": [{"name": "activeUsers"}], "limit": 1000})
    for row in device_data.get("rows", []):
        devices[device_bucket(value(row, "dimension", 0), value(row, "dimension", 1))]["users"] += int(float(value(row, "metric", 0)))
    device_clicks = run(session, {"dateRanges": [current], "dimensions": [{"name": "operatingSystem"}, {"name": "deviceCategory"}, {"name": "eventName"}],
                                  "metrics": [{"name": "eventCount"}],
                                  "dimensionFilter": {"filter": {"fieldName": "eventName", "inListFilter": {"values": ["app_store_click", "google_play_click"]}}}, "limit": 1000})
    for row in device_clicks.get("rows", []):
        bucket = device_bucket(value(row, "dimension", 0), value(row, "dimension", 1))
        devices[bucket][f"{value(row, 'dimension', 2)}s"] += int(float(value(row, "metric", 0)))

    result = {"property_id": PROPERTY_ID, "days": days, "headline": headline,
              "previous": previous_values, "pages": list(pages.values()),
              "sources": [{"name": k, "sessions": v} for k, v in sources.items()],
              "devices": [{"name": k, **v} for k, v in devices.items()],
              "updated_at": time.strftime("%Y-%m-%d %H:%M:%S")}
    CACHE[key] = (time.time(), result)
    return result


class Handler(SimpleHTTPRequestHandler):
    token = ""

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        params = urllib.parse.parse_qs(parsed.query)
        if parsed.path == "/api/report":
            if params.get("token", [""])[0] != self.token:
                self.send_error(403)
                return
            try:
                days = int(params.get("days", ["7"])[0])
                if days not in (1, 7, 30):
                    raise ValueError("days must be 1, 7 or 30")
                payload, status = report(days), 200
            except Exception as exc:
                payload, status = {"error": str(exc)}, 500
            data = json.dumps(payload).encode()
            self.send_response(status)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Cache-Control", "no-store")
            self.send_header("Content-Length", str(len(data)))
            self.end_headers()
            self.wfile.write(data)
            return
        if parsed.path == "/":
            self.path = "/index.html"
        return super().do_GET()

    def log_message(self, fmt, *args):
        print(f"[monitor] {fmt % args}")


def lan_ip() -> str:
    sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        sock.connect(("8.8.8.8", 80))
        return sock.getsockname()[0]
    except OSError:
        return "127.0.0.1"
    finally:
        sock.close()


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--port", type=int, default=8765)
    parser.add_argument("--lan", action="store_true", help="Allow token-protected access from the local network")
    args = parser.parse_args()
    Handler.token = secrets.token_urlsafe(24)
    host = "0.0.0.0" if args.lan else "127.0.0.1"
    server = ThreadingHTTPServer((host, args.port), Handler)
    local_url = f"http://127.0.0.1:{args.port}/?token={Handler.token}"
    print(f"Field Quick Calc Monitor: {local_url}", flush=True)
    if args.lan:
        print(f"iPhone (same Wi-Fi): http://{lan_ip()}:{args.port}/?token={Handler.token}", flush=True)
    threading.Timer(0.8, lambda: webbrowser.open(local_url)).start()
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
