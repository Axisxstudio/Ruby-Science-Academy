"use client";

import { useEffect, useState } from "react";
import { X, ArrowRight, Bell } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Post } from "@/lib/types";

interface LatestPostPopupProps {
  post: Post | null;
}

export function LatestPostPopup({ post }: LatestPostPopupProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!post) return;
    
    // Check if user has already seen this specific post
    const lastSeenId = localStorage.getItem("vnn_last_post_seen");
    if (lastSeenId !== post.id) {
      setMounted(true);
      // Delay it for better effect
      const timer = setTimeout(() => setOpen(true), 1500);
      return () => clearTimeout(timer);
    }
  }, [post]);

  const handleClose = () => {
    if (post) {
      localStorage.setItem("vnn_last_post_seen", post.id);
    }
    setOpen(false);
    // Remove from DOM after transition
    setTimeout(() => setMounted(false), 500);
  };

  if (!post || !mounted) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 transition-opacity duration-500 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-primary-deep/60 backdrop-blur-md" 
        onClick={handleClose} 
      />
      
      {/* Modal Content */}
      <div 
        className={`group relative w-full max-w-lg overflow-hidden bg-white shadow-2xl transition-all duration-500 transform ${open ? 'scale-100 translate-y-0 opacity-100' : 'scale-90 translate-y-10 opacity-0'}`}
      >
        {/* Close Button - Glassmorphism */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-40 flex size-8 items-center justify-center rounded-full bg-black/20 backdrop-blur-lg text-white hover:bg-black/40 transition-all duration-300 border border-white/20 shadow-xl group/close"
          aria-label="Close"
        >
          <X className="size-4 transition-transform duration-500 group-hover/close:rotate-90" />
        </button>

        {/* Content Container */}
        <div className="relative aspect-square sm:aspect-[4/5] w-full overflow-hidden">
          <Image
            src={post.image_url}
            alt="Ad image"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
            onError={() => console.error("Image failed to load")}
          />
          
          {/* Announcement Badge - Professional Glassmorphism */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-2.5 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full shadow-lg transition-all duration-500 group-hover:bg-white/20">
            <div className="flex size-5 items-center justify-center rounded-full bg-cyan/80 text-white shadow-[0_0_10px_rgba(6,182,212,0.5)]">
              <Bell className="size-2.5 animate-bounce" />
            </div>
            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-white">New Update</span>
          </div>

          {/* Interactive Overlay (Sharp corners, no white background) */}
          <div className="absolute inset-0 z-10 flex flex-col justify-end bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="transform translate-y-10 group-hover:translate-y-0 transition-transform duration-500 ease-out p-8 sm:p-12">
              <p className="text-2xl font-black leading-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)] italic text-balance mb-0 uppercase tracking-tight">
                "{post.description}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
