import express from "express";
import cors from "cors";
import helmet from "helmet";
import { nanoid } from "nanoid";
import { z } from "zod";

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json({ limit: "1mb" }));

// ===== Deterministic core (no external AI) =====
// This is a reference skeleton: store derived features, return Fit Matrix,
// always include a free baseline path, keep raw payload transient.

const IntentIn = z.object({
  intent: z.string().min(1).max(2000),
  domain: z.string().optional(),
  mode: z.enum(["wish","plan","active","urgent"]).optional()
});

const mem = new Map(); // ephemeral dev store; replace with DB for production

app.get("/health", (_req, res) => res.json({ ok: true, service: "aimas-api", mode: "deterministic" }));

app.post("/v1/intent", (req, res) => {
  const parsed = IntentIn.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: "invalid_intent", details: parsed.error.flatten() });

  const id = nanoid(14);
  const now = new Date().toISOString();

  // derived features (placeholder): no raw archival requirements
  const features = {
    length: parsed.data.intent.length,
    hasTimeWords: /today|tomorrow|urgent|asap|now/i.test(parsed.data.intent),
    hasMoney: /aed|usd|\$|price|budget/i.test(parsed.data.intent),
  };

  mem.set(id, { id, created_at: now, domain: parsed.data.domain || "other", mode: parsed.data.mode || "active", features });

  res.json({ intent_id: id, captured_at: now, mode: parsed.data.mode || "active" });
});

app.get("/v1/intent/:id/fit", (req, res) => {
  const item = mem.get(req.params.id);
  if (!item) return res.status(404).json({ error: "intent_not_found" });

  // Deterministic Fit Matrix stub. Replace with CFS engine later.
  const eta = item.features.hasTimeWords ? 6 : 36;
  const prob = item.features.hasMoney ? 72 : 55;
  const confidence = prob >= 70 ? "high" : "medium";

  const fm = {
    intent_id: item.id,
    eta_hours: eta,
    success_probability: prob,
    confidence_level: confidence,
    sensitivity_tag: "medium",
    paths: [
      {
        path_id: "free_baseline",
        type: "free_baseline",
        eta_hours: eta,
        success_probability: prob
      },
      {
        path_id: "accelerator",
        type: "paid_accelerator",
        eta_hours: Math.max(1, Math.round(eta * 0.4)),
        success_probability: Math.min(95, prob + 15),
        price: { amount: 9.99, currency: "USD" },
        guarantees: ["priority-handling"]
      }
    ]
  };

  res.json(fm);
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`AIMAS API listening on :${port}`));
