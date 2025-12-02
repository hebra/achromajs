# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Build System
- **Grunt-based compilation**: Use `npm run build` for full build, not individual TypeScript commands
- **Multi-target builds**: Separate TypeScript configs for achromajs (library), achromafox (Firefox), achromeatic (Chrome)
- **CSS pipeline**: SCSS → SVG embedding → base64 encoding → string replacement into JavaScript
- **Module system**: Base tsconfig uses `module: "none"` but library compiles to single outfile

## Browser Extension Architecture
- **Different manifests**: Chrome uses service worker, Firefox uses background scripts
- **Content scripts**: CSS filters injected via content scripts, JavaScript via manual injection
- **Storage**: Domain-specific filter persistence using `localStorage` with host-based keys

## Filter System
- **SVG-based filters**: Color vision filters defined as SVG files, embedded as base64 in CSS
- **CSS class application**: Filters applied by adding `achromajs-*` classes to `document.documentElement`
- **Chrome workaround**: `setTimeout` hack required for reliable filter application in Chrome

## Code Patterns
- **Global variables**: `FiltersUIList` and `Filters` are intentionally global (ESLint configured to allow)
- **Class-based architecture**: Uses classes for FilterMode, Filters, FiltersUIList, AchromaJS
- **DOM manipulation**: Direct DOM creation without frameworks, event listeners attached programmatically

## Development Setup
- **Test server**: `npm run start-server` runs simple Node.js static server on port 8080
- **Watch mode**: `npm run start` runs Grunt watch for automatic rebuilding
- **Extension loading**: Chrome requires loading unpacked from `dist/achromeatic/`, Firefox from `dist/achromafox/`