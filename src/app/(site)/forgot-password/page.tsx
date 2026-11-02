import type { Metadata } from "next";
import { NewPasswordForm } from "@/components/sites/vectori/AuthForms";
import { PanelFrame } from "@/components/sites/vectori/PageParts";

export const metadata: Metadata = { title: "Vectori | new password" };

export default function Page() {
  return (
    <PanelFrame>
      <NewPasswordForm />
    </PanelFrame>
  );
}
