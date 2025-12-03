# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Build System
- **Deno 2 migration**: Project migrated from Node.js/Grunt to Deno 2 with custom build scripts
- **Custom build pipeline**: `build.ts` handles TypeScript compilation, SCSS processing, SVG embedding, and asset management
- **Multi-target builds**: Separate TypeScript configs for achromajs (library), achromafox (Firefox), achromeatic (Chrome)
- **CSS embedding**: Filters embedded as base64 strings directly into JavaScript via build-time string replacement
- **Module system quirk**: Base tsconfig uses `module: "none"` but library compiles to single outfile for distribution

## Browser Extension Architecture
- **Manifest differences**: Chrome uses service worker background, Firefox uses traditional background scripts
- **Content script injection**: CSS filters loaded via content scripts, JavaScript functionality via manual injection
- **Web accessible resources**: SVG filters must be declared in manifest for cross-origin access

## Filter System
- **SVG-based filters**: Color vision filters defined as SVG files, compiled to CSS with base64 encoding
- **CSS class application**: Filters activated by adding `achromajs-*` classes to `document.documentElement`
- **Chrome workaround**: `setTimeout` required after initial filter application for reliable rendering in Chrome

## Code Patterns
- **Global class instances**: `FiltersUIList` and `Filters` are intentionally global (ESLint configured to allow)
- **Class-based architecture**: Uses classes for FilterMode, Filters, FiltersUIList, AchromaJS
- **DOM manipulation**: Direct element creation and event binding without framework abstractions
- **Storage pattern**: Domain-specific filter persistence using host-based localStorage keys

## Development Setup
- **Test server**: `deno task start-server` runs Deno native HTTP server on port 8080
- **Watch mode**: `deno task start` runs custom watch script for automatic rebuilding
- **Extension loading**: Chrome loads from `dist/achromeatic/`, Firefox from `dist/achromafox/`
- **Version management**: Version stored in deno.json instead of package.json