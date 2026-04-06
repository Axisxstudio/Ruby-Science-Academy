
"use client";

import { useState } from "react";
import { GallerySection } from "./gallery-section";
import { TestimonialsSection } from "./testimonials-section";
import type { GalleryItem, FeedbackItem } from "@/lib/types";

export function GalleryTestimonialsTabs({ galleryItems, feedbacks }: { galleryItems: GalleryItem[], feedbacks: FeedbackItem[] }) {
  const [activeTab, setActiveTab] = useState<"gallery" | "reviews">("gallery");

  return (
    <div className="py-12 lg:py-16 bg-[linear-gradient(180deg,_rgba(15,76,129,0.04),_rgba(247,251,255,1))]">
      <div className="section-shell flex justify-center mb-6">
        <div className="inline-flex bg-surface-soft p-1.5 rounded-[2rem] border border-border-soft shadow-sm">
          <button 
            type="button" 
            onClick={() => setActiveTab("gallery")}
            className={`px-8 py-3 rounded-[1.75rem] font-display font-bold transition-all duration-300 ${activeTab === "gallery" ? "bg-white shadow-[0_4px_12px_rgba(13,27,42,0.08)] text-primary" : "text-muted hover:text-primary"}`}
          >
            Gallery
          </button>
          <button 
            type="button"
            onClick={() => setActiveTab("reviews")}
            className={`px-8 py-3 rounded-[1.75rem] font-display font-bold transition-all duration-300 ${activeTab === "reviews" ? "bg-white shadow-[0_4px_12px_rgba(13,27,42,0.08)] text-primary" : "text-muted hover:text-primary"}`}
          >
            Student Reviews
          </button>
        </div>
      </div>

      <div className={activeTab === "gallery" ? "block animate-in fade-in zoom-in-95 duration-500" : "hidden"}>
        <GallerySection items={galleryItems} />
      </div>
      <div className={activeTab === "reviews" ? "block animate-in fade-in zoom-in-95 duration-500" : "hidden"}>
        <TestimonialsSection feedbacks={feedbacks} />
      </div>
    </div>
  );
}
