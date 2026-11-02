# Vectori (local learning copy)

Source captured 2026-10-29. All text is rebranded to Vectori and the logo SVG is replaced with a "vectori" wordmark.
Images still show the source's own branding in places. Local learning use only — not for deployment.

## Route map (source -> local)

| Source route | Local route | Status |
|---|---|---|
| `/` | `src/app/(site)/page.tsx` | done |
| `/collections/{all,travel,yearbooks,romance,baby}` | `collections/[collection]` | done |
| `/{collection}/{type}/{series}/{slug}` (728 products) | `[collection]/[type]/[series]/[slug]` | done (data from the site's own product-list responses) |
| `/about`, `/faq`, `/contact`, `/ambassador` | same paths | done |
| `/help/{orders,refund-policy,terms-and-conditions,privacy-policy,cookies-policy}` | `help/[slug]` | done |
| `/login`, `/sign-up`, `/reset-password`, `/magic-login` | same paths | UI done, local sign-in |
| `/forgot-password`, `/success-reset-password` | same paths | approximated (source renders nothing without a token) |
| `/printbox` (Printbox editor) | `printbox` | placeholder — third-party editor not included |
| `/cart`, `/checkout`, `/buffer`, `/order-confirmation`, `/invoice` | same paths | approximated (behind login on source) |
| `/profile/*` (information, addresses, projects, deleted-projects, order-history) | same paths | approximated (behind login on source) |

## Data
- `src/components/sites/vectori/data/catalog.json` — 728 products / 16 series, captured from the page's own
  `/api/v2/products?...` responses during normal browsing. Images are stored in `public/sites/vectori/catalog/`.
- `featured.json` — the 17 series cards shown on collection pages (filtered by collection).
- `content.json` — FAQ (7 categories, 74 Q&As), 5 help/legal pages, ambassador FAQ.
- `series-extras.json` — product-page accordions (photobook vs magazine).
- Local state (cart, projects, orders, addresses, account) lives in `localStorage` via `store.ts`. Nothing is sent anywhere.

## Template picker rule (product page)
Same series + same Printbox product family, plus "start from scratch" for photobooks. Exceptions: the main travel
series lists its whole family (301 on source, 302 here); baby lists its whole series. Travel edit shows 153 of 200
on the source by an unknown rule — all 200 are listed here.

## Known gaps
- Printbox editor, real payments, real auth and emails: replaced with local stand-ins.
- reviews.io product-review widget (long list at the bottom of product pages) omitted — third-party embed.
- Gorgias chat bubble, Klaviyo, analytics and A/B testing omitted.
- Mobile drawer contents/animation approximated; cart/checkout/profile visual design approximated with site tokens.
- Creator videos are stored in `public/sites/vectori/videos/`; the ambassador video streams from the Shopify CDN.
- Asset maps: `asset-map.tsv` (homepage), `static-asset-map.tsv` (other pages).
