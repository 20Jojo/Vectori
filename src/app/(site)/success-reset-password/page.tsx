import type { Metadata } from "next";
import { ResetSuccess } from "@/components/sites/vectori/AuthForms";
import { PanelFrame } from "@/components/sites/vectori/PageParts";

export const metadata: Metadata = { title: "Vectori | password updated" };

export default function Page() {
  return (
    <PanelFrame>
      <ResetSuccess />
    </PanelFrame>
  );
}
