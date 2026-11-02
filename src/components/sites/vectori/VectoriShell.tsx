import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Announcement } from "./Announcement";
import { vectoriFontVariables } from "./fonts";
import { CookieNotice, Footer } from "./InteractiveSections";
import "./vectori.css";
import "./pages.css";

/** Announcement bar, page content, footer and cookie notice — shared by every route. */
export function VectoriShell({ children }: { children: ReactNode }) {
  return (
    <div className={cn("vectori", vectoriFontVariables)}>
      <Announcement />
      <main>{children}</main>
      <Footer />
      <CookieNotice />
    </div>
  );
}
