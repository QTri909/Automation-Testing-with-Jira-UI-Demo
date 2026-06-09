# Agent Instructions

## Project Type

This is a fast static UI prototype for TestFlow AI. Keep it framework-free unless the user explicitly changes direction.

## Hard Constraints

- Use only HTML, CSS, and plain JavaScript.
- Do not add React, Vite, npm dependencies, backend services, database, or real authentication.
- Do not call real APIs. Jira integration is demo-only.
- Prefer CDN links for Tailwind CSS and Font Awesome.

## Working Conventions

- Read `CONTEXT.md` first before making product or architecture changes.
- Keep shared mock data in `js/mock-data.js`.
- Keep shared UI behavior in `js/app.js` and shared shell rendering in `js/layout.js`.
- Put page-specific rendering in `js/pages/<page>.js`.
- Keep CSS split by responsibility:
  - `css/global.css`
  - `css/layout.css`
  - `css/components.css`
- `components/*.html` are reference snippets only. Do not rely on runtime `fetch()` for these snippets unless a local dev server is introduced.

## UX Principles

- Maintain modern SaaS dashboard style.
- Preserve sidebar, topbar, cards, badges, tables, modals, empty states, and prominent primary actions.
- 
- 
- The first-login/default-workspace flow should remain clear: workspace exists, data is empty, primary next step is connecting Jira.

## Verification

- At minimum, run `node --check` on changed JavaScript files when Node is available.
- Open `index.html` or `pages/dashboard.html` directly in a browser for visual review when possible.
