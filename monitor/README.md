# Field Quick Calc Monitor

Local GA4 dashboard for property `551037476`. It reads GA4 through the Google Analytics Data API using local Application Default Credentials; no credential or secret is stored in this repository.

## Start on Mac

Double-click `Field Quick Calc Monitor.command`. The dashboard opens automatically. Keep the Terminal window open while using it.

## View on iPhone

The launcher prints a one-time `iPhone (same Wi-Fi)` URL. Open that full URL on an iPhone connected to the same trusted Wi-Fi network. The random token changes on every launch and is not saved.

## Required local credential

The launcher expects Application Default Credentials at `~/.config/gcloud/application_default_credentials.json` and the existing Python environment at `~/.config/gcloud/ga4-oauth-venv/bin/python`.

Targets for monthly users and store clicks are stored in browser `localStorage` only.
