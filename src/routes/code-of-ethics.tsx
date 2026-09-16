import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/code-of-ethics")({
  head: () => ({
    meta: [
      { title: "Code of Ethics | Homeopathy with Natasa" },
      {
        name: "description",
        content:
          "The professional standards Nataša Perić practises to, as a member of the Complementary Therapist Association.",
      },
      { property: "og:title", content: "Code of Ethics | Homeopathy with Natasa" },
      {
        property: "og:description",
        content: "Confidentiality, consent, scope of practice and honesty.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <LegalPage base="ethics" />,
});
