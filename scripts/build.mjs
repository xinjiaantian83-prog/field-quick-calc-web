import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const REPO = "field-quick-calc-web";
const BASE = `https://xinjiaantian83-prog.github.io/${REPO}`;
const PUBLIC = `/${REPO}`;
const APP_STORE = "https://apps.apple.com/us/app/field-quick-calc-contractor/id6776832224";
const GOOGLE_PLAY = "https://play.google.com/store/apps/details?id=com.genbatoolbox.fieldquickcalcnew&hl=en_US&gl=US";
const BASIN = "https://usebasin.com/f/13a5335914bd";
const UPDATED = "August 23, 2026";

const latestFeaturePages = [
  { slug: "feet-inches-calculator", label: "Feet and inches calculator", title: "Feet and Inches Calculator for Construction | Field Quick Calc", description: "Convert feet, inches and common tape-measure fractions to metric and decimal values with a free browser calculator and the Field Quick Calc app.", eyebrow: "Free web calculator", h1: "Feet and inches calculator", lead: "Enter a tape-measure value such as 10' 6\" or 5' 7 1/2\" and convert it to practical field units.", intro: "Field Quick Calc accepts decimal feet and feet-plus-inches measurements used on jobsites. This browser version provides a quick conversion; the free app keeps the wider calculator set together on iOS and Android.", formula: "feet + inches → millimeters → ft + in, decimal ft, inches, mm, cm and m", calculator: "feet-inches", sections: [["Accepted input examples", "Use values such as 10' 6\", 10 ft 6 in, 5' 7 1/2\" or decimal feet such as 10.5."], ["Built for tape-measure values", "Fractional-inch output is rounded to the nearest 1/16 inch, matching the app conversion logic."], ["Use it with the full app", "Field Quick Calc combines conversion with Plane Takeoff, Rebar Estimator, Material Weight, stairs, slope, radius, arc and tapered-shape tools."]], faq: [["Can I enter fractional inches?", "Yes. Mixed values such as 5' 7 1/2\" are accepted."], ["Does it support metric output?", "Yes. Results include millimeters, centimeters and meters."]], related: ["unit-conversion", "plane-takeoff", "construction-calculator"] },
  { slug: "rebar-calculator", label: "Rebar estimator", title: "Rebar Estimator for Walls | Field Quick Calc", description: "Estimate rebar pieces, cut length, stock bars, total weight and remaining material for straight and L-shaped walls in metric or imperial units.", eyebrow: "Metric and imperial", h1: "Rebar estimator for wall layouts", lead: "Plan straight or L-shaped wall bars with cover, spacing, stock length and bar-size inputs.", intro: "The app's Rebar Estimator supports U.S. bar sizes #3 through #8 and metric sizes from 8 mm through 20 mm. It calculates piece count, cut length, pieces per stock bar, stock bars required, total length, estimated weight and remaining material.", formula: "usable wall length + spacing + cover + bar geometry → pieces, stock bars and estimated weight", sections: [["Straight and L-shaped bars", "Choose the wall geometry, then enter wall dimensions, concrete cover, spacing, rebar size and stock length."], ["Material planning outputs", "Review required pieces, cut length, stock-bar count, total stock length, estimated weight and usable remainder."], ["Use field estimates carefully", "Confirm laps, development length, hooks, bends, engineering requirements and local code before ordering or placing steel."]], faq: [["Does it support metric and imperial rebar?", "Yes. The current app includes U.S./Imperial and Metric modes."], ["Is this a structural design tool?", "No. It is a field estimator and does not replace engineered reinforcement design."]], related: ["plane-takeoff", "material-weight-calculator", "contractor-calculator"] },
  { slug: "material-weight-calculator", label: "Material weight calculator", title: "Construction Material Weight Calculator | Field Quick Calc", description: "Estimate concrete, gravel, sand, asphalt or soil weight from volume and density, then compare it with an actual vehicle payload.", eyebrow: "Weight and payload", h1: "Construction material weight calculator", lead: "Estimate material weight and the number of vehicle loads from volume, density and actual payload capacity.", intro: "The current app covers concrete, gravel, sand, asphalt and soil with metric and imperial volume, density and weight units. An optional payload input estimates exact and rounded-up load counts.", formula: "estimated weight = volume × density · required loads = ceil(weight ÷ payload)", sections: [["Supported measurements", "Use m³, ft³ or yd³ for volume; kg/m³ or lb/ft³ for density; and kg, tonnes, pounds or U.S. tons for weight."], ["Payload-based load estimate", "Enter the actual legal payload capacity of the vehicle to estimate the number of loads."], ["Reference values are not tickets", "Density changes with material specification, moisture and compaction. Confirm supplier and vehicle data before loading."]], faq: [["Which materials are included?", "Concrete, gravel, sand, asphalt and soil are included in the current app."], ["Does the app know my vehicle limit?", "No. Enter the actual payload capacity and verify legal and volume limits yourself."]], related: ["plane-takeoff", "unit-conversion", "rebar-calculator"] },
  { slug: "unit-conversion", label: "Construction unit conversion", title: "Construction Unit Conversion: Metric and Imperial | Field Quick Calc", description: "Convert mm, cm, m, inches, feet, feet plus inches and yards for construction measurements, plus common area units.", eyebrow: "Quick Convert", h1: "Metric and imperial construction unit conversion", lead: "Move between metric and imperial measurements without rewriting field dimensions.", intro: "Quick Convert supports mm, cm, m, inch, ft, feet plus inches and yard length values. Plane Takeoff also reports m², ft² and yd² area values.", formula: "stored millimeters × selected unit factor = converted length", sections: [["Length units", "Convert between mm, cm, m, inches, decimal feet, feet plus inches and yards."], ["Area units", "Plane Takeoff can display rectangle area in square meters, square feet or square yards."], ["Keep the original measurement", "The app keeps one underlying measurement while changing the displayed unit, reducing repeated manual entry."]], faq: [["Can I enter feet plus inches?", "Yes. Common marked, written and fractional-inch formats are accepted."], ["Can I switch between metric and imperial?", "Yes. Plane Takeoff, Material Weight and Rebar Estimator include metric and imperial workflows."]], related: ["feet-inches-calculator", "plane-takeoff", "material-weight-calculator"] },
  { slug: "plane-takeoff", label: "Plane takeoff calculator", title: "Plane Takeoff Calculator for Rectangle Area | Field Quick Calc", description: "Calculate rectangular plane area from jobsite dimensions using metric, imperial or feet-and-inches inputs with a free browser calculator.", eyebrow: "Free web calculator", h1: "Plane takeoff calculator", lead: "Enter a rectangular length and width, then review area in square meters, square feet and square yards.", intro: "Plane Takeoff uses a common stored measurement so you can work in mm, cm, m, inches, feet, feet plus inches or yards without changing the underlying dimensions.", formula: "rectangle area = length × width", calculator: "plane-takeoff", sections: [["For quick rectangular takeoff", "Use measured length and width to check a simple floor, panel, slab or work area."], ["Metric and imperial outputs", "The browser calculator returns m², ft² and yd² from one pair of inputs."], ["More tools in the app", "The free app adds Quick Convert, Rebar Estimator, Material Weight, stairs, slope, radius, arc and tapered-shape calculations."]], faq: [["Does this calculate irregular areas?", "No. This quick version calculates one rectangle. Split irregular work into verified sections."], ["Can I use feet and inches?", "Yes. Select feet + inches and enter values such as 10' 6\"."]], related: ["feet-inches-calculator", "unit-conversion", "material-weight-calculator"] }
];

