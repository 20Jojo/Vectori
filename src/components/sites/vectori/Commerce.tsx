"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { LocalNote } from "./PageParts";
import { PixButton } from "./PixButton";
import { actions, BASE_PAGES, cartTotals, listPrice, money, useVectori, type Order, type ProjectRef } from "./store";

/*
 * Cart, checkout, editor and confirmation screens. The source's versions sit behind
 * login and a third-party editor (Printbox), so they could not be captured; these are
 * working local approximations styled with the site's tokens and components.
 */

const PAGE_OPTIONS = Array.from({ length: (200 - BASE_PAGES) / 2 + 1 }, (_, i) => BASE_PAGES + i * 2);

// ---------- editor placeholder (/printbox) ----------

export function EditorStub({ product }: { product: ProjectRef | null }) {
  const router = useRouter();
  const params = useSearchParams();
  const state = useVectori();
  const existing = state.projects.find((p) => p.id === params.get("project"));
  const ref = existing ?? product;
  const [name, setName] = useState<string | null>(null);
  const [pages, setPages] = useState<number | null>(null);

  if (!ref) {
    return (
      <div className="px-empty">
        <p>pick a template first to open the editor.</p>
        <PixButton variant="grey" size="md2" href="/collections/all">
          browse templates
        </PixButton>
      </div>
    );
  }

  const currentName = name ?? (existing ? existing.name : `my ${ref.seriesName}`);
  const currentPages = pages ?? existing?.pages ?? BASE_PAGES;

  const save = () => {
    if (existing) {
      actions.updateProject(existing.id, { name: currentName, pages: currentPages });
      return existing.id;
    }
    const created = actions.createProject(ref);
    actions.updateProject(created.id, { name: currentName, pages: currentPages });
    return created.id;
  };

  return (
    <div>
      <p className="px-h-display">editor</p>
      <LocalNote>
        the real site opens a third-party photobook editor (printbox) here. this local demo stands in for it: name your
        project, choose a page count, then save it or add it to your cart.
      </LocalNote>
      <div className="px-editor">
        <div className="px-editor__stage">
          <div className="px-editor__book">
            <Image src={ref.cover} alt={ref.title} fill sizes="260px" />
          </div>
          <div className="px-editor__pages" aria-label={`${currentPages} pages`}>
            {Array.from({ length: Math.min(currentPages / 2, 24) }, (_, i) => (
              <span key={i} className="px-editor__page" />
            ))}
          </div>
        </div>
        <div className="px-card">
          <p className="px-form-title">{ref.title}</p>
          <label className="px-field">
            <input aria-label="project name" value={currentName} onChange={(e) => setName(e.target.value)} />
          </label>
          <label className="px-field">
            <select aria-label="number of pages" value={currentPages} onChange={(e) => setPages(Number(e.target.value))}>
              {PAGE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n} pages
                </option>
              ))}
            </select>
          </label>
          <div className="px-summary__row">
            <span>list price</span>
            <span>{money(listPrice({ basePrice: ref.basePrice, pages: currentPages }))}</span>
          </div>
          <p className="px-line__meta">bundle discounts (40–50%) apply in cart</p>
          <div className="px-auth__actions">
            <PixButton
              variant="dark"
              size="sm"
              full
              onClick={() => {
                const id = save();
                actions.addToCart(id);
                router.push("/cart");
              }}
            >
              add to cart
            </PixButton>
          </div>
          <div className="px-auth__actions">
            <PixButton
              variant="outlined"
              size="sm"
              full
              onClick={() => {
                save();
                router.push(state.account ? "/profile/projects" : "/login?next=/profile/projects");
              }}
            >
              save &amp; exit
            </PixButton>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- cart ----------

