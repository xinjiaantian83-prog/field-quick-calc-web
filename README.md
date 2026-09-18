# Field Quick Calc — Official Website

Static, mobile-first official website and SEO field guides for **Field Quick Calc: Contractor**.

## Local build

```bash
npm run build
npm run serve
```

Serve from the parent directory and open `http://localhost:4173/field-quick-calc-web/`, matching the GitHub Pages project path.

## Configuration

- Store URLs, site base URL and Basin endpoint are defined at the top of `scripts/build.mjs`.
- GA4 is enabled with measurement ID `G-GKWP7LZ3S5`. Store clicks, SEO-page views, feature-page views, feature requests and web-calculator interactions are tracked in `assets/site.js` and `assets/web-calculators.js`.
- The current app baseline is version 1.0.3. The website reflects Plane Takeoff, Quick Convert, Rebar Estimator, Material Weight with payload load estimates, and the existing layout calculators.
- `/monitor/` is an internal display and is explicitly `noindex, nofollow`; it is not included in the sitemap.
- Re-run `npm run build` after metadata/content changes.

## Production

GitHub Pages project URL: `https://xinjiaantian83-prog.github.io/field-quick-calc-web/`
