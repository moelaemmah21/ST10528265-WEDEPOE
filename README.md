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

- **Part 1 (current):** Project planning, sitemap, file/folder structure, and
  static HTML page structure with content.
- **Part 2 (future):** CSS styling — responsive layout, colour scheme,
  typography, SEO basics.
- **Part 3 (future):** JavaScript functionality — form validation, interactive
  navigation, and dynamic behaviour.

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
- Homepage with hero banner and service highlights
- About Us page detailing company history, mission, vision and certifications
- Services page covering electrical installations, FTTH installation and
  maintenance contracts
- Online quote-request (enquiry) form
- Contact page with two branch locations (Pretoria and Johannesburg) and a
  contact form
- Consistent header/footer navigation across all pages

## Timeline and Milestones

| Phase / Weeks | Milestone | Deliverable |
|---|---|---|
| Weeks 1-2 | Planning, target-audience research, content & asset gathering | Approved Website Project Proposal |
| Weeks 3-4 | File/folder structure, sitemap, HTML page structure & navigation | **Part 1 submission** (HTML skeleton + GitHub repo) |
| Weeks 5-7 | CSS styling, responsive layout, SEO basics | Part 2 submission |
| Weeks 8-10 | JavaScript functionality, cross-browser testing, final polish | Part 3 submission (final website) |

## Part 1 Details

### Sitemap
See `documents/sitemap.png` for the full visual sitemap. Structure summary:

```
index.html (Homepage)
├── about.html (About Us — incl. #certifications)
├── services.html (Services)
│   ├── #electrical  – Electrical Installations & Fault-Finding
│   ├── #ftth         – FTTH Installation
│   └── #maintenance  – Maintenance Contracts
├── enquiry.html (Get a Quote)
└── contact.html (Contact — Pretoria & Johannesburg branches)
```

### File and Folder Structure
```
lucky-answer-group/
├── index.html
├── about.html
├── services.html
├── enquiry.html
├── contact.html
├── README.md
├── css/
│   └── style.css          (placeholder — full styling in Part 2)
├── js/
│   └── main.js             (placeholder — functionality in Part 3)
├── images/
│   ├── logo.png
│   ├── hero-banner.jpg
│   ├── icon-electrical.png
│   ├── icon-fibre.png
│   ├── icon-maintenance.png
│   ├── badge-certified.png
│   └── portfolio-1.jpg / portfolio-2.jpg / portfolio-3.jpg
├── documents/
│   └── sitemap.png
└── content-research/
    ├── text/
    │   └── sources.md
    └── images/
        └── image-credits.md
```

### HTML Structure Notes
- All five pages use semantic HTML5 elements (`<header>`, `<nav>`, `<main>`,
  `<section>`, `<article>`, `<footer>`).
- Navigation is identical across all pages and uses relative links between
  the five pages.
- Forms (`enquiry.html`, `contact.html`) use semantic `<form>`, `<fieldset>`,
  `<label>` and appropriate `input` types; submission logic and validation
  will be added in Part 3.
- Code is commented throughout to explain each major section.

## Changelog

| Date | Change |
|---|---|
| 2026-08-13 | Repository initialised; project scaffolding created |
| 2026-08-13 | Website Project Proposal completed and approved (Lucky Answer Group selected) |
| 2026-08-13 | Sitemap and file/folder structure created |
| 2026-08-13 | Placeholder brand assets created (logo, hero banner, service icons, certification badge, portfolio images) |
| 2026-08-13 | index.html, about.html, services.html, enquiry.html and contact.html built with semantic HTML5 structure and content |
| 2026-08-13 | README.md created with full Part 1 documentation |

## References
- LeadServices, 2026. Fiber optic installation for business in South Africa. [online] Available at: <https://leadservices.co.za/blog/fiber-optic-installation-for-business/> [Accessed 13 August 2026].
- Nielsen Norman Group (Whitenton, K.), 2020. Navigation menus: 5 tips to make them visible. [video] Available at: <https://www.nngroup.com/videos/navigation-menu-visibility/> [Accessed 13 August 2026].
- Small Businesses South Africa, 2026. Why every small business needs a website. [online] Available at: <https://smallbusinesses.co.za/why-small-business-needs-a-website/> [Accessed 13 August 2026].
- Priority One, 2026. Considerations for a small business website. [online] Available at: <https://priorityone.co.za/considerations-for-a-small-business-website/> [Accessed 13 August 2026].

See `content-research/text/sources.md` and `content-research/images/image-credits.md`
for content- and image-specific sourcing notes.
