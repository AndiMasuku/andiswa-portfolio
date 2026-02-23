# Andiswa Masuku — Biological Sciences & Data Analytics Portfolio

A premium academic portfolio showcasing research in Marine Biology, Spatial Ecology, Physiology, and Food Science. Built with React + Vite, featuring interactive Leaflet maps, animated page transitions, and scientific article deep-dives.

**Live site →** [andiswa.vercel.app](https://andiswa.vercel.app)

---

## 🗺️ Site Architecture

```text
  andiswa.vercel.app
  │
  ├── 🏠  /                           ─── Homepage
  │   ├── Navigation (sticky, glassmorphism)
  │   ├── Hero Section (portrait, intro, skills)
  │   ├── Thesis & Research Preview (live Leaflet map card)
  │   ├── Education Timeline (UKZN → Wits)
  │   ├── Work Experience Timeline
  │   ├── Skills Grid (Technical + Soft)
  │   └── Footer (contact, social links)
  │
  ├── 📊  /projects                   ─── Projects Gallery
  │   ├── Fieldwork Project Cards
  │   └── Research Area Cards
  │       └── 📝  /projects/articles/:slug  ─── Article Pages
  │           ├── fishing-poaching-impacts
  │           ├── body-size-master-trait
  │           ├── altitude-adaptation
  │           └── trophic-levels
  │
  ├── 🔬  /projects/thesis            ─── Honours Thesis Detail
  │   ├── Problem & Solution
  │   ├── Methodology (lab images, lightbox)
  │   └── Key Findings
  │
  └── 🗺️  /projects/projects-map      ─── Interactive Projects Map
      ├── Leaflet map with 11 research sites
      ├── GPS tracking overlay (Laduma caracal)
      └── Collapsible project detail panel
```

---

## 📁 Project Structure

```text
andiswa-portfolio/
├── public/                         # Static assets served as-is
│   ├── favicon.svg                 #   Site icon
│   ├── og-image.png                #   Open Graph share image (86 KB)
│   ├── robots.txt                  #   Crawler directives
│   ├── sitemap.xml                 #   8 indexed URLs
│   └── googleb15cedba60f0b395.html #   Search Console verification
│
├── src/
│   ├── assets/                     # 20 WebP images + 1 MP4 video
│   │
│   ├── components/
│   │   ├── CustomCursor.tsx        #   rAF-driven cursor (desktop only)
│   │   ├── HeroSection.tsx         #   Homepage hero
│   │   ├── Navigation.tsx          #   Sticky nav + mobile drawer
│   │   ├── FooterSection.tsx       #   Contact & social links
│   │   ├── MarqueeTicker.tsx       #   Scrolling skill ticker
│   │   ├── ScrollToTop.tsx         #   Route-change scroll reset
│   │   ├── PersonSchema.tsx        #   JSON-LD Person schema
│   │   ├── SiteSchema.tsx          #   JSON-LD WebSite schema
│   │   ├── WebSiteSchema.tsx       #   Additional structured data
│   │   ├── sections/
│   │   │   ├── ThesisSection.tsx   #     Research preview + map card
│   │   │   ├── EducationSection.tsx#     Academic timeline
│   │   │   ├── WorkSection.tsx     #     Work experience timeline
│   │   │   └── SkillsSection.tsx   #     Technical & soft skills
│   │   └── ui/
│   │       ├── dialog.tsx          #     ShadCN modal dialog
│   │       └── sheet.tsx           #     ShadCN side drawer
│   │
│   ├── data/
│   │   ├── articles.ts            # 4 research articles (content + metadata)
│   │   ├── ladumaData.ts          # 1,142 GPS tracking points
│   │   └── spatialData.ts         # 11 research site coordinates
│   │
│   ├── lib/
│   │   ├── seo.ts                 # Meta tag & canonical URL helpers
│   │   ├── email.ts               # Contact form utilities
│   │   └── utils.ts               # Tailwind merge helper
│   │
│   ├── pages/
│   │   ├── Index.tsx              # Homepage (eagerly loaded)
│   │   ├── Projects.tsx           # Projects gallery (lazy)
│   │   ├── ThesisDetail.tsx       # Thesis deep-dive (lazy)
│   │   ├── ArticlePage.tsx        # Dynamic article renderer (lazy)
│   │   ├── ResearchMap.tsx        # Interactive Leaflet map (lazy)
│   │   └── NotFound.tsx           # 404 page (lazy)
│   │
│   ├── App.tsx                    # Router + Suspense boundary
│   ├── main.tsx                   # Entry point (HelmetProvider)
│   └── index.css                  # Global design system & typography
│
├── .npmrc                         # legacy-peer-deps for React 18 compat
├── index.html                     # HTML shell (font preloads, meta tags)
├── vite.config.ts                 # Build config (chunks, gzip, esbuild)
├── tailwind.config.ts             # Custom theme (colors, fonts, animations)
├── vercel.json                    # Redirects + SPA rewrite
├── PERF-LOG.md                    # Performance optimization changelog
└── package.json                   # Dependencies & scripts
```

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 18 + Vite 5 |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 3 + ShadCN UI |
| **Animations** | Framer Motion 12 |
| **Maps** | Leaflet + React-Leaflet |
| **Icons** | Lucide React |
| **SEO** | React Helmet Async + JSON-LD |
| **Hosting** | Vercel |

---

## ⚡ Performance Optimizations

- **Code splitting** — 5 pages lazy-loaded via `React.lazy` + `Suspense`
- **Vendor chunks** — `vendor-react`, `vendor-animation`, `vendor-leaflet` separated
- **Gzip compression** — `vite-plugin-compression` generates `.gz` files at build
- **Font preloading** — Google Fonts loaded via HTML `<link>` (non-render-blocking)
- **Image optimization** — All images converted to WebP; 3 largest resized with sharp
- **Custom cursor** — Uses `requestAnimationFrame` + direct DOM manipulation (zero re-renders)
- **esbuild** — Production minification with console/debugger removal

---

## 🧪 Key Features

- **Scientific Storytelling** — 4 research articles as visual 4-minute reads
- **Interactive GPS Map** — 1,142 tracking points for the Laduma caracal study
- **Premium Aesthetics** — Cormorant Garamond + Inter typography, HSL color palette, glassmorphism
- **SEO Optimized** — Dynamic meta tags, JSON-LD Person/WebSite schema, sitemap
- **Responsive** — Mobile-first with drawer navigation and optimized touch interactions

---

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server (localhost:8080)
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

---

© 2026 Andiswa Masuku · [andiswa.masuku.southafrica@gmail.com](mailto:andiswa.masuku.southafrica@gmail.com) · [LinkedIn](https://www.linkedin.com/in/andiswa-masuku-a01541234/)
