# Changelog

## [Unreleased]
### Added
- Privacy Statement page at `/privacy/` (effective August 10, 2026), built from
  `src/pages/privacy.{html,css,json}` and sharing the site's nav, footer and styles.
- `build.mjs` now builds any page in `src/pages/` to `dist/<name>/index.html`.
- "Privacy" link in the footer.

### Fixed
- Wired contact form to Netlify Forms: submissions are now captured, with named
  fields and a honeypot for spam protection.

### Changed
- Split single-file `figabl_redesign.html` (573 lines) into `src/` sections + build step.
- Extracted 3 base64 Oxygen fonts (41 KB of the original file) to real `.woff2` files;
  added `font-display: swap`.
- Added SEO head: meta description, canonical, Open Graph, Twitter card,
  Organization JSON-LD.

### Verified
- 143 CSS rules in, 143 out. Zero class-name drift from the original.
