import type { Metadata } from "next";
import { Suspense } from "react";
import { PanelFrame } from "@/components/sites/vectori/PageParts";
import { OrderConfirmation } from "@/components/sites/vectori/Commerce";

export const metadata: Metadata = { title: "Vectori | order confirmed" };

export default function Page() {
  return (
    <PanelFrame>
      <Suspense>
        <OrderConfirmation />
      </Suspense>
    </PanelFrame>
  );
}
