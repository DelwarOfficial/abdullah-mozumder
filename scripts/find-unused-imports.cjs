/* Unused-import detector v2 — simple, bounded */
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(process.cwd(), "src");
const files = [];

(function walk(dir) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p);
    else if (/\.tsx?$/.test(e.name)) files.push(p);
  }
})(ROOT);

const out = [];
const IMPORT_LINE = /import\s+(?:type\s+)?(?:\{[^}]*\}|\w+)?(?:\s*,\s*\{[^}]*\})?\s*from\s*["'][^"']+["'];?/g;
const NAME_RE = /(?:^|[\s,{])(?:type\s+)?([A-Za-z_$][\w$]*)(?:\s+as\s+([A-Za-z_$][\w$]*))?\s*$/;

for (const file of files) {
  const src = fs.readFileSync(file, "utf8");
  const matches = [...src.matchAll(IMPORT_LINE)];
  if (!matches.length) continue;
  // body = source with import statements blanked
  let body = src;
  for (const m of matches) body = body.replace(m[0], "");
  for (const m of matches) {
    const inner = m[0].replace(/^import\s+/, "").replace(/from\s*["'][^"']+["'];?$/, "").trim();
    const names = [];
    const brace = inner.match(/\{([^}]*)\}/);
    if (brace) {
      for (const part of brace[1].split(",")) {
        const t = part.trim().replace(/^type\s+/, "");
        if (!t) continue;
        const asM = t.match(/(\S+)\s+as\s+(\S+)/);
        names.push(asM ? asM[2] : t.split(" ")[0]);
      }
    }
    const def = inner.replace(/\{[^}]*\}/, "").replace(/,/g, "").trim();
    if (def && /^[\w$]+$/.test(def)) names.push(def);
    for (const name of names) {
      if (!name) continue;
      const re = new RegExp("\\b" + name.replace(/\$/g, "\\$") + "\\b");
      if (!re.test(body)) out.push(path.relative(process.cwd(), file) + " :: " + name);
    }
  }
}

console.log(out.length ? out.join("\n") : "NO unused imports found");
