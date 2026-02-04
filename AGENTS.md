# AGENTS.md

## Project Overview
**Project Name:** AchromaJS / Achromafox / Achromeatic
**Project Purpose:** A JavaScript library and browser extensions (Firefox/Chrome) to simulate various vision conditions (color blindness, blur, contrast) using SVG filters and CSS.
**Key Technologies:** Deno 2.x, TypeScript, SCSS, Web Extensions API.

## Setup Commands
Install [Deno](https://deno.com/) first.
- **Build all targets:** `deno task build` (or `make build`)
- **Specific target builds:** `make build-achromajs`, `make build-achromafox`, `make build-achromeatic`
- **Development mode (watch & build):** `deno task start` (or `make start`)
- **Clean build artifacts:** `deno task clean` (or `make clean`)
- **Create release packages:** `deno task build:release` (or `make build-release`)
- **Lint & Format:** `make lint` and `make fmt`
- **Type Check:** `make check`

## Code Style & Structure
- **Language:** TypeScript for logic, SCSS for styling and filters.
- **Environment:** Deno-first for tooling. Project migrated from Node.js/Grunt to Deno 2.
- **Architecture:**
  - **Class-based:** Uses classes like `FilterMode`, `Filters`, `FiltersUIList`, `AchromaJS`.
  - **DOM:** Direct element creation and event binding without frameworks.
  - **Multi-target builds:** Separate TS configs for `achromajs` (library), `achromafox` (Firefox), `achromeatic` (Chrome).
  - **CSS Embedding:** Filters are defined as SVG files, compiled to CSS with base64 encoding, and embedded into JS via `build.ts`.
- **Naming Conventions:**
  - Classes: `PascalCase`
  - Variables/Functions: `camelCase`
  - CSS Classes: `achromajs-filter-*` for core filters.
- **File Structure:**
  - `src/common/`: Shared logic and filter definitions.
  - `src/library/`: Core library implementation (`achroma.ts`).
  - `src/webextension/`: Extension-specific UI and background logic.
  - `src/filters/`: SVG filter definitions and styles.
  - `dist/`: Generated build output (do not edit directly).

## Testing Instructions
There are currently no automated unit tests. Verification is performed manually:
1. **Start development build:** `deno task start`
2. **Launch test server:** `deno task start-server`
3. **Open browser:** Navigate to `http://localhost:8080/test/index.html`
4. **Library Testing:** Use `?achromajs=true` query parameter to enable the library on the test page.
5. **Extension Testing:** Load the unpacked extension from `dist/achromafox` or `dist/achromeatic` into the browser.

## Git Workflow
- **Commit Messages:** Use descriptive messages.
- **Branching:** `master` is the main branch.
- **Version Management:** Version is stored in `deno.json`. Use `deno task bump-version` to update it.

## Boundaries & Constraints (Do's and Don'ts)
- **Do:**
  - Follow Deno best practices for scripts.
  - Ensure compatibility with both Firefox (Manifest V2) and Chrome (Manifest V3) extension APIs.
  - Use `deno fmt` and `deno lint` before committing.
  - **Apply Chrome workaround:** Use `setTimeout` after initial filter application for reliable rendering in Chrome.
- **Don't:**
  - **Never** modify files in `dist/` or `release/` manually.
  - Avoid adding heavy external dependencies; prefer standard Web APIs and Deno standard library.
  - Do not commit secrets or environment-specific configs.
- **Ask Before:**
  - Adding new npm/external dependencies.
  - Changing the core filter logic or SVG definitions.
  - Modifying the build pipeline in `build.ts`.