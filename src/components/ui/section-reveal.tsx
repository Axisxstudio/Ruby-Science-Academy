"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  threshold?: number;
  /** Animation variant */
  variant?: "fade-up" | "fade-in" | "fade-left" | "fade-right";
  /** Delay before animation starts (ms) */
  delay?: number;
}

export function SectionReveal({
  children,
  className,
  id,
  threshold = 0.1,
  variant = "fade-up",
  delay = 0,
}: SectionRevealProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Once revealed, stop observing
          observer.unobserve(node);
        }
      },
      { threshold, rootMargin: "0px 0px -5% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  const baseStyle: React.CSSProperties = {
    transition: `opacity 0.6s ease, transform 0.6s ease`,
    transitionDelay: `${delay}ms`,
  };

  const hiddenStyle: React.CSSProperties = {
    opacity: 0,
    transform:
      variant === "fade-up"
        ? "translateY(32px)"
        : variant === "fade-left"
        ? "translateX(-32px)"
        : variant === "fade-right"
        ? "translateX(32px)"
        : "none",
  };

  const visibleStyle: React.CSSProperties = {
    opacity: 1,
    transform: "translate(0, 0)",
  };

  return (
    <div
      id={id}
      ref={sectionRef}
      className={cn(className)}
      style={{ ...baseStyle, ...(isVisible ? visibleStyle : hiddenStyle) }}
    >
      {children}
    </div>
  );
}
