"use client";

import { useSyncExternalStore } from "react";

/*
 * Local-only stand-in for the source's backend.
 * Cart, projects, orders and the signed-in account live in localStorage so the
 * whole flow works offline in this learning demo. Nothing is sent anywhere.
 */

export type ProjectRef = {
  productSlug: string;
  href: string;
  title: string;
  seriesName: string;
  type: string;
  cover: string;
  basePrice: number;
};

export type Project = ProjectRef & {
  id: string;
  name: string;
  pages: number;
  createdAt: number;
  updatedAt: number;
  deletedAt?: number;
};

export type CartLine = { projectId: string; quantity: number };

export type Address = {
  id: string;
  firstName: string;
  lastName: string;
  line1: string;
  line2: string;
  city: string;
  postcode: string;
  country: string;
  phone: string;
  isDefault: boolean;
};

export type Order = {
  id: string;
  createdAt: number;
  lines: { project: Project; quantity: number; unitPrice: number }[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  email: string;
  address: Omit<Address, "id" | "isDefault">;
  giftBox: boolean;
};

export type Account = { email: string; firstName: string; lastName: string; createdAt: number };

export type VectoriState = {
  account: Account | null;
  projects: Project[];
  cart: CartLine[];
  orders: Order[];
  addresses: Address[];
  giftBox: boolean;
};

const KEY = "vectori-local-state-v1";
const empty: VectoriState = { account: null, projects: [], cart: [], orders: [], addresses: [], giftBox: false };

let state: VectoriState = empty;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) state = { ...empty, ...JSON.parse(raw) };
  } catch {
    state = empty;
  }
}

function emit() {
  window.localStorage.setItem(KEY, JSON.stringify(state));
  listeners.forEach((l) => l());
}

function update(fn: (s: VectoriState) => VectoriState) {
  load();
  state = fn(state);
  emit();
}

function subscribe(listener: () => void) {
  load();
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) {
      loaded = false;
      load();
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot() {
  load();
  return state;
}

const getServerSnapshot = () => empty;

/** Read the local state. Server render and first client render both see the empty state. */
export function useVectori() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

const uid = () => Math.random().toString(36).slice(2, 10);

// ---------- pricing (mirrors the source's single / duo / trio bundle discounts) ----------

export const BASE_PAGES = 24;
export const EXTRA_PAGE_BASE = 3.98;

export function bundleDiscount(totalBooks: number) {
  if (totalBooks >= 3) return 0.5;
  if (totalBooks === 2) return 0.45;
  return 0.4;
}

export function listPrice(project: Pick<Project, "basePrice" | "pages">) {
  return project.basePrice + Math.max(0, project.pages - BASE_PAGES) * EXTRA_PAGE_BASE;
}

export function cartTotals(s: VectoriState) {
  const lines = s.cart
    .map((l) => ({ ...l, project: s.projects.find((p) => p.id === l.projectId) }))
    .filter((l): l is CartLine & { project: Project } => Boolean(l.project));
  const books = lines.reduce((n, l) => n + l.quantity, 0);
  const rate = bundleDiscount(books);
  const subtotal = lines.reduce((sum, l) => sum + listPrice(l.project) * l.quantity, 0);
  const discount = subtotal * rate;
  const giftBox = s.giftBox ? 9.99 : 0;
  const shipping = books === 0 ? 0 : subtotal - discount >= 100 ? 0 : 7.99;
  return { lines, books, rate, subtotal, discount, giftBox, shipping, total: subtotal - discount + giftBox + shipping };
}

export const money = (n: number) => `$${n.toFixed(2)}`;

// ---------- actions ----------

export const actions = {
  createProject(ref: ProjectRef) {
    const now = Date.now();
    const project: Project = { ...ref, id: uid(), name: `my ${ref.seriesName}`, pages: BASE_PAGES, createdAt: now, updatedAt: now };
    update((s) => ({ ...s, projects: [project, ...s.projects] }));
    return project;
  },
  updateProject(id: string, patch: Partial<Pick<Project, "name" | "pages">>) {
    update((s) => ({ ...s, projects: s.projects.map((p) => (p.id === id ? { ...p, ...patch, updatedAt: Date.now() } : p)) }));
  },
  duplicateProject(id: string) {
    update((s) => {
      const p = s.projects.find((x) => x.id === id);
      if (!p) return s;
      const now = Date.now();
      return { ...s, projects: [{ ...p, id: uid(), name: `${p.name} (copy)`, createdAt: now, updatedAt: now }, ...s.projects] };
    });
  },
  deleteProject(id: string) {
    update((s) => ({
      ...s,
      projects: s.projects.map((p) => (p.id === id ? { ...p, deletedAt: Date.now() } : p)),
      cart: s.cart.filter((l) => l.projectId !== id),
    }));
  },
  restoreProject(id: string) {
    update((s) => ({ ...s, projects: s.projects.map((p) => (p.id === id ? { ...p, deletedAt: undefined } : p)) }));
  },
  addToCart(projectId: string) {
    update((s) => {
      const existing = s.cart.find((l) => l.projectId === projectId);
      const cart = existing
        ? s.cart.map((l) => (l.projectId === projectId ? { ...l, quantity: l.quantity + 1 } : l))
        : [...s.cart, { projectId, quantity: 1 }];
      return { ...s, cart };
    });
  },
  setQuantity(projectId: string, quantity: number) {
    update((s) => ({
      ...s,
      cart: quantity <= 0 ? s.cart.filter((l) => l.projectId !== projectId) : s.cart.map((l) => (l.projectId === projectId ? { ...l, quantity } : l)),
    }));
  },
  setGiftBox(giftBox: boolean) {
    update((s) => ({ ...s, giftBox }));
  },
  signIn(email: string, names?: { firstName: string; lastName: string }) {
    update((s) => ({
      ...s,
      account: s.account?.email === email ? s.account : { email, firstName: names?.firstName ?? "", lastName: names?.lastName ?? "", createdAt: Date.now() },
    }));
  },
  updateAccount(patch: Partial<Pick<Account, "firstName" | "lastName" | "email">>) {
    update((s) => (s.account ? { ...s, account: { ...s.account, ...patch } } : s));
  },
  signOut() {
    update((s) => ({ ...s, account: null }));
  },
  upsertAddress(address: Omit<Address, "id"> & { id?: string }) {
    update((s) => {
      const id = address.id ?? uid();
      const others = s.addresses.filter((a) => a.id !== id).map((a) => (address.isDefault ? { ...a, isDefault: false } : a));
      const isDefault = address.isDefault || others.length === 0;
      return { ...s, addresses: [...others, { ...address, id, isDefault }] };
    });
  },
  deleteAddress(id: string) {
    update((s) => ({ ...s, addresses: s.addresses.filter((a) => a.id !== id) }));
  },
  placeOrder(email: string, address: Order["address"]) {
    let placed: Order | null = null;
    update((s) => {
      const t = cartTotals(s);
      if (!t.lines.length) return s;
      placed = {
        id: `PX${Date.now().toString().slice(-7)}`,
        createdAt: Date.now(),
        lines: t.lines.map((l) => ({ project: l.project, quantity: l.quantity, unitPrice: listPrice(l.project) * (1 - t.rate) })),
        subtotal: t.subtotal,
        discount: t.discount,
        shipping: t.shipping,
        total: t.total,
        email,
        address,
        giftBox: s.giftBox,
      };
      return { ...s, orders: [placed, ...s.orders], cart: [], giftBox: false };
    });
    return placed as Order | null;
  },
};
