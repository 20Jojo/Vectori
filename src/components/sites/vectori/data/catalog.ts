import "server-only";
import catalogJson from "./catalog.json";
import featuredJson from "./featured.json";
import extrasJson from "./series-extras.json";

// Product catalog captured from the source site's own product-list responses (728 products).
// Image paths are stored relative to public/sites/vectori/catalog/.

type RawSeries = { collection: string; type: string; name: string; slug: string; gallery: string[] };
type RawProduct = {
  id: number;
  slug: string;
  title: string;
  series: string;
  description: string;
  isNew: boolean;
  priority: number;
  cover: string;
  thumb: string;
  hover?: string;
  gallery?: string[];
  reviews: number;
  base: number;
  price: number;
  discount: number;
  defaultTitle: string;
  pf: string;
  pid: string;
};

const catalog = catalogJson as unknown as { imageBase: string; series: Record<string, RawSeries>; products: RawProduct[] };

const image = (path?: string) => (path ? catalog.imageBase + path : "");

export type ProductType = "custom-photobook" | "custom-magazine";

export type Product = {
  id: number;
  slug: string;
  title: string;
  name: string;
  defaultTitle: string;
  tagline: string;
  isNew: boolean;
  collection: string;
  type: ProductType;
  seriesName: string;
  seriesSlug: string;
  href: string;
  cover: string;
  hover: string;
  gallery: string[];
  reviews: number;
  basePrice: number;
  price: number;
  discount: number;
  printboxFamilyId: string;
  printboxProductId: string;
  priority: number;
};

function toProduct(p: RawProduct): Product {
  const s = catalog.series[p.series];
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    // template tiles show the title without the variant suffix ("Paris 1" -> "Paris")
    name: p.title.replace(/\s+\d+$/, ""),
    defaultTitle: p.defaultTitle,
    tagline: p.description,
    isNew: p.isNew,
    collection: s.collection,
    type: s.type as ProductType,
    seriesName: s.name,
    seriesSlug: s.slug,
    href: `/${s.collection}/${s.type}/${s.slug}/${encodeURIComponent(p.slug)}`,
    cover: image(p.cover),
    hover: image(p.hover || p.cover),
    gallery: (p.gallery ?? s.gallery).map(image),
    reviews: p.reviews,
    basePrice: p.base,
    price: p.price,
    discount: p.discount,
    printboxFamilyId: p.pf,
    printboxProductId: p.pid,
    priority: p.priority ?? 0,
  };
}

const products = catalog.products.map(toProduct);

/** Display label used on cards ("the travel series" -> "travel series"). */
export function seriesLabel(name: string) {
  return name.replace(/^the /, "").replace("postcard from", "postcards from");
}

/** Shape used by the shared product card component. */
export function toCard(p: Product) {
  return {
    href: p.href,
    series: seriesLabel(p.seriesName),
    isNew: p.isNew,
    image: p.cover,
    hoverImage: p.hover,
    reviews: p.reviews,
    type: p.defaultTitle,
    tagline: p.tagline,
    price: "$" + p.price.toFixed(2),
  };
}

export function allProducts() {
  return products;
}

export function findProduct(collection: string, type: string, series: string, slug: string) {
  const decoded = decodeURIComponent(slug);
  return products.find(
    (p) => p.collection === collection && p.type === type && p.seriesSlug === series && p.slug === decoded,
  );
}

export function findProductBySlug(slug: string) {
  return products.find((p) => p.slug === slug);
}

/**
 * Template picker contents, matched against the source's observed counts: products in the same
 * series and Printbox product family, plus "start from scratch" (photobooks only). The flagship
 * travel series instead lists its whole family across the travel collection (301 on the source).
 * The travel edit shows 153 of 200 on the source by a rule not visible from outside; all are listed here.
 */
export function templatesFor(product: Product) {
  const scratch = products.find((p) => p.collection === "scratch" && p.type === product.type);
  const sameFamily = (p: Product) => p.type === product.type && p.collection === product.collection && p.printboxFamilyId === product.printboxFamilyId;
  const siblings =
    product.seriesSlug === "the-travel-series"
      ? products.filter(sameFamily)
      : product.seriesSlug === "baby-series"
        ? products.filter((p) => p.type === product.type && p.seriesSlug === product.seriesSlug)
        : products.filter((p) => sameFamily(p) && p.seriesSlug === product.seriesSlug);
  const sorted = [...siblings].sort((a, b) => b.priority - a.priority);
  return scratch && product.collection !== "scratch" ? [scratch, ...sorted] : sorted;
}

export type CollectionId = "all" | "travel" | "yearbooks" | "romance" | "baby";

export const collections: { id: CollectionId; label: string; banner: string }[] = [
  { id: "all", label: "shop all", banner: "/sites/vectori/static/desktop-header.jpg" },
  { id: "travel", label: "travel", banner: "/sites/vectori/static/collection-travel.jpg" },
  { id: "yearbooks", label: "yearbooks", banner: "/sites/vectori/static/desktop-header.jpg" },
  { id: "romance", label: "romance", banner: "/sites/vectori/static/collection-relations.jpg" },
  { id: "baby", label: "baby", banner: "/sites/vectori/static/collection-travel.jpg" },
];

/** Series cards shown on collection pages (the source's "featured per series" list, filtered by collection). */
export function featuredFor(collection: CollectionId) {
  const list = (featuredJson as { type: string; collection: string; slug: string }[])
    .map((f) => products.find((p) => p.type === f.type && p.collection === f.collection && p.slug === f.slug))
    .filter((p): p is Product => Boolean(p));
  return collection === "all" ? list : list.filter((p) => p.collection === collection);
}

// ---------- series-level extras ----------

const bundlePrefix: Record<string, string> = {
  "baby-series": "baby",
  "moments-series": "moments",
  "honeymoon-series": "honeymoon",
  "romance-series": "romance",
  "summer-edit": "summer-edit",
  "the-travel-edit": "travel-edit",
  "autumn-series": "autumn",
  "city-break-series": "city-break",
  "postcard-from-summer-series": "postcards-from-summer",
  "spring-bloom-series": "spring-bloom",
  "stamped-series": "stamped",
  "summer-series": "summer",
  "the-travel-series": "travel",
  "winter-snow-series": "winter-snow",
  "yearbook-series": "year-book",
  "start-from-scratch": "travel",
};

export function bundlesFor(product: Product) {
  const prefix = bundlePrefix[product.seriesSlug] ?? "travel";
  return [
    { label: "single", save: "save 40%", image: `/sites/vectori/static/${prefix}-single.png` },
    { label: "duo", save: "save 45%", image: `/sites/vectori/static/${prefix}-duo.png` },
    { label: "trio", save: "save 50%", image: `/sites/vectori/static/${prefix}-trio.png` },
  ];
}

type Accordion = { title: string; html: string | null };
const extras = extrasJson as Record<string, { accordions: Accordion[] }>;
const photobookAccordions = extras["travel|custom-photobook|the travel series"].accordions;
const magazineAccordions = extras["travel|custom-magazine|the travel edit"].accordions;

/** Product detail accordions ("how thick will my book be?", "how it works", ...). */
export function accordionsFor(product: Product) {
  return product.type === "custom-magazine" ? magazineAccordions : photobookAccordions;
}

/** The source shows per-type list prices on product pages (from $X, then $Y per page). */
export const pagePricing = { perPage: 2.39, perPageBase: 3.98 };
