# Project Debug Rules (Non-Obvious Only)

## Extension Debugging
- **Background script differences**: Chrome uses service worker (check Application > Service Workers), Firefox uses background page (check about:debugging)
- **Content script injection**: Filters applied via content scripts may not appear in Elements panel until activated
- **Web accessible resources**: SVG filters loaded cross-origin may fail silently if manifest permissions incorrect

## Filter Application Issues
- **Chrome timing workaround**: `setTimeout` in AchromaJS.init() required for reliable filter rendering
- **CSS class conflicts**: Multiple `achromajs-*` classes on `document.documentElement` can cause unexpected behavior
- **Domain-specific storage**: Filter preferences stored per-domain in localStorage, check correct host key

## Storage Debugging
- **Extension storage**: Filter preferences use `chrome.storage.local` in background script, `localStorage` in content script
- **Domain mapping**: Storage keys use `new URL(host).host` format, verify correct domain extraction
- **Cross-script synchronization**: Background script applies filters on navigation, content script manages UI state

## Common Failure Points
- **Manifest permissions**: Missing `scripting` or `activeTab` permissions cause silent injection failures
- **Content security policy**: SVG filters may be blocked by strict CSP rules on target websites
- **Frame restrictions**: `allFrames: true` in manifest required for filters to work in iframes