const pages = [
  {
    slug: "construction-calculator",
    label: "Construction calculator",
    title: "Construction Calculator for Field Layout | Field Quick Calc",
    description: "A practical construction calculator for slope, pitch, stairs, radius, arc and tapered field layouts. Built for contractors and jobsite checks.",
    eyebrow: "Construction math",
    h1: "Construction calculator for field layout",
    lead: "Keep common jobsite math in one high-contrast tool for contractors, installers, builders and hands-on DIY work.",
    intro: "Construction layout often means moving between a tape measure, a calculator and several formulas. Field Quick Calc groups unit conversion, plane takeoff, rebar, material weight and recurring geometry checks in one focused app.",
    formula: "Pick the tool → enter measured rise, run, chord, height or width → review the field estimate",
    sections: [
      ["What the construction calculator covers", "Use Quick Convert and Plane Takeoff for measurements and area; Rebar Estimator and Material Weight for quantity planning; and the focused slope, stair, radius, arc and tapered-shape tools for layout checks."],
      ["Built around jobsite measurements", "Inputs include metric and imperial units, including common feet-plus-inches formats. Results stay easy to scan outdoors, but they remain estimates—not engineered design values."],
      ["A useful field workflow", "Measure carefully, choose the matching calculator, enter all values in the labeled units, then compare the output with project drawings and manufacturer requirements before cutting or building."]
    ],
    faq: [["Is this a general scientific calculator?", "No. Field Quick Calc focuses on recurring construction and layout checks rather than scientific-calculator functions."], ["Can it replace project drawings or code review?", "No. Use the results as field estimates and follow local codes, drawings, site conditions and professional judgment."]],
    related: ["jobsite-calculator", "contractor-calculator", "slope-calculator", "stair-calculator"]
  },
  {
    slug: "contractor-calculator",
    label: "Contractor calculator",
    title: "Contractor Calculator for Common Jobsite Math | Field Quick Calc",
    description: "A contractor calculator for unit conversion, plane takeoff, rebar, material weight and common field-layout checks in metric or imperial units.",
    eyebrow: "Contractor tools",
    h1: "Contractor calculator for common field checks",
    lead: "Fast, focused calculations for layout work—without digging through unrelated calculator modes.",
    intro: "Contractors often need a quick second check for dimensions, quantities and field layout. This app keeps conversion, takeoff, rebar, material weight and geometry work in separate, clearly labeled tools.",
    formula: "Field measurement + matching layout tool = quick jobsite estimate",
    sections: [
      ["For layout, not paperwork", "Field Quick Calc is designed for measurements made at the jobsite. It helps organize inputs and return the dimensions most useful for layout, such as slope length, angle, pitch, radius, arc length, tread depth and tapered width."],
      ["Tools a contractor can reach quickly", "The home screen puts Tapered Shape, Radius & Arc, Slope & Pitch, Stair Layout, Rebar Estimator and Plane Takeoff up front. Quick Convert and Material Weight are grouped with the field tools."],
      ["Check before you build", "Use calculated values to support layout and estimating. Final construction should still match approved drawings, local code, manufacturer data and actual site conditions."]
    ],
    faq: [["Who is Field Quick Calc made for?", "It is intended for contractors, tradespeople, installers, builders and DIY users who need common construction math in the field."], ["Does it require an account?", "No account or login is required."]],
    related: ["construction-calculator", "jobsite-calculator", "pitch-calculator", "radius-calculator"]
  },
  {
    slug: "jobsite-calculator",
    label: "Jobsite calculator",
    title: "Jobsite Calculator for Fast Field Math | Field Quick Calc",
    description: "Use a focused jobsite calculator for conversion, takeoff, rebar, material weight, slope, stairs, radius, arc and tapered shapes.",
    eyebrow: "Fast field math",
    h1: "Jobsite calculator built for quick checks",
    lead: "Readable outdoors, organized by task and ready for the measurements already on your tape.",
    intro: "A jobsite calculator should make the next step obvious. Field Quick Calc uses large inputs, clear results and short field descriptions instead of crowded menus. Choose the task, enter measurements and review the estimate.",
    formula: "Measure → enter → check → verify against job requirements",
    sections: [
      ["Quick access to focused field tools", "Convert dimensions, calculate plane area, estimate rebar and material loads, lay out stairs, and check slope, radius, arc and tapered widths."],
      ["Clear metric and imperial units", "Inputs identify mm, cm, m, in, ft, ft + in, yd, degrees and pitch where they match the selected workflow."],
      ["Useful when conditions change", "When actual field dimensions differ from the plan, recalculate with the measured values—then confirm the adjustment with the responsible designer, manufacturer or supervisor."]
    ],
    faq: [["Does the app work as a field calculator?", "Yes. It is designed around common jobsite layout inputs and high-contrast results."], ["Are notes uploaded to a server?", "No. Jobsite Notes are stored locally on the device."]],
    related: ["construction-calculator", "contractor-calculator", "slope-calculator", "material-weight-guide"]
  },
  {
    slug: "slope-calculator",
    label: "Slope calculator",
    title: "Slope Calculator: Rise, Run, Angle & Length | Field Quick Calc",
    description: "Calculate slope length, angle and pitch from rise and run for ramps, roofs, driveways and field layout using ft, in, deg and in/ft.",
    eyebrow: "Roof · ramp · driveway",
    h1: "Slope calculator for rise, run and angle",
    lead: "Enter rise and run to estimate slope length, angle and pitch in familiar jobsite units.",
    intro: "Slope checks start with two perpendicular measurements: vertical rise and horizontal run. Once both are expressed in compatible units, the sloped length and angle follow from a right triangle.",
    formula: "Slope length = √(run² + rise²) · Angle = atan(rise ÷ run)",
    sections: [
      ["What the slope calculator returns", "Field Quick Calc reports slope length in feet, angle in degrees and pitch in inches per foot. That makes one measurement set useful for roof, ramp, driveway and general layout checks."],
      ["Example: a ramp or driveway check", "For 24 in of rise over 12 ft of run, convert rise and run to compatible units before applying the formula. The app handles that unit relationship and returns the field estimate."],
      ["How to measure", "Use horizontal run—not the sloped surface length—and measure rise vertically. Mixing the diagonal with run will produce the wrong result."]
    ],
    faq: [["What is rise and run?", "Rise is the vertical change. Run is the horizontal distance."], ["How is pitch shown?", "Pitch is shown as inches of rise per foot of horizontal run (in/ft)."]],
    related: ["pitch-calculator", "stair-calculator", "construction-calculator"]
  },
  {
    slug: "pitch-calculator",
    label: "Pitch calculator",
    title: "Pitch Calculator: Inches per Foot & Angle | Field Quick Calc",
    description: "Convert rise and run into pitch in/ft and angle in degrees for roof, ramp and jobsite layout checks with Field Quick Calc.",
    eyebrow: "Pitch conversion",
    h1: "Pitch calculator for inches per foot",
    lead: "Turn measured rise and run into in/ft pitch and degrees without switching formulas.",
    intro: "In U.S. field work, pitch is often described as inches of vertical rise for every 12 inches of horizontal run. A 4 in/ft pitch rises 4 inches over each foot of run.",
    formula: "Pitch (in/ft) = rise (in) ÷ run (ft) · Angle = atan(pitch ÷ 12)",
    sections: [
      ["Pitch and slope are related", "Pitch expresses the rise-per-foot ratio, while angle expresses the same incline in degrees. Slope length is the diagonal distance across the rise and run."],
      ["Example: reading a roof or cover pitch", "Measure the vertical rise across a known horizontal run. Enter both values in the labeled fields to review pitch, angle and slope length together."],
      ["Field measurement matters", "Do not use rafter or surface length as horizontal run. Confirm the measurement direction and the unit label before using the result for layout."]
    ],
    faq: [["What does 4 in/ft mean?", "It means 4 inches of vertical rise for every 12 inches of horizontal run."], ["Is pitch the same as angle?", "They describe the same incline differently. Pitch is a ratio; angle is measured in degrees."]],
    related: ["slope-calculator", "stair-calculator", "jobsite-calculator"]
  },
  {
    slug: "stair-calculator",
    label: "Stair calculator",
    title: "Stair Calculator: Rise, Tread, Run & Angle | Field Quick Calc",
    description: "Estimate stair count, actual riser height, tread depth, stringer length and stair angle from total rise and run.",
    eyebrow: "Deck · outdoor steps",
    h1: "Stair calculator for quick layout estimates",
    lead: "Use total rise, total run and a preferred riser height to estimate a practical stair layout.",
    intro: "Stair layout begins with the total vertical rise between finished levels. Dividing that rise into equal steps gives the actual riser height; the available horizontal run helps determine tread depth and stair angle.",
    formula: "Step count ≈ total rise ÷ preferred rise · Actual rise = total rise ÷ step count",
    sections: [
      ["What the stair tool checks", "Field Quick Calc estimates recommended step count, actual rise per step, tread depth, stringer length and stair angle from the measurements entered."],
      ["Example: outdoor steps", "Measure from finished lower grade to the finished upper surface for total rise. Measure the available horizontal layout for total run, then compare the result with local stair requirements."],
      ["Code and finish dimensions come first", "Riser and tread limits vary by jurisdiction and use. Include finished material thickness and confirm the layout under the applicable code before construction."]
    ],
    faq: [["What is total rise?", "Total rise is the finished vertical distance from the lower level to the upper level."], ["Does the calculator guarantee code compliance?", "No. Always verify riser, tread, landing, guard and handrail requirements locally."]],
    related: ["slope-calculator", "pitch-calculator", "contractor-calculator"]
  },
  {
    slug: "radius-calculator",
    label: "Radius calculator",
    title: "Radius Calculator from Chord and Rise | Field Quick Calc",
    description: "Estimate circle radius from chord length and rise (sagitta), then review arc length and center angle for curved field layouts.",
    eyebrow: "Curved layouts",
    h1: "Radius calculator from chord and rise",
    lead: "Estimate the radius of an arc from a measured chord and center rise for curved layout work.",
    intro: "When a curved section is defined by its straight chord and the rise at the midpoint, the circle radius can be calculated. Both measurements must use the same unit before applying the formula.",
    formula: "Radius R = chord² ÷ (8 × rise) + rise ÷ 2",
    sections: [
      ["Chord and rise explained", "The chord is the straight line between the arc endpoints. Rise—also called sagitta—is the perpendicular distance from the chord midpoint to the arc."],
      ["Example: curved forms or edging", "Measure endpoint-to-endpoint chord length, mark the midpoint, and measure perpendicular to the curve. Field Quick Calc uses those inputs to estimate radius and arc length."],
      ["Avoid shallow-arc measurement errors", "A small error in rise can change the radius significantly on a shallow arc. Take repeated measurements and verify against the layout control points."]
    ],
    faq: [["Do chord and rise need the same unit?", "Yes. Convert them to the same unit before using a manual radius formula."], ["What is sagitta?", "Sagitta is the perpendicular height from the chord midpoint to the arc."]],
    related: ["arc-calculator", "construction-calculator", "tapered-shape-calculator"]
  },
  {
    slug: "arc-calculator",
    label: "Arc calculator",
    title: "Arc Calculator: Arc Length from Chord and Rise | Field Quick Calc",
    description: "Calculate estimated arc length, radius and center angle from chord and rise for curved construction and field layout checks.",
    eyebrow: "Arc layout",
    h1: "Arc calculator for curved field layouts",
    lead: "Use chord and rise to estimate arc length, radius and center angle for a circular segment.",
    intro: "Arc length follows after the radius and center angle of the circular segment are known. Field Quick Calc keeps the chord-and-rise workflow together so all three results can be reviewed at once.",
    formula: "Angle θ = 2 × asin(chord ÷ 2R) · Arc length = R × θ (radians)",
    sections: [
      ["What the arc result represents", "Arc length is the distance along the curve between the two chord endpoints. It is longer than the straight chord and depends on the measured rise."],
      ["Example: curved curb, form or border", "Take the straight chord measurement and center rise, then use the estimated arc length to support material planning or layout checks."],
      ["Circular arcs only", "The formula assumes the measured curve is part of a circle. Freeform, elliptical or compound curves require a different layout method."]
    ],
    faq: [["Is arc length the same as chord length?", "No. The chord is straight; arc length follows the curve."], ["What unit will arc length use?", "It follows the measurement unit used for chord and rise after compatible-unit conversion."]],
    related: ["radius-calculator", "construction-calculator", "material-weight-guide"]
  },
  {
    slug: "tapered-shape-calculator",
    label: "Tapered shape calculator",
    title: "Tapered Shape Calculator for Width Checks | Field Quick Calc",
    description: "Check widths at different heights for one-sided or two-sided tapered shapes using height, top width and side slope ratio.",
    eyebrow: "Angled · uneven shapes",
    h1: "Tapered shape calculator for width checks",
    lead: "Choose which side tapers, then check widths at selected heights for sloped forms and uneven layouts.",
    intro: "A tapered shape changes width as its height changes. Define the total height, top width and side slope ratio, then identify whether the left, right or both sides taper.",
    formula: "Width change per side = vertical distance × horizontal-to-vertical side ratio",
    sections: [
      ["One side or both sides", "A one-sided taper adds width on the selected side. A symmetrical two-sided taper adds the same horizontal change on both sides."],
      ["Example: sloped or trapezoid formwork", "Enter the top width and full height, set the side ratio, then check the width at the heights where braces, ties or cut marks are needed."],
      ["Confirm ratio direction", "Field Quick Calc labels the side slope as H:V. Reversing the ratio changes the result, so confirm the drawing convention before entry."]
    ],
    faq: [["What does H:V mean?", "It is horizontal change compared with vertical change."], ["Can both sides taper?", "Yes. Choose Both for a symmetrical taper and verify that assumption matches the drawing."]],
    related: ["contractor-calculator", "radius-calculator", "jobsite-calculator"]
  },
  {
    slug: "material-weight-guide",
    label: "Material weight guide",
    title: "Construction Material Weight Guide and Calculator | Field Quick Calc",
    description: "Understand construction material density, weight and payload load estimates before using the full Material Weight Calculator.",
    eyebrow: "Field reference",
    h1: "Construction material weight guide",
    lead: "Understand the density, volume and payload values used by the Material Weight Calculator.",
    intro: "Material weight is based on volume and density. A quick reference can support early handling and quantity checks, but actual product weights vary with specification, moisture, composition and manufacturer.",
    formula: "Estimated weight = material volume × reference density",
    sections: [
      ["Use reference values carefully", "The Material Weight Calculator is intended for quick comparison and rough field planning. Use supplier data, tickets or engineering values for lifting, transport and structural decisions."],
      ["Keep field notes on the device", "Jobsite Notes can store measurements, cut notes and material counts locally. No login is required."],
      ["Example: early material planning", "Use the guide to compare typical weights while estimating a task, then replace the reference with the actual product density or certified weight when available."]
    ],
    faq: [["Are material weights exact?", "No. They are typical reference values and can vary by product and condition."], ["Where are jobsite notes stored?", "Notes are saved locally on the device."]],
    related: ["jobsite-calculator", "construction-calculator", "contractor-calculator"]
  },
  ...latestFeaturePages
];

