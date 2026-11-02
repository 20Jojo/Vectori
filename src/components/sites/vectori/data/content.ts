import contentJson from "./content.json";

// Text captured from the source's faq, help/legal and ambassador pages (rebranded vectori -> vectori).

type QA = { q: string; a: string };
type HelpPage = { title: string; bannerImg: string; body: string };

const content = contentJson as unknown as Record<string, unknown> & {
  faq: { category: string; items: QA[] }[];
  ambassadorFaq: QA[];
  ambassadorEarn: QA[];
  productFaq: QA[];
};

export const faqCategories = content.faq.map((c) => ({ ...c, category: c.category.replace(/&amp;/g, "&").toLowerCase() }));
export const ambassadorFaq = content.ambassadorFaq;
export const ambassadorEarn = content.ambassadorEarn;
export const productFaq = content.productFaq;

const bannerFiles: Record<string, string> = {
  "Rectangle 40765": "/sites/vectori/static/rectangle-40765.jpg",
  "faq-main": "/sites/vectori/static/faq-main.jpg",
};

export const helpSlugs = ["orders", "refund-policy", "terms-and-conditions", "privacy-policy", "cookies-policy"] as const;

export function helpPage(slug: string) {
  const page = content[`help:${slug}`] as HelpPage | undefined;
  if (!page) return null;
  const key = Object.keys(bannerFiles).find((k) => page.bannerImg.includes(k));
  return {
    title: page.title.replace(/&amp;/g, "&"),
    banner: key ? bannerFiles[key] : "/sites/vectori/static/rectangle-40765.jpg",
    // links in the captured legal text point at the source domain's paths; keep them local
    body: page.body.replace(/href="https?:\/\/(www\.)?vectoriofficial\.com/g, 'href="'),
  };
}
