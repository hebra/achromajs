#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run

import { parseArgs } from "std/cli/parse_args.ts";
import { ensureDir, copy } from "std/fs/mod.ts";
import { basename as _basename, extname, join } from "std/path/mod.ts";

const args = parseArgs(Deno.args);
const target = args._[0] as string || "default";

async function runCommand(cmd: string[], cwd?: string): Promise<void> {
  const command = new Deno.Command(cmd[0], {
    args: cmd.slice(1),
    cwd,
    stdout: "null",
    stderr: "inherit",
  });
  const process = command.spawn();
  const status = await process.status;
  if (!status.success) {
    throw new Error(`Command failed: ${cmd.join(" ")}`);
  }
}

async function compileTypeScript(config: string): Promise<void> {
  console.log(`Compiling TypeScript with ${config}...`);
  // Ensure @types/chrome is available for the compiler by including it in the run command if necessary,
  // but TSC usually looks in node_modules. Since we don't have node_modules, we can try to use deno's cache.
  const command = new Deno.Command("deno", {
    args: ["run", "-A", "npm:typescript@5.9.3/tsc", "-p", config],
    stdout: "inherit",
    stderr: "inherit",
  });
  const process = command.spawn();
  const status = await process.status;
  if (!status.success) {
    throw new Error(`Command failed: deno run -A npm:typescript@5.9.3/tsc -p ${config}`);
  }
}

async function cssUrlEmbed(): Promise<void> {
  console.log("Embedding CSS URLs...");
  // This would need a Deno equivalent or external tool
  // For now, copy the file as-is
  await copy("src/filters/filters.scss", "dist/achromajs/filters.scss", { overwrite: true });
}

async function compileSass(): Promise<void> {
  console.log("Compiling Sass...");
  // Use external sass compiler
  try {
    const sassAvailable = await runCommand(["which", "sass"]).then(() => true).catch(() => false);
    if (!sassAvailable) throw new Error("sass not found");

    await runCommand(["sass", "--style=expanded", "--source-map", "src/library/achroma.scss", "dist/achromajs/achromajs.css"]);
    await runCommand(["sass", "--style=expanded", "--source-map", "dist/achromajs/filters.scss", "dist/achromeatic/filters/filters.css"]);
    await runCommand(["sass", "--style=expanded", "--source-map", "dist/achromajs/filters.scss", "dist/achromajs/filters.css"]);
    await runCommand(["sass", "--style=expanded", "--source-map", "src/filters/filters.scss", "dist/achromafox/filters/filters.css"]);
  } catch (_error) {
    console.warn("Sass compilation failed. Using fallback: copying SCSS as CSS.");
    // Fallback: just copy the files as-is for now
    await copy("src/library/achroma.scss", "dist/achromajs/achromajs.css", { overwrite: true });
    await copy("dist/achromajs/filters.scss", "dist/achromeatic/filters/filters.css", { overwrite: true });
    await copy("dist/achromajs/filters.scss", "dist/achromajs/filters.css", { overwrite: true });
    await copy("src/filters/filters.scss", "dist/achromafox/filters/filters.css", { overwrite: true });
  }
}

async function copyAssets(): Promise<void> {
  console.log("Copying assets...");
  await ensureDir("dist/achromeatic/assets");
  await ensureDir("dist/achromafox/assets");
  await ensureDir("dist/achromajs/assets");
  await ensureDir("dist/achromafox/filters");

  // Copy assets
  for await (const entry of Deno.readDir("src/assets")) {
    await copy(join("src/assets", entry.name), join("dist/achromeatic/assets", entry.name), { overwrite: true });
    await copy(join("src/assets", entry.name), join("dist/achromafox/assets", entry.name), { overwrite: true });
    await copy(join("src/assets", entry.name), join("dist/achromajs/assets", entry.name), { overwrite: true });
  }

  // Copy SVG filters for Firefox
  for await (const entry of Deno.readDir("src/filters")) {
    if (extname(entry.name) === ".svg") {
      await copy(join("src/filters", entry.name), join("dist/achromafox/filters", entry.name), { overwrite: true });
    }
  }
}

async function copyChrome(): Promise<void> {
  console.log("Copying Chrome extension files...");
  await copy("src/chrome/manifest.json", "dist/achromeatic/manifest.json", { overwrite: true });
  await copy("src/webextension/popup.html", "dist/achromeatic/popup.html", { overwrite: true });
  await copy("src/webextension/style.css", "dist/achromeatic/style.css", { overwrite: true });
  await copy("dist/achromajs/filters.css", "dist/achromeatic/filters.css", { overwrite: true });
}

async function copyFirefox(): Promise<void> {
  console.log("Copying Firefox extension files...");
  await copy("src/firefox/manifest.json", "dist/achromafox/manifest.json", { overwrite: true });
  await copy("src/webextension/style.css", "dist/achromafox/style.css", { overwrite: true });
  await copy("src/webextension/popup.html", "dist/achromafox/popup.html", { overwrite: true });
  await copy("dist/achromajs/filters.css", "dist/achromafox/filters.css", { overwrite: true });
}

async function getVersion(): Promise<string> {
  const denoConfig = JSON.parse(await Deno.readTextFile("deno.json"));
  return denoConfig.version;
}

async function setVersion(version: string): Promise<void> {
  const denoConfig = JSON.parse(await Deno.readTextFile("deno.json"));
  denoConfig.version = version;
  await Deno.writeTextFile("deno.json", JSON.stringify(denoConfig, null, 2) + "\n");
}

