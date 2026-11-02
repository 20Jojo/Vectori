import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { helpPage, helpSlugs } from "@/components/sites/vectori/data/content";
import { PageBanner } from "@/components/sites/vectori/PageParts";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return helpSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const page = helpPage((await params).slug);
  return { title: page ? `Vectori | ${page.title}` : "Vectori" };
}

export default async function HelpPage({ params }: Props) {
  const page = helpPage((await params).slug);
  if (!page) notFound();
  return (
    <PageBanner title={page.title} image={page.banner}>
      {/* Legal text captured from the source page, rendered as static markup. */}
      <div className="px-legal" dangerouslySetInnerHTML={{ __html: page.body }} />
    </PageBanner>
  );
}
