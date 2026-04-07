"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MediaType } from "@/lib/types";

interface LightboxItem {
  title: string;
  caption?: string;
  image_url: string;
  media_type?: MediaType;
  description?: string | null;
}

interface MediaLightboxProps {
  items: LightboxItem[];
  activeIndex: number | null;
  onClose: () => void;
  onChange: (nextIndex: number) => void;
}

export function MediaLightbox({
  items,
  activeIndex,
  onClose,
  onChange,
}: MediaLightboxProps) {
  const item = activeIndex !== null ? items[activeIndex] : null;

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (activeIndex === null) return;

    if (e.key === "ArrowLeft") {
      onChange((activeIndex - 1 + items.length) % items.length);
    } else if (e.key === "ArrowRight") {
      onChange((activeIndex + 1) % items.length);
    } else if (e.key === "Escape") {
      onClose();
    }
  }, [activeIndex, items.length, onChange, onClose]);

  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, handleKeyDown]);

  if (!item || activeIndex === null) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-md animate-in fade-in duration-200">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-[10010]"
      >
        <X className="w-6 h-6" />
      </button>

      {/* Prev Button Desktop */}
      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onChange((activeIndex - 1 + items.length) % items.length); }}
          className="absolute left-4 lg:left-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors hidden sm:block z-[10010]"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
      )}

      {/* Content wrapper */}
      <div
        className="relative w-full max-w-[400px] h-[80vh] sm:h-[85vh] bg-black rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 z-[10000]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-0 bg-black flex items-center justify-center">
          {item.media_type === "video" ? (
            <video
              controls
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              src={item.image_url}
            />
          ) : (
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              className="object-cover"
              sizes="400px"
              priority
            />
          )}
        </div>

        {/* Caption Area Overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 pt-24 z-10 flex flex-col pointer-events-none">
          {item.caption && (
            <p className="text-[10px] font-black uppercase tracking-widest text-cyan mb-1.5 drop-shadow-md">{item.caption}</p>
          )}
          <h3 className="font-display font-black text-2xl text-white drop-shadow-md pr-12">{item.title}</h3>

          {item.description && (
            <p className="text-sm text-white/90 leading-relaxed line-clamp-3 mt-2 drop-shadow-sm">{item.description}</p>
          )}

          {/* Mobile Controls */}
          {items.length > 1 && (
            <div className="flex flex-col gap-3 absolute right-4 bottom-6 sm:hidden pointer-events-auto">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-black/40 hover:bg-black/60 text-white border-white/20 backdrop-blur-md"
                onClick={(e) => { e.stopPropagation(); onChange((activeIndex - 1 + items.length) % items.length); }}
              >
                <ChevronLeft className="size-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full bg-black/40 hover:bg-black/60 text-white border-white/20 backdrop-blur-md"
                onClick={(e) => { e.stopPropagation(); onChange((activeIndex + 1) % items.length); }}
              >
                <ChevronRight className="size-5" />
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Next Button Desktop */}
      {items.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); onChange((activeIndex + 1) % items.length); }}
          className="absolute right-4 lg:right-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors hidden sm:block z-[10010]"
        >
          <ChevronRight className="w-8 h-8" />
        </button>
      )}

      {/* Background Click layer outside */}
      <div className="absolute inset-0 z-0 cursor-pointer" onClick={onClose} />
    </div>
  );
}
