"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";
import {
  brandValues,
  communityPhotos,
  features,
  footerHelp,
  footerNavigate,
  footerSocial,
  img,
  memoryCards,
  reviews,
} from "./data";
import {
  ChevronDownIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  PinterestIcon,
  SubstackIcon,
  TiktokIcon,
  TrustpilotStars,
  VerifiedIcon,
  WhatsappIcon,
  YoutubeIcon,
} from "./icons";
import { PixButton } from "./PixButton";
import { PixSlider } from "./PixSlider";

const twoUpBreakpoints = {
  0: { slidesPerView: 1.2, spaceBetween: 13 },
  768: { slidesPerView: 2, spaceBetween: 20 },
  1200: { slidesPerView: 2, spaceBetween: 20 },
};

const threeUpBreakpoints = {
  0: { slidesPerView: 1.2, spaceBetween: 13 },
  768: { slidesPerView: 2, spaceBetween: 20 },
  1024: { slidesPerView: 3, spaceBetween: 20 },
};

const fourUpBreakpoints = {
  0: { slidesPerView: 1.2, spaceBetween: 13 },
  768: { slidesPerView: 3, spaceBetween: 20 },
  1024: { slidesPerView: 4, spaceBetween: 20 },
};

function Feature({ feature }: { feature: (typeof features)[number] }) {
  return (
    <div className="px-feature">
      <div className="px-feature__copy">
        <h4 className="px-feature__title">{feature.title}</h4>
        <p className="px-feature__text">{feature.text}</p>
      </div>
      <Image
        src={feature.image}
        alt=""
        width={feature.width}
        height={feature.height}
        sizes="(min-width: 768px) 33vw, 85vw"
      />
    </div>
  );
}

export function Features() {
  return (
    <section className="px-container">
      <div className="px-features">
        {features.map((f) => (
          <Feature key={f.title} feature={f} />
        ))}
      </div>
      <div className="px-features-slider">
        <PixSlider
          label="Product qualities"
          slides={features.map((f) => (
            <Feature key={f.title} feature={f} />
          ))}
          breakpoints={twoUpBreakpoints}
        />
      </div>
    </section>
  );
}

type ValuesProps = { title: string; subtitle?: string; image: string; items: { title: string; text: string }[] };

export function MeetTheBrand() {
  return <ValuesAccordion title="meet the brand" subtitle="The story behind your stories" image={img("group-1321315494.jpg")} items={brandValues} />;
}

