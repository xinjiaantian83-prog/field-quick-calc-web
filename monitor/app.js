(() => {
  const token = new URLSearchParams(location.search).get("token") || "";
  const $ = (id) => document.getElementById(id);
  let selectedDays = 7;
  const fmt = new Intl.NumberFormat("en-US");
  const labels = [
    ["today_users","Today Users"],["seven_day_users","7 Day Users"],["thirty_day_users","30 Day Users"],
    ["page_views","Page Views"],["app_store_clicks","App Store Clicks"],["google_play_clicks","Google Play Clicks"],
    ["total_store_clicks","Total Store Clicks"],["store_click_rate","Store Click Rate"]
  ];
  const percent = (value) => `${Number(value || 0).toFixed(1)}%`;
  function delta(now, before) {
    if (!before) return now ? "+100% vs previous" : "No change";
    const change = ((now - before) / before) * 100;
    return `${change >= 0 ? "+" : ""}${change.toFixed(0)}% vs previous`;
  }
  async function load() {
    $("error").hidden = true; $("status").hidden = false; $("status").textContent = "Loading GA4 data…";
    try {
      const response = await fetch(`/api/report?days=${selectedDays}&token=${encodeURIComponent(token)}`, {cache:"no-store"});
      const data = await response.json(); if (!response.ok) throw new Error(data.error || `HTTP ${response.status}`);
      render(data); $("status").hidden = true;
    } catch (error) { $("status").hidden = true; $("error").hidden = false; $("error").textContent = `Could not load GA4 data: ${error.message}`; }
  }
  function render(data) {
    const h = data.headline, p = data.previous;
    $("metrics").innerHTML = labels.map(([key,label]) => {
      const isRate = key === "store_click_rate";
      let note = "";
      if (["page_views","app_store_clicks","google_play_clicks"].includes(key)) note = delta(h[key], p[key]);
      if (key === "total_store_clicks") note = delta(h[key], p.app_store_clicks + p.google_play_clicks);
      if (key === "thirty_day_users") { const goal = Number(localStorage.getItem("fqc_goal_users") || 0); if(goal) note = `${Math.min(100, h[key]/goal*100).toFixed(0)}% of ${fmt.format(goal)} goal`; }
      if (key === "total_store_clicks") { const goal = Number(localStorage.getItem("fqc_goal_clicks") || 0); if(goal) note = `${Math.min(100, h[key]/goal*100).toFixed(0)}% of ${fmt.format(goal)} goal`; }
      const down = note.startsWith("-") ? " down" : "";
      return `<article class="metric"><div class="label">${label}</div><div class="value">${isRate ? percent(h[key]) : fmt.format(h[key])}</div><div class="delta${down}">${note}</div></article>`;
    }).join("");
    $("pages").innerHTML = data.pages.map(row => `<tr><td>${row.page}</td><td>${fmt.format(row.users)}</td><td>${fmt.format(row.page_views)}</td><td>${fmt.format(row.app_store_clicks)}</td><td>${fmt.format(row.google_play_clicks)}</td><td>${fmt.format(row.total_store_clicks)}</td><td>${percent(row.store_click_rate)}</td></tr>`).join("");
    const max = Math.max(1,...data.sources.map(x=>x.sessions));
    $("sources").innerHTML = data.sources.map(row => `<div class="bar"><span>${row.name}</span><div class="track"><div class="fill" style="width:${row.sessions/max*100}%"></div></div><strong>${fmt.format(row.sessions)}</strong></div>`).join("");
    $("devices").innerHTML = data.devices.map(row => `<tr><td>${row.name}</td><td>${fmt.format(row.users)}</td><td>${fmt.format(row.app_store_clicks)}</td><td>${fmt.format(row.google_play_clicks)}</td></tr>`).join("");
    $("updated").textContent = `Updated ${data.updated_at}`;
  }
  document.querySelectorAll("[data-days]").forEach(button => button.addEventListener("click", () => {
    selectedDays = Number(button.dataset.days); document.querySelectorAll("[data-days]").forEach(x=>x.classList.toggle("active",x===button)); load();
  }));
  $("goal-users").value = localStorage.getItem("fqc_goal_users") || 1000;
  $("goal-clicks").value = localStorage.getItem("fqc_goal_clicks") || 100;
  $("save-goals").addEventListener("click", () => { localStorage.setItem("fqc_goal_users", $("goal-users").value); localStorage.setItem("fqc_goal_clicks", $("goal-clicks").value); load(); });
  load();
})();
