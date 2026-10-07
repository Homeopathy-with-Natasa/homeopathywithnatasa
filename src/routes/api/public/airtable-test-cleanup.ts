import { createFileRoute } from "@tanstack/react-router";

/** TEMPORARY one-off test cleanup endpoint. Delete after use. */
export const Route = createFileRoute("/api/public/airtable-test-cleanup")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { key, deletions } = (await request.json()) as {
          key?: string;
          deletions?: { table: string; ids: string[] }[];
        };
        if (key !== "cleanup-2026-10-07" || !Array.isArray(deletions)) {
          return Response.json({ ok: false }, { status: 403 });
        }
        const { airtable } = await import("../../../lib/airtable.server");
        const results: unknown[] = [];
        for (const d of deletions) {
          for (const id of d.ids) {
            results.push(await airtable(`${d.table}/${id}`, { method: "DELETE" }));
          }
        }
        return Response.json({ ok: true, results });
      },
    },
  },
});
