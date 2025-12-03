#!/usr/bin/env -S deno run --allow-net --allow-read

import { serveDir } from "std/http/file_server.ts";

Deno.serve((req) => {
  const url = new URL(req.url);
  console.log(`${req.method} ${url.pathname}`);

  return serveDir(req, {
    fsRoot: ".",
    showDirListing: true,
    quiet: false,
  });
}, {
  port: 8080,
  hostname: "0.0.0.0",
});