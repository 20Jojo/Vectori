"use client";

import Link from "next/link";
import { useState, type MouseEvent, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "dark" | "grey" | "white" | "outlined";
type Size = "sm" | "md2" | "lg";
type Edge = "top" | "bottom" | "left" | "right";

type PixButtonProps = {
  children: ReactNode;
  variant: Variant;
  size: Size;
  href?: string;
  external?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  /** Stretch to the container width. */
  full?: boolean;
  /** Render as a non-interactive span (e.g. a button inside a card link). */
  asSpan?: boolean;
};

/** The edge closest to the pointer decides where the hover fill slides in from. */
function nearestEdge(event: MouseEvent<HTMLElement>): Edge {
  const rect = event.currentTarget.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  const distances: Record<Edge, number> = {
    top: y / rect.height,
    bottom: (rect.height - y) / rect.height,
    left: x / rect.width,
    right: (rect.width - x) / rect.width,
  };
  return (Object.keys(distances) as Edge[]).reduce((a, b) => (distances[a] <= distances[b] ? a : b));
}

export function PixButton({
  children,
  variant,
  size,
  href,
  external,
  onClick,
  className,
  type = "button",
  disabled,
  full,
  asSpan,
}: PixButtonProps) {
  const [edge, setEdge] = useState<Edge>("bottom");
  const classes = cn("px-button", `px-button--${variant}`, `px-button--${size}`, full && "px-button--full", className);
  const content = (
    <>
      {children}
      <span className="px-button__fill px-button__fill--top" />
      <span className="px-button__fill px-button__fill--bottom" />
      <span className="px-button__fill px-button__fill--left" />
      <span className="px-button__fill px-button__fill--right" />
    </>
  );
  const shared = {
    className: classes,
    "data-hover-from": edge,
    onMouseEnter: (e: MouseEvent<HTMLElement>) => setEdge(nearestEdge(e)),
  };

  if (asSpan) return <span {...shared}>{content}</span>;
  if (href && href.startsWith("/") && !external) {
    return (
      <Link href={href} {...shared}>
        {content}
      </Link>
    );
  }
  if (href) {
    return (
      <a href={href} {...shared} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {content}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} {...shared}>
      {content}
    </button>
  );
}
