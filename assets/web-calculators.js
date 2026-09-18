(() => {
  "use strict";
  const emit = (name, params = {}) => { if (typeof window.gtag === "function") window.gtag("event", name, { page: document.body.dataset.page || "unknown", source: "web-en", ...params }); };
  const number = (value) => Number.parseFloat(String(value ?? "").trim().replace(/,/g, ""));
  const mixed = (value) => { const text = String(value ?? "").trim(); let match = text.match(/^(\d+(?:\.\d+)?)\s+(\d+)\/(\d+)$/); if (match) return Number(match[1]) + Number(match[2]) / Number(match[3]); match = text.match(/^(\d+)\/(\d+)$/); return match ? Number(match[1]) / Number(match[2]) : number(text); };
  const parseFeetInches = (value) => {
    const raw = String(value ?? "").trim().replace(/[′’]/g, "'").replace(/[″“”]/g, '"'); if (!raw) return NaN;
    const sign = raw.startsWith("-") ? -1 : 1, input = raw.replace(/^[-+]/, "").trim();
    if (/^\d+(?:\.\d+)?$/.test(input)) return sign * Number(input) * 304.8;
    const marked = input.match(/^(?:(\d+(?:\.\d+)?)\s*')?\s*(?:(\d+(?:\.\d+)?(?:\s+\d+\/\d+)?|\d+\/\d+)\s*(?:"|in)?)?$/i);
    if (marked && (marked[1] !== undefined || marked[2] !== undefined)) return sign * (number(marked[1] ?? 0) * 12 + mixed(marked[2] ?? 0)) * 25.4;
    const separated = input.match(/^(\d+(?:\.\d+)?)\s*(?:ft|feet)\s*(\d+(?:\.\d+)?)?\s*(?:in|inches)?$/i);
    return separated ? sign * (number(separated[1]) * 12 + number(separated[2] ?? 0)) * 25.4 : NaN;
  };
  const formatFeetInches = (mm) => { let units = Math.round(Math.abs(mm) / 25.4 * 16), feet = Math.floor(units / 192); units -= feet * 192; const inches = Math.floor(units / 16); let numerator = units % 16, denominator = 16; const gcd = (a, b) => b ? gcd(b, a % b) : a; if (numerator) { const divisor = gcd(numerator, denominator); numerator /= divisor; denominator /= divisor; } return `${mm < 0 ? "-" : ""}${feet}' ${inches}${numerator ? ` ${numerator}/${denominator}` : ""}\"`; };
  const set = (root, key, value) => { root.querySelector(`[data-result="${key}"]`).textContent = value; };
  const fmt = (value, digits = 4) => Number(value.toFixed(digits)).toLocaleString("en-US", { maximumFractionDigits: digits });
  document.querySelectorAll("[data-web-calculator]").forEach((root) => {
    let started = false;
    root.querySelector("[data-calculate]")?.addEventListener("click", () => {
      const type = root.dataset.webCalculator, error = root.querySelector("[data-calc-error]"), results = root.querySelector("[data-results]"); error.textContent = "";
      if (!started) { emit("web_calculator_start", { calculator: type }); started = true; }
      if (type === "feet-inches") {
        const mm = parseFeetInches(root.querySelector("[data-feet-input]").value);
        if (!Number.isFinite(mm)) { error.textContent = "Enter a value such as 10' 6\" or 5' 7 1/2\"."; results.hidden = true; return; }
        set(root, "ftin", formatFeetInches(mm)); set(root, "ft", fmt(mm / 304.8)); set(root, "in", fmt(mm / 25.4)); set(root, "mm", fmt(mm)); set(root, "cm", fmt(mm / 10)); set(root, "m", fmt(mm / 1000));
      } else {
        const unit = root.querySelector("[data-plane-unit]").value, parse = (value) => unit === "ftin" ? parseFeetInches(value) : number(value) * ({ mm: 1, cm: 10, m: 1000, in: 25.4, ft: 304.8, yd: 914.4 }[unit]);
        const length = parse(root.querySelector("[data-plane-length]").value), width = parse(root.querySelector("[data-plane-width]").value);
        if (!(length > 0) || !(width > 0)) { error.textContent = "Enter a positive length and width."; results.hidden = true; return; }
        const squareMm = length * width; set(root, "ft2", fmt(squareMm / 92903.04)); set(root, "m2", fmt(squareMm / 1000000)); set(root, "yd2", fmt(squareMm / 836127.36));
      }
      results.hidden = false; emit("web_calculator_result", { calculator: type });
    });
    root.querySelectorAll("[data-store]").forEach((link) => link.addEventListener("click", () => emit(link.dataset.store === "app_store" ? "calculator_to_app_store" : "calculator_to_google_play", { calculator: root.dataset.webCalculator })));
  });
})();
