# Critical App Review Report

## Review Checklist
The following steps were taken to systematically review the application:
1.  **Landing Page Verification**: Verified hero section load, animations, and text clarity.
2.  **Navigation Bar**: Checked all links, hover states, and active states.
3.  **Mobile Responsiveness**: Resized window to mobile width; checked hamburger menu functionality and layout.
4.  **Education Section**: Reviewed content for clarity, alignment, card symmetry, and styling.
5.  **Skills Section**: Verified skill cards, icons, and bullet styling.
6.  **Projects Section (Home)**: Checked grid layout, image loading, and card interactivity.
7.  **Projects Subpage**: Verified navigation to full projects list, layout consistency, and deep linking.
8.  **Experience/Timeline**: Checked formatting, dates, readability metrics, and font consistency.
9.  **Contact Section**: Verified functionality (mailto vs form) and layout.
10. **Footer**: Checked copyright date, content density, and link visibility.
11. **General Aesthetics**: Audited for global glow effects, font consistency (serif vs sans-serif), and scrollbar styling.

---

## Detailed Findings

### Landing Page
- **Status:** accessible

**Findings:**
| # | UI Element | Issue Description | Severity | Suggested Fix |
|---|------------|-------------------|----------|---------------|
| 1 | Hero Image | The background portrait of Andiswa Masuku is noticeably blurry and lacks high-definition clarity. | Major | Replace with a high-resolution professional portrait. |
| 2 | Hero Text | The "Turning indigenous insects" highlight uses a color that feels disconnected from the rest of the dark palette. | Minor | Adjust the green accent to be more vibrant or consistent with the primary brand color. |
| 3 | Availability Badge | The "Available for opportunities" text at the bottom left is too small and lacks sufficient contrast against the background. | Minor | Increase font size and use a brighter color or a pill-shaped background. |
| 4 | CTA Buttons | The "Get in Touch" and "LinkedIn" buttons have different border treatments and widths, creating visual asymmetry. | Major | Harmonize button styles; ensure consistent padding and border-width. |

*Brief note on what works well:* The typing animation for the "scientific research" text is smooth and engaging.

### Navigation
- **Status:** Accessible

**Findings:**
| # | UI Element | Issue Description | Severity | Suggested Fix |
|---|------------|-------------------|----------|---------------|
| 1 | Nav Links | Navigation links are too closely packed together in the desktop header. | Minor | Increase the `gap` between navigation items. |
| 2 | Active State | There is no clear visual indicator for which section is currently active in the navigation bar. | Major | Add an underline or color change for the active navigation link. |
| 3 | Home link (Projects Page) | The "Home" link on the projects subpage has an unrefined arrow icon that looks outdated. | Minor | Use a modern SVG icon library (like Lucide) for the back arrow. |

*Brief note on what works well:* The sticky header remains functional and maintains transparency levels well.

### Mobile Responsiveness
- **Status:** Accessible

**Findings:**
| # | UI Element | Issue Description | Severity | Suggested Fix |
|---|------------|-------------------|----------|---------------|
| 1 | Mobile Menu | The mobile menu overlay lacks a proper label or title, appearing quite sparse. | Minor | Add a "Menu" heading or a logo inside the overlay. |
| 2 | Mobile Menu Spacing | The vertical spacing between items in the mobile menu is excessive, requiring unnecessary focus. | Minor | Reduce the line height/spacing between menu items. |
| 3 | LinkedIn Link (Mobile) | The LinkedIn link in the mobile menu is extremely small and difficult to tap (bad touch target). | Major | Increase the touch target size or use a larger button style. |

*Brief note on what works well:* The hamburger menu transition is snappy and responsive.

### Education
- **Status:** Accessible

**Findings:**
| # | UI Element | Issue Description | Severity | Suggested Fix |
|---|------------|-------------------|----------|---------------|
| 1 | Education Cards | The cards are unnecessarily large, resulting in excessive white space for very little content. | Minor | Use a more compact grid or reduce the minimum height of the cards. |
| 2 | Alignment | "University of the Witwatersrand" and "University of KwaZulu-Natal" titles are floating with inconsistent padding relative to their subtexts. | Major | Ensure all text within cards follows a strict alignment grid. |
| 3 | Card Asymmetry | The left card lacks a "Certificate of Merit" subtext that the right card has, making the layout feel unbalanced. | Minor | Standardize the content structure across all education cards. |

*Brief note on what works well:* The use of distinct university logos/icons helps with quick identification.

### Skills
- **Status:** Accessible

