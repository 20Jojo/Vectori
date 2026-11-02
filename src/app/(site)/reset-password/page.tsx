import type { Metadata } from "next";
import { ResetPasswordForm } from "@/components/sites/vectori/AuthForms";
import { PanelFrame } from "@/components/sites/vectori/PageParts";

export const metadata: Metadata = { title: "Vectori | reset password" };

export default function Page() {
  return (
    <PanelFrame>
      <ResetPasswordForm />
    </PanelFrame>
  );
}
