import type { Metadata } from "next";
import Image from "next/image";
import { brandValues } from "@/components/sites/vectori/data";
import { Community, ValuesAccordion } from "@/components/sites/vectori/InteractiveSections";
import { PageBanner } from "@/components/sites/vectori/PageParts";
import { PixButton } from "@/components/sites/vectori/PixButton";
import { PixSlider } from "@/components/sites/vectori/PixSlider";
import { Ambassador, TreesPlanted } from "@/components/sites/vectori/StaticSections";

export const metadata: Metadata = { title: "Vectori | about us" };

const st = (name: string) => `/sites/vectori/static/${name}`;
const insiders = ["1.jpg", "2.jpg", "3.jpg", "4.jpg"];
const pressLogos = [
  { src: "image-1329.png", alt: "Condé Nast", w: 193, h: 43 },
  { src: "group-1321314667.png", alt: "British Airways", w: 139, h: 58 },
  { src: "daily_mail_logo-freelogovectors.net_-1.png", alt: "Daily Mail", w: 173, h: 65 },
  { src: "ea3259e288-easyjet-logo-easyjet-logo-removebg-preview-1.png", alt: "easyJet", w: 165, h: 45 },
];

export default function AboutPage() {
  return (
    <>
      <PageBanner title="about us" image={st("main.jpg")} />

      <section className="px-container">
        <div className="px-founder">
          <div className="px-founder__copy">
            <p className="px-text px-display px-h1">meet the founder</p>
            <p className="px-founder__text">
              I’ve always been that person who captures everything, and <em>I</em> knew my photos deserved more than sitting on my
              phone. there’s something so special about holding your memories in your hands and seeing your life beautifully
              printed.
              <br />
              <br />
              vectori is all about capturing moments that matter and giving them the space they deserve. vectori gave my memories a
              home, and it’s grown into something so much bigger. a place where all of our stories can live on, together.
            </p>
            <div className="px-founder__sign">
              <Image src={st("sign-love-ella.png")} alt="love Ella x" width={440} height={146} />
            </div>
          </div>
          <div className="px-founder__image">
            <Image src={st("frame-801.jpg")} alt="" width={1388} height={1388} sizes="(min-width: 1200px) 50vw, 100vw" />
          </div>
        </div>
      </section>

      <ValuesAccordion title="what we value" image={st("frame-801-1.jpg")} items={brandValues} />
      <TreesPlanted />

      <section className="px-container">
        <div className="px-brand">
          <div>
            <PixSlider
              label="Vectori insiders"
              slidesPerView={1}
              spaceBetween={0}
              whiteDots
              withoutNav
              slides={insiders.map((f) => (
                <div key={f} className="px-square-slide">
                  <Image src={st(f)} alt="" fill sizes="(min-width: 1024px) 50vw, 100vw" />
                </div>
              ))}
            />
          </div>
          <div>
            <div className="px-split-copy">
              <div className="px-split-copy__inner">
                <p className="px-split-copy__title">join the community</p>
                <div className="px-split-copy__text">
                  <p>
                    vectori insiders is a private corner of our vectori world — a living scrapbook of postcards, diaries, and memories
                    from inside the brand.
                  </p>
                  <br />
                  <p>behind-the-scenes moments, early peeks, exclusive perks, and the things we don’t share anywhere else.</p>
                  <br />
                  <p>for those who love travel, documenting life, and keeping memories close.</p>
                </div>
                <PixButton variant="grey" size="md2" href="https://whatsapp.com/channel/0029VbCUX9UBvvsksVckZf10" external>
                  step into our world
                </PixButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-container">
        <div className="px-logos">
          {pressLogos.map((l) => (
            <Image key={l.src} src={st(l.src)} alt={l.alt} width={l.w} height={l.h} />
          ))}
        </div>
      </section>

      <Community />
      <Ambassador />
    </>
  );
}
