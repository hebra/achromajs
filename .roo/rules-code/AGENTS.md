# Project Coding Rules (Non-Obvious Only)

## Build Configuration
- **TypeScript compilation**: Use separate configs for different targets - achromajs (library), achromafox (Firefox), achromeatic (Chrome)
- **Module system quirk**: Base tsconfig uses `module: "none"` but compiles to single outfile for library distribution
- **CSS embedding**: Filters are embedded as base64 strings directly into JavaScript via Grunt string replacement

## Extension Architecture
- **Manifest differences**: Chrome uses service worker background, Firefox uses traditional background scripts
- **Content script injection**: CSS filters loaded via content scripts, JavaScript functionality via manual injection
- **Web accessible resources**: SVG filters must be declared in manifest for cross-origin access

## Code Patterns
- **Global class instances**: `FiltersUIList` and `Filters` are intentionally global (ESLint allows this)
- **DOM manipulation**: Direct element creation and event binding without framework abstractions
- **Filter application**: CSS classes added to `document.documentElement` for filter activation
- **Storage pattern**: Domain-specific filter persistence using host-based localStorage keys

## Chrome-Specific Workarounds
- **Filter timing hack**: `setTimeout` required after initial filter application in Chrome for reliable rendering
- **Service worker background**: Chrome extension uses modern service worker architecture vs Firefox's background scripts