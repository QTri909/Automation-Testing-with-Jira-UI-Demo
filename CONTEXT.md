# TestFlow AI UI Prototype Context

## Product
TestFlow AI is a static SaaS dashboard prototype for AI-powered testing automation integrated with Jira. The first-login flow auto-creates a default empty workspace and guides the user to connect Jira, select projects, import requirements/issues, and generate test cases/scripts/runs.

## Current Scope
- Static HTML/CSS/JavaScript only.
- No React, Vite, Node app, backend, auth, database, or real API calls.
- Tailwind CSS and Font Awesome are loaded through CDN.
- All data is mock data in `js/mock-data.js`.
- Buttons simulate behavior with modal, toast, loading skeleton, or page navigation.

## Structure
- `index.html`: demo login/entry page that links to `pages/dashboard.html`.
- `pages/`: individual static pages for the product flows. Jira OAuth opens `pages/jira-connect.html` in a real browser popup window via `window.open`, showing a mock Atlassian authorization URL/page instead of an in-app modal.
- `css/global.css`: tokens, typography, logo, page-level visual primitives.
- `css/layout.css`: sidebar/topbar/navigation styles.
- `css/components.css`: card, badge, modal, skeleton/loading styles.
- `js/tailwind-config.js`: Tailwind CDN theme extension.
- `js/mock-data.js`: shared mock workspace, nav, projects, requirements, test cases, scripts, runs.
- `js/layout.js`: renders shared sidebar/topbar shell.
- `js/app.js`: shared helpers for table, empty state, modal, toast, loading, global actions.
- `js/pages/`: page-specific renderers.
- `components/`: static reference component snippets, not loaded at runtime.
- `assets/images/dashboard.png`: reference screenshot from the original UI prompt.

## Design Direction
Keep the UI close to the provided SaaS dashboard mockup: white/light slate surfaces, blue primary action, dense but polished cards, clear sidebar, topbar, workspace onboarding, and obvious empty states. Avoid marketing-page layout; this is an app dashboard.

## Implementation Notes
- Pages are intentionally duplicated at the HTML shell level to keep them openable directly from the filesystem.
- Shared layout is rendered by plain global scripts instead of `fetch()` component loading because local `file://` component fetches can fail in browsers.
- When adding a new page:
  1. Add a nav entry in `js/mock-data.js`.
  2. Add `pages/new-page.html` using the existing page shell.
  3. Add `js/pages/new-page.js`.
  4. Call `Layout.renderShell('new-page')`, `App.bindGlobalActions()`, then render the page content.
