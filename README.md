# Lucky Answer Group — Website Project

## Project Title
**Lucky Answer Group** — Electrical & Fibre (FTTH) Installation and Maintenance Website
PoE for WEDE5020: Web Development (Introduction)

## Student Information
- **Name:** Mamphaeng Emmah Moela
- **Student Number:** ST10528265
- **Module:** WEDE5020 — Web Development (Introduction)
- **Institution:** The Independent Institute of Education (IIE)
- **Year:** 2026

## Project Overview
Lucky Answer Group is a Gauteng-based small business offering electrical
installation work alongside Fibre-to-the-Home (FTTH) installation and
maintenance services to residential estates, complexes, developers and small
commercial clients. This repository contains the PoE website built for Lucky
Answer Group across three parts:

- **Part 1:** Project planning, sitemap, file/folder structure, and static
  HTML page structure with content.
- **Part 2 (current):** CSS styling — external stylesheet, typography,
  CSS Grid/Flexbox layout, colour scheme, pseudo-classes, and full
  responsive design with media queries.
- **Part 3 (future):** JavaScript functionality — form validation,
  interactive behaviour, and dynamic content.

## Website Goals and Objectives
- Generate qualified online quote requests instead of relying solely on
  word-of-mouth phone calls.
- Build client trust by showcasing certifications, licensing and completed
  projects.
- Reduce enquiry response time through a structured online quote-request
  form.

**Key Performance Indicators (KPIs):** quote-form submissions, click-to-call
rate, average time on the Services page, returning-visitor rate.

## Key Features and Functionality
- Homepage with hero banner, service highlights and a "Recent Work" photo
  gallery
- About Us page detailing company history, mission, vision and certifications
- Services page covering electrical installations, FTTH installation and
  maintenance contracts, each with an introductory overview
- Online quote-request (enquiry) form
- Contact page with two branch locations (Pretoria and Johannesburg) and a
  contact form
- Consistent, sticky header navigation with active-page and hover states
- Fully responsive layout (desktop, tablet, mobile) with a pure-CSS
  hamburger menu on small screens

## Timeline and Milestones

| Phase / Weeks | Milestone | Deliverable |
|---|---|---|
| Weeks 1-2 | Planning, target-audience research, content & asset gathering | Approved Website Project Proposal |
| Weeks 3-4 | File/folder structure, sitemap, HTML page structure & navigation | Part 1 submission (HTML skeleton + GitHub repo) |
| Weeks 5-7 | CSS styling, responsive layout, SEO basics | **Part 2 submission (current)** |
| Weeks 8-10 | JavaScript functionality, cross-browser testing, final polish | Part 3 submission (final website) |

## Part 1 Details

### Sitemap
See `documents/sitemap.png` for the full visual sitemap. Structure summary:

### File and Folder Structure

## Part 2 Details

### 1. Working Through Feedback from Part 1
Part 1 was marked at **95/100 (Level 4 overall)**. Formal lecturer feedback
was released via the rubric and is addressed below (also recorded in the
Changelog):

- **Wireframes (1/2 — "incomplete or lack detail"):** the Website Project
  Proposal only included one low-fidelity wireframe, for the homepage.
  Additional low-fidelity wireframes for `about.html`, `services.html`,
  `contact.html` and `enquiry.html` have been created and added to
  `documents/wireframe-about.png`, `wireframe-services.png`,
  `wireframe-contact.png` and `wireframe-enquiry.png`, so every page's
  layout was planned before Part 2 styling began, not just the homepage.
