"use client";
import { useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [out, setOut] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  const API_BASE = process.env.NEXT_PUBLIC_AIMAS_API_BASE || "";

  async function run() {
    setErr(null); setOut(null); setLoading(true);
    try {
      if (!API_BASE) throw new Error("Missing NEXT_PUBLIC_AIMAS_API_BASE");

      const capsule = {
        actor_id: "anon",
        domain: "other",
        mode: "plan",
        captured_at: new Date().toISOString(),
        intent_features: { category: "unknown", constraints: [], sensitivity: "medium", time_constraint: "unspecified" },
        raw_payload_ref: null
      };

      const r1 = await fetch(`${API_BASE}/v1/intent`, { method: "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify(capsule) });
      const j1 = await r1.json();
      if (!r1.ok) throw new Error(j1?.error || "Intent create failed");

      const r2 = await fetch(`${API_BASE}/v1/fit/${j1.intent_id}`, { method: "POST" });
      const j2 = await r2.json();
      if (!r2.ok) throw new Error(j2?.error || "Fit failed");

      setOut(j2);
    } catch (e: any) {
      setErr(e?.message || "Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", padding: 24 }}>
      <div style={{ width: "min(920px, 100%)" }}>
        <div style={{ marginBottom: 18, opacity: 0.9 }}>
          <div style={{ fontSize: 14, textTransform: "uppercase", opacity: 0.7 }}>AIMAS</div>
          <div style={{ fontSize: 28, fontWeight: 700, marginTop: 6 }}>Protocol Terminal</div>
          <div style={{ fontSize: 14, opacity: 0.75, marginTop: 8 }}>Search-only. Output is Fit Matrix + paths.</div>
        </div>

        <button onClick={run} disabled={loading} style={{
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.14)",
          background: loading ? "#1a1b22" : "#ffffff",
          color: loading ? "#aaa" : "#000",
          padding: "10px 14px",
          fontWeight: 700,
          cursor: loading ? "not-allowed" : "pointer"
        }}>
          {loading ? "Computing…" : "Search"}
        </button>

        {err && <div style={{ marginTop: 14, color: "#ff7b7b", fontSize: 14 }}>{err}</div>}

        {out && (
          <div style={{ marginTop: 18, background: "#0f1016", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, padding: 16 }}>
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Fit Matrix</div>
            <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", fontSize: 13, opacity: 0.9 }}>
{JSON.stringify(out, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
