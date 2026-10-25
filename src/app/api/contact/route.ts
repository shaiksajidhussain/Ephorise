import { getProject } from "@/data/projects";
import { budgetLabel, serviceLabel, validateInquiry } from "@/lib/inquiry";

const hits = new Map<string, number[]>();

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < 10 * 60 * 1000);
  if (recent.length >= 5) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function isSafeWebhook(raw: string) {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return false;
  }
  const host = url.hostname.toLowerCase();
  const local = host === "localhost" || host === "127.0.0.1";
  if (process.env.NODE_ENV !== "production" && local && (url.protocol === "http:" || url.protocol === "https:")) {
    return true;
  }
  if (url.protocol !== "https:") return false;
  if (local || host === "0.0.0.0" || host === "::1" || host.endsWith(".local")) return false;
  if (/^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[0-1])\.|169\.254\.)/.test(host)) return false;
  return true;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
  if (limited(ip)) {
    return Response.json(
      { ok: false, error: "Too many inquiries from this network. Try again later." },
      { status: 429 },
    );
  }

  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > 20_000) {
    return Response.json({ ok: false, error: "The inquiry is too long." }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "Send the inquiry as JSON." }, { status: 400 });
  }

  const honeypot =
    body && typeof body === "object" && "company_site" in body
      ? String((body as { company_site?: unknown }).company_site ?? "")
      : "";
  if (honeypot.trim()) return Response.json({ ok: true });

  const parsed = validateInquiry(body);
  if (!parsed.ok) {
    return Response.json(
      { ok: false, error: "Check the highlighted fields.", errors: parsed.errors },
      { status: 400 },
    );
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL?.trim();
  if (!webhook || !isSafeWebhook(webhook)) {
    return Response.json(
      {
        ok: false,
        code: "unconfigured",
        error:
          "Project inquiries are not being delivered yet. Add CONTACT_WEBHOOK_URL on the server and restart.",
      },
      { status: 503 },
    );
  }

  const project = parsed.value.project ? getProject(parsed.value.project) : undefined;
  const payload = {
    name: parsed.value.name,
    email: parsed.value.email,
    company: parsed.value.company,
    phone: parsed.value.phone,
    service: serviceLabel(parsed.value.service),
    budget: budgetLabel(parsed.value.budget),
    details: parsed.value.details,
    project: project?.title ?? null,
    submittedAt: new Date().toISOString(),
  };

  try {
    const forwarded = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
      redirect: "error",
    });
    if (!forwarded.ok) {
      return Response.json({ ok: false, error: "The studio endpoint rejected the inquiry." }, { status: 502 });
    }
  } catch {
    return Response.json({ ok: false, error: "The studio endpoint could not be reached." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
