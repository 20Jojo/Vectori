import Image from "next/image";
import type { ReactNode } from "react";
import { HeaderFrame } from "./SiteHeader";

type PageBannerProps = {
  title: ReactNode;
  image: string;
  /** Content rendered inside the same rounded block, directly under the banner (help pages, faq). */
  children?: ReactNode;
};

/** Banner page top: white header over a 350px image with a centered title. */
export function PageBanner({ title, image, children }: PageBannerProps) {
  return (
    <HeaderFrame tone="light">
      <div className="px-page">
        <div className="px-page__banner">
          <Image src={image} alt="" fill preload sizes="100vw" />
          <p className="px-page__title">{title}</p>
        </div>
        {children}
      </div>
    </HeaderFrame>
  );
}

/** Panel page top: grey header inside the light-grey rounded panel that holds the page content. */
export function PanelFrame({ children }: { children: ReactNode }) {
  return (
    <HeaderFrame tone="dark">
      <div className="px-panel">{children}</div>
    </HeaderFrame>
  );
}

export function LocalNote({ children }: { children: ReactNode }) {
  return <p className="px-local-note">{children}</p>;
}
