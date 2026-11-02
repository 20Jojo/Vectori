import type { Metadata } from "next";
import { Suspense } from "react";
import { PanelFrame } from "@/components/sites/vectori/PageParts";
import { ProfileShell, AddressesView } from "@/components/sites/vectori/Profile";

export const metadata: Metadata = { title: "Vectori | addresses" };

export default function Page() {
  return (
    <PanelFrame>
      <Suspense>
        <ProfileShell title="addresses">
          <AddressesView />
        </ProfileShell>
      </Suspense>
    </PanelFrame>
  );
}