const bySlug = Object.fromEntries(pages.map((page) => [page.slug, page]));

function esc(value) {
  return String(value).replace(/[&<>\"]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '\"': "&quot;" })[char]);
}

function utm(url, page, store) {
  const joiner = url.includes("?") ? "&" : "?";
  return `${url}${joiner}utm_source=website&utm_medium=organic&utm_campaign=field_quick_calc&utm_content=${page}_${store}`;
}

function stores(page) {
  return `<div class="store-row">
    <a class="store-link" data-store="app_store" data-cta-location="store_badges" href="${esc(utm(APP_STORE, page, "ios"))}" target="_blank" rel="noopener noreferrer" aria-label="Download Field Quick Calc on the App Store"><img src="${PUBLIC}/assets/badges/app-store.svg" alt="Download on the App Store" width="180" height="60"></a>
    <a class="store-link" data-store="google_play" data-cta-location="store_badges" href="${esc(utm(GOOGLE_PLAY, page, "android"))}" target="_blank" rel="noopener noreferrer" aria-label="Get Field Quick Calc on Google Play"><img src="${PUBLIC}/assets/badges/google-play.png" alt="Get it on Google Play" width="194" height="60"></a>
  </div>`;
}

function schema(value) {
  return `<script type="application/ld+json">${JSON.stringify(value).replace(/</g, "\\u003c")}</script>`;
}

function head({ title, description, canonical, page, schemas = [], image = "01-fast-jobsite-calculator.jpg" }) {
  return `<meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  <meta name="google-site-verification" content="B4pG06zbE4sNvjaYWLLyBs-fG_HiSoB6I701sceM79U">
  <link rel="canonical" href="${canonical}">
  <meta name="theme-color" content="#020b08">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Field Quick Calc">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${canonical}">
  <meta property="og:image" content="${BASE}/assets/screenshots/${image}">
  <meta property="og:image:alt" content="Field Quick Calc construction calculator app screen">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${esc(title)}">
  <meta name="twitter:description" content="${esc(description)}">
  <meta name="twitter:image" content="${BASE}/assets/screenshots/${image}">
  <link rel="icon" type="image/png" sizes="64x64" href="${PUBLIC}/assets/icons/favicon-64.png">
  <link rel="apple-touch-icon" href="${PUBLIC}/assets/icons/apple-touch-icon.png">
  <link rel="stylesheet" href="${PUBLIC}/assets/site.css">
  ${schemas.map(schema).join("\n  ")}`;
}

function header() {
  return `<a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header"><div class="nav-wrap">
    <a class="brand" href="${PUBLIC}/"><img src="${PUBLIC}/assets/icons/favicon-64.png" alt="" width="40" height="40"><span>Field Quick Calc<small>GENBA TOOLBOX</small></span></a>
    <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav">Menu</button>
    <nav class="nav-links" id="site-nav" aria-label="Primary"><a href="${PUBLIC}/#tools">Tools</a><a href="${PUBLIC}/construction-calculator/">Calculators</a><a href="${PUBLIC}/support/">Support</a><a href="${PUBLIC}/#download">Download</a></nav>
  </div></header>`;
}

function footer() {
  return `<footer><div class="container footer-grid"><span>© 2026 GENBA TOOLBOX</span><div class="footer-links"><a href="${PUBLIC}/support/">Support</a><a href="${PUBLIC}/privacy/">Privacy</a><a href="${PUBLIC}/sitemap.xml">Sitemap</a></div></div></footer><script src="${PUBLIC}/assets/site.js" defer></script><script src="${PUBLIC}/assets/web-calculators.js" defer></script>`;
}

function webCalculator(type, page) {
  if (type === "feet-inches") return `<section class="web-calculator" data-web-calculator="feet-inches" aria-labelledby="web-calc-title"><p class="eyebrow">Try it in your browser</p><h2 id="web-calc-title">Convert a field measurement</h2><div class="calc-fields"><label>Feet + inches<input data-feet-input type="text" inputmode="text" placeholder="10' 6\""></label><button class="button" type="button" data-calculate>Convert</button></div><p class="calc-error" data-calc-error role="alert"></p><div class="calc-results" data-results hidden><div><span>Feet + inches</span><strong data-result="ftin">—</strong></div><div><span>Decimal feet</span><strong data-result="ft">—</strong></div><div><span>Inches</span><strong data-result="in">—</strong></div><div><span>Millimeters</span><strong data-result="mm">—</strong></div><div><span>Centimeters</span><strong data-result="cm">—</strong></div><div><span>Meters</span><strong data-result="m">—</strong></div></div><div class="calculator-app-cta"><p><strong>Get all jobsite calculators in one free app.</strong></p>${stores(`${page}_calculator`)}</div></section>`;
  if (type === "plane-takeoff") return `<section class="web-calculator" data-web-calculator="plane-takeoff" aria-labelledby="web-calc-title"><p class="eyebrow">Try it in your browser</p><h2 id="web-calc-title">Calculate rectangular area</h2><div class="calc-fields"><label>Input unit<select data-plane-unit><option value="ftin">Feet + inches</option><option value="ft">Decimal feet</option><option value="in">Inches</option><option value="yd">Yards</option><option value="mm">Millimeters</option><option value="cm">Centimeters</option><option value="m">Meters</option></select></label><label>Length<input data-plane-length type="text" inputmode="text" placeholder="12' 0\""></label><label>Width<input data-plane-width type="text" inputmode="text" placeholder="8' 6\""></label><button class="button" type="button" data-calculate>Calculate area</button></div><p class="calc-error" data-calc-error role="alert"></p><div class="calc-results" data-results hidden><div><span>Square feet</span><strong data-result="ft2">—</strong></div><div><span>Square meters</span><strong data-result="m2">—</strong></div><div><span>Square yards</span><strong data-result="yd2">—</strong></div></div><div class="calculator-app-cta"><p><strong>Get all jobsite calculators in one free app.</strong></p>${stores(`${page}_calculator`)}</div></section>`;
  return "";
}

function requestSection(heading = "What calculation do you need on the jobsite?") {
  return `<section><div class="container"><div class="feature-request">
    <p class="eyebrow">Help shape future tools</p><h2>${esc(heading)}</h2><p>Send a short feature or calculator request. Email is optional and only needed if you want a reply.</p>
    <button class="button secondary" type="button" data-request-open>Request a feature</button>
    <form class="request-form" data-request-form action="${BASIN}" method="post" hidden novalidate>
      <input type="hidden" name="source"><input type="hidden" name="page_url"><input type="hidden" name="submitted_at">
      <div class="field"><label for="request">Feature or calculation needed *</label><textarea id="request" name="feature_request" required maxlength="2000" placeholder="Example: Calculate concrete volume for an irregular slab"></textarea></div>
      <div class="field"><label for="use-case">Where would you use it?</label><textarea id="use-case" name="use_case" maxlength="2000" placeholder="Tell us about the job or field situation"></textarea></div>
      <div class="field"><label for="trade">Trade</label><input id="trade" name="trade" maxlength="120" autocomplete="organization-title" placeholder="Example: concrete, carpentry, landscaping"></div>
      <div class="field"><label for="email">Email <small>optional, for a reply only</small></label><input id="email" name="email" type="email" maxlength="254" autocomplete="email" inputmode="email"></div>
      <div class="form-actions"><button class="button" type="submit">Send request</button><span class="form-status" data-form-status role="status" aria-live="polite"></span></div>
    </form>
  </div></div></section>`;
}

function bottomCta(page) {
  return `<section class="bottom-cta" id="download"><div class="container"><p class="eyebrow">Free on iOS and Android</p><h2>Use it on the jobsite.</h2><p>Get Field Quick Calc for focused construction math in a clear, high-contrast field interface.</p>${stores(page)}</div></section>`;
}

function homeHtml() {
  const tools = [
    ["01", "Tapered Shape", "Check changing widths for left, right or two-sided tapers."],
    ["02", "Radius & Arc", "Estimate radius, arc length and center angle from chord and rise."],
    ["03", "Slope & Pitch", "Calculate slope length, angle and pitch from rise and run."],
    ["04", "Stair Layout", "Estimate step count, actual rise, tread depth and stair angle."],
    ["05", "Rebar Estimator", "Estimate pieces, stock bars, weight and remaining material."],
    ["06", "Plane Takeoff", "Calculate rectangular area with metric or imperial dimensions."],
    ["07", "Material Weight", "Estimate material weight and payload-based vehicle loads."],
    ["08", "Quick Convert", "Convert mm, cm, m, inches, feet, feet + inches and yards."]
  ];
  const shots = [
    ["01-fast-jobsite-calculator.jpg", "Fast Jobsite Calculator"], ["02-slope-angle-pitch.jpg", "Slope, Angle & Pitch"], ["03-radius-arc-layout.jpg", "Radius & Arc Layout"], ["04-tapered-shape-checks.jpg", "Tapered Shape Checks"], ["05-quick-stair-layout.jpg", "Quick Stair Layout"], ["06-material-weight-notes.jpg", "Material Weight & Notes"]
  ];
  const software = { "@type": "SoftwareApplication", "name": "Field Quick Calc: Contractor", "alternateName": "Field Quick Calc", "applicationCategory": "UtilitiesApplication", "operatingSystem": "iOS, Android", "softwareVersion": "1.0.3", "description": "Free construction and jobsite calculator for unit conversion, plane takeoff, rebar, material weight, stairs, slope, radius, arc and tapered field layouts.", "featureList": ["Feet and inches conversion", "Plane Takeoff", "Rebar Estimator", "Material Weight and payload load estimate", "Stair Layout", "Slope and Pitch", "Radius and Arc", "Tapered Shape"], "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" }, "downloadUrl": [APP_STORE, GOOGLE_PLAY] };
  const graph = { "@context": "https://schema.org", "@graph": [{ "@type": "WebSite", "@id": `${BASE}/#website`, "url": `${BASE}/`, "name": "Field Quick Calc", "inLanguage": "en-US", "description": "Construction math for the jobsite." }, { ...software, "@id": `${BASE}/#app`, "url": `${BASE}/` }, { "@type": "Organization", "@id": `${BASE}/#organization`, "name": "GENBA TOOLBOX", "url": `${BASE}/` }] };
  return `<!doctype html><html lang="en-US"><head>${head({ title: "Field Quick Calc | Construction Calculator for the Jobsite", description: "Construction calculator for contractors and field work: slope, pitch, stairs, radius, arc, tapered shapes, material weight and jobsite notes.", canonical: `${BASE}/`, page: "home", schemas: [graph] })}</head><body data-page="home">${header()}<main id="main">
  <section class="hero"><div class="container hero-grid"><div><p class="eyebrow">Free · iOS + Android</p><h1>Construction math for the jobsite.</h1><p class="hero-lead">Convert field units, check plane area, estimate rebar and material loads, and run slope, stair, radius, arc and tapered-shape calculations in one focused app.</p>${stores("home")}<div class="hero-proof"><span>Free</span><span>No account required</span><span>Works offline</span><span>No ads</span><span>Metric + Imperial</span></div></div><div class="hero-visual"><img class="phone-shot" src="${PUBLIC}/assets/screenshots/01-fast-jobsite-calculator.jpg" alt="Field Quick Calc home screen showing construction calculator tools" width="520" height="1125" fetchpriority="high"></div></div></section>
  <section id="tools"><div class="container"><div class="section-head"><p class="eyebrow">One app · focused field tools</p><h2>Common calculations, organized by the work.</h2><p>Enter the dimensions already measured on site. Field Quick Calc returns estimates in clear, familiar jobsite terms.</p></div><div class="tool-grid">${tools.map(([n, t, p]) => `<article class="tool-card"><b>${n}</b><h3>${t}</h3><p>${p}</p></article>`).join("")}</div></div></section>
  <section><div class="container"><div class="section-head"><p class="eyebrow">Real app screens</p><h2>Built to scan quickly in the field.</h2><p>High contrast, direct unit labels and task-specific screens keep the next input obvious.</p></div><div class="screenshot-strip">${shots.map(([file, label], index) => `<figure class="screen-card"><img src="${PUBLIC}/assets/screenshots/${file}" alt="${label} screen in Field Quick Calc" width="520" height="1125" ${index > 1 ? 'loading="lazy"' : ""}><p>${label}</p></figure>`).join("")}</div></div></section>
  <section><div class="container"><div class="section-head"><p class="eyebrow">Field guides</p><h2>Start with the calculation you need.</h2><p>Each guide explains the measurements, formula and field-use limits before sending you to the matching app tool.</p></div><div class="seo-grid">${pages.map((p) => `<a class="seo-card" href="${PUBLIC}/${p.slug}/"><span>Guide</span><h3>${p.label}</h3><p>${p.description}</p></a>`).join("")}</div></div></section>
  ${requestSection()}${bottomCta("home_bottom")}</main>${footer()}</body></html>`;
}

function articleHtml(page) {
  const canonical = `${BASE}/${page.slug}/`;
  const breadcrumbs = { "@type": "BreadcrumbList", "itemListElement": [{ "@type": "ListItem", "position": 1, "name": "Field Quick Calc", "item": `${BASE}/` }, { "@type": "ListItem", "position": 2, "name": page.label, "item": canonical }] };
  const faq = { "@type": "FAQPage", "mainEntity": page.faq.map(([q, a]) => ({ "@type": "Question", "name": q, "acceptedAnswer": { "@type": "Answer", "text": a } })) };
  const graph = { "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", "name": page.title, "description": page.description, "url": canonical, "inLanguage": "en-US", "isPartOf": { "@id": `${BASE}/#website` }, "about": { "@id": `${BASE}/#app` } }, breadcrumbs, faq] };
  const related = page.related.map((slug) => bySlug[slug]).filter(Boolean);
  return `<!doctype html><html lang="en-US"><head>${head({ title: page.title, description: page.description, canonical, page: page.slug, schemas: [graph], image: page.slug.includes("slope") || page.slug.includes("pitch") ? "02-slope-angle-pitch.jpg" : page.slug.includes("radius") || page.slug.includes("arc") ? "03-radius-arc-layout.jpg" : page.slug.includes("taper") ? "04-tapered-shape-checks.jpg" : page.slug.includes("stair") ? "05-quick-stair-layout.jpg" : page.slug.includes("material") ? "06-material-weight-notes.jpg" : "01-fast-jobsite-calculator.jpg" })}</head><body data-page="${page.slug}">${header()}<main id="main">
    <header class="page-hero"><div class="container"><nav class="breadcrumbs" aria-label="Breadcrumb"><a href="${PUBLIC}/">Field Quick Calc</a><span>/</span><span>${page.label}</span></nav><p class="eyebrow">${page.eyebrow}</p><h1>${page.h1}</h1><p class="hero-lead">${page.lead}</p></div></header>
    <section><div class="container article-grid"><article class="article-body"><p>${page.intro}</p><div class="formula"><strong>Field formula</strong><code>${page.formula}</code></div>${page.calculator ? webCalculator(page.calculator, page.slug) : ""}${page.sections.map(([h, p]) => `<h2>${h}</h2><p>${p}</p>`).join("")}<p class="notice">Results are estimates only. Always follow local codes, project drawings, manufacturer specifications, site conditions and professional judgment.</p><section class="faq" aria-labelledby="faq-title"><h2 id="faq-title">Frequently asked questions</h2>${page.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join("")}</section><div class="related"><h2>Related field guides</h2><div class="related-links">${related.map((p) => `<a href="${PUBLIC}/${p.slug}/">${p.label}</a>`).join("")}</div></div></article><aside class="side-cta"><p class="eyebrow">Free app</p><h2>Run this check in Field Quick Calc</h2><p>Use the focused app screen to enter measurements and review the estimate.</p>${stores(page.slug)}</aside></div></section>
    ${bottomCta(`${page.slug}_bottom`)}</main>${footer()}</body></html>`;
}

