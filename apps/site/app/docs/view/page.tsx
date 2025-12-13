import { loadMarkdown } from "@/lib/md";

export default async function DocView({ searchParams }: { searchParams: Promise<{ path?: string }> }) {
  const { path } = await searchParams;
  const p = path || "README.md";
  const doc = await loadMarkdown(p);

  return (
    <main style={{ padding: 24, maxWidth: 980, margin: "0 auto" }}>
      <div style={{ opacity: 0.65, fontSize: 12, marginBottom: 10 }}>{doc.sourcePath}</div>
      <h1 style={{ marginTop: 0 }}>{doc.title}</h1>
      <article dangerouslySetInnerHTML={{ __html: doc.bodyHtml }} style={{ lineHeight: 1.7 }} />
    </main>
  );
}