- **Content research and sourcing (7/10 — "relevant and mostly complete,
  could be more comprehensive"):** the three portfolio images gathered in
  Part 1 (`images/portfolio-1.jpg` to `-3.jpg`) had been sourced but were
  never actually placed on the website. A "Recent Work" gallery section
  has been added to `index.html` using all three images with descriptive
  captions and alt text, so previously-gathered content is now fully
  integrated rather than sitting unused in the images folder.
- **Sufficient content added to the website (4/5 — "content is sufficient
  but may lack depth or detail"):** each of the three service blocks on
  `services.html` (Electrical, FTTH, Maintenance) now opens with a short
  introductory paragraph before its bullet list, giving visitors more
  context per service rather than bullet points alone. The new "Recent
  Work" gallery on the homepage also adds further real content depth.
- Additional self-review items already actioned before Part 1 marking
  (skip-link, favicon, working nav toggle, cleaned-up hero image) remain
  in place from the original submission.

### 2. CSS Styling for Desktop Solution

**External stylesheet:** a single `css/style.css` is linked from all five
HTML pages (consistent naming, one shared file — no per-page stylesheets).

**Base styles:** a minimal CSS reset (`* { box-sizing: border-box; margin:
0; padding: 0; }`) plus root-level defaults for font family, font size,
line-height and colour are set on `body`, so every page starts from the
same baseline regardless of browser defaults.

**Typography:** headings use "Poppins" (bold, tighter letter-spacing) and
body text uses "Inter", loaded via Google Fonts. A `clamp()`-based type
scale (`--fs-h1`, `--fs-h2`) lets headings scale fluidly between mobile and
desktop without needing separate breakpoint overrides for font size alone.

**Layout:** CSS Grid is used for the hero (text layered over the banner
image via `grid-template-areas`), the service-card grid, the About page's
mission/vision columns, and the Services page's icon+text rows. Flexbox is
used for one-dimensional alignment: the header (logo left, nav right), nav
lists, and form layout.

**Cascading:** colours, spacing and font values are defined once as CSS
custom properties (`:root { --color-navy: ...; --space-md: ...; }`) and
referenced everywhere else, so the whole site's look can be changed by
editing a handful of variables rather than repeating values across
selectors — a direct use of the "cascading" part of CSS.

**Visual styling:** `border`, `border-radius`, `box-shadow` and
`background-color` are used throughout (cards, forms, CTA bands,
fieldsets). Pseudo-classes `:hover`, `:focus` and `:active` are applied to
navigation links, buttons, form inputs and cards for clear interactive
feedback (e.g. cards lift and gain a shadow on hover; form fields get an
amber focus ring; the submit button darkens on hover and depresses on
click).

### 3. Responsive Design

**Breakpoints:**
- Desktop: default styles (> 1024px)
- Tablet: `@media (max-width: 1024px)` — card grid drops from 3 to 2
  columns, About/Contact two-column grids collapse to one column
- Mobile: `@media (max-width: 600px)` — single-column layout throughout,
  hamburger navigation menu replaces the inline nav list

**Relative units:** `rem` is used for spacing and font sizes throughout
(via the `--space-*` and `--fs-*` custom properties), `%`/`fr` units size
grid columns, and `clamp()` is used for hero text and heading sizes so
they scale smoothly between the defined minimum and maximum rather than
jumping at each breakpoint.

**Responsive images:** all images use `max-width: 100%; height: auto;`
(set globally on `img` in the reset) so nothing overflows its container.
In addition, the homepage hero banner — the largest single image on the
site — uses `srcset`/`sizes` to serve a 800px, 1200px or 1600px-wide JPG
depending on the viewport, rather than always downloading the full
1600px version on a phone (see `images/hero-banner-800.jpg`,
`-1200.jpg`, `-1600.jpg`).

**Navigation menu on mobile:** implemented as a pure-CSS checkbox/label
"hamburger" pattern (no JavaScript) — a hidden checkbox toggles
`max-height` on the nav list via the `:checked` pseudo-class and the
general sibling combinator. This was chosen deliberately for Part 2 so the
mobile menu is genuinely functional now, rather than sitting inert until
JavaScript is introduced in Part 3.

**Typography adjustment:** headings already scale fluidly via `clamp()`,
and the mobile breakpoint additionally reduces base body copy to
`0.9375rem` with a slightly taller `line-height` (1.7) so paragraphs stay
easy to read on small screens without needing to scroll excessively.

**Test and iterate:** every page was tested at three viewport widths using
real Chrome (1440px desktop, 768px tablet, 390px mobile) via an automated
Puppeteer script, plus a dedicated check that the mobile hamburger menu
opens correctly. Screenshot evidence for all five pages is saved in
`documents/responsive-testing/`:

| File | Shows |
|---|---|
| `homepage-desktop-1440px.png` | Homepage at desktop width — 3-column card grid |
| `homepage-tablet-768px.png` | Homepage at tablet width — 2-column card grid |
| `homepage-mobile-390px.png` | Homepage at mobile width — single column, hamburger icon |
| `homepage-mobile-nav-open.png` | Mobile menu expanded via the CSS checkbox toggle |
| `about-desktop.png` / `about-mobile.png` | About page at both widths |
| `services-desktop.png` / `services-mobile.png` | Services page at both widths |
| `contact-desktop.png` / `contact-mobile.png` | Contact page at both widths |
| `enquiry-desktop.png` / `enquiry-mobile.png` | Enquiry page at both widths |

During testing, one real issue was caught and fixed: the original hero
banner image had the headline baked into the JPG as raster text, which
duplicated the real HTML `<h1>` overlaid on top of it. The image was
regenerated as a purely decorative background (see Changelog).

## Changelog

| Date | Change |
|---|---|
| 2026-08-13 | Repository initialised; project scaffolding created |
| 2026-08-13 | Website Project Proposal completed and approved (Lucky Answer Group selected) |
| 2026-08-13 | Sitemap and file/folder structure created |
| 2026-08-13 | Placeholder brand assets created (logo, hero banner, service icons, certification badge, portfolio images) |
| 2026-08-13 | index.html, about.html, services.html, enquiry.html and contact.html built with semantic HTML5 structure and content |
| 2026-08-13 | README.md created with full Part 1 documentation |
| 2026-08-30 | Self-review QA pass on Part 1 (no formal feedback released yet): added skip-link, favicon, replaced non-functional nav-toggle button with working pure-CSS checkbox toggle |
| 2026-08-30 | Regenerated hero-banner.jpg to remove duplicated baked-in text; headline now renders as real HTML over the image |
| 2026-08-30 | Built full external stylesheet (css/style.css): CSS reset, custom-property colour/spacing/type scale, Google Fonts typography, CSS Grid + Flexbox layout, card/form/button components, hover/focus/active pseudo-class states |
| 2026-08-30 | Implemented responsive design: tablet (1024px) and mobile (600px) breakpoints, relative units throughout, responsive images, pure-CSS mobile hamburger navigation |
| 2026-08-30 | Cross-device testing performed (desktop/tablet/mobile) with screenshot evidence saved to documents/responsive-testing/; bug found and fixed during testing (duplicated hero text) |
| 2026-08-30 | README.md updated with full Part 2 documentation, changelog and references |
| 2026-09-13 | Part 1 formal feedback received (95/100, Level 4 overall). Addressed the three point-losing items: added wireframes for about/services/contact/enquiry pages (`documents/wireframe-*.png`); added a "Recent Work" portfolio gallery to index.html using the previously-unused portfolio images; added introductory paragraphs to each service block on services.html for extra content depth |
| 2026-09-13 | Pre-submission polish: added student number to README; generated 800/1200/1600px versions of the hero banner and added `srcset`/`sizes` to index.html for responsive image loading; added an explicit mobile typography adjustment (base font-size and line-height) in the 600px breakpoint; added portfolio-grid responsive styling (3 → 2 → 1 columns) |

## References
- LeadServices, 2026. Fiber optic installation for business in South Africa. [online] Available at: <https://leadservices.co.za/blog/fiber-optic-installation-for-business/> [Accessed 13 August 2026].
- Nielsen Norman Group (Whitenton, K.), 2020. Navigation menus: 5 tips to make them visible. [video] Available at: <https://www.nngroup.com/videos/navigation-menu-visibility/> [Accessed 13 August 2026].
- Small Businesses South Africa, 2026. Why every small business needs a website. [online] Available at: <https://smallbusinesses.co.za/why-small-business-needs-a-website/> [Accessed 13 August 2026].
- Priority One, 2026. Considerations for a small business website. [online] Available at: <https://priorityone.co.za/considerations-for-a-small-business-website/> [Accessed 13 August 2026].
- Mozilla Developer Network (MDN), 2026. CSS Grid Layout. [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout> [Accessed 30 August 2026].
- Mozilla Developer Network (MDN), 2026. Using CSS custom properties (variables). [online] Available at: <https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties> [Accessed 30 August 2026].
- Google Fonts, 2026. Poppins and Inter font families. [online] Available at: <https://fonts.google.com/> [Accessed 30 August 2026].

See `content-research/text/sources.md` and `content-research/images/image-credits.md`
for content- and image-specific sourcing notes.