function supportHtml() {
  const canonical = `${BASE}/support/`;
  return `<!doctype html><html lang="en-US"><head>${head({ title: "Field Quick Calc Support | Help, Bugs & Feature Requests", description: "Get help with Field Quick Calc, report an app issue or request a construction calculator for a future update.", canonical, page: "support", schemas: [{ "@context": "https://schema.org", "@type": "ContactPage", "name": "Field Quick Calc Support", "url": canonical, "inLanguage": "en-US" }] })}</head><body data-page="support">${header()}<main id="main"><header class="page-hero"><div class="container"><p class="eyebrow">Support</p><h1>Help with Field Quick Calc</h1><p class="hero-lead">Questions about a tool, a calculation result or an app issue? Use the options below.</p></div></header><section><div class="container"><div class="tool-grid"><article class="tool-card"><b>01</b><h2>Using the app</h2><p>Open the field guide for the matching tool, confirm input units, and compare results with drawings and job requirements.</p><p><a href="${PUBLIC}/construction-calculator/">Browse calculator guides</a></p></article><article class="tool-card"><b>02</b><h2>Report a bug</h2><p>Email the device type, OS version, app version, screen name and steps that reproduce the issue.</p><p><a href="mailto:xinjiaantian83@gmail.com?subject=Field%20Quick%20Calc%20bug%20report">Email support</a></p></article><article class="tool-card"><b>03</b><h2>Download or update</h2><p>Use the official store listing for the current iOS or Android release.</p>${stores("support")}</article></div></div></section>${requestSection("Request a jobsite calculation or feature")}${bottomCta("support_bottom")}</main>${footer()}</body></html>`;
}

