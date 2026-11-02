import type { Metadata } from "next";
import { Suspense } from "react";
import { EditorStub } from "@/components/sites/vectori/Commerce";
import { findProductBySlug } from "@/components/sites/vectori/data/catalog";
import { PanelFrame } from "@/components/sites/vectori/PageParts";

export const metadata: Metadata = { title: "Vectori | editor" };

type Props = { searchParams: Promise<{ product?: string }> };

export default async function PrintboxPage({ searchParams }: Props) {
  const { product: slug } = await searchParams;
  const p = slug ? findProductBySlug(slug) : undefined;
  const ref = p
    ? { productSlug: p.slug, href: p.href, title: p.title, seriesName: p.seriesName, type: p.type, cover: p.cover, basePrice: p.basePrice }
    : null;
  return (
    <PanelFrame>
      <Suspense>
        <EditorStub product={ref} />
      </Suspense>
    </PanelFrame>
  );
}
