"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { shopTabs } from "./data";
import { CartIcon } from "./icons";
import { PixButton } from "./PixButton";
import { useVectori } from "./store";

function ShopMenu({ open, onNavigate }: { open: boolean; onNavigate: () => void }) {
  const [tabId, setTabId] = useState(shopTabs[0].id);
  const tab = shopTabs.find((t) => t.id === tabId) ?? shopTabs[0];

  return (
    <div className={cn("px-shop-menu", open && "px-shop-menu--open")} aria-hidden={!open}>
      <div className="px-shop-menu__inner">
        <div className="px-shop-menu__panel">
          <div className="px-shop-menu__tabs" role="tablist">
            {shopTabs.map((t) => (
              <h2 key={t.id}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={t.id === tabId}
                  className="px-shop-menu__tab px-link-hover"
                  onClick={() => setTabId(t.id)}
                >
                  {t.label}
                </button>
              </h2>
            ))}
          </div>
          <div className="px-shop-menu__body" role="tabpanel">
            <div className="px-shop-menu__cards">
              {tab.cards.map((card) => (
                <Link key={card.href + card.image} className="px-menu-card" href={card.href} onClick={onNavigate}>
                  {card.isNew && <div className="px-badge">new</div>}
                  <Image src={card.image} alt="" width={302} height={302} sizes="302px" />
                  <h5 className="px-menu-card__title">{card.title}</h5>
                  <p className="px-menu-card__tagline">{card.tagline}</p>
                </Link>
              ))}
            </div>
            <PixButton variant="grey" size="md2" href={tab.cta}>
              shop most popular
            </PixButton>
          </div>
        </div>
      </div>
    </div>
  );
}

const drawerLinks = [
  { label: "home", href: "/" },
  { label: "shop", href: "/collections/all" },
  { label: "about", href: "/about" },
  { label: "faq", href: "/faq" },
  { label: "contact", href: "/contact" },
  { label: "account", href: "/profile/information" },
  { label: "cart", href: "/cart" },
];

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <nav className={cn("px-drawer", open && "px-drawer--open")} aria-hidden={!open} aria-label="Mobile menu">
      <button type="button" className="px-burger px-burger--open px-drawer__close" aria-label="Close menu" onClick={onClose}>
        <span />
        <span />
        <span />
      </button>
      {drawerLinks.map((l) => (
        <Link key={l.href} className="px-drawer__link" href={l.href} onClick={onClose}>
          {l.label}
        </Link>
      ))}
    </nav>
  );
}

type HeaderFrameProps = {
  /** "light": white text over an image. "dark": grey text over the light-grey page panel. */
  tone: "light" | "dark";
  children: ReactNode;
};

/**
 * The source renders the shop menu, an absolutely-positioned header and the page's
 * first block (hero, banner or panel) inside one relative wrapper. Opening "shop"
 * expands the menu above the block and turns the header text grey.
 */
export function HeaderFrame({ tone, children }: HeaderFrameProps) {
  const [shopOpen, setShopOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const { cart } = useVectori();
  const cartCount = cart.reduce((n, l) => n + l.quantity, 0);

  return (
    <section className="px-container">
      <div className="px-hero-section">
        <ShopMenu open={shopOpen} onNavigate={() => setShopOpen(false)} />

        <header className={cn("px-header", (shopOpen || tone === "dark") && "px-header--menu-open")}>
          <div className="px-header__nav px-header__desktop">
            <Link href="/">
              <span className="px-header__link px-link-hover">home</span>
            </Link>
            <button
              type="button"
              className="px-header__link px-link-hover"
              aria-expanded={shopOpen}
              onClick={() => setShopOpen((o) => !o)}
            >
              shop
            </button>
            <Link href="/about">
              <span className="px-header__link px-link-hover">about</span>
            </Link>
            <Link href="/faq">
              <span className="px-header__link px-link-hover">faq</span>
            </Link>
          </div>
          <button
            type="button"
            className={cn("px-burger px-header__mobile", drawerOpen && "px-burger--open")}
            aria-label="Open menu"
            aria-expanded={drawerOpen}
            onClick={() => setDrawerOpen(true)}
          >
            <span />
            <span />
            <span />
          </button>

          <Link className="px-header__logo" href="/" aria-label="vectori home">
            vectori
          </Link>

          <div className="px-header__actions">
            <Link className="px-header__desktop" href="/profile/information">
              <span className="px-header__link px-link-hover">account</span>
            </Link>
            <Link className="px-header__cart" href="/cart" aria-label={`Cart, ${cartCount} items`}>
              <CartIcon />
              {cartCount > 0 && <span className="px-header__cart-count">{cartCount}</span>}
            </Link>
          </div>
        </header>

        {children}
      </div>
      <MobileDrawer open={drawerOpen} onClose={closeDrawer} />
    </section>
  );
}
