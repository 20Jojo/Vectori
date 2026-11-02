"use client";

import { useState, type ReactNode } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import type { Swiper as SwiperInstance, SwiperOptions } from "swiper/types";
import "swiper/css";
import { cn } from "@/lib/utils";
import { ChevronNextIcon } from "./icons";

type PixSliderProps = {
  slides: ReactNode[];
  slidesPerView?: number;
  spaceBetween?: number;
  breakpoints?: SwiperOptions["breakpoints"];
  whiteDots?: boolean;
  withoutNav?: boolean;
  className?: string;
  /** Extra content placed inside the slider frame, e.g. a CTA beside the dots. */
  footer?: ReactNode;
  label: string;
};

/**
 * Swiper carousel matching the source's "custom-slider": pill pagination
 * centred under the slides and chevron arrows bottom-right (hidden on mobile).
 */
export function PixSlider({
  slides,
  slidesPerView = 3,
  spaceBetween = 15,
  breakpoints,
  whiteDots,
  withoutNav,
  className,
  footer,
  label,
}: PixSliderProps) {
  const [swiper, setSwiper] = useState<SwiperInstance | null>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const syncEdges = (s: SwiperInstance) => setEdges({ start: s.isBeginning, end: s.isEnd });

  return (
    <div className={cn("px-slider", whiteDots && "px-slider--white-dots", className)} aria-label={label}>
      <Swiper
        modules={[Pagination]}
        slidesPerView={slidesPerView}
        spaceBetween={spaceBetween}
        breakpoints={breakpoints}
        pagination={{ el: ".px-slider__pagination", clickable: true }}
        onSwiper={(s) => {
          setSwiper(s);
          syncEdges(s);
        }}
        onSlideChange={syncEdges}
        onBreakpoint={syncEdges}
        onResize={syncEdges}
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={i}>{slide}</SwiperSlide>
        ))}
        <div slot="container-end" className="px-slider__pagination" />
      </Swiper>
      {!withoutNav && (
        <>
          <button
            type="button"
            className="px-slider__nav px-slider__nav--prev"
            aria-label="Previous slide"
            disabled={edges.start}
            onClick={() => swiper?.slidePrev()}
          >
            <ChevronNextIcon />
          </button>
          <button
            type="button"
            className="px-slider__nav px-slider__nav--next"
            aria-label="Next slide"
            disabled={edges.end}
            onClick={() => swiper?.slideNext()}
          >
            <ChevronNextIcon />
          </button>
        </>
      )}
      {footer}
    </div>
  );
}
