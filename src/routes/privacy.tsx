import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Homeopathy with Natasa" },
      {
        name: "description",
        content: "How Nataša Perić collects, uses and protects your personal information.",
      },
      { property: "og:title", content: "Privacy Policy | Homeopathy with Natasa" },
      {
        property: "og:description",
        content: "How your personal and health information is handled.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <LegalPage base="privacy" />,
});
