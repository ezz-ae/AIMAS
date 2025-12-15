import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import Ajv from "ajv";
import { v4 as uuidv4 } from "uuid";
import fs from "node:fs";
import path from "node:path";

const PORT = Number(process.env.PORT || 8080);
const ALLOW_CORS = process.env.AIMAS_ALLOW_CORS === "1";
const CORS_ORIGIN = process.env.CORS_ORIGIN;
const PROTOCOL_VERSION = process.env.AIMAS_PROTOCOL_VERSION || "dev";
const COMMIT_SHA = process.env.AIMAS_COMMIT_SHA || "local";
const STARTED_AT = Date.now();
const OPENAPI_PATH = path.resolve(process.cwd(), "..", "..", "openapi.yaml");
const SERVICE_TIER = process.env.AIMAS_SERVICE_TIER || "baseline";
const RATE_LIMIT = Number(process.env.AIMAS_RATE_LIMIT || "60");
const RATE_WINDOW = Number(process.env.AIMAS_RATE_WINDOW || "60");
const GATE_ID = process.env.AIMAS_GATE_ID || "aimas-gate-us-central";

const app = express();
app.use(express.json({ limit: "256kb" }));
app.use(helmet());
app.use(morgan("combined"));
if (ALLOW_CORS) {
  const allowed = CORS_ORIGIN ? CORS_ORIGIN.split(",").map((value) => value.trim()).filter(Boolean) : true;
  app.use(cors({ origin: allowed }));
}

app.use((_req, res, next) => {
  const runId = uuidv4();
  res.setHeader("X-AIMAS-Version", PROTOCOL_VERSION);
  res.setHeader("X-AIMAS-Tier", SERVICE_TIER);
  res.setHeader("X-Rate-Limit-Limit", String(RATE_LIMIT));
  res.setHeader("X-Rate-Limit-Remaining", Math.max(0, RATE_LIMIT - 1).toString());
  res.setHeader("X-Rate-Limit-Reset", RATE_WINDOW.toString());
  res.setHeader("X-AIMAS-Run-Id", runId);
  res.setHeader("Cache-Control", "no-store");
  (res.locals as any).runId = runId;
  next();
});

const intents = new Map<string, any>();

const schemaDir = path.resolve(process.cwd(), "../../schemas");
const ajv = new Ajv({ allErrors: true, strict: false });

function loadSchema(name: string) {
  const p = path.join(schemaDir, name);
  const raw = fs.readFileSync(p, "utf-8");
  return JSON.parse(raw);
}

const validateIntent = ajv.compile(loadSchema("intent_capsule.json"));
const validateFit = ajv.compile(loadSchema("fit_matrix.json"));

function assertNoRawArchival(payload: any) {
  const forbiddenKeys = ["intent_text", "transcript", "raw_text", "conversation", "messages"];
  const flat = JSON.stringify(payload).toLowerCase();
  for (const k of forbiddenKeys) {
    if (flat.includes(`"${k.toLowerCase()}"`)) {
      const err: any = new Error(`Forbidden archival field detected: ${k}`);
      err.status = 400;
      throw err;
    }
  }
}

function assertFairness(fm: any) {
  const hasFree = Array.isArray(fm.paths) && fm.paths.some((p: any) => p?.free_baseline === true);
  if (!hasFree) {
    const err: any = new Error("Fairness violation: Fit Matrix must include at least one free_baseline path.");
    err.status = 400;
    throw err;
  }
}

app.get("/", (_req, res) => {
  res.json({ service: "aimas-api", protocol_version: PROTOCOL_VERSION, commit: COMMIT_SHA });
});

app.get("/healthz", (_req, res) => res.json({ ok: true }));
app.get("/readyz", (_req, res) => res.json({ ok: true }));
app.get("/livez", (_req, res) => res.json({ ok: true }));

app.get("/v1/status", (_req, res) => {
  const uptimeSeconds = Math.floor((Date.now() - STARTED_AT) / 1000);
  res.json({
    ok: true,
    protocol_version: PROTOCOL_VERSION,
    commit: COMMIT_SHA,
    started_at: new Date(STARTED_AT).toISOString(),
    uptime_seconds: uptimeSeconds,
    service_tier: SERVICE_TIER,
  });
});

