"use client";

import { useState } from "react";
import Image from "next/image";
import { Play, X } from "lucide-react";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { MediaLightbox } from "@/components/site/media-lightbox";
import { Card, CardContent } from "@/components/ui/card";
import type { GalleryItem } from "@/lib/types";

interface GallerySectionProps {
  items: GalleryItem[];
}

export function GallerySection({ items }: GallerySectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const renderMedia = (item: GalleryItem, index: number) => {
    const isHovered = hoveredIndex === index;
    if (item.media_type === 'video') {
      return (
        <div className="relative aspect-[4/5] overflow-hidden group">
          {/* Video Preview */}
          <div className="relative w-full h-full bg-black">
            <video
              src={item.image_url}
              className="w-full h-full object-contain pointer-events-none opacity-90"
              autoPlay
              muted
              loop
              playsInline
            />
            {/* Play Button Overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
              <div className="w-16 h-16 rounded-full-pro bg-white/90 backdrop-blur-sm flex items-center justify-center transform scale-90 group-hover:scale-100 transition-transform duration-300 shadow-xl">
                <Play className="size-6 text-cyan ml-1" fill="currentColor" />
              </div>
            </div>
          </div>

          {/* Hover Details */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 transform translate-y-full transition-all duration-300 group-hover:translate-y-0 pointer-events-none">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/80 mb-1.5">{item.category}</p>
            <h3 className="font-display text-sm font-bold text-white mb-2 line-clamp-3 leading-snug">{item.title}</h3>
            {isHovered && (
              <div className="space-y-2 animate-fade-in">
                <p className="text-xs text-white/90 leading-relaxed line-clamp-2">
                  {item.description || 'Watch the vibrant learning environment at RUBY Science Academy'}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-white/70 font-semibold uppercase tracking-widest mt-1">
                  <span>Click to watch reel</span>
                </div>
              </div>
            )}
          </div>
        </div>
      );
    }

    // Image rendering
    return (
      <div className="relative aspect-[4/5] overflow-hidden group bg-black">
        <Image
          src={item.image_url}
          alt={item.title}
          fill
          className="object-contain transition-transform duration-500 group-hover:scale-105 pointer-events-none"
          sizes="320px"
          draggable={false}
        />

        {/* Hover Details */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-4 transform translate-y-full transition-all duration-300 group-hover:translate-y-0 pointer-events-none">
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/80 mb-1.5">{item.category}</p>
          <h3 className="font-display text-sm font-bold text-white mb-2 line-clamp-3 leading-snug">{item.title}</h3>
          {isHovered && (
            <div className="space-y-2 animate-fade-in">
              <p className="text-xs text-white/90 leading-relaxed line-clamp-2">
                {item.description || 'Experience the vibrant learning environment at RUBY Science Academy'}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-white/70 font-semibold uppercase tracking-widest mt-1">
                <span>Click to view full image</span>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <section id="gallery" className="bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="section-shell relative z-10 pb-10">
        <div className="mb-12 max-w-3xl">
          <div className="space-y-4">
            <span className="inline-block px-4 py-2 rounded-full-pro text-xs-pro font-bold uppercase tracking-widest bg-blue-100 text-blue-700 border border-blue-200 shadow-sm-pro">
              Life At The Institute
            </span>
            <h2 className="text-3xl-pro sm:text-4xl-pro lg:text-5xl-pro font-black text-slate-900 leading-tight font-display">
              A Dynamic <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Learning Environment</span>
            </h2>
            <p className="text-base-pro leading-relaxed text-slate-600 max-w-lg">
              Experience the vibrant atmosphere and activities that make learning engaging and memorable at RUBY Science Academy.
            </p>
          </div>
        </div>

        {/* Full-bleed edge-to-edge swiper */}
        <div className="relative -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-12 overflow-visible">
          <Swiper
            slidesPerView="auto"
            spaceBetween={20}
            loop={items.length > 3}
            speed={10000}
            grabCursor={true}
            autoplay={{
              delay: 0,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
              reverseDirection: false,
            }}
            freeMode={true}
            modules={[Autoplay, FreeMode]}
            className="py-4 marquee-swiper"
          >
            {items.map((item, index) => (
              <SwiperSlide key={`${item.id}-${index}`} className="!h-auto max-w-[320px] cursor-grab">
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveIndex(index)}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="block h-full w-full text-left group"
                >
                  <Card className="h-full overflow-hidden transition-all duration-300 hover:shadow-lg-pro hover:-translate-y-2">
                    {renderMedia(item, index % items.length)}
                  </Card>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <MediaLightbox
        items={items.map((item) => ({
          title: item.title,
          caption: item.category,
          image_url: item.image_url,
          media_type: item.media_type,
          video_url: item.video_url,
          description: item.description,
        }))}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(null)}
        onChange={setActiveIndex}
      />
    </section>
  );
}
