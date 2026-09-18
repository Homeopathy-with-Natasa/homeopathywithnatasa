import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/mentoring")({
  beforeLoad: () => {
    throw redirect({ to: "/supervision", statusCode: 301 });
  },
});