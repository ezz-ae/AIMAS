export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const { q } = await searchParams;
  return (
    <main style={{ minHeight: "100vh", padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
      <h1 style={{ marginTop: 0 }}>Intent received</h1>
      <p style={{ opacity: 0.8 }}>
        Query: <b>{q || "(empty)"}</b>
      </p>

      <p style={{ maxWidth: 820, lineHeight: 1.6 }}>
        This website does not compute results. It routes you into the protocol.
        Connect the API (`apps/api`) and render the returned <b>Fit Matrix</b> here.
      </p>

      <pre style={{ background: "#0b0b0f", color: "white", padding: 16, borderRadius: 12, overflowX: "auto" }}>
{`POST /v1/intent
{ "intent": "${(q||"").replaceAll('"','\"')}" }

→ returns intent_id

GET /v1/intent/{intent_id}/fit
→ returns Fit Matrix (free baseline + optional accelerators)`}
      </pre>
    </main>
  );
}
