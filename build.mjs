#!/usr/bin/env node
// Assembles src/ -> dist/index.html  (no dependencies; run: node build.mjs)
import { readFileSync, writeFileSync, mkdirSync, cpSync } from "node:fs";
import { join } from "node:path";

const root = import.meta.dirname;
const read = (...p) => readFileSync(join(root, ...p), "utf8");

const meta = JSON.parse(read("src", "meta.json"));
const { order } = JSON.parse(read("src", "sections", "manifest.json"));

// --- CSS: fonts -> tokens -> base -> per-section (in page order) -> responsive
const css = [
  read("src", "styles", "fonts.css"),
  read("src", "styles", "tokens.css"),
  read("src", "styles", "base.css"),
  ...order.map((s) => read("src", "sections", `${s}.css`)),
  read("src", "styles", "responsive.css"),
]
  .map((c) => c.trim())
  .filter(Boolean)
  .join("\n\n");

const html = order.map((s) => read("src", "sections", `${s}.html`).trim()).join("\n\n");

const page = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${meta.title}</title>
<meta name="description" content="${meta.description}">
<link rel="canonical" href="${meta.url}">
<meta property="og:type" content="website">
<meta property="og:title" content="${meta.title}">
<meta property="og:description" content="${meta.description}">
<meta property="og:url" content="${meta.url}">
<meta property="og:image" content="${meta.url}${meta.ogImage}">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify(meta.jsonLd)}</script>
<style>
${css}
</style>
</head>
<body>

${html}

</body>
</html>
`;

mkdirSync(join(root, "dist"), { recursive: true });
cpSync(join(root, "fonts"), join(root, "dist", "fonts"), { recursive: true });
cpSync(join(root, "og.png"), join(root, "dist", "og.png"));
writeFileSync(join(root, "dist", "index.html"), page);

const kb = (Buffer.byteLength(page) / 1024).toFixed(1);
console.log(`built dist/index.html — ${kb} KB, ${order.length} sections`);
