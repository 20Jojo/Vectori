import type { Metadata } from "next";
import { Suspense } from "react";
import { PanelFrame } from "@/components/sites/vectori/PageParts";
import { ProfileShell, InformationView } from "@/components/sites/vectori/Profile";

export const metadata: Metadata = { title: "Vectori | my information" };

export default function Page() {
  return (
    <PanelFrame>
      <Suspense>
        <ProfileShell title="my information">
          <InformationView />
        </ProfileShell>
      </Suspense>
    </PanelFrame>
  );
}
