# Exhaustive App Audit & Strategy Review
**Auditor Persona:** Dissatisfied $100k Investor
**Status:** COMPLETE (High Severity Issues Identified)

---

## Executive Summary
This application, while aesthetically pleasing on the surface, suffers from profound inconsistencies in branding, navigation logic, and interaction design. For an investment of $100k, the lack of professional logo design, redundant clicks, and visual "hacks" in the header are unacceptable. Significant refactoring is required to reach a "premium" standard.

---

### Home Page
- **Status:** Accessible

**Findings:**
| # | UI Element | Issue Description | Severity | Suggested Fix |
|---|------------|------------------|----------|---------------|
| 1 | Logo ("AM") | The branding is amateurish. "AM" in plain text does not represent a high-value personal brand. | Major | Implement a professionally designed vector logo or high-end typography. |
| 2 | Hero Image | The hero image is duplicated in the DOM for mobile and desktop views, increasing asset load unnecessarily. | Minor | Use a single image component with responsive CSS or `srcset`. |
| 3 | Navigation Links | The link `/#research` points to a non-existent ID on the landing page (section ID is actually `research`, but it's redundant with `Projects`). | Major | Audit and sync all internal anchor IDs with navigation labels. |
| 4 | Work Section Title | Heading "Building Character" is informal and diminishes the academic/professional tone established earlier. | Minor | Rename to "Professional Experience" or "Career Highlights". |
| 5 | Work Interaction | Clicking a card opens a dialog that adds only one sentence of text. This is an unnecessary click/interaction flow. | Major | Integrate descriptions directly into cards or use a more information-rich modal. |
| 6 | Work Modal Text | The description text is justified (`text-justify`), creating awkward whitespace gaps ("rivers") on mobile. | Minor | Use default left-aligned text for better readability. |
| 7 | Sticky Header | The 500ms transition for the header background change feels sluggish and unresponsive. | Minor | Reduce transition duration to 200-300ms for a snappier feel. |
| 8 | Footer Branding | Ad-hoc HSL color (`hsl(168,65%,65%)`) is used in the footer instead of the design system's variables. | Minor | Use `--accent` or a dedicated variable in `index.css`. |
| 9 | Contact Info | The email address is listed twice in close proximity (CTA and footer text). | Minor | Remove one instance to reduce redundancy. |

**What Works Well:**
- The color palette is sophisticated and scientific.
- The "Available for opportunities" indicator adds a nice interactive pulse.

---

### Projects
- **Status:** Accessible

**Findings:**
| # | UI Element | Issue Description | Severity | Suggested Fix |
|---|------------|------------------|----------|---------------|
| 1 | Header Branding | The header on this page is a detached "lite" version of the Home header. The branding consistency is broken. | Critical | Extend the `Navigation` component to be universal across all pages. |
| 2 | Project Tags | Skills tags use `bg-secondary` and plain text, losing the premium look of the `skill-tag` component used on Home. | Major | Standardize the `skill-tag` component styling globally. |
| 3 | Asset Structure | Images are pulled from both `/src/assets` and `/public/images`. This is unorganized and unprofessional. | Minor | Consolidate all image assets into the `@/assets` folder. |
| 4 | Header Centering | A dummy `div` with `w-16` is used to hack-center the "Projects" title. This is fragile CSS. | Major | Use Flexbox/Grid centering properties instead of manual spacers. |
| 5 | Section Design | The "Fieldwork Projects" `h2` introduces a horizontal line element not seen anywhere else in the app. | Minor | Consolidate heading styles to maintain a single design language. |

**What Works Well:**
- The grid layout is clean and handles 3 columns well on desktop.
- High-quality imagery for the "Movement Ecology" and "Marine Conservation" projects.

---

### Honours Research (Thesis Detail)
- **Status:** Accessible

**Findings:**
| # | UI Element | Issue Description | Severity | Suggested Fix |
|---|------------|------------------|----------|---------------|
| 1 | Methodology Section | The page uses two large cards followed by four smaller cards for methodology. This is redundant and confusing to follow. | Critical | Choose one consistent layout (e.g., a 4-card grid) to present methodology steps. |
| 2 | Problem/Solution | The visual structure for "The Problem" and "The Solution" is identical, making the page feel repetitive. | Major | Use contrasting layouts (e.g., icons on opposite sides) to differentiate these sections. |
| 3 | Header Centering | Another centering hack (`w-24`) is used in the header, inconsistent even with the Projects page. | Major | Refactor the global `Navigation` to handle sub-page headers properly. |
| 4 | Typography | The `h1` uses "Insect Protein Fortification" but the label above says "Honours Thesis • UKZN 2025". The hierarchy is slightly muddled. | Minor | Increase contrast between the label and the main headline. |

**What Works Well:**
- The "Core Discovery" card with the pulse animation successfully highlights the key research result.
- "Why This Matters" section provides excellent context for laypeople.

---

## Final Audit Verdict
The application has a strong "vibe" but fails the "perfection" test required for a high-stakes investment. The **Primary Recommendation** is a global refactor of the Navigation component and a standardization of UI building blocks (tags, buttons, headers) across all pages.
