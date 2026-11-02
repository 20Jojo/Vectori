import Image from "next/image";
import { img } from "./data";
import { TrustpilotHeroBadge } from "./icons";
import { PixButton } from "./PixButton";
import { HeaderFrame } from "./SiteHeader";

export function Hero() {
  return (
    <HeaderFrame tone="light">
      <div className="px-hero">
        <div className="px-hero__overlay" />
        <Image className="px-hero__image" src={img("hero-home.jpg")} alt="" fill preload sizes="100vw" />
        <div className="px-hero__content">
          <TrustpilotHeroBadge className="px-hero__badge" aria-label="excellent, 4.8 rated on Trustpilot" />
          <p className="px-hero__title">
            your moments,
            <br /> forever kept
          </p>
          <p className="px-hero__subtitle">
            custom keepsakes that turn your <br />
            memories into something real
          </p>
          <PixButton variant="white" size="md2" href="/collections/all">
            shop most popular
          </PixButton>
          <div className="px-hero__press">
            <div className="px-hero__press-first">
              <Image src={img("daily_mail_logo-.png")} alt="Daily Mail" width={145} height={35} />
            </div>
            <Image src={img("british-airways-logo.png")} alt="British Airways" width={167} height={73} />
            <Image src={img("just-one-tree-logo.png")} alt="Just One Tree" width={210} height={66} />
          </div>
        </div>
      </div>
    </HeaderFrame>
  );
}
