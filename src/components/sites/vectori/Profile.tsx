"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, type FormEvent, type ReactNode } from "react";
import { PixButton } from "./PixButton";
import { actions, money, useVectori, type Address } from "./store";

/*
 * Account area (/profile/*). The source's version requires a real login; this local
 * stand-in reads and writes the browser-stored account, projects, addresses and orders.
 */

const NAV = [
  { href: "/profile/information", label: "my information" },
  { href: "/profile/information/addresses", label: "addresses" },
  { href: "/profile/projects", label: "my projects" },
  { href: "/profile/deleted-projects", label: "deleted projects" },
  { href: "/profile/order-history", label: "order history" },
];

export function ProfileShell({ title, children }: { title: string; children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { account } = useVectori();

  if (!account) {
    return (
      <div className="px-auth">
        <p className="px-auth__title">my account</p>
        <p className="px-auth__lead px-auth__lead--flush">log in to see your projects, addresses and orders.</p>
        <PixButton variant="grey" size="lg" href={`/login?next=${encodeURIComponent(pathname)}`}>
          login
        </PixButton>
        <p className="px-auth__foot">
          don’t have an account? <Link href="/sign-up">sign up</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="px-profile">
      <nav className="px-profile__nav" aria-label="Account">
        {NAV.map((n) => (
          <Link key={n.href} href={n.href} aria-current={pathname === n.href ? "page" : undefined}>
            {n.label}
          </Link>
        ))}
        <button
          type="button"
          onClick={() => {
            actions.signOut();
            router.push("/");
          }}
        >
          log out
        </button>
      </nav>
      <div>
        <p className="px-h-display">{title}</p>
        {children}
      </div>
    </div>
  );
}

export function InformationView() {
  const { account } = useVectori();
  const [form, setForm] = useState<{ firstName?: string; lastName?: string; email?: string }>({});
  const [saved, setSaved] = useState(false);
  if (!account) return null;
  const v = { firstName: form.firstName ?? account.firstName, lastName: form.lastName ?? account.lastName, email: form.email ?? account.email };
  const submit = (e: FormEvent) => {
    e.preventDefault();
    actions.updateAccount(v);
    setSaved(true);
  };
  return (
    <form className="px-card" onSubmit={submit}>
      <div className="px-form-grid">
        <label className="px-field">
          <input placeholder="first name" aria-label="first name" value={v.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
        </label>
        <label className="px-field">
          <input placeholder="last name" aria-label="last name" value={v.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
        </label>
        <label className="px-field px-field--wide">
          <input placeholder="email address" aria-label="email address" value={v.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </label>
      </div>
      {saved && <p className="px-auth__success">your details have been saved.</p>}
      <div className="px-auth__actions">
        <PixButton variant="grey" size="sm" type="submit">
          save changes
        </PixButton>
      </div>
      <p className="px-line__meta px-cart-hint">
        member since {new Date(account.createdAt).toLocaleDateString("en-GB")} · <Link href="/reset-password">change password</Link>
      </p>
    </form>
  );
}

export function AddressesView() {
  const { addresses } = useVectori();
  return (
    <div className="px-card">
      {addresses.length === 0 && <p className="px-line__meta">no saved addresses yet.</p>}
      {addresses.map((a) => (
        <div key={a.id} className="px-address">
          {a.isDefault && <span className="px-chip">default</span>}
          <p>
            {a.firstName} {a.lastName}
            <br />
            {a.line1}
            {a.line2 && `, ${a.line2}`}
            <br />
            {a.city} {a.postcode}, {a.country}
          </p>
          <div className="px-line__actions">
            <Link href={`/profile/information/addresses/edit?id=${a.id}`}>edit</Link>
            {!a.isDefault && (
              <button type="button" onClick={() => actions.upsertAddress({ ...a, isDefault: true })}>
                set as default
              </button>
            )}
            <button type="button" onClick={() => actions.deleteAddress(a.id)}>
              delete
            </button>
          </div>
        </div>
      ))}
      <div className="px-auth__actions">
        <PixButton variant="grey" size="sm" href="/profile/information/addresses/new">
          add address
        </PixButton>
      </div>
    </div>
  );
}

const blankAddress: Omit<Address, "id"> = {
  firstName: "",
  lastName: "",
  line1: "",
  line2: "",
  city: "",
  postcode: "",
  country: "United States",
  phone: "",
  isDefault: false,
};

export function AddressForm() {
  const router = useRouter();
  const id = useSearchParams().get("id");
  const { addresses } = useVectori();
  const existing = addresses.find((a) => a.id === id);
  const [form, setForm] = useState<Partial<Address>>({});
  const [error, setError] = useState("");
  const v = { ...blankAddress, ...existing, ...form };
  const field = (key: keyof typeof blankAddress, label: string, wide = false) => (
    <label className={wide ? "px-field px-field--wide" : "px-field"}>
      <input placeholder={label} aria-label={label} value={String(v[key])} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
    </label>
  );
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!v.firstName || !v.lastName || !v.line1 || !v.city || !v.postcode) return setError("please fill in all required fields");
    actions.upsertAddress({ ...v, id: existing?.id });
    router.push("/profile/information/addresses");
  };
  return (
    <form className="px-card" onSubmit={submit}>
      <div className="px-form-grid">
        {field("firstName", "first name *")}
        {field("lastName", "last name *")}
        {field("line1", "address line 1 *", true)}
        {field("line2", "address line 2", true)}
        {field("city", "city *")}
        {field("postcode", "postcode *")}
        {field("country", "country")}
        {field("phone", "phone")}
      </div>
      <label className="px-toggle-row">
        <input type="checkbox" checked={v.isDefault} onChange={(e) => setForm({ ...form, isDefault: e.target.checked })} />
        use as my default shipping address
      </label>
      {error && <p className="px-auth__error">{error}</p>}
      <PixButton variant="grey" size="sm" type="submit">
        save address
      </PixButton>
    </form>
  );
}

export function ProjectsView({ deleted = false }: { deleted?: boolean }) {
  const router = useRouter();
  const { projects } = useVectori();
  const list = projects.filter((p) => Boolean(p.deletedAt) === deleted);

  if (list.length === 0) {
    return (
      <div className="px-empty">
        <p>{deleted ? "no deleted projects." : "you haven’t started a project yet."}</p>
        {!deleted && (
          <PixButton variant="grey" size="md2" href="/collections/all">
            start a design
          </PixButton>
        )}
      </div>
    );
  }

  return (
    <div className="px-project-grid">
      {list.map((p) => (
        <div key={p.id} className="px-project">
          <div className="px-project__cover">
            <Image src={p.cover} alt="" fill sizes="200px" />
          </div>
          <p className="px-project__name">{p.name}</p>
          <p className="px-project__meta">
            {p.title} · {p.pages} pages · edited {new Date(p.updatedAt).toLocaleDateString("en-GB")}
          </p>
          <div className="px-project__actions">
            {deleted ? (
              <button type="button" onClick={() => actions.restoreProject(p.id)}>
                restore
              </button>
            ) : (
              <>
                <Link href={`/printbox?project=${p.id}`}>edit</Link>
                <button
                  type="button"
                  onClick={() => {
                    actions.addToCart(p.id);
                    router.push("/cart");
                  }}
                >
                  order
                </button>
                <button type="button" onClick={() => actions.duplicateProject(p.id)}>
                  duplicate
                </button>
                <button type="button" onClick={() => actions.deleteProject(p.id)}>
                  delete
                </button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export function OrderHistoryView() {
  const { orders } = useVectori();
  if (orders.length === 0) {
    return (
      <div className="px-empty">
        <p>no orders yet.</p>
      </div>
    );
  }
  return (
    <div className="px-card">
      {orders.map((o) => (
        <div key={o.id} className="px-order">
          <div className="px-order__head">
            <strong>order {o.id}</strong>
            <span>{new Date(o.createdAt).toLocaleDateString("en-GB")}</span>
            <span>{money(o.total)}</span>
            <Link href={`/invoice?id=${o.id}`}>invoice</Link>
          </div>
          <p className="px-line__meta">{o.lines.map((l) => `${l.project.name} ×${l.quantity}`).join(", ")}</p>
        </div>
      ))}
    </div>
  );
}
