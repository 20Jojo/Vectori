import type { Metadata } from "next";
import { Suspense } from "react";
import { LoginForm } from "@/components/sites/vectori/AuthForms";
import { PanelFrame } from "@/components/sites/vectori/PageParts";

export const metadata: Metadata = { title: "Vectori | login" };

export default function Page() {
  return (
    <PanelFrame>
      <Suspense>
        <LoginForm />
      </Suspense>
    </PanelFrame>
  );
}
