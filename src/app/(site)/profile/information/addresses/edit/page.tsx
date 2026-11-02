import type { Metadata } from "next";
import { Suspense } from "react";
import { PanelFrame } from "@/components/sites/vectori/PageParts";
import { ProfileShell, AddressForm } from "@/components/sites/vectori/Profile";

export const metadata: Metadata = { title: "Vectori | edit address" };

export default function Page() {
  return (
    <PanelFrame>
      <Suspense>
        <ProfileShell title="edit address">
          <AddressForm />
        </ProfileShell>
      </Suspense>
    </PanelFrame>
  );
}
