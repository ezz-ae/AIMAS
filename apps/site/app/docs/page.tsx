import Link from "next/link";
import { listDocFiles } from "@/lib/md";

export default function DocsIndex() {
  const files = listDocFiles();
  return (
    <main style={{ padding: 24 }}>
      <h1 style={{ marginTop: 0 }}>Documentation</h1>
      <p style={{ maxWidth: 820, opacity: 0.8, lineHeight: 1.6 }}>
        Canonical repository documents rendered directly from markdown files.
      </p>

      <ul style={{ paddingLeft: 18, lineHeight: 1.8 }}>
        {files.map((f) => (
          <li key={f}>
            <Link href={`/docs/view?path=${encodeURIComponent(f)}`} style={{ textDecoration: "none" }}>
              {f}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
