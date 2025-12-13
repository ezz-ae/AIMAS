import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type DocPage = { title: string; bodyHtml: string; sourcePath: string };

const ROOT = path.join(process.cwd(), "..", ".."); // repo root

const SAFE_DIRS = ["RFC", "schemas", "compliance", "docs", "math", "conformance", "spec"];

export async function loadMarkdown(relFile: string): Promise<DocPage> {
  const abs = path.join(ROOT, relFile);
  const raw = fs.readFileSync(abs, "utf8");
  const { data, content } = matter(raw);
  const processed = await remark().use(html).process(content);
  return {
    title: (data?.title as string) || inferTitle(content) || relFile,
    bodyHtml: processed.toString(),
    sourcePath: relFile
  };
}

export function listDocFiles(): string[] {
  const out: string[] = [];
  for (const dir of SAFE_DIRS) {
    const abs = path.join(ROOT, dir);
    if (!fs.existsSync(abs)) continue;
    walk(abs, (p) => {
      if (p.endsWith(".md")) out.push(path.relative(ROOT, p));
    });
  }
  return out.sort();
}

function walk(start: string, onFile: (p: string) => void) {
  for (const ent of fs.readdirSync(start, { withFileTypes: true })) {
    const p = path.join(start, ent.name);
    if (ent.isDirectory()) walk(p, onFile);
    else onFile(p);
  }
}

function inferTitle(md: string) {
  const m = md.match(/^#\s+(.+)$/m);
  return m ? m[1].trim() : null;
}
