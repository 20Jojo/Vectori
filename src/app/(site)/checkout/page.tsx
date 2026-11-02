import type { Metadata } from "next";
import { Suspense } from "react";
import { PanelFrame } from "@/components/sites/vectori/PageParts";
import { CheckoutView } from "@/components/sites/vectori/Commerce";

export const metadata: Metadata = { title: "Vectori | checkout" };

export default function Page() {
  return (
    <PanelFrame>
      <Suspense>
        <CheckoutView />
      </Suspense>
    </PanelFrame>
  );
}
