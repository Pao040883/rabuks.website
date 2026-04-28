#!/usr/bin/env node
import fs from "fs";
import path from "path";

const root = process.argv[2] || ".";
const MAX_LINES = 400;
const exDirs = new Set(["node_modules", "dist", "build", "coverage", ".git", ".venv", "venv"]);

const exts = new Set([".ts", ".tsx", ".js", ".jsx"]);

function walk(dir, acc) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (exDirs.has(entry.name)) continue;
      walk(p, acc);
    } else if (entry.isFile()) {
      if (exts.has(path.extname(entry.name))) acc.push(p);
    }
  }
}

function countLines(file) {
  const txt = fs.readFileSync(file, "utf8");
  // Normalize to \n lines
  return txt.split(/\r?\n/).length;
}

const files = [];
walk(root, files);

const offenders = [];
for (const f of files) {
  const lines = countLines(f);
  if (lines > MAX_LINES) offenders.push({ file: f, lines });
}

if (offenders.length) {
  console.error(`❌ File length limit exceeded (> ${MAX_LINES} lines):`);
  for (const o of offenders.sort((a,b)=>b.lines-a.lines)) {
    console.error(` - ${o.file}: ${o.lines} lines`);
  }
  process.exit(1);
}

console.log(`✅ TS/JS file length check passed (${files.length} files scanned).`);
