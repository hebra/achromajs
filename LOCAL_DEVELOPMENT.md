# Local Development Guide

This document provides instructions on how to set up, build, and run AchromaJS and its browser extensions (Achromafox and Achromeatic) locally for development and testing.

## Prerequisites

- **Deno 2.x**: The project uses Deno for its build system and development tools. Install it from [deno.com](https://deno.com/).
- **Make** (optional): A `Makefile` is provided for convenience, but all commands can also be run via `deno task`.

## Project Setup

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/achromajs.git
    cd achromajs
    ```

2.  Install dependencies (handled automatically by Deno during the first run, but you can pre-fetch them):
    ```bash
    deno cache build.ts watch.ts test/server.ts
    ```

## Building the Project

You can build all targets or specific ones.

### Build All Targets
```bash
deno task build
# or
make build
```
This generates the output in the `dist/` directory:
- `dist/achromajs/`: The core JavaScript library.
- `dist/achromafox/`: The Firefox extension (Manifest V2).
- `dist/achromeatic/`: The Chrome extension (Manifest V3).

### Build Specific Targets
- **Library only**: `deno task build:achromajs` (or `make build-achromajs`)
- **Firefox extension**: `deno task build:achromafox` (or `make build-achromafox`)
- **Chrome extension**: `deno task build:achromeatic` (or `make build-achromeatic`)

### Clean Build Artifacts
```bash
deno task clean
# or
make clean
```

## Development Mode (Watch & Build)

To automatically rebuild the project whenever you make changes to the source files:

1.  Start the watcher:
    ```bash
    deno task start
    # or
    make start
    ```
    This command cleans the `dist/` directory, performs an initial build, and starts a file watcher that rebuilds only the necessary parts on changes.

2.  (Optional) Start the test server:
    ```bash
    deno task start-server
    ```
    This launches a local server at `http://localhost:8080` for testing the library and extension popups.

## Testing in Browsers

### Firefox (Achromafox)

1.  Open Firefox and type `about:debugging` in the address bar.
2.  Click on **This Firefox** (or **This Nightly**).
3.  Click **Load Temporary Add-on...**.
4.  Navigate to your project folder and select the `dist/achromafox/manifest.json` file.
5.  The extension is now loaded and will remain until you restart Firefox.

### Chrome / Brave / Edge (Achromeatic)

1.  Open Chrome and navigate to `chrome://extensions`.
2.  Enable **Developer mode** using the toggle in the top-right corner.
3.  Click the **Load unpacked** button.
4.  Navigate to your project folder and select the `dist/achromeatic` directory.
5.  The extension is now loaded.

## Testing the JavaScript Library

To test the core library (`achroma.ts`) without the extension wrapper:

1.  Ensure the development server is running (`deno task start-server`).
2.  Open `http://localhost:8080/index.html` in your browser.
3.  Append `?achromajs=true` to the URL to enable the library's UI on the test page.
4.  Use the UI overlay to toggle different vision simulations.

## Quality Control

Before committing your changes, ensure they meet the project's standards:

- **Linting**: `deno task lint` or `make lint`
- **Formatting**: `deno task fmt` or `make fmt`
- **Type Checking**: `deno task check` or `make check`

## Release Process

To create release-ready packages:
```bash
deno task build:release
# or
make build-release
```
This will build all targets and create ZIP archives in the `release/` directory.

To bump the project version:
```bash
deno task bump-version
```
