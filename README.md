# Andiswa Masuku | Scientific Portfolio

A premium, data-driven academic portfolio showcasing research in Marine Biology, Spatial Ecology, and Food Science. Built with a focus on visual storytelling and scientific rigor.

## 🗺️ Site Architecture (ASCII Map)

```text
ROOT (/)
│
├── 🏠 HOME (Index)
│   ├── [NAV] Navigation Bar
│   ├── [HERO] Professional Intro
│   ├── [THESIS] Caracal Study Preview (Google Earth Link)
│   ├── [EDUCATION] Academic Background
│   ├── [WORK] Research & Professional Timeline
│   ├── [SKILLS] Technical Capabilities (R, GIS, Lab)
│   └── [FOOTER] Contact & Social Links
│
├── 📊 PROJECTS (/projects)
│   ├── [FIELDWORK] Active Research Cards
│   └── [RESEARCH AREAS] Domain Expertise Cards
│       └── 📝 ARTICLES (/projects/articles/:slug)
│           ├── Fishing & Poaching Impacts
│           ├── Body Size as a Master Trait
│           ├── High Altitude Hypoxia adaptation
│           └── Effective Trophic Levels
│
└── 🐆 THESIS DETAIL (/projects/thesis)
    ├── Abstract & Objectives
    ├── Interactive Wildlife Tracking Map
    ├── Laboratory Methodology
    └── Significance of Findings
```

## 🚀 Tech Stack

- **Framework**: [React](https://reactjs.org/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Justified typography, premium HSL palette)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Maps/Geo**: [Google Earth](https://earth.google.com/) (External 3D Tilted View Link)

## 📁 Project Structure

```text
andiswa-portfolio/
├── public/              # Static assets (favicon, SEO files)
├── src/
│   ├── assets/          # Optimized images and media
│   ├── components/      # Reusable UI sections
│   │   ├── sections/    # Major page blocks (Education, Work, etc.)
│   │   └── ui/          # Base components (Dialog, Sheet)
│   ├── data/            # Article content (TypeScript)
│   ├── lib/             # Utility functions
│   ├── pages/           # Route components
│   └── index.css        # Global design system & typography
├── index.html           # Entry point
├── vite.config.ts       # Build configuration
└── tailwind.config.ts   # Tailwind customization
```

## 🧪 Key Features

- **Scientific Storytelling**: Integrated 4 academic papers into 4-minute visual reads.
- **Interactive GIS**: Integrated GPS tracking data with a forced 3D tilted camera angle in Google Earth.
- **Premium Aesthetics**: High-end typography (Cormorant Garamond/Inter), HSL tailored colors, and glassmorphism.
- **Justified Content**: All scientific descriptions and articles are fully justified for a professional academic feel.
- **SEO Optimized**: Dynamic meta tags and JSON-LD schema for scientific indexing.

## ⚡ Production Optimizations

The codebase has been optimized for production deployment:

- **Image Loading Strategy**: Hero images load eagerly with high fetch priority; below-the-fold images are lazy-loaded with async decoding
- **CSS Cleanup**: Removed unused Leaflet import and map-specific styles
- **Bundle Trim**: Removed unused dependencies (React Query, Leaflet, Radix Toast/Tooltip/Label/Slot, next-themes, sonner) and the unused maps vendor chunk
- **Code Cleanup**: Deleted unused components/hooks to reduce bloat (`AboutSection`, `RunwayIndex`, `NavLink`, `use-mobile`)
- **Code Minification**: esbuild minification with console/debugger removal
- **Asset Hygiene**: Removed unused `public/videos` to reduce deploy size

## 🛠️ Development

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---
© 2026 Andiswa Masuku | [andiswa.masuku.southafrica@gmail.com](mailto:andiswa.masuku.southafrica@gmail.com)

