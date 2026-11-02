"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronNextIcon, StarIcon } from "./icons";
import { PixButton } from "./PixButton";

export type DetailProduct = {
  slug: string;
  title: string;
  defaultTitle: string;
  href: string;
  cover: string;
  gallery: string[];
  reviews: number;
  basePrice: number;
  price: number;
  discount: number;
  type: string;
};

export type TemplateTile = { slug: string; name: string; href: string; cover: string; isNew: boolean };
export type Bundle = { label: string; save: string; image: string };
export type DetailAccordion = { title: string; html: string | null; kind: "thickness" | "html" };

type Props = {
  product: DetailProduct;
  templates: TemplateTile[];
  bundles: Bundle[];
  accordions: DetailAccordion[];
  perPage: number;
  perPageBase: number;
  deliveryDate: string;
};

const GiftIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 16 16" aria-hidden="true">
    <g fill="#474747">
      <path d="M5 0H4v3H1v3h14V3h-3V0h-1a3 3 0 0 0-3 3 3 3 0 0 0-3-3M15 7.5H8.75V16H15zM7.25 16V7.5H1V16z" />
    </g>
  </svg>
);

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" fill="none" aria-hidden="true">
    <path
      fill="#353535"
      fillRule="evenodd"
      d="M8.502.75a8.25 8.25 0 1 0 5.28 14.59l5.16 5.16a.75.75 0 0 0 1.06-1.06l-5.16-5.16A8.25 8.25 0 0 0 8.502.75M1.752 9a6.75 6.75 0 1 1 13.5 0 6.75 6.75 0 0 1-13.5 0"
      clipRule="evenodd"
    />
  </svg>
);

const SmallChevron = () => (
  <svg width="13" height="8" viewBox="0 0 13 8" fill="none" aria-hidden="true">
    <path d="M1 1.375 6.25 6.625 11.5 1.375" stroke="#C6C6C6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const STICKER_IMAGE = "/sites/vectori/static/img-free-sticker-sticker-sheet-pdp.jpg";
const THICKNESS = [
  { pages: 50, image: "/sites/vectori/static/image-1314.jpg" },
  { pages: 100, image: "/sites/vectori/static/image-1315.jpg" },
  { pages: 150, image: "/sites/vectori/static/image-1316.jpg" },
  { pages: 200, image: "/sites/vectori/static/image-1317.jpg" },
];

function Gallery({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);
  const go = (i: number) => setIndex(Math.max(0, Math.min(images.length - 1, i)));

  return (
    <div className="px-pdp__gallery">
      <div className="px-gallery__main">
        {index === 0 && (
          <div className="px-gallery__sticker">
            <GiftIcon />
            free stickers included
          </div>
        )}
        <div className="px-gallery__frame">
          <Image key={images[index]} src={images[index]} alt="" fill sizes="(min-width: 1200px) 45vw, 95vw" preload={index === 0} />
        </div>
        <button type="button" className="px-gallery__arrow px-gallery__arrow--prev" aria-label="Previous image" disabled={index === 0} onClick={() => go(index - 1)}>
          <ChevronNextIcon />
        </button>
        <button
          type="button"
          className="px-gallery__arrow px-gallery__arrow--next"
          aria-label="Next image"
          disabled={index === images.length - 1}
          onClick={() => go(index + 1)}
        >
          <ChevronNextIcon />
        </button>
      </div>
      <div className="px-gallery__thumbs">
        {images.map((src, i) => (
          <button key={src + i} type="button" className="px-gallery__thumb" aria-current={i === index} aria-label={`Image ${i + 1}`} onClick={() => go(i)}>
            <Image src={src} alt="" fill sizes="90px" />
          </button>
        ))}
      </div>
    </div>
  );
}

function TemplatePicker({ templates, current, onPick }: { templates: TemplateTile[]; current: string; onPick: (t: TemplateTile) => void }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q ? templates.filter((t) => t.name.toLowerCase().includes(q)) : templates;
  }, [query, templates]);

  return (
    <div className="px-templates">
      <p className="px-templates__label">choose the best template for your memories</p>
      <div className="px-templates__search">
        <SearchIcon />
        <input
          type="text"
          placeholder="find the best template for your memories"
          aria-label="find a template"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="px-templates__scroll">
        <div className="px-templates__grid" translate="no">
          {filtered.map((t) => (
            <button key={t.slug} type="button" className="px-template" aria-pressed={t.slug === current} onClick={() => onPick(t)}>
              <div className="px-template__cover">
                <Image src={t.cover} alt={t.name} fill sizes="150px" />
              </div>
              <p className="px-template__name">{t.name}</p>
              {t.isNew && <div className="px-badge">new</div>}
            </button>
          ))}
        </div>
        {filtered.length === 0 && <p className="px-templates__empty">no templates match “{query}”</p>}
      </div>
    </div>
  );
}

