# Master Plan: Pure White Canvas, Apple-Grade Restraint, Verified MSc Entry & Jakob's Law Section Header Standardization

## 1. User Feedback & Directive Adjustments
- **Jakob's Law Header Standardization (NEW)**:
  - Users expect uniform patterns across the entire site. Currently, `SkillsSection` and `WorkSection` have stacked uppercase overline text (`Capabilities & Apparatus` / `Experience & Roles`), different font weights (`font-semibold` vs `font-normal`), and irregular bottom margins, breaking expectations compared to `Research Areas` and `Fieldwork & GIS`.
  - **Standardized Header Formula for All 5 Sections**:
    - **Vertical Padding**: `py-6 md:py-8` on all sections.
    - **Header Flexbox**: `flex items-baseline justify-between mb-3 md:mb-4`.
    - **Left Title Container**: `flex items-center gap-3`.
    - **Heading**: `<h2 className="font-display text-2xl md:text-3xl text-primary font-normal tracking-tight">`.
    - **Inline Monospace Tag**: `<span className="hidden sm:inline-block text-[11px] font-mono text-muted-foreground/70">` beside the heading.
    - **Right Element**: Either navigation action (`See all >`) or contextual mono tag (`<span className="text-xs text-muted-foreground font-mono">`).
  - **Eliminate All Inconsistencies**:
    - Remove stacked overline subtitles in `SkillsSection` and `WorkSection`.
    - Standardize font size, font family (`font-display`), font weight (`font-normal`), and tracking (`tracking-tight`) across all 5 sections.
- **MSc Card Efficiency**:
  - Exact Title: `MSc, Biological Sciences (Ecology)` (removed redundant "Master of Science - ")
  - Exact Dates: `2026 – 2027`
  - Institution Meta: `UKZN Westville • Ecological Modelling` (purged SAMBAR references)
  - Honours Link: Fixed dead-end link to `/projects/thesis`
  - UK English throughout (no em dashes)
- **Background Color (Pure White Across Whole Site)**:
  - Swap the entire canvas to **crisp, clean pure white (`#ffffff`)**.
  - Ensure 100% text legibility with high-contrast slate typography (`#0f172a` headings, `#475569` body/meta).
- **Card Depth Without AI Slop**:
  - No colored gradient top bars or neon rings.
  - Authentic Apple/Stripe depth: pure white card enclosures, multi-tier soft ambient shadows, subtle 1px border (`border-slate-200/80`), tactile pills.

---

## 2. Checkable Implementation Plan

### Phase 1: Pure White Palette & Legibility Audit
- [x] Clean up `src/index.css`:
  - Enforce `--background: 0 0% 100%` (pure white `#ffffff`) and `--foreground: 222 47% 11%` (deep slate `#0f172a`).
  - Clean `.nav-glass` from warm beige to pure white frosted glass `rgba(255, 255, 255, 0.88)`.
  - Update `.gradient-text` to crisp slate-900 to emerald.
- [x] Audit sections for hardcoded beige backgrounds:
  - `src/components/sections/WorkSection.tsx`: Removed `bg-secondary/20`, set to `bg-background`.
  - `src/components/sections/EducationSection.tsx`: Verified clean white background.
  - `src/components/sections/SkillsSection.tsx`: Verified clean white background.

### Phase 2: Restrained Apple-Grade Depth (No AI Slop Rings)
- [x] **SkillsSection (`src/components/sections/SkillsSection.tsx`)**:
  - Stripped out all colored gradient top bars and neon rings.
  - Applied neutral pure-white cards with layered ambient shadows (`shadow-[0_1px_3px_rgba(0,0,0,0.04),0_8px_24px_-4px_rgba(0,0,0,0.03)]`).
  - Implemented monochrome icon wells (`bg-slate-100 text-slate-800`).
  - Added tactile white skill badges.
- [x] **EducationSection (`src/components/sections/EducationSection.tsx`)**:
  - Encapsulated each education item in the same unified card container (`p-3 rounded-2xl bg-card border border-border/70 hover:shadow-lg`) matching Research & Fieldwork cards.
  - Added full-card zero-friction click link (`Link`) to corresponding article/project detail.
- [x] **WorkSection (`src/components/sections/WorkSection.tsx`)**:
  - Upgraded to pure white cards with layered shadows, neutral year badge, and hover depth.

### Phase 3: Exact MSc Verification & Dates Synchronization
- [x] Update **`src/components/sections/EducationSection.tsx`**:
  - Degree: `Master of Science - MSc, Biological Sciences (Ecology)`
  - Badge: `2026 – 2027`
  - Meta: `UKZN Westville • SAMBAR Programme`
  - No paragraph description added.
  - No LinkedIn link added.
  - Honours Degree Badge: Verified and set to `2025`.
- [x] Update **`src/pages/MscDetail.tsx`**:
  - Updated campus meta to `UKZN Westville Campus (2026 – 2027)`.

### Phase 4: Jakob's Law Section Header Standardization (COMPLETED)
- [x] **SkillsSection (`src/components/sections/SkillsSection.tsx`)**:
  - Standardized section padding to `py-6 md:py-8`.
  - Changed header container to `flex items-baseline justify-between mb-3 md:mb-4`.
  - Removed stacked `<span className="... block mb-1">Capabilities & Apparatus</span>`.
  - Rendered unified title group: `<div className="flex items-center gap-3"><h2 className="font-display text-2xl md:text-3xl text-primary font-normal tracking-tight">Technical Skills</h2><span className="hidden sm:inline-block text-[11px] font-mono text-muted-foreground/70">Capabilities & Apparatus</span></div>`.
  - Right label: `<span className="text-xs text-muted-foreground font-mono">Core Competencies</span>`.
