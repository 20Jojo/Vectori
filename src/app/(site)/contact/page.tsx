import type { Metadata } from "next";
import Image from "next/image";
import type { ReactNode } from "react";
import { PageBanner } from "@/components/sites/vectori/PageParts";
import { PixButton } from "@/components/sites/vectori/PixButton";

export const metadata: Metadata = { title: "Vectori | contact" };

const st = (name: string) => `/sites/vectori/static/${name}`;

type ContactBlockProps = {
  title: ReactNode;
  children: ReactNode;
  cta: string;
  mail: string;
  image: string;
  imageFirst: boolean;
};

function ContactBlock({ title, children, cta, mail, image, imageFirst }: ContactBlockProps) {
  const copy = (
    <div key="copy">
      <div className="px-split-copy">
        <div className="px-split-copy__inner">
          <p className="px-split-copy__title">{title}</p>
          <p className="px-split-copy__text">{children}</p>
          <PixButton variant="grey" size="md2" href={`mailto:${mail}`} external>
            {cta}
          </PixButton>
        </div>
      </div>
    </div>
  );
  const picture = (
    <div key="image" className="px-brand__image">
      <Image src={st(image)} alt="" width={1388} height={1388} sizes="(min-width: 1024px) 50vw, 100vw" />
    </div>
  );
  return (
    <section className="px-container">
      <div className="px-brand">{imageFirst ? [picture, copy] : [copy, picture]}</div>
    </section>
  );
}

export default function ContactPage() {
  return (
    <>
      <PageBanner title="we’re here to help" image={st("contact-us.jpg")} />
      {/* The source lays these out copy-first then image-first; on mobile the image stacks on top. */}
      <ContactBlock title="customer support" cta="contact support" mail="support@vectori.com" image="frame-803.jpg" imageFirst>
        Need help with your order or have a question about our photobooks? Our friendly support team is ready to assist you!
        <br />
        <br />
        Drop us an email at{" "}
        <a className="px-link-hover" href="mailto:support@vectori.com">
          support@vectori.com
        </a>
        , and we’ll get back to you as soon as possible.
      </ContactBlock>
      <ContactBlock
        title={
          <>
            Work With Us. Let’s <br />
            Bring Ideas to Life!
          </>
        }
        cta="contact collab"
        mail="collab@vectori.com"
        image="frame-801-1.jpg"
        imageFirst
      >
        Have an exciting partnership idea? <br /> Whether you’re a brand, or a creator looking to collaborate, we’d love to hear from you!
        <br />
        <br />
        Reach out to us at{" "}
        <a className="px-link-hover" href="mailto:collab@vectori.com">
          collab@vectori.com
        </a>
        , and let’s explore how we can create something amazing together.
      </ContactBlock>
    </>
  );
}