function Summary({ cta }: { cta?: ReactNode }) {
  const state = useVectori();
  const t = cartTotals(state);
  return (
    <div className="px-card">
      <p className="px-form-title">order summary</p>
      <div className="px-summary__row">
        <span>subtotal ({t.books} {t.books === 1 ? "book" : "books"})</span>
        <span>{money(t.subtotal)}</span>
      </div>
      {t.books > 0 && (
        <div className="px-summary__row px-summary__row--discount">
          <span>fall sale ({t.books >= 3 ? "trio" : t.books === 2 ? "duo" : "single"} −{Math.round(t.rate * 100)}%)</span>
          <span>−{money(t.discount)}</span>
        </div>
      )}
      {t.giftBox > 0 && (
        <div className="px-summary__row">
          <span>premium gift box</span>
          <span>{money(t.giftBox)}</span>
        </div>
      )}
      <div className="px-summary__row">
        <span>shipping</span>
        <span>{t.books === 0 ? "—" : t.shipping === 0 ? "free" : money(t.shipping)}</span>
      </div>
      <div className="px-summary__row px-summary__row--total">
        <span>total</span>
        <span>{money(t.total)}</span>
      </div>
      {cta}
    </div>
  );
}

export function CartView() {
  const state = useVectori();
  const t = cartTotals(state);

  if (t.lines.length === 0) {
    return (
      <div>
        <p className="px-h-display">your cart</p>
        <div className="px-empty">
          <p>your cart is empty — start a design to add a photobook.</p>
          <PixButton variant="grey" size="md2" href="/collections/all">
            shop most popular
          </PixButton>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="px-h-display">your cart</p>
      <div className="px-two-col">
        <div className="px-card">
          {t.lines.map(({ project, quantity }) => (
            <div key={project.id} className="px-line">
              <div className="px-line__cover">
                <Image src={project.cover} alt="" fill sizes="80px" />
              </div>
              <div>
                <p className="px-line__title">{project.name}</p>
                <p className="px-line__meta">
                  {project.title} · {project.pages} pages
                </p>
                <div className="px-line__actions">
                  <span className="px-qty">
                    <button type="button" aria-label="decrease quantity" onClick={() => actions.setQuantity(project.id, quantity - 1)}>
                      −
                    </button>
                    <span>{quantity}</span>
                    <button type="button" aria-label="increase quantity" onClick={() => actions.setQuantity(project.id, quantity + 1)}>
                      +
                    </button>
                  </span>
                  <Link href={`/printbox?project=${project.id}`}>edit</Link>
                  <button type="button" onClick={() => actions.setQuantity(project.id, 0)}>
                    remove
                  </button>
                </div>
              </div>
              <div className="px-line__price">
                <s>{money(listPrice(project) * quantity)}</s>
                {money(listPrice(project) * quantity * (1 - t.rate))}
              </div>
            </div>
          ))}
        </div>
        <div>
          <Summary
            cta={
              <>
                <label className="px-toggle-row">
                  <input type="checkbox" checked={state.giftBox} onChange={(e) => actions.setGiftBox(e.target.checked)} />
                  make your order special — add a premium gift box ($9.99)
                </label>
                <PixButton variant="dark" size="sm" full href="/checkout">
                  checkout
                </PixButton>
              </>
            }
          />
          <p className="px-line__meta px-center px-cart-hint">
            add a second book for 45% off, or a third for 50% off
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------- checkout ----------

const COUNTRIES = ["United States", "United Kingdom", "Ireland", "Canada", "Australia", "Germany", "France", "Spain", "Italy", "Netherlands"];

export function CheckoutView() {
  const router = useRouter();
  const state = useVectori();
  const t = cartTotals(state);
  const saved = state.addresses.find((a) => a.isDefault);
  const [form, setForm] = useState<Record<string, string>>({});
  const [error, setError] = useState("");
  const value = (k: string, fallback = "") => form[k] ?? fallback;
  const set = (k: string) => (e: { target: { value: string } }) => setForm((f) => ({ ...f, [k]: e.target.value }));

  if (t.lines.length === 0) {
    return (
      <div className="px-empty">
        <p>there’s nothing to check out yet.</p>
        <PixButton variant="grey" size="md2" href="/collections/all">
          shop most popular
        </PixButton>
      </div>
    );
  }

  const fields = {
    email: value("email", state.account?.email ?? ""),
    firstName: value("firstName", saved?.firstName ?? state.account?.firstName ?? ""),
    lastName: value("lastName", saved?.lastName ?? state.account?.lastName ?? ""),
    line1: value("line1", saved?.line1 ?? ""),
    line2: value("line2", saved?.line2 ?? ""),
    city: value("city", saved?.city ?? ""),
    postcode: value("postcode", saved?.postcode ?? ""),
    country: value("country", saved?.country ?? COUNTRIES[0]),
    phone: value("phone", saved?.phone ?? ""),
    card: value("card"),
  };

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const required = ["email", "firstName", "lastName", "line1", "city", "postcode", "country"] as const;
    if (required.some((k) => !fields[k].trim())) return setError("please fill in all required fields");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) return setError("please enter a valid email address");
    const order = actions.placeOrder(fields.email, {
      firstName: fields.firstName,
      lastName: fields.lastName,
      line1: fields.line1,
      line2: fields.line2,
      city: fields.city,
      postcode: fields.postcode,
      country: fields.country,
      phone: fields.phone,
    });
    if (order) router.push(`/buffer?order=${order.id}`);
  };

  return (
    <div>
      <p className="px-h-display">checkout</p>
      <LocalNote>local demo: no payment is taken and nothing is sent. the real checkout uses card, apple pay, google pay and link.</LocalNote>
      <form className="px-two-col" onSubmit={submit} noValidate>
        <div className="px-card">
          <p className="px-form-title">contact</p>
          <label className="px-field">
            <input placeholder="email address *" aria-label="email address" value={fields.email} onChange={set("email")} />
          </label>
          <p className="px-form-title">shipping address</p>
          <div className="px-form-grid">
            <label className="px-field">
              <input placeholder="first name *" aria-label="first name" value={fields.firstName} onChange={set("firstName")} />
            </label>
            <label className="px-field">
              <input placeholder="last name *" aria-label="last name" value={fields.lastName} onChange={set("lastName")} />
            </label>
            <label className="px-field px-field--wide">
              <input placeholder="address line 1 *" aria-label="address line 1" value={fields.line1} onChange={set("line1")} />
            </label>
            <label className="px-field px-field--wide">
              <input placeholder="address line 2" aria-label="address line 2" value={fields.line2} onChange={set("line2")} />
            </label>
            <label className="px-field">
              <input placeholder="city *" aria-label="city" value={fields.city} onChange={set("city")} />
            </label>
            <label className="px-field">
              <input placeholder="postcode *" aria-label="postcode" value={fields.postcode} onChange={set("postcode")} />
            </label>
            <label className="px-field">
              <select aria-label="country" value={fields.country} onChange={set("country")}>
                {COUNTRIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </label>
            <label className="px-field">
              <input placeholder="phone" aria-label="phone" value={fields.phone} onChange={set("phone")} />
            </label>
          </div>
          <p className="px-form-title">payment</p>
          <label className="px-field">
            <input placeholder="card number (demo — leave blank)" aria-label="card number" value={fields.card} onChange={set("card")} disabled />
          </label>
          {error && <p className="px-auth__error">{error}</p>}
        </div>
        <Summary
          cta={
            <PixButton variant="dark" size="sm" full type="submit">
              place order
            </PixButton>
          }
        />
      </form>
    </div>
  );
}

// ---------- post-purchase upsell (/buffer) ----------

/** The source offers extra pages right after checkout ("buffer page"), charged to the saved card. */
export function BufferOffer() {
  const router = useRouter();
  const orderId = useSearchParams().get("order");
  return (
    <div className="px-auth">
      <p className="px-auth__title">one last thing</p>
      <p className="px-auth__lead px-auth__lead--flush">
        need more room for your memories? add 10 extra pages to every book in this order for $9.99 — no need to re-enter your
        details.
      </p>
      <LocalNote>local demo: accepting just records the offer on your order screen; nothing is charged.</LocalNote>
      <PixButton variant="dark" size="lg" onClick={() => router.push(`/order-confirmation?order=${orderId}&extra=1`)}>
        add 10 pages
      </PixButton>
      <p className="px-auth__alt" role="button" tabIndex={0} onClick={() => router.push(`/order-confirmation?order=${orderId}`)} onKeyDown={(e) => e.key === "Enter" && router.push(`/order-confirmation?order=${orderId}`)}>
        no thanks, skip
      </p>
    </div>
  );
}

// ---------- confirmation + invoice ----------

function OrderLines({ order }: { order: Order }) {
  return (
    <>
      {order.lines.map((l) => (
        <div key={l.project.id} className="px-line">
          <div className="px-line__cover">
            <Image src={l.project.cover} alt="" fill sizes="80px" />
          </div>
          <div>
            <p className="px-line__title">{l.project.name}</p>
            <p className="px-line__meta">
              {l.project.title} · {l.project.pages} pages · qty {l.quantity}
            </p>
          </div>
          <div className="px-line__price">{money(l.unitPrice * l.quantity)}</div>
        </div>
      ))}
    </>
  );
}

export function OrderConfirmation() {
  const params = useSearchParams();
  const state = useVectori();
  const order = state.orders.find((o) => o.id === params.get("order")) ?? state.orders[0];

  if (!order) {
    return (
      <div className="px-empty">
        <p>no recent order found.</p>
        <PixButton variant="grey" size="md2" href="/collections/all">
          shop most popular
        </PixButton>
      </div>
    );
  }

  return (
    <div>
      <p className="px-h-display">thank you for your order!</p>
      <div className="px-two-col">
        <div className="px-card">
          <p className="px-form-title">order {order.id}</p>
          <p className="px-line__meta">
            confirmation sent to {order.email} (not really — local demo). we’ll print your books and plant a tree for every 5 sold.
          </p>
          {params.get("extra") && <p className="px-auth__success">10 extra pages added to every book.</p>}
          <OrderLines order={order} />
        </div>
        <div className="px-card">
          <p className="px-form-title">shipping to</p>
          <div className="px-address">
            {order.address.firstName} {order.address.lastName}
            <br />
            {order.address.line1}
            {order.address.line2 && (
              <>
                <br />
                {order.address.line2}
              </>
            )}
            <br />
            {order.address.city} {order.address.postcode}
            <br />
            {order.address.country}
          </div>
          <div className="px-summary__row px-summary__row--total">
            <span>total</span>
            <span>{money(order.total)}</span>
          </div>
          <div className="px-auth__actions">
            <PixButton variant="outlined" size="sm" full href={`/invoice?id=${order.id}`}>
              view invoice
            </PixButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export function InvoiceView() {
  const id = useSearchParams().get("id");
  const state = useVectori();
  const order = state.orders.find((o) => o.id === id);
  if (!order) return <div className="px-empty"><p>invoice not found.</p></div>;
  return (
    <div className="px-card">
      <p className="px-h-display">invoice {order.id}</p>
      <p className="px-line__meta">issued {new Date(order.createdAt).toLocaleDateString("en-GB")} · billed to {order.email}</p>
      <OrderLines order={order} />
      <div className="px-summary__row">
        <span>subtotal</span>
        <span>{money(order.subtotal)}</span>
      </div>
      <div className="px-summary__row px-summary__row--discount">
        <span>discount</span>
        <span>−{money(order.discount)}</span>
      </div>
      <div className="px-summary__row">
        <span>shipping</span>
        <span>{order.shipping === 0 ? "free" : money(order.shipping)}</span>
      </div>
      <div className="px-summary__row px-summary__row--total">
        <span>total</span>
        <span>{money(order.total)}</span>
      </div>
      <div className="px-auth__actions">
        <PixButton variant="outlined" size="sm" onClick={() => window.print()}>
          print
        </PixButton>
      </div>
    </div>
  );
}
