import { createServerFn } from "@tanstack/react-start";
import { getRequest, getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";

/**
 * Contact form submissions are written to Airtable from the server only.
 * The Airtable personal access token lives in the AIRTABLE_TOKEN secret and is
 * never exposed to the browser. Base and table IDs are not sensitive.
 */
const AIRTABLE_BASE_ID = "appICNZKOYf768sqI";
const AIRTABLE_TABLE_ID = "tbl9xlDtj9L1XOciC";
const AIRTABLE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_ID}`;

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
  lang: z.enum(["en", "hr"]).default("en"),
  /** Honeypot: must stay empty. */
  company: z.string().max(0).optional().default(""),
});

/** Very simple in-memory rate limit: 3 submissions per 10 minutes per client. */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  return recent.length > MAX_PER_WINDOW;
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

export type ContactResult = { ok: true } | { ok: false; error: string };

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => schema.parse(input))
  .handler(async ({ data }): Promise<ContactResult> => {
    if (data.company) {
      console.warn("contact form: honeypot filled, submission rejected");
      return { ok: false, error: "rejected" };
    }

    if (rateLimited(clientKey())) {
      console.warn("contact form: rate limit reached");
      return { ok: false, error: "rate_limited" };
    }

    const token = process.env["AIRTABLE_TOKEN"];
    if (!token) {
      console.error("contact form: AIRTABLE_TOKEN is not configured");
      return { ok: false, error: "not_configured" };
    }

    const today = new Date().toISOString().slice(0, 10);
    const notes = `Website contact form (${data.lang.toUpperCase()})\n\n${data.message}`;

    try {
      const res = await fetch(AIRTABLE_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                "Lead name": data.name,
                Email: data.email,
                Notes: notes,
                "Date first contacted": today,
              },
            },
          ],
        }),
      });

      if (!res.ok) {
        const body = await res.text();
        console.error(`contact form: Airtable request failed [${res.status}]: ${body}`);
        return { ok: false, error: "airtable_failed" };
      }

      return { ok: true };
    } catch (error) {
      console.error("contact form: Airtable request threw", error);
      return { ok: false, error: "network_failed" };
    }
  });