function Details({ accordions }: { accordions: DetailAccordion[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="px-details">
      {accordions.map((a, i) => {
        const isOpen = open === i;
        return (
          <div key={a.title} className={cn("px-details__item", isOpen && "px-details__item--open")}>
            <h3>
              <button type="button" className="px-details__summary" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : i)}>
                <span className="px-details__title">{a.title}</span>
                <span className="px-details__chevron">
                  <SmallChevron />
                </span>
              </button>
            </h3>
            <div className="px-details__region" role="region">
              <div>
                <div className="px-details__body">
                  {a.kind === "thickness" ? (
                    <div className="px-thickness">
                      {THICKNESS.map((t) => (
                        <div key={t.pages} className="px-thickness__item">
                          <Image src={t.image} alt="" width={500} height={500} />
                          <p>
                            <strong>{t.pages}</strong>
                            <br />
                            pages
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div dangerouslySetInnerHTML={{ __html: a.html ?? "" }} />
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function ProductDetail({ product, templates, bundles, accordions, perPage, perPageBase, deliveryDate }: Props) {
  const router = useRouter();
  const [bundle, setBundle] = useState(0);
  const images = [product.cover, STICKER_IMAGE, ...product.gallery];
  const isMagazine = product.type === "custom-magazine";

  return (
    <div className="px-pdp">
      <Gallery key={product.slug} images={images} />

      <div className="px-buy" id="start-design">
        <div className="px-buy__head">
          <h2 className="px-buy__title">{product.defaultTitle}</h2>
          <div className="px-buy__rating">
            <span className="px-product-card__stars" role="img" aria-label="5 Stars">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} />
              ))}
            </span>
            <p>
              rated 5/5 by <a href="#reviews">{product.reviews} reviews</a>
            </p>
          </div>
          <div className="px-buy__price">
            <div className="px-buy__from">
              <p>24 pages from</p>
              <p className="px-buy__from">
                <span className="px-buy__was">${product.basePrice.toFixed(2)}</span>
                <span className="px-buy__now">${product.price.toFixed(2)}</span>
              </p>
            </div>
            <div className="px-buy__save">save {product.discount}%</div>
          </div>
          <p className="px-buy__per-page">
            then <s>${perPageBase.toFixed(2)}</s> ${perPage.toFixed(2)} per page
          </p>
          <div>
            <div className="px-buy__divider">
              <p>fall sale</p>
            </div>
            <div className="px-bundles">
              {bundles.map((b, i) => (
                <button key={b.label} type="button" className="px-bundle" aria-pressed={bundle === i} onClick={() => setBundle(i)}>
                  <Image src={b.image} alt="" width={93} height={70} />
                  <div className="px-bundle__label">
                    <div className="px-bundle__save">{b.save}</div>
                  </div>
                  <p className="px-bundle__name">{b.label}</p>
                </button>
              ))}
            </div>
            <div className="px-buy__note">*discounts will apply in cart ⓘ</div>
          </div>
          <p className="px-buy__hint">simply select a template, click start my design, and the template will appear in the editor.</p>
        </div>

        <TemplatePicker
          templates={templates}
          current={product.slug}
          onPick={(t) => router.replace(t.href, { scroll: false })}
        />

        <div className="px-sticker-banner">
          <GiftIcon />
          <div>
            <h5>free limited edition autumn sticker sheet included</h5>
            <p>with every {isMagazine ? "magazine" : "photobook"}</p>
          </div>
        </div>

        <div className="px-buy__cta">
          <PixButton variant="dark" size="lg" full href={`/printbox?product=${encodeURIComponent(product.slug)}&bundle=${bundle + 1}`}>
            start my design
          </PixButton>
        </div>

        <div className="px-delivery">
          <div className="px-delivery__row">
            <Image src="/sites/vectori/static/fast-shipping-2.png" alt="" width={36} height={36} />
            <div className="px-delivery__text">
              <p>order today &amp; get it delivered by</p>
              <span className="px-chip">{deliveryDate}</span>
            </div>
          </div>
          <div className="px-delivery__row">
            <Image src="/sites/vectori/static/tree-2.png" alt="" width={36} height={36} />
            <div className="px-delivery__text">
              <p>1 tree planted for every 5 books sold</p>
              <span className="px-chip px-chip--sun">64,858 trees planted</span>
            </div>
          </div>
        </div>

        <Details accordions={accordions} />
      </div>
    </div>
  );
}
