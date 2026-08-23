(() => {
  const GA4_MEASUREMENT_ID = "";
  const page = document.body.dataset.page || "unknown";

  if (/^G-[A-Z0-9]+$/i.test(GA4_MEASUREMENT_ID)) {
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date());
    window.gtag("config", GA4_MEASUREMENT_ID, { anonymize_ip: true });
  }

  const emit = (name, params = {}) => {
    const payload = {
      page,
      page_location: window.location.href,
      source: "web-en",
      timestamp: new Date().toISOString(),
      ...params
    };
    if (typeof window.gtag === "function") window.gtag("event", name, payload);
  };

  document.querySelectorAll("[data-store]").forEach((link) => {
    link.addEventListener("click", () => {
      const destination = link.dataset.store;
      emit(destination === "app_store" ? "app_store_click" : "google_play_click", { destination });
    });
  });

  const navToggle = document.querySelector(".nav-toggle");
  const navLinks = document.querySelector(".nav-links");
  navToggle?.addEventListener("click", () => {
    const open = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  const openButton = document.querySelector("[data-request-open]");
  const form = document.querySelector("[data-request-form]");
  const status = document.querySelector("[data-form-status]");
  openButton?.addEventListener("click", () => {
    form.hidden = false;
    openButton.hidden = true;
    form.querySelector("textarea")?.focus();
    emit("feature_request_open");
  });

  if (form) {
    const sourceField = form.querySelector('[name="source"]');
    const urlField = form.querySelector('[name="page_url"]');
    const timeField = form.querySelector('[name="submitted_at"]');
    sourceField.value = "web-en";
    urlField.value = window.location.href;
    timeField.value = new Date().toISOString();

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      status.className = "form-status";
      if (!form.reportValidity()) return;
      const submit = form.querySelector('[type="submit"]');
      submit.disabled = true;
      status.textContent = "Sending…";
      timeField.value = new Date().toISOString();
      urlField.value = window.location.href;
      try {
        const response = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { Accept: "application/json" }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        form.reset();
        sourceField.value = "web-en";
        urlField.value = window.location.href;
        status.textContent = "Thank you. We’ll use your request to help plan future updates.";
        emit("feature_request_submit");
      } catch (error) {
        status.className = "form-status error";
        status.textContent = "We couldn’t send that request. Please check your connection and try again.";
      } finally {
        submit.disabled = false;
      }
    });
  }
})();
