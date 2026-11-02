"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronDownIcon } from "./icons";
import { PixSlider } from "./PixSlider";

export type QA = { q: string; a: string };

/** Accordion list of questions and answers (faq page, product page, ambassador page). */
export function QaList({ items, idPrefix }: { items: QA[]; idPrefix: string }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      {items.map((item, i) => {
        const isOpen = open === i;
        const id = `${idPrefix}-${i}`;
        return (
          <div key={item.q} className={cn("px-qa", isOpen && "px-qa--open")}>
            <h3>
              <button type="button" className="px-qa__summary" aria-expanded={isOpen} aria-controls={id} onClick={() => setOpen(isOpen ? null : i)}>
                <span className="px-qa__question" dangerouslySetInnerHTML={{ __html: item.q }} />
                <span className="px-accordion__icon">
                  <ChevronDownIcon />
                </span>
              </button>
            </h3>
            <div className="px-qa__region" id={id} role="region">
              <div>
                <div className="px-qa__answer" dangerouslySetInnerHTML={{ __html: item.a }} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/** FAQ list on the left, black-and-white wordmark image on the right. */
export function FaqSplit({ items, image }: { items: QA[]; image: string }) {
  return (
    <section className="px-container">
      <div className="px-faq-split">
        <div className="px-faq-split__list">
          <p className="px-text px-display px-h1 px-grey">faq</p>
          <QaList items={items} idPrefix="faq-split" />
        </div>
        <div className="px-faq-split__image">
          <Image src={image} alt="your moments, forever kept — vectori" fill sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
      </div>
    </section>
  );
}

const VIDEO_ORIGIN = "/sites/vectori/videos/";
const creatorVideos = [
  { poster: "frame-1-0.png", file: "01 - 6.4m .mp4", views: "6.4m", w: 1080, h: 1920 },
  { poster: "frame-1-1.png", file: "02 - 7.3m .mp4", views: "7.3m", w: 576, h: 1024 },
  { poster: "frame-1-2.png", file: "03 - 5.1m .mp4", views: "5.1m", w: 1080, h: 1920 },
  { poster: "frame-1-3.png", file: "04 - 300.01k .mp4", views: "300.01k", w: 1080, h: 1920 },
  { poster: "frame-1-4.png", file: "05 - 4.6m .mp4", views: "4.6m", w: 1080, h: 1920 },
  { poster: "frame-1-5.png", file: "06 - 2.1m .mp4", views: "2.1m", w: 576, h: 1024 },
  { poster: "frame-1-6.png", file: "07 - 5165 .mp4", views: "5165", w: 540, h: 960 },
  { poster: "frame-1-7.png", file: "08 - 96.6k .mp4", views: "96.6k", w: 1080, h: 1920 },
];

const PlayIcon = () => (
  <svg width="14" height="16" viewBox="0 0 14 16" fill="currentColor" aria-hidden="true">
    <path d="M0 1.5v13a1 1 0 0 0 1.5.86l11-6.5a1 1 0 0 0 0-1.72l-11-6.5A1 1 0 0 0 0 1.5z" />
  </svg>
);

const EyeIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

/** "vectori + you": creator video posters; clicking one plays the clip in a modal. */
export function CreatorVideos() {
  const [playing, setPlaying] = useState<string | null>(null);

  useEffect(() => {
    if (!playing) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setPlaying(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [playing]);

  return (
    <section className="px-container">
      <div className="px-community">
        <div className="px-section-head">
          <p className="px-text px-display px-h1 px-grey">vectori + you</p>
          <p className="px-text px-body px-shutter">created by you, loved by us</p>
        </div>
        <PixSlider
          label="Creator videos"
          whiteDots
          breakpoints={{
            0: { slidesPerView: 1.6, spaceBetween: 13 },
            768: { slidesPerView: 3, spaceBetween: 20 },
            1024: { slidesPerView: 5, spaceBetween: 20 },
          }}
          slides={creatorVideos.map((v) => (
            <button key={v.file} type="button" className="px-creator" aria-label={`Play creator video, ${v.views} views`} onClick={() => setPlaying(v.file)}>
              <Image src={`/sites/vectori/static/${v.poster}`} alt="" width={v.w} height={v.h} sizes="(min-width: 1024px) 20vw, 60vw" />
              <span className="px-creator__play">
                <PlayIcon />
              </span>
              <span className="px-creator__views">
                <EyeIcon />
                {v.views}
              </span>
            </button>
          ))}
        />
      </div>
      {playing && (
        <div className="px-modal" role="dialog" aria-label="Creator video" onClick={() => setPlaying(null)}>
          <div className="px-modal__body" onClick={(e) => e.stopPropagation()}>
            <button type="button" className="px-modal__close" aria-label="Close video" onClick={() => setPlaying(null)}>
              ×
            </button>
            <video src={VIDEO_ORIGIN + encodeURIComponent(playing)} autoPlay playsInline loop controls />
          </div>
        </div>
      )}
    </section>
  );
}

export function Tutorial() {
  return (
    <section className="px-container">
      <div className="px-tutorial">
        <div className="px-section-head">
          <p className="px-text px-display px-h1 px-grey">create in under 5 minutes</p>
          <p className="px-text px-body px-shutter">Bree show&apos;s you how easy it is to create a custom photobook</p>
        </div>
        <div className="px-tutorial__frame">
          <iframe
            src="https://www.youtube.com/embed/XhclzJS_Jqo?controls=0"
            title="Create a custom travel photobook in under 5 minutes"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
