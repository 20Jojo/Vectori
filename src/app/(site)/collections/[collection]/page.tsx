import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { collections, featuredFor, toCard, type CollectionId } from "@/components/sites/vectori/data/catalog";
import { PageBanner } from "@/components/sites/vectori/PageParts";
import { PixButton } from "@/components/sites/vectori/PixButton";
import { ProductCard } from "@/components/sites/vectori/ProductSlider";

type Props = { params: Promise<{ collection: string }> };

export function generateStaticParams() {
  return collections.map((c) => ({ collection: c.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { collection } = await params;
  return { title: `Vectori | ${collection}` };
}

export default async function CollectionPage({ params }: Props) {
  const { collection } = await params;
  const current = collections.find((c) => c.id === collection);
  if (!current) notFound();
  const cards = featuredFor(current.id as CollectionId).map(toCard);

  return (
    <>
      <PageBanner title="" image={current.banner} />
      <section className="px-container">
        <div className="px-filters">
          <div className="px-filters__row">
            {collections.map((c) => (
              <PixButton key={c.id} href={`/collections/${c.id}`} size="md2" variant={c.id === current.id ? "grey" : "outlined"}>
                {c.label}
              </PixButton>
            ))}
          </div>
        </div>
      </section>
      <section className="px-container">
        <div className={cards.length > 3 ? "px-grid-panel" : "px-grid-panel px-grid-panel--fit"}>
          <div className="px-grid">
            {cards.map((card) => (
              <ProductCard key={card.href} product={card} showCta={false} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