- [x] **WorkSection (`src/components/sections/WorkSection.tsx`)**:
  - Standardized section padding to `py-6 md:py-8`.
  - Changed header container to `flex items-baseline justify-between mb-3 md:mb-4`.
  - Removed stacked `<span className="... block mb-1">Experience & Roles</span>`.
  - Rendered unified title group: `<div className="flex items-center gap-3"><h2 className="font-display text-2xl md:text-3xl text-primary font-normal tracking-tight">Work Experience</h2><span className="hidden sm:inline-block text-[11px] font-mono text-muted-foreground/70">Professional Roles</span></div>`.
  - Right label: `<span className="text-xs text-muted-foreground font-mono">Roles & Leadership</span>`.
- [x] **EducationSection (`src/components/sections/EducationSection.tsx`)**:
  - Ensured title group matches: `<div className="flex items-center gap-3"><h2 className="font-display text-2xl md:text-3xl text-primary font-normal tracking-tight">Education</h2><span className="hidden sm:inline-block text-[11px] font-mono text-muted-foreground/70">Academic Background</span></div>`.
  - Right label: `<span className="text-xs text-muted-foreground font-mono">UKZN & Wits</span>`.
- [x] Audited `ResearchSection.tsx` and `ProjectsSection.tsx` to verify complete 1-to-1 parity across all 5 sections.

### Phase 5: Verification & Zero-Friction Test (COMPLETED)
- [x] Run `npx tsc --noEmit` and confirm 0 TypeScript errors.
- [x] Validated alignment, visual rhythm, font consistency, and legible high-contrast styling across all sections.

### Phase 6: Jony Ive Color Language & Chromatic Vitality (COMPLETED)
- [x] **SkillsSection (`src/components/sections/SkillsSection.tsx`)**:
  - Replaced generic monochrome icon wells with domain-specific, luminous scientific tints:
    - Modelling & GIS: Pale Alpine Teal (`bg-teal-50 text-teal-700 border-teal-200/70`).
    - Laboratory Science: Pale Botanical Emerald (`bg-emerald-50 text-emerald-700 border-emerald-200/70`).
    - Biostatistics & Data: Pale Telemetry Sapphire (`bg-sky-50 text-sky-700 border-sky-200/70`).
    - Field Ecology: Pale Sage/Amber (`bg-amber-50 text-amber-800 border-amber-200/70`).
  - Added specular hover border catches (`hover:border-teal-300/80`, `hover:border-emerald-300/80`, etc.).
  - Tactile skill pills: Added subtle hover catch-light and active feedback.
- [x] **EducationSection (`src/components/sections/EducationSection.tsx`)**:
  - Active MSc research badge: Rich botanical emerald (`bg-emerald-600 text-white shadow-xs`) with living pulsing dot.
  - Merit Award badge: Soft gold/amber botanical well (`bg-amber-50 text-amber-800 border-amber-200/60`).
- [x] **WorkSection (`src/components/sections/WorkSection.tsx`)**:
  - Highlight tags: Domain-specific soft tints:
    - "Employee of the Year 2023": Soft amber award badge (`bg-amber-50 text-amber-800 border-amber-200/80`).
    - "Presented to Regional Head": Analytical sky badge (`bg-sky-50 text-sky-800 border-sky-200/80`).
    - "Brand growth": Botanical emerald badge (`bg-emerald-50 text-emerald-800 border-emerald-200/80`).
- [x] **Static Verification**:
  - Ran `npx tsc --noEmit` and confirmed 0 errors.

### Phase 7: Complete SAMBAR Purge, Honours Link Fix & MSc Efficiency (COMPLETED)
- [x] **Purge All SAMBAR References**:
  - `src/components/sections/EducationSection.tsx`: Replaced with `UKZN Westville • Ecological Modelling`.
  - `src/data/researchData.ts`: Replaced subtitle with `Maloti-Drakensberg • Predictive Ecology MSc` and removed SAMBAR mentions from `fullStory`.
  - `src/pages/MscDetail.tsx`: Replaced all 4 occurrences with neutral, rigorous ecological terminology (`20-Year Longitudinal Dataset`, `MSc Research • Predictive Ecology`, `Standardised elevational pitfall-trap time series`, and `20-year longitudinal transect data`).
  - Confirmed 0 matches for SAMBAR in codebase.
- [x] **Honours Card Dead-End Resolution**:
  - Fixed Honours card link in `EducationSection.tsx` from invalid non-existent path to `/projects/thesis`.
  - Verified routing to `ThesisDetail.tsx` (nutrient-fortified bread research with termite and mopane worm meals).
- [x] **MSc Card Efficiency**:
  - Changed title in `EducationSection.tsx` from `Master of Science - MSc, Biological Sciences (Ecology)` to concise `MSc, Biological Sciences (Ecology)`.
- [x] **UK English & Typographic Standards**:
  - Replaced em dashes (`—`) with spaced en dashes (` – `).
  - Harmonised UK spellings (`behavioural`, `specialising`, `modelling`, `analysed`, `utilised`, `visualisation`, `neighbourhoods`, `programme`).
