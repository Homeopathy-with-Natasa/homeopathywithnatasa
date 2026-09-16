import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/site/LegalPage";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms and Conditions | Homeopathy with Natasa" },
      {
        name: "description",
        content: "Terms for consultations, fees, cancellations and the use of this website.",
      },
      { property: "og:title", content: "Terms and Conditions | Homeopathy with Natasa" },
      {
        property: "og:description",
        content: "The terms on which consultations are provided.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: () => <LegalPage base="terms" />,
});
