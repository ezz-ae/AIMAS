import Link from "next/link";

export default function Home() {
  return (
    <main style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, background: "#0b0b0f", color: "white" }}>
      <div style={{ width: "min(860px, 100%)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16 }}>
          <h1 style={{ margin: 0, fontSize: 28, letterSpacing: -0.5 }}>AIMAS Protocol</h1>
          <Link href="/docs/" style={{ color: "#9aa4ff", textDecoration: "none" }}>Browse docs →</Link>
        </div>

        <p style={{ marginTop: 10, marginBottom: 22, opacity: 0.85, lineHeight: 1.6 }}>
          Fulfillment Certainty Standard. No listings. No rankings. You start by expressing intent.
        </p>

        <form action="/search/" method="get" style={{ display: "flex", gap: 10 }}>
          <input
            name="q"
            placeholder="Enter your intent (e.g., “hire a surgeon for second opinion”, “buy a 4k camera”, “move to Dubai”)"
            style={{
              flex: 1,
              padding: "14px 14px",
              fontSize: 14,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              color: "white",
              outline: "none"
            }}
          />
          <button
            type="submit"
            style={{
              padding: "14px 16px",
              fontSize: 14,
              borderRadius: 12,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.14)",
              color: "white",
              cursor: "pointer"
            }}
          >
            Search
          </button>
        </form>

        <div style={{ marginTop: 18, display: "flex", gap: 14, flexWrap: "wrap", opacity: 0.9 }}>
          <Link href="/docs/rfc/" style={{ color: "white", textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)", padding: "8px 10px", borderRadius: 999 }}>RFCs</Link>
          <Link href="/docs/schemas/" style={{ color: "white", textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)", padding: "8px 10px", borderRadius: 999 }}>Schemas</Link>
          <Link href="/docs/conformance/" style={{ color: "white", textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)", padding: "8px 10px", borderRadius: 999 }}>Conformance</Link>
          <Link href="/docs/governance/" style={{ color: "white", textDecoration: "none", border: "1px solid rgba(255,255,255,0.12)", padding: "8px 10px", borderRadius: 999 }}>Governance</Link>
        </div>

        <p style={{ marginTop: 22, opacity: 0.65, fontSize: 12, lineHeight: 1.6 }}>
          This site is intentionally minimal: a terminal + canonical documentation. Intelligence lives in the API, not the UI.
        </p>
      </div>
    </main>
  );
}
