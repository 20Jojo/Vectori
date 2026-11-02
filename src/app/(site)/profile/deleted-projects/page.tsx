import type { Metadata } from "next";
import { Suspense } from "react";
import { PanelFrame } from "@/components/sites/vectori/PageParts";
import { ProfileShell, ProjectsView } from "@/components/sites/vectori/Profile";

export const metadata: Metadata = { title: "Vectori | deleted projects" };

export default function Page() {
  return (
    <PanelFrame>
      <Suspense>
        <ProfileShell title="deleted projects">
          <ProjectsView deleted />
        </ProfileShell>
      </Suspense>
    </PanelFrame>
  );
}
