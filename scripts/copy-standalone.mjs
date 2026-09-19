/**
 * Cross-platform post-build copy for `output: "standalone"`.
 * Replaces the Unix-only `cp -r` calls in the npm build script.
 */
import { cpSync, existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const staticDir = join(root, ".next", "static");
const standaloneStatic = join(root, ".next", "standalone", ".next", "static");
const publicDir = join(root, "public");
const standalonePublic = join(root, ".next", "standalone", "public");

for (const [src, dest] of [[staticDir, standaloneStatic], [publicDir, standalonePublic]]) {
  if (!existsSync(src)) {
    console.warn(`[copy-standalone] missing: ${src}`);
    continue;
  }
  cpSync(src, dest, { recursive: true });
  console.log(`[copy-standalone] ${src} -> ${dest}`);
}
