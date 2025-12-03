#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run

import { walk as _walk } from "std/fs/walk.ts";
import { relative } from "std/path/mod.ts";

async function runBuild(): Promise<void> {
  console.log("Running build...");
  const command = new Deno.Command("deno", {
    args: ["task", "build"],
    stdout: "inherit",
    stderr: "inherit",
  });
  const process = command.spawn();
  await process.status;
}

async function watchFiles(): Promise<void> {
  console.log("Watching for file changes...");

  const watcher = Deno.watchFs("src", { recursive: true });

  let timeoutId: number | null = null;

  for await (const event of watcher) {
    if (event.kind === "modify" || event.kind === "create" || event.kind === "remove") {
      console.log(`File changed: ${relative(".", event.paths[0])}`);

      // Debounce rebuilds
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(async () => {
        try {
          await runBuild();
          console.log("Build completed. Watching for changes...");
        } catch (error) {
          console.error("Build failed:", error);
        }
        timeoutId = null;
      }, 500);
    }
  }
}

if (import.meta.main) {
  await watchFiles();
}