**Findings:**
| # | UI Element | Issue Description | Severity | Suggested Fix |
|---|------------|-------------------|----------|---------------|
| 1 | Skill Icons | The icons at the top of the skill cards are too small compared to the card header size. | Minor | Increase icon size by at least 25%. |
| 2 | Content Clarity | "Antigravity" listed under tech skills is likely a joke (Python easter egg) but looks confusing and unprofessional in a serious portfolio. | Minor | Replace with a legitimate tool or clarify the context. |
| 3 | Bullet Points | Plain dots for bullet points feel "stock" and lack character. | Minor | Use custom icons or styled checkmarks for skill lists. |

*Brief note on what works well:* Categorization into "Expertise", "Technical", and "Tools" is logical.

### Projects & Research (Homepage)
- **Status:** Accessible

**Findings:**
| # | UI Element | Issue Description | Severity | Suggested Fix |
|---|------------|-------------------|----------|---------------|
| 1 | Browse Button | The "Browse All Projects" button at the top of the section appears to be floating without a clear container or heading. | Major | Integrate the button into the section header or a dedicated footer for that section. |
| 2 | Project Cards | The project cards on the homepage are not clickable, which is counterintuitive. | Major | Make the entire card or the project title a link to the details page. |
| 3 | Tag Overload | Some cards have too many tags, causing them to wrap awkwardly and stretch card heights. | Minor | Limit tags to a maximum of 3 per card on the homepage. |

*Brief note on what works well:* The preview images for the projects are well-chosen and illustrative.

### Projects (Subpage)
- **Status:** Accessible

**Findings:**
| # | UI Element | Issue Description | Severity | Suggested Fix |
|---|------------|-------------------|----------|---------------|
| 1 | Decorative Line | The green horizontal line next to "Fieldwork Projects" looks like a CSS glitch or an unfinished design element. | Major | Remove the line or replace it with a more intentional section divider. |
| 2 | Card Heights | Grid items have uneven heights due to varying descriptions lengths, breaking the visual rhythm. | Major | Implement a uniform card height or use `clamp` for text descriptions. |
| 3 | Subtext Color | "Wits University" text next to the header is too faint and hard to read. | Critical | Increase the color contrast to meet WCAG accessibility standards. |

*Brief note on what works well:* The "Academic Journey" breadcrumb path is helpful for navigation.

### Experience
- **Status:** Accessible

**Findings:**
| # | UI Element | Issue Description | Severity | Suggested Fix |
|---|------------|-------------------|----------|---------------|
| 1 | Section Header | The font choice for "Building Character" is a serif font that clashes with the sans-serif headers used elsewhere. | Major | Maintain font consistency across all section headers. |
| 2 | Description Length | Work descriptions are very brief and lack specific achievements or metrics. | Minor | Expand on the "Impact" of each role to demonstrate value. |
| 3 | Date Format | Date ranges are inconsistent in format (e.g., "Aug 2022 - Aug 2023" vs just years). | Minor | Standardize date formatting across all entries. |

*Brief note on what works well:* The separation of "Corporate Experience" from "Academic Work" shows a well-rounded background.

### Contact
- **Status:** Accessible

**Findings:**
| # | UI Element | Issue Description | Severity | Suggested Fix |
|---|------------|-------------------|----------|---------------|
| 1 | Contact Method | There is no contact form, only a 'mailto' link which is a lazy implementation for a professional site. | Major | Integrate a simple contact form with validation. |
| 2 | Social Link Size | The LinkedIn button in the footer is too small and easy to miss. | Minor | Increase social button prominence. |

*Brief note on what works well:* The "Get in Touch" button is very clear and easy to find.

### Footer
- **Status:** Accessible

**Findings:**
| # | UI Element | Issue Description | Severity | Suggested Fix |
|---|------------|-------------------|----------|---------------|
| 1 | Copyright Date | The footer says "© 2026", which is in the future and suggests a hardcoded value that hasn't been updated. | Major | Set the copyright date dynamically or change to the current year. |
| 2 | Content Density | The footer is extremely sparse and feels like an afterthought. | Minor | Add a mini-sitemap or secondary navigation links. |

*Brief note on what works well:* The clean, minimal layout prevents the bottom of the page from feeling cluttered.

### General Aesthetics
- **Status:** Accessible

**Findings:**
| # | UI Element | Issue Description | Severity | Suggested Fix |
|---|------------|-------------------|----------|---------------|
| 1 | Viewport Glow | There is a thick, blue glowing border around the entire viewport that is extremely distracting and looks like a UI bug. | Critical | Remove the global box-shadow/glow effect from the main container. |
| 2 | Font Inconsistency | Mixing Serif and Sans-Serif fonts for headers in different sections (Education vs Experience) creates a disjointed look. | Major | Choose one header style and apply it globally. |
| 3 | Scrollbar | Standard browser scrollbar is used, which looks clunky against the sleek dark theme. | Minor | Implement a custom themed scrollbar. |

*Brief note on what works well:* The dark theme itself is well-balanced and easy on the eyes.
