"use client";

import Image from "next/image";
import Link from "next/link";
import { img, products, type Product } from "./data";
import { StarIcon } from "./icons";
import { PixButton } from "./PixButton";
import { PixSlider } from "./PixSlider";

const productBreakpoints = {
  0: { slidesPerView: 1.2, spaceBetween: 13 },
  768: { slidesPerView: 2, spaceBetween: 20 },
  1024: { slidesPerView: 3, spaceBetween: 20 },
};

function StickerCard() {
  return (
    <Link className="px-product-card" href={"/collections/all"}>
      <h3 className="px-product-card__series">free sticker sheet</h3>
      <div className="px-product-card__sticker">
        <Image
          src={img("free-sticker-home-tile.jpg")}
          alt="free limited edition sticker sheet"
          width={600}
          height={600}
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 80vw"
        />
      </div>
      <h5 className="px-product-card__type">limited edition sticker sheet</h5>
      <p className="px-product-card__tagline px-product-card__tagline--sticker">free with every order, while stocks last</p>
      <PixButton variant="dark" size="sm" asSpan>
        view templates
      </PixButton>
    </Link>
  );
}

/** showCta: homepage cards carry a "start my design" pill; collection grid cards do not. */
export function ProductCard({ product, showCta = true }: { product: Product; showCta?: boolean }) {
  return (
    <Link className="px-product-card" href={product.href}>
      <div className="px-product-card__head">
        <h3 className="px-product-card__series">{product.series}</h3>
        {product.isNew && <div className="px-badge">new</div>}
      </div>
      <div className="px-product-card__images">
        <Image
          className="px-product-card__main"
          src={product.image}
          alt=""
          width={600}
          height={600}
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 80vw"
        />
        <Image
          className="px-product-card__hover"
          src={product.hoverImage}
          alt=""
          width={600}
          height={600}
          sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 80vw"
        />
      </div>
      <div className="px-product-card__info">
        <div>
          <div className="px-product-card__rating">
            <span className="px-product-card__stars" role="img" aria-label="5 Stars">
              {Array.from({ length: 5 }, (_, i) => (
                <StarIcon key={i} />
              ))}
            </span>
            <p className="px-product-card__count">({product.reviews})</p>
          </div>
          <h5 className="px-product-card__type">{product.type}</h5>
          <p className="px-product-card__tagline">{product.tagline}</p>
        </div>
        <div className="px-product-card__price">
          <p className="px-product-card__from">from</p>
          <p className="px-product-card__amount">{product.price}</p>
        </div>
      </div>
      {showCta && (
        <PixButton variant="dark" size="sm" asSpan>
          start my design
        </PixButton>
      )}
    </Link>
  );
}

export function ProductSlider() {
  const slides = [<StickerCard key="sticker" />, ...products.map((p) => <ProductCard key={p.href} product={p} />)];
  return (
    <section className="px-container">
      <div className="px-products">
        <PixSlider label="Featured products" slides={slides} breakpoints={productBreakpoints} whiteDots />
      </div>
    </section>
  );
}