function privacyHtml() {
  const canonical = `${BASE}/privacy/`;
  return `<!doctype html><html lang="en-US"><head>${head({ title: "Privacy Policy | Field Quick Calc", description: "Privacy information for the Field Quick Calc app and official website, including local app data, analytics and feature requests.", canonical, page: "privacy", schemas: [{ "@context": "https://schema.org", "@type": "WebPage", "name": "Field Quick Calc Privacy Policy", "url": canonical, "dateModified": "2026-08-23", "inLanguage": "en-US" }] })}</head><body data-page="privacy">${header()}<main id="main"><section><article class="container legal-card"><p class="eyebrow">Last updated ${UPDATED}</p><h1>Privacy Policy</h1><p>This policy explains how the Field Quick Calc mobile app and this official website handle information.</p><h2>Mobile app</h2><p>The app does not require an account or login. Calculation entries, results, menu preferences and Jobsite Notes are processed or stored locally on the device. The app does not include advertising, third-party analytics, crash reporting or tracking SDKs. It does not request location, contacts, photos or sensitive device data.</p><h2>Official website analytics</h2><p>The website is prepared to use Google Analytics 4 (GA4) to understand page use and store-link performance. GA4 is not currently enabled because no Field Quick Calc measurement ID has been configured. If enabled later, Google may process information such as page URL, device/browser information, approximate location and interaction events according to Google's terms and privacy policy.</p><h2>Feature requests</h2><p>If you submit the optional feature request form, we collect the request, use case, trade, optional email address, source value (<code>web-en</code>), current page URL and submission timestamp. The form is processed by Basin. We use this information to evaluate future features and, only when requested, reply to you.</p><h2>External stores and links</h2><p>Links to Apple App Store, Google Play and Basin lead to third-party services governed by their own privacy policies. UTM parameters may be added to store links to identify the source page of a visit.</p><h2>Retention and choices</h2><p>Do not enter confidential project or personal information in a feature request. You may use the app's local note-clearing controls to remove locally stored notes. To ask about or request deletion of a submitted feature request, contact us at the address below.</p><h2>Children</h2><p>Field Quick Calc is a general utility and is not directed to children. We do not knowingly request personal information from children.</p><h2>Changes</h2><p>We may update this policy when the app, website or supporting services change. The current revision date will appear above.</p><h2>Contact</h2><p>GENBA TOOLBOX<br><a href="mailto:xinjiaantian83@gmail.com">xinjiaantian83@gmail.com</a></p></article></section></main>${footer()}</body></html>`;
}

