import type { Metadata } from "next";
import { Suspense } from "react";
import { PanelFrame } from "@/components/sites/vectori/PageParts";
import { BufferOffer } from "@/components/sites/vectori/Commerce";

export const metadata: Metadata = { title: "Vectori | add extra pages" };

export default function Page() {
  return (
    <PanelFrame>
      <Suspense>
        <BufferOffer />
      </Suspense>
    </PanelFrame>
  );
}
