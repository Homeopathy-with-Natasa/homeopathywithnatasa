import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { CookieBanner } from "./CookieBanner";

export function SiteLayout({
  children,
  footerFrom = "green-100",
}: {
  children: ReactNode;
  footerFrom?: "background" | "green-100";
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer from={footerFrom} />
      <CookieBanner />
    </div>
  );
}
