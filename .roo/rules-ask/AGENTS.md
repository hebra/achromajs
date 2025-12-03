# Project Documentation Rules (Non-Obvious Only)

## Architecture Understanding
- **Multi-target builds**: Same TypeScript source compiles to library (achromajs), Firefox extension (achromafox), Chrome extension (achromeatic)
- **CSS-first approach**: Filters defined as SVG files, compiled to CSS, embedded in JavaScript - not traditional CSS-in-JS
- **Extension vs Library**: Library uses DOM injection, extensions use content scripts + background scripts

## File Organization Patterns
- **src/library/**: Core AchromaJS functionality, compiles to standalone JavaScript library
- **src/webextension/**: Shared extension code (background scripts, popup UI)
- **src/chrome|firefox/**: Browser-specific manifests and configurations
- **src/common/**: Shared TypeScript classes (FilterMode, Filters, FiltersUIList)

## Build Process Details
- **Deno build pipeline**: TypeScript → SCSS compilation → SVG embedding → base64 encoding → string replacement
- **Single outfile strategy**: Library compiles to one JavaScript file with embedded CSS
- **Extension packaging**: Different compression targets (.zip for Chrome, .xpi for Firefox)

## Development Workflow
- **Watch mode**: `deno task start` runs custom watch script, compiles all targets simultaneously
- **Test server**: `deno task start-server` runs Deno native HTTP server on port 8080 for local testing
- **Extension loading**: Chrome loads from `dist/achromeatic/`, Firefox from `dist/achromafox/`

## Key Implementation Details
- **Filter activation**: CSS classes applied to `document.documentElement`, not individual elements
- **Storage strategy**: Domain-based persistence using host as localStorage key
- **Chrome workaround**: setTimeout required for filter rendering reliability