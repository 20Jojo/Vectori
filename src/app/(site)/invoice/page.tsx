import type { Metadata } from "next";
import { Suspense } from "react";
import { PanelFrame } from "@/components/sites/vectori/PageParts";
import { InvoiceView } from "@/components/sites/vectori/Commerce";

export const metadata: Metadata = { title: "Vectori | invoice" };

export default function Page() {
  return (
    <PanelFrame>
      <Suspense>
        <InvoiceView />
      </Suspense>
    </PanelFrame>
  );
}
