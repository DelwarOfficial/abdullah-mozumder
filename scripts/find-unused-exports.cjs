/* Unused-export detector: export name referenced only at its declaration site */
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

// reserved: SEO groundwork + Next file-convention exports
const RESERVED = new Set([
  "buildCollectionNode", "buildPersonNode", "buildWebsiteNode",
  "buildNewsArticleNode", "buildBreadcrumbNode", "StructuredDataGraph",
  "personId", "websiteId", "pageId", "originOf",
  "generateStaticParams", "generateMetadata", "metadata", "viewport",
  "dynamic", "revalidate", "default",
]);

const exportsByFile = new Map();
for (const file of files) {
  const src = fs.readFileSync(file, "utf8");
  const names = [];
  const re = /export\s+(?:async\s+)?(?:function|const|class|interface|type)\s+([A-Za-z_$][\w$]*)/g;
  let m;
  while ((m = re.exec(src))) names.push(m[1]);
  if (names.length) exportsByFile.set(file, names);
}

const out = [];
for (const [file, names] of exportsByFile) {
  const src = fs.readFileSync(file, "utf8");
  for (const name of names) {
    if (RESERVED.has(name)) continue;
    let refs = 0;
    const re = new RegExp("\\b" + name + "\\b");
    for (const other of files) {
      const s = other === file ? fs.readFileSync(other, "utf8").replace(/^export\s+(?:async\s+)?(?:function|const|class|interface|type)\s+([A-Za-z_$][\w$]*)/gm, "") : fs.readFileSync(other, "utf8");
      if (re.test(s)) refs++;
    }
    if (refs === 0) out.push(path.relative(process.cwd(), file) + " :: export " + name);
  }
}
console.log(out.length ? out.join("\n") : "NO unused exports found");
