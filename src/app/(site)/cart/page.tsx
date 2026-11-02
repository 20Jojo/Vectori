import type { Metadata } from "next";
import { Suspense } from "react";
import { PanelFrame } from "@/components/sites/vectori/PageParts";
import { CartView } from "@/components/sites/vectori/Commerce";

export const metadata: Metadata = { title: "Vectori | cart" };

export default function Page() {
  return (
    <PanelFrame>
      <Suspense>
        <CartView />
      </Suspense>
    </PanelFrame>
  );
}
