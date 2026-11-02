import type { Metadata } from "next";
import Image from "next/image";
import { FaqSplit } from "@/components/sites/vectori/ContentBlocks";
import { ambassadorEarn, ambassadorFaq } from "@/components/sites/vectori/data/content";
import { StarIcon } from "@/components/sites/vectori/icons";
import { ValuesAccordion } from "@/components/sites/vectori/InteractiveSections";
import { PageBanner } from "@/components/sites/vectori/PageParts";
import { PixButton } from "@/components/sites/vectori/PixButton";

export const metadata: Metadata = { title: "Vectori | ambassador" };

const st = (name: string) => `/sites/vectori/static/${name}`;
const APPLY_URL = "https://9fu6mlc3far.typeform.com/to/t0sn5QWy";
const avatars = [
  "358bca69-a3cb-4aa2-ae87-3eae2aa95158-modified-2.jpg",
  "img_6844-modified-2.jpg",
  "img_7971-modified-1.jpg",
  "358bca69-a3cb-4aa2-ae87-3eae2aa95158-modified-3.jpg",
  "img_6844-modified-3.jpg",
  "img_7971-modified-2.jpg",
];

const steps = [
  {
    title: "apply & join the vectori creator team",
    text: "apply in minutes and become part of our growing creator community. once you're in, you'll get access to weekly calls, exclusive insights, and direct support from our creative team.",
  },
  { title: "get your vectori books", text: "we’ll send you a bundle of personalized vectori books to feature in your content." },
  {
    title: "create & share authentic content",
    text: "Produce fun, emotional, and relatable videos about your Vectori books. You’ll collaborate with our creative team and get real-time performance feedback on weekly community calls.",
  },
  {
    title: "earn consistent income & unlock exclusive prizes",
    text: "Our top creators are earning thousands every month — and you can too. You'll receive 20% commission on every sale made through your unique link, plus major bonus payouts and challenges.",
  },
];

function ApplyCta() {
  return (
    <div className="px-amb__cta">
      <PixButton variant="grey" size="md2" href={APPLY_URL} external>
        apply now
      </PixButton>
      <div className="px-avatars">
        {avatars.map((a) => (
          <Image key={a} src={st(a)} alt="" width={34} height={34} />
        ))}
      </div>
      <span className="px-product-card__stars" role="img" aria-label="5 Stars">
        {Array.from({ length: 5 }, (_, i) => (
          <StarIcon key={i} />
        ))}
      </span>
      <p className="px-amb__count">100+ vectori creators</p>
    </div>
  );
}

export default function AmbassadorPage() {
  return (
    <>
      <PageBanner
        title={
          <>
            join the vectori creator
            <br />
            community
          </>
        }
        image={st("amassador-main.jpg")}
      >
        <div className="px-amb">
          <div className="px-amb__inner">
            <p className="px-amb__lead">
              Join the Vectori Creator Community and get paid doing what you already love, creating content around the memories you
              never want to forget.
            </p>
            <div className="px-amb__video">
              <video src="https://cdn.shopify.com/videos/c/o/v/e9b392ee0c5e43388afb3fa7235c9106.mp4" controls playsInline preload="metadata" />
            </div>
            <ApplyCta />
          </div>
        </div>
      </PageBanner>

      <section className="px-container">
        <div className="px-amb px-amb--rounded">
          <div className="px-amb__inner">
            <p className="px-text px-display px-h1 px-grey px-center">
              meet our top affiliates
            </p>
            <div className="px-amb__affiliates">
              {["rectangle-40496.jpg", "rectangle-40497.jpg", "rectangle-40498.jpg"].map((f) => (
                <Image key={f} src={st(f)} alt="" width={736} height={762} sizes="33vw" />
              ))}
            </div>
            <div className="px-amb__quote">
              <strong>Jacqueline</strong>
              <p>“working with vectori inspires me every day - creating, growing, and feeling the best vibes all around!”</p>
            </div>
            <div className="px-amb__cta">
              <PixButton variant="grey" size="md2" href={APPLY_URL} external>
                apply now
              </PixButton>
            </div>
          </div>
        </div>
      </section>

      <section className="px-container">
        <div className="px-amb__inner">
          <p className="px-text px-display px-h1 px-grey px-center">
            how it works
          </p>
          <ol className="px-steps">
            {steps.map((s, i) => (
              <li key={s.title} className="px-step">
                <span className="px-step__num">{i + 1}</span>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <ApplyCta />
        </div>
      </section>

      <ValuesAccordion
        title="how you’ll earn as a vectori creator"
        image={st("frame-1321315648.jpg")}
        items={ambassadorEarn.map((e) => ({ title: e.q.replace(/&amp;/g, "&"), text: e.a.replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/&amp;/g, "&") }))}
      />

      <FaqSplit items={ambassadorFaq} image={st("faq.jpg")} />
    </>
  );
}
