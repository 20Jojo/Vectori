import type { Metadata } from "next";
import { Suspense } from "react";
import { PanelFrame } from "@/components/sites/vectori/PageParts";
import { ProfileShell, OrderHistoryView } from "@/components/sites/vectori/Profile";

export const metadata: Metadata = { title: "Vectori | order history" };

export default function Page() {
  return (
    <PanelFrame>
      <Suspense>
        <ProfileShell title="order history">
          <OrderHistoryView />
        </ProfileShell>
      </Suspense>
    </PanelFrame>
  );
}
