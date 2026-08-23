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
- GA4 is intentionally disabled until a Field Quick Calc measurement ID is available. Add the real ID to `GA4_MEASUREMENT_ID` in `assets/site.js`.
- Re-run `npm run build` after metadata/content changes.

## Production

GitHub Pages project URL: `https://xinjiaantian83-prog.github.io/field-quick-calc-web/`
