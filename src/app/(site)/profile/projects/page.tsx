import type { Metadata } from "next";
import { Suspense } from "react";
import { PanelFrame } from "@/components/sites/vectori/PageParts";
import { ProfileShell, ProjectsView } from "@/components/sites/vectori/Profile";

export const metadata: Metadata = { title: "Vectori | my projects" };

export default function Page() {
  return (
    <PanelFrame>
      <Suspense>
        <ProfileShell title="my projects">
          <ProjectsView />
        </ProfileShell>
      </Suspense>
    </PanelFrame>
  );
}