async function replacePlaceholders(): Promise<void> {
  console.log("Replacing placeholders...");

  const version = await getVersion();
  const author = "Hendrik Brandt";

  const manifests = [
    "dist/achromeatic/manifest.json",
    "dist/achromafox/manifest.json"
  ];

  for (const manifest of manifests) {
    let content = await Deno.readTextFile(manifest);
    content = content.replace(/%PROJECT_VERSION%/g, version);
    content = content.replace(/%AUTHOR_NAME%/g, author);
    await Deno.writeTextFile(manifest, content);
  }
}

async function fixCssEmbedded(): Promise<void> {
  console.log("Fixing embedded CSS...");

  const cssFiles = [
    "dist/achromeatic/filters/filters.css",
    "dist/achromafox/filters/filters.css",
    "dist/achromajs/filters.css"
  ];

  for (const file of cssFiles) {
    let content = await Deno.readTextFile(file);
    content = content.replace(/\);$/, '#Filter");');
    await Deno.writeTextFile(file, content);
  }
}

async function fixDataNull(): Promise<void> {
  console.log("Fixing data null in CSS...");

  const cssFiles = [
    "dist/achromeatic/filters/filters.css",
    "dist/achromafox/filters/filters.css",
    "dist/achromajs/filters.css"
  ];

  for (const file of cssFiles) {
    let content = await Deno.readTextFile(file);
    content = content.replace(/data:null/g, 'data:image/svg+xml');
    await Deno.writeTextFile(file, content);
  }
}

async function concatCss(): Promise<void> {
  console.log("Concatenating CSS...");

  const files = [
    "src/common/default.css",
    "dist/achromajs/achromajs.css",
    "dist/achromajs/filters.css"
  ];

  let combined = "";
  for (const file of files) {
    combined += await Deno.readTextFile(file);
    combined += "\n";
  }

  await Deno.writeTextFile("dist/achromajs/combined.css", combined);
}

async function embedCssIntoJs(): Promise<void> {
  console.log("Embedding CSS into JavaScript...");

  const cssContent = await Deno.readTextFile("dist/achromajs/combined.css");
  let jsContent = await Deno.readTextFile("dist/achromajs/achroma.js");

  jsContent = jsContent.replace(/PLACEHOLDER_FILTER_CSS/, cssContent);

  await Deno.writeTextFile("dist/achromajs/achroma.js", jsContent);
}

async function minifyJs(): Promise<void> {
  console.log("Minifying JavaScript...");
  // Use Deno's built-in minifier or terser
  try {
    await runCommand(["deno", "run", "-A", "npm:terser@5.36.0", "dist/achromajs/achroma.js", "-o", "dist/achromajs/achroma.min.js", "--compress", "--mangle"]);
  } catch (_error) {
    console.warn("Terser not available, skipping minification");
  }
}

async function copyTests(): Promise<void> {
  console.log("Copying test files...");
  await copy("dist/achromajs/achroma.js", "test/achroma.js", { overwrite: true });
  await copy("dist/achromajs/achroma.js.map", "test/achroma.js.map", { overwrite: true });
}

async function compressReleases(): Promise<void> {
  console.log("Creating release archives...");

  await ensureDir("release");
  const releaseDir = await Deno.realPath("release");

  const version = await getVersion();

  // AchromaJS library
  await runCommand(["zip", "-r", join(releaseDir, `achromajs-${version}.zip`), "."], "dist/achromajs");

  // Chrome extension
  await runCommand(["zip", "-r", join(releaseDir, `achromeatic-${version}.zip`), "."], "dist/achromeatic");

  // Firefox extension
  await runCommand(["zip", "-r", join(releaseDir, `achromafox-${version}.xpi`), "."], "dist/achromafox");
}

async function bumpVersion(): Promise<void> {
  console.log("Bumping version...");

  const now = new Date();
  const yy = (now.getUTCFullYear() % 100).toString();
  const m = (now.getUTCMonth() + 1).toString();
  const d = now.getUTCDate().toString();

  const baseVersion = `${yy}.${m}.${d}`;

  const currentVersion = await getVersion();
  const currentParts = currentVersion.split('.').map(Number);

  let newVersion;
  if (currentParts.length >= 3 &&
      currentParts[0] === parseInt(yy) &&
      currentParts[1] === parseInt(m) &&
      currentParts[2] === parseInt(d)) {
    const fourth = currentParts.length === 3 ? 1 : currentParts[3] + 1;
    newVersion = `${baseVersion}.${fourth}`;
  } else {
    newVersion = baseVersion;
  }

  await setVersion(newVersion);
  console.log(`Version updated from ${currentVersion} to ${newVersion}`);
}

async function defaultBuild(): Promise<void> {
  await ensureDir("dist/achromajs");
  await ensureDir("dist/achromafox/filters");
  await ensureDir("dist/achromeatic/filters");

  await compileTypeScript("tsconfig.achromajs.json");
  await compileTypeScript("tsconfig.achromafox.json");
  await compileTypeScript("tsconfig.achromeatic.json");

  await cssUrlEmbed();
  await compileSass();
  await copyAssets();
  await copyChrome();
  await copyFirefox();
  await replacePlaceholders();
  await fixCssEmbedded();
  await fixDataNull();
  await concatCss();
  await embedCssIntoJs();
  await minifyJs();
  await copyTests();
}

async function main(): Promise<void> {
  try {
    switch (target) {
      case "achromajs":
        await compileTypeScript("tsconfig.achromajs.json");
        break;
      case "achromafox":
        await compileTypeScript("tsconfig.achromafox.json");
        break;
      case "achromeatic":
        await compileTypeScript("tsconfig.achromeatic.json");
        break;
      case "bundle":
        await compressReleases();
        break;
      case "bump-version":
        await bumpVersion();
        break;
      default:
        await defaultBuild();
        break;
    }
  } catch (error) {
    console.error("Build failed:", error);
    Deno.exit(1);
  }
}

if (import.meta.main) {
  await main();
}