app.get("/v1/schemas", (_req, res) => {
  res.json({ schemas: ["intent_capsule.json", "fit_matrix.json", "nyk.json", "force_note.json", "was_feedback.json"] });
});

app.get(["/openapi.yaml", "/openapi.yml"], (_req, res, next) => {
  try {
    if (!fs.existsSync(OPENAPI_PATH)) {
      return res.status(404).json({ error: "openapi spec missing" });
    }
    const body = fs.readFileSync(OPENAPI_PATH, "utf-8");
    res.type("application/yaml").send(body);
  } catch (err) {
    next(err);
  }
});

app.post("/v1/intent", (req, res, next) => {
  try {
    const body = req.body ?? {};
    assertNoRawArchival(body);

    const intent_id = body.intent_id || uuidv4();
    const capsule = { ...body, intent_id };

    const ok = validateIntent(capsule);
    if (!ok) return res.status(400).json({ error: "Intent schema validation failed", details: validateIntent.errors });

    intents.set(intent_id, capsule);
    res.status(201).json({
      intent_id,
      audit: {
        protocol_version: PROTOCOL_VERSION,
        issued_at: new Date().toISOString(),
        gate_id: GATE_ID,
        run_id: (res.locals as any).runId,
      },
    });
  } catch (e) {
    next(e);
  }
});

app.post("/v1/fit/:intent_id", (req, res, next) => {
  try {
    const intent_id = req.params.intent_id;
    const capsule = intents.get(intent_id);
    if (!capsule) return res.status(404).json({ error: "Intent not found" });

    const sensitivity = capsule?.intent_features?.sensitivity ?? "medium";
    const baseProb = sensitivity === "critical" ? 55 : sensitivity === "high" ? 65 : sensitivity === "low" ? 85 : 75;

    const fm = {
      intent_id,
      eta_hours: 24,
      success_probability: baseProb,
      confidence_level: "medium",
      sensitivity_tag: sensitivity,
      paths: [
        {
          path_id: "free_baseline",
          type: "free_baseline",
          eta_hours: 72,
          success_probability: Math.max(0, baseProb - 15),
          free_baseline: true,
          price: null,
          guarantees: ["baseline_access"]
        },
        {
          path_id: "paid_accelerator",
          type: "paid_accelerator",
          eta_hours: 24,
          success_probability: Math.min(100, baseProb + 8),
          free_baseline: false,
          price: { amount: 19, currency: "USD" },
          guarantees: ["priority_routing", "verification_step"]
        }
      ],
      audit: {
        protocol_version: PROTOCOL_VERSION,
        issued_at: new Date().toISOString(),
        gate_id: GATE_ID,
        run_id: (res.locals as any).runId,
      },
    };

    const ok = validateFit(fm);
    if (!ok) return res.status(500).json({ error: "Fit matrix invalid", details: validateFit.errors });

    assertFairness(fm);
    res.json(fm);
  } catch (e) {
    next(e);
  }
});

app.post("/v1/conformance/validate", (req, res) => {
  const { schema, payload } = req.body ?? {};
  if (!schema || !payload) return res.status(400).json({ error: "Provide { schema, payload }" });

  try { assertNoRawArchival(payload); } catch (e: any) { return res.status(400).json({ ok: false, error: e.message }); }

  const validator = schema === "intent_capsule.json" ? validateIntent : schema === "fit_matrix.json" ? validateFit : null;
  if (!validator) return res.status(400).json({ error: "Unknown schema" });

  const ok = validator(payload);
  res.json({ ok, errors: ok ? [] : validator.errors });
});

app.use((err: any, _req: any, res: any, _next: any) => {
  res.status(err?.status || 500).json({ error: err?.message || "Internal error" });
});

app.listen(PORT, () => console.log(`AIMAS API ${PROTOCOL_VERSION} (${COMMIT_SHA}) listening on :${PORT}`));
