import type { Metadata } from "next";
import { QaList } from "@/components/sites/vectori/ContentBlocks";
import { faqCategories } from "@/components/sites/vectori/data/content";
import { PageBanner } from "@/components/sites/vectori/PageParts";

export const metadata: Metadata = { title: "Vectori | faq" };

export default function FaqPage() {
  return (
    <PageBanner
      title={
        <>
          got questions?
          <br />
          we’ve got answers
        </>
      }
      image="/sites/vectori/static/faq-main.jpg"
    >
      <div className="px-faq">
        <div className="px-faq__inner">
          {faqCategories.map((c) => (
            <div key={c.category}>
              <h3 className="px-faq__category">{c.category}</h3>
              <QaList items={c.items} idPrefix={c.category.replaceAll(" ", "-")} />
            </div>
          ))}
        </div>
      </div>
    </PageBanner>
  );
}
