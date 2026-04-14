# AGENTS.md

## Project Overview
**Project Name:** AchromaJS / Achromafox / Achromeatic
**Project Purpose:** A JavaScript library and browser extensions (Firefox/Chrome) to simulate various vision conditions (color blindness, blur, contrast) using SVG filters and CSS.

## Tech Stack
- **Runtime:** Deno 2.x (Primary for tooling, build system, and dev server).
- **Languages:** TypeScript (Logic), SCSS (Styling), SVG (Filter definitions).
- **APIs:** Web Extensions API (Manifest V2 for Firefox, Manifest V3 for Chrome).
- **Build Tools:** Custom `build.ts` and `watch.ts` scripts using `npm:typescript/tsc`, `sass` (CLI), and `npm:terser` (for minification).

## Core Architecture
The project is a multi-target build system based on Deno:
- `src/common/`: Shared TypeScript logic (`modes.ts`, `list.ts`).
- `src/library/`: Core `achroma.ts` library implementation and styles.
- `src/webextension/`: Extension-specific UI logic (`popup.ts`), background scripts, and popup HTML.
- `src/filters/`: SVG filter definitions and primary SCSS for filters.
- `src/chrome/` & `src/firefox/`: Platform-specific manifest files.
- `dist/`: Target-specific build output (achromajs, achromafox, achromeatic).
- `test/`: Manual test suite and a Deno-based local server (`server.ts`).

## Coding Standards
- **Paradigm:** Class-based TypeScript with direct DOM manipulation; no external UI frameworks (React/Vue/etc.).
- **Naming Conventions:**
  - Classes: `PascalCase`
  - Variables/Functions: `camelCase`
  - CSS Classes: `achromajs-filter-*` for core filters.
- **Formatting:** Strictly follow `deno fmt` and `deno lint` rules defined in `deno.json`.
- **Patterns:**
  - **CSS Embedding:** Filter definitions and styles are concatenated and embedded directly into the JS library during the build process (see `build.ts`).
  - **Workarounds:** Always apply a `setTimeout` (approx. 100ms) after the initial filter application in Chrome to ensure reliable rendering.

## Agent Constraints (Do's and Don'ts)
- **Do:**
  - Maintain compatibility for both Firefox (MV2) and Chrome (MV3).
  - Use `deno task` or `make` commands for all build and quality control operations.
  - Follow Deno best practices for script execution and dependency management.
  - Reference `LOCAL_DEVELOPMENT.md` for detailed setup and manual testing procedures.
- **Don't:**
  - **Never** modify files in `dist/` or `release/` manually.
  - Avoid adding heavy external npm/Deno dependencies; prefer standard Web APIs.
  - Do not change core filter logic or SVG definitions without explicit instructions.
- **Ask Before:**
  - Modifying the build pipeline in `build.ts`.
  - Adding any new external dependencies.

## Setup & Testing
- **Build all:** `deno task build`
- **Watch mode:** `deno task start`
- **Test server:** `deno task start-server` (at `http://localhost:8080/test/index.html`)
- **Quality Control:** `deno task lint`, `deno task fmt`, `deno task check`
- **Versioning:** Use `deno task bump-version` to update `deno.json`.

## Git Workflow
- **Commit Messages:** Use descriptive messages; standard format is preferred.
- **Branching:** `master` is the main development branch.
- **Release:** `deno task build:release` generates ZIP archives in the `release/` directory.

## Changelog
- **2024-04-14**:
  - Restructured file to meet Project Architect & Documentation Specialist requirements.
  - Detailed the tech stack including Deno 2.x and build-time tools.
  - Added Core Architecture section mapping folder structure to functionality.
  - Formalized Coding Standards including CSS embedding and Chrome workarounds.
  - Updated Agent Constraints to include references to `LOCAL_DEVELOPMENT.md`.
  - Synchronized all commands with `deno.json` tasks.