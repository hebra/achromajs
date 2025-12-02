# Project Architecture Rules (Non-Obvious Only)

## System Architecture
- **Three deployment targets**: Single TypeScript codebase compiles to JavaScript library, Firefox extension, Chrome extension
- **CSS-embedded library**: AchromaJS library contains base64-encoded SVG filters embedded in JavaScript string
- **Extension hybrid approach**: Content scripts for CSS injection, background scripts for cross-tab persistence

## Component Relationships
- **FilterMode class**: Defines individual filter configurations (id, name, description, cssClass)
- **Filters class**: Groups FilterMode instances by vision type (achromato, prot, deuter, tritan, etc.)
- **FiltersUIList class**: Builds DOM interface for filter selection
- **AchromaJS class**: Main controller handling initialization, storage, and filter application

## Data Flow Patterns
- **Domain-based storage**: Filter preferences stored per-domain using `localStorage` with host keys
- **Extension storage bridge**: Background scripts synchronize `chrome.storage.local` with content script `localStorage`
- **CSS class application**: Filters activated by adding/removing classes on `document.documentElement`

## Browser-Specific Architecture
- **Chrome manifest v3**: Service worker background, modern permissions API
- **Firefox manifest v3**: Traditional background scripts, different permission model
- **Content script injection**: CSS filters loaded via content scripts, JavaScript via `chrome.scripting.executeScript`

## Build Architecture
- **Grunt-based pipeline**: Multi-stage compilation with TypeScript, SCSS, SVG processing, and string replacement
- **Target-specific configs**: Separate tsconfig.json files for library vs extension builds
- **Asset processing**: SVG filters → base64 → CSS → embedded in JavaScript via build-time string replacement

## Critical Design Decisions
- **No framework dependencies**: Pure DOM manipulation for maximum compatibility
- **Global class instances**: FiltersUIList and Filters intentionally global (ESLint exception)
- **Chrome timing workaround**: setTimeout required for reliable filter application
- **Single outfile distribution**: Library compiled to self-contained JavaScript file