function notFoundHtml() {
  return `<!doctype html><html lang="en-US"><head>${head({ title: "Page Not Found | Field Quick Calc", description: "The requested Field Quick Calc page could not be found.", canonical: `${BASE}/404.html`, page: "404", schemas: [] })}<meta name="robots" content="noindex"></head><body data-page="404">${header()}<main id="main"><section><div class="container legal-card"><p class="eyebrow">404</p><h1>That page is not on the job.</h1><p>Return to Field Quick Calc or open a field calculation guide.</p><a class="button" href="${PUBLIC}/">Back to home</a></div></section></main>${footer()}</body></html>`;
}

function write(relative, content) {
  const file = path.join(ROOT, relative);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
}

write("index.html", homeHtml());
for (const page of pages) write(`${page.slug}/index.html`, articleHtml(page));
write("support/index.html", supportHtml());
write("privacy/index.html", privacyHtml());
const privacyPath = path.join(ROOT, "privacy/index.html");
fs.writeFileSync(privacyPath, fs.readFileSync(privacyPath, "utf8").replace(
  "The website is prepared to use Google Analytics 4 (GA4) to understand page use and store-link performance. GA4 is not currently enabled because no Field Quick Calc measurement ID has been configured. If enabled later, Google may process information such as page URL, device/browser information, approximate location and interaction events according to Google's terms and privacy policy.",
  "The website uses Google Analytics 4 (GA4) to understand page use and store-link performance. Google may process information such as page URL, device/browser information, approximate location and interaction events according to Google's terms and privacy policy. We use this information in aggregate to understand which pages are discovered and whether visitors continue to the App Store or Google Play."
));
write("404.html", notFoundHtml());

const urls = [`${BASE}/`, ...pages.map((p) => `${BASE}/${p.slug}/`), `${BASE}/support/`, `${BASE}/privacy/`];
write("sitemap.xml", `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc><lastmod>2026-08-23</lastmod></url>`).join("\n")}\n</urlset>\n`);
write("robots.txt", `User-agent: *\nAllow: /\n\nSitemap: ${BASE}/sitemap.xml\n`);
write(".nojekyll", "");

console.log(`Built ${pages.length + 3} HTML pages.`);
