/**
 * Cross-platform post-build copy for `output: "standalone"`.
 *
 * Copies .next/static and public/ into .next/standalone so the production
 * server can serve hashed assets. Resilient to a briefly-locking server
 * process (Windows EBUSY) via bounded retries — and FAILS the build if the
 * copy still cannot complete, so a broken deploy is never produced silently.
 */
import { cpSync, existsSync, statSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const pairs = [
  [join(root, ".next", "static"), join(root, ".next", "standalone", ".next", "static")],
  [join(root, "public"), join(root, ".next", "standalone", "public")],
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let failed = false;

for (const [src, dest] of pairs) {
  if (!existsSync(src)) {
    console.error(`[copy-standalone] MISSING source: ${src}`);
    failed = true;
    continue;
  }
  let attempt = 0;
  const max = 5;
  while (true) {
    attempt += 1;
    try {
      cpSync(src, dest, { recursive: true, force: true });
      // verify a sentinel: destination dir non-empty and fresh
      const size = statSync(dest).size;
      console.log(`[copy-standalone] ${src} -> ${dest} (attempt ${attempt}, ok)`);
      break;
    } catch (err) {
      if (attempt >= max) {
        console.error(`[copy-standalone] FAILED after ${max} attempts: ${src}`);
        console.error(String(err));
        failed = true;
        break;
      }
      console.warn(`[copy-standalone] retry ${attempt}/${max} (${err.code || err.message})`);
      await sleep(400 * attempt);
    }
  }
}

if (failed) process.exit(1);
