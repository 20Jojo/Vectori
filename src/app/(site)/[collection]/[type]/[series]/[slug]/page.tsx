import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CreatorVideos, FaqSplit, Tutorial } from "@/components/sites/vectori/ContentBlocks";
import { accordionsFor, bundlesFor, findProduct, pagePricing, templatesFor } from "@/components/sites/vectori/data/catalog";
import { productFaq } from "@/components/sites/vectori/data/content";
import { Features, Reviews } from "@/components/sites/vectori/InteractiveSections";
import { PanelFrame } from "@/components/sites/vectori/PageParts";
import { ProductDetail } from "@/components/sites/vectori/ProductDetail";

type Props = { params: Promise<{ collection: string; type: string; series: string; slug: string }> };

async function load(params: Props["params"]) {
  const { collection, type, series, slug } = await params;
  return findProduct(collection, type, series, slug);
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await load(params);
  return { title: product ? `Vectori | ${product.title} ${product.defaultTitle}` : "Vectori" };
}

/** Delivery estimate shown under "start my design": the source quotes roughly 3 weeks out. */
function deliveryDate() {
  const d = new Date(Date.now() + 20 * 24 * 60 * 60 * 1000);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "long" });
}

export default async function ProductPage({ params }: Props) {
  const product = await load(params);
  if (!product) notFound();

  const templates = templatesFor(product).map((t) => ({ slug: t.slug, name: t.name, href: t.href, cover: t.cover, isNew: t.isNew }));
  const accordions = accordionsFor(product).map((a) => ({
    title: a.title,
    html: a.html,
    kind: a.title.startsWith("how thick") ? ("thickness" as const) : ("html" as const),
  }));

  return (
    <>
      <PanelFrame>
        <ProductDetail
          product={{
            slug: product.slug,
            title: product.title,
            defaultTitle: product.defaultTitle,
            href: product.href,
            cover: product.cover,
            gallery: product.gallery,
            reviews: product.reviews,
            basePrice: product.basePrice,
            price: product.price,
            discount: product.discount,
            type: product.type,
          }}
          templates={templates}
          bundles={bundlesFor(product)}
          accordions={accordions}
          perPage={pagePricing.perPage}
          perPageBase={pagePricing.perPageBase}
          deliveryDate={deliveryDate()}
        />
      </PanelFrame>
      <CreatorVideos />
      <Tutorial />
      <div id="reviews">
        <Reviews />
      </div>
      <Features />
      <FaqSplit items={productFaq} image="/sites/vectori/static/faq.jpg" />
    </>
  );
}
