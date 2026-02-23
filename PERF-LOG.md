# Performance Optimization — Progress Log

Chronological record of performance and cleanup changes made to the Andiswa portfolio site.

---

### 2026-02-23T13:44:00+02:00 – Completed
**Affected file(s)/folder(s):** `src/App.tsx`
**Description:** Converted 5 sub-page imports to `React.lazy()` + `<Suspense>` for route-level code-splitting. Only the Index (homepage) remains eagerly loaded.
**Before:** All 6 pages imported eagerly in the main bundle (~all JS shipped on first load).
**After:** Sub-pages (`Projects`, `ThesisDetail`, `ArticlePage`, `ResearchMap`, `NotFound`) load on demand.
**Error(s):** None

---

### 2026-02-23T13:44:30+02:00 – Completed
**Affected file(s)/folder(s):** `index.html`, `src/index.css`
**Description:** Moved Google Fonts loading from a render-blocking CSS `@import` to an HTML `<link rel="stylesheet">` tag in `<head>`, alongside the existing `<link rel="preconnect">` entries.
**Before:** Fonts loaded via `@import url(...)` in CSS — blocks rendering until the entire stylesheet (including fonts) is parsed.
**After:** Fonts loaded via `<link>` in HTML head — browser can discover and fetch fonts earlier, in parallel with CSS parsing.
**Error(s):** None

---

### 2026-02-23T13:45:00+02:00 – Completed
**Affected file(s)/folder(s):** `vite.config.ts`
**Description:** Added `leaflet` and `react-leaflet` to `manualChunks` for separate code-splitting. Installed and configured `vite-plugin-compression` for gzip-compressed production builds.
**Before:** Leaflet bundled with main chunk (~140KB shipped to all pages). No compressed output files.
**After:** Leaflet in separate `vendor-leaflet` chunk (loaded only on map pages). Gzip `.gz` files generated for all assets >1KB at build time.
**Error(s):** Initial `npm install` failed due to peer dependency conflict; resolved with `--legacy-peer-deps`.

---

### 2026-02-23T13:45:30+02:00 – Completed
**Affected file(s)/folder(s):** `src/components/CustomCursor.tsx`
**Description:** Replaced React state-driven cursor positioning with direct DOM manipulation via `useRef` + `requestAnimationFrame`.
**Before:** Every `mousemove` event triggered `setState` → React re-render (~60 times/sec).
**After:** Cursor position set directly on the DOM element via `style.left`/`style.top` inside a `requestAnimationFrame` callback. Zero React re-renders.
**Error(s):** None

---

### 2026-02-23T13:46:00+02:00 – Completed
**Affected file(s)/folder(s):** `Laduma rxy.csv`, `laduma-analysis.md`, `scripts/convert-assets-to-webp.mjs`, `googleb15cedba60f0b395.html` (root)
**Description:** Deleted superfluous files not referenced by the app. CSV data already embedded in `ladumaData.ts`; analysis notes not part of the app; script was a one-time utility; Google verification file duplicated in `public/`.
**Before:** 4 unnecessary files/dirs (~83KB).
**After:** Removed from project.
**Error(s):** None

---

### 2026-02-23T13:47:00+02:00 – Completed
**Affected file(s)/folder(s):** `src/assets/comparative-biochemistry.webp`, `src/assets/river-research.webp`, `src/assets/project-sustainability.webp`
**Description:** Resized 3 oversized WebP images to max 1200px width using `sharp` with quality 82.
**Before:** comparative-biochemistry: 516KB, river-research: ~371KB, project-sustainability: 303KB.
**After:** comparative-biochemistry: 252KB, river-research: ~180KB, project-sustainability: 148KB.
**Error(s):** Initial sharp write failed due to Vite dev server file locks. Resolved by writing to temp directory and using PowerShell `Copy-Item` to overwrite.

---

### 2026-02-23T13:47:30+02:00 – Completed
**Affected file(s)/folder(s):** `public/og-image.png`
**Description:** Optimized Open Graph image using sharp with compression level 9.
**Before:** 367KB PNG.
**After:** 86KB PNG.
**Error(s):** None