/** Image on one side, a titled accordion of values on the other (homepage + about page). */
export function ValuesAccordion({ title, subtitle, image, items }: ValuesProps) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="px-container">
      <div className="px-brand">
        <div className="px-brand__image">
          <Image src={image} alt="" width={1388} height={1388} sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
        <div>
          <div className="px-brand__panel">
            <div className="px-brand__intro">
              <p className="px-text px-display px-h1 px-grey">{title}</p>
              {subtitle && <p className="px-text px-body px-shutter">{subtitle}</p>}
            </div>
            <div className="px-accordion">
              {items.map((value, i) => {
                const isOpen = open === i;
                const id = `${title.replaceAll(" ", "-")}-${i}`;
                return (
                  <div key={value.title} className={cn("px-accordion__item", isOpen && "px-accordion__item--open")}>
                    <h3>
                      <button
                        type="button"
                        className="px-accordion__summary"
                        aria-expanded={isOpen}
                        aria-controls={id}
                        onClick={() => setOpen(isOpen ? null : i)}
                      >
                        <span className="px-accordion__title">{value.title}</span>
                        <span className="px-accordion__icon">
                          <ChevronDownIcon />
                        </span>
                      </button>
                    </h3>
                    <div className="px-accordion__region" id={id} role="region">
                      <div>
                        <div className="px-accordion__details">
                          <p className="px-text px-body">{value.text}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section className="px-container">
      <div className="px-reviews">
        <div className="px-reviews__head">
          <p className="px-text px-display px-h1 px-grey">1m+ vectori users</p>
          <p className="px-text px-body px-shutter">Rated excellent 4.8/5 stars on Trustpilot</p>
        </div>
        <PixSlider
          label="Customer reviews"
          breakpoints={threeUpBreakpoints}
          slides={reviews.map((r) => (
            <a key={r.href} className="px-review" href={r.href} target="_blank" rel="nofollow noopener noreferrer">
              <div className="px-review__top">
                <div className="px-review__stars">
                  <TrustpilotStars aria-label="5 out of 5 stars" />
                </div>
                <div className="px-review__verified">
                  <VerifiedIcon />
                  <p>verified</p>
                </div>
              </div>
              <p className="px-review__title">{r.title}</p>
              <p className="px-review__comment">{r.comment}</p>
              <p className="px-review__name">{r.name}</p>
            </a>
          ))}
        />
      </div>
    </section>
  );
}

export function MemoryCard() {
  return (
    <section className="px-container">
      <div className="px-memory">
        <div className="px-memory__copy">
          <div className="px-memory__copy-inner">
            <h2 className="px-memory__title">the memory card</h2>
            <p className="px-text px-body px-shutter">give the gift of memories</p>
          </div>
        </div>
        <div>
          <PixSlider
            label="How the memory card works"
            slidesPerView={1}
            spaceBetween={15}
            whiteDots
            slides={memoryCards.map((card) => (
              <div key={card.image} className="px-memory__slide">
                <Image src={card.image} alt="" width={card.width} height={card.height} sizes="(min-width: 1024px) 50vw, 100vw" />
              </div>
            ))}
          />
        </div>
      </div>
    </section>
  );
}

export function Community() {
  const photos = [...communityPhotos, ...communityPhotos];
  return (
    <section className="px-container">
      <div className="px-community">
        <p className="px-text px-display px-h1 px-grey px-community__title">vectori + you</p>
        <p className="px-text px-body px-shutter px-community__subtitle">created by you, loved by us</p>
        <PixSlider
          label="Customer photos"
          breakpoints={fourUpBreakpoints}
          whiteDots
          slides={photos.map((photo, i) => (
            <div key={i} className="px-community__photo">
              <Image src={photo.image} alt="" width={photo.width} height={photo.height} sizes="(min-width: 1024px) 25vw, 80vw" />
            </div>
          ))}
          footer={
            <div className="px-community__cta">
              <PixButton variant="grey" size="md2">
                find us on social
              </PixButton>
            </div>
          }
        />
      </div>
    </section>
  );
}

const socialIcons = {
  instagram: InstagramIcon,
  tiktok: TiktokIcon,
  facebook: FacebookIcon,
  youtube: YoutubeIcon,
  linkedin: LinkedinIcon,
  pinterest: PinterestIcon,
  substack: SubstackIcon,
  whatsapp: WhatsappIcon,
};

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  // Local demo only: the source posts the address to its newsletter webhook.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <footer>
      <section className="px-container">
        <div className="px-footer__hero">
          <Image src={img("footer.jpg")} alt="" fill sizes="100vw" />
          <p className="px-footer__wordmark">vectori</p>
        </div>
        <div className="px-footer__body">
          <div className="px-footer__columns">
            <div className="px-footer__signup">
              <p className="px-footer__note">join the vectori community. sign up for travel tips, exclusives &amp; discounts</p>
              <form className="px-footer__form" onSubmit={onSubmit}>
                <input
                  className="px-footer__input"
                  type="email"
                  name="email"
                  placeholder={subscribed ? "thanks for subscribing!" : "email address"}
                  aria-label="email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <PixButton variant="grey" size="sm" type="submit">
                  subscribe
                </PixButton>
              </form>
              <p className="px-footer__note">by signing up you agree to our privacy policy*</p>
              <p className="px-footer__note">sticker sheets currently unavailable in mexico*</p>
            </div>
            <div className="px-footer__links">
              <div>
                <p className="px-footer__heading">navigate</p>
                <div className="px-footer__list">
                  {footerNavigate.map((l) => (
                    <Link key={l.label} className="px-footer__link px-link-hover" href={l.href}>
                      {l.label}
                    </Link>
                  ))}
                </div>
              </div>
              <div>
                <p className="px-footer__heading">social</p>
                <div className="px-footer__list">
                  {footerSocial.map((l) => {
                    const Icon = socialIcons[l.icon];
                    return (
                      <span key={l.label} className="px-footer__link px-link-hover">
                        <span className="px-footer__icon">
                          <Icon />
                        </span>
                        {l.label}
                      </span>
                    );
                  })}
                </div>
              </div>
              <div>
                <p className="px-footer__heading">help</p>
                <div className="px-footer__list">
                  {footerHelp.map((l) => (
                    <a key={l.label} className="px-footer__link px-link-hover" href={l.href}>
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <p className="px-footer__copyright">2026 vectori. all rights reserved.</p>
        </div>
      </section>
    </footer>
  );
}

export function CookieNotice() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div className="px-cookie" role="dialog" aria-label="Cookie consent">
      <p>
        hey! we use cookies keep your projects safe, remember your cart, and improve Vectori. you can always change or
        withdraw your consent later.
      </p>
      <div className="px-cookie__actions">
        <button type="button" className="px-cookie__choose" onClick={() => setVisible(false)}>
          let me choose
        </button>
        <div className="px-cookie__buttons">
          <button type="button" className="px-cookie__btn px-cookie__btn--decline" onClick={() => setVisible(false)}>
            i decline
          </button>
          <button type="button" className="px-cookie__btn px-cookie__btn--accept" onClick={() => setVisible(false)}>
            that&apos;s ok
          </button>
        </div>
      </div>
    </div>
  );
}
