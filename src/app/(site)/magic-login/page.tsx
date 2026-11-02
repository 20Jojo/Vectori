import type { Metadata } from "next";
import { MagicLinkExpired } from "@/components/sites/vectori/AuthForms";
import { PanelFrame } from "@/components/sites/vectori/PageParts";

export const metadata: Metadata = { title: "Vectori | sign in" };

export default function Page() {
  return (
    <PanelFrame>
      <MagicLinkExpired />
    </PanelFrame>
  );
}
