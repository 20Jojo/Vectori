import Image from "next/image";
import { img, sourceHref } from "./data";
import { PixButton } from "./PixButton";

export function EarlyAccess() {
  return (
    <section className="px-container">
      <div className="px-banner px-banner--early">
        <div className="px-banner__overlay px-banner__overlay--clear" />
        <Image
          className="px-banner__image"
          src={img("magazine-early-access-1.jpg")}
          alt="your travels, cover ready"
          fill
          sizes="100vw"
        />
        <div className="px-banner__content">
          <PixButton variant="white" size="md2" className="px-banner__cta--early">
            unlock early access
          </PixButton>
        </div>
      </div>
    </section>
  );
}

export function TreesPlanted() {
  return (
    <section className="px-container">
      <div className="px-trees">
        <p className="px-text px-display px-h1 px-grey">trees planted</p>
        <div className="px-trees__text">
          <div className="px-trees__gauge">
            <Image src={img("treesloader.png")} alt="" width={476} height={301} />
          </div>
          <p className="px-trees__count">64,858</p>
          <p className="px-text px-body">
            Thanks to your help we&apos;re continuing <br />
            to plant tress in collaboration with Just One Tree.
          </p>
        </div>
        <div className="px-trees__logo">
          <Image src={img("trees-logo-black.png")} alt="Just One Tree" width={952} height={291} />
        </div>
        <PixButton variant="grey" size="md2" href={sourceHref("/about")}>
          see the impact
        </PixButton>
      </div>
    </section>
  );
}

export function Ambassador() {
  return (
    <section className="px-container">
      <div className="px-banner px-banner--ambassador">
        <div className="px-banner__overlay px-banner__overlay--tint" />
        <Image className="px-banner__image" src={img("frame-14511.jpg")} alt="" fill sizes="100vw" />
        <div className="px-banner__content">
          <p className="px-banner__title">become a vectori ambassador</p>
          <p className="px-banner__text">
            earn money sharing your travels and unlock exclusive rewards for top affiliates.
          </p>
          <PixButton variant="white" size="md2" href={sourceHref("/ambassador")}>
            get the full story
          </PixButton>
        </div>
      </div>
    </section>
  );
}

export function Help() {
  return (
    <section className="px-container">
      <div className="px-help">
        <p className="px-text px-display px-h1 px-grey">need help?</p>
        <p className="px-text px-body px-shutter px-help__text">
          click below to find the answers to our most frequently asked questions or start a chat with one of our
          dedicated support agents
        </p>
        <PixButton variant="grey" size="md2" href={sourceHref("/faq")}>
          get answers
        </PixButton>
      </div>
    </section>
  );
}
