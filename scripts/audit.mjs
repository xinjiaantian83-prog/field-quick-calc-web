import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlFiles = [];

function walk(dir) {
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if ([".git", "node_modules"].includes(item.name)) continue;
    const full = path.join(dir, item.name);
    if (item.isDirectory()) walk(full);
    else if (item.name.endsWith(".html")) htmlFiles.push(full);
  }
}

walk(root);
const errors = [];
const titles = new Map();
const descriptions = new Map();

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, "utf8");
  const rel = path.relative(root, file);
  const title = html.match(/<title>(.*?)<\/title>/s)?.[1];
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1];
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  const h1Count = (html.match(/<h1(?:\s|>)/g) || []).length;
  if (!title || !description || !canonical || h1Count !== 1) errors.push(`${rel}: missing or invalid title/description/canonical/H1`);
  if (titles.has(title)) errors.push(`${rel}: duplicate title with ${titles.get(title)}`); else titles.set(title, rel);
  if (descriptions.has(description)) errors.push(`${rel}: duplicate description with ${descriptions.get(description)}`); else descriptions.set(description, rel);

  for (const block of html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)) {
    try { JSON.parse(block[1]); } catch (error) { errors.push(`${rel}: invalid JSON-LD (${error.message})`); }
  }

  for (const match of html.matchAll(/(?:href|src)="(\/field-quick-calc-web\/[^"?#]+)"/g)) {
    let target = match[1].replace("/field-quick-calc-web/", "");
    if (!target || target.endsWith("/")) target += "index.html";
    const local = path.join(root, target);
    if (!fs.existsSync(local)) errors.push(`${rel}: missing local target ${match[1]}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
console.log(`Audit passed: ${htmlFiles.length} HTML files, unique metadata, valid JSON-LD and local assets.`);
