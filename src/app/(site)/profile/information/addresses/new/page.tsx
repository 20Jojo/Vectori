import type { Metadata } from "next";
import { Suspense } from "react";
import { PanelFrame } from "@/components/sites/vectori/PageParts";
import { ProfileShell, AddressForm } from "@/components/sites/vectori/Profile";

export const metadata: Metadata = { title: "Vectori | new address" };

export default function Page() {
  return (
    <PanelFrame>
      <Suspense>
        <ProfileShell title="new address">
          <AddressForm />
        </ProfileShell>
      </Suspense>
    </PanelFrame>
  );
}
