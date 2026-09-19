/**
 * Production launcher — cross-platform replacement for
 * `NODE_ENV=production bun .next/standalone/server.js`.
 *
 * - Verifies the standalone build exists (helpful error if `build` wasn't run)
 * - Sets NODE_ENV=production
 * - Defaults PORT to 3000 and HOSTNAME to 0.0.0.0
 *
 * Usage: npm run start   (PORT=3100 npm run start to override)
 */
import { existsSync } from "node:fs";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";

const root = process.cwd();
const server = join(root, ".next", "standalone", "server.js");

if (!existsSync(server)) {
  console.error(
    "[start] Standalone build not found.\n" +
      "        Run `npm run build` first, then `npm run start`.",
  );
  process.exit(1);
}

const env = {
  ...process.env,
  NODE_ENV: "production",
  PORT: process.env.PORT || "3000",
  HOSTNAME: process.env.HOSTNAME || "0.0.0.0",
};

const child = spawn(process.execPath, [server], {
  env,
  stdio: "inherit",
});

const shutdown = (signal) => {
  child.kill(signal);
};
process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));

child.on("exit", (code) => process.exit(code ?? 0));
