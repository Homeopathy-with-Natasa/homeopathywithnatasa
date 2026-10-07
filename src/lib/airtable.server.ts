import { getRequest, getRequestHeader } from "@tanstack/react-start/server";

/** Airtable base and table IDs are not sensitive; the token lives in AIRTABLE_TOKEN. */
export const AIRTABLE_BASE_ID = "app7rrOQ1AmHtFOgp";
export const TABLES = {
  leads: "tbl9xlDtj9L1XOciC",
  clients: "tblFXj6UA3nhcgkmU",
  intake: "tblmnF5GAy4sEwPMa",
} as const;

export class AirtableError extends Error {
  constructor(
    public status: number,
    public body: string,
  ) {
    super(`Airtable request failed [${status}]: ${body}`);
  }
}

export async function airtable<T = unknown>(
  path: string,
  init: { method?: string; body?: unknown; query?: Record<string, string> } = {},
): Promise<T> {
  const token = process.env["AIRTABLE_TOKEN"];
  if (!token) throw new AirtableError(0, "AIRTABLE_TOKEN is not configured");
  const url = new URL(`https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${path}`);
  for (const [k, v] of Object.entries(init.query ?? {})) url.searchParams.set(k, v);
  const res = await fetch(url, {
    method: init.method ?? "GET",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: init.body === undefined ? undefined : JSON.stringify(init.body),
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`Airtable ${init.method ?? "GET"} ${path} failed [${res.status}]: ${body}`);
    throw new AirtableError(res.status, body);
  }
  return (await res.json()) as T;
}

/** Very simple in-memory rate limit per client and bucket. */
const hits = new Map<string, number[]>();
export function rateLimited(bucket: string, max = 3, windowMs = 10 * 60 * 1000): boolean {
  const key = `${bucket}:${clientKey()}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > max;
}

function clientKey(): string {
  const forwarded = getRequestHeader("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return (
    getRequestHeader("cf-connecting-ip") ??
    getRequestHeader("x-real-ip") ??
    new URL(getRequest().url).hostname
  );
}

export function today(): string {
  return new Date().toISOString().slice(0, 10);
}
