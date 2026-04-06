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
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-30 flex size-9 items-center justify-center rounded-none bg-white text-primary hover:bg-slate-50 transition-all duration-200 border border-slate-200 shadow-sm"
        >
          <X className="size-5" />
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
          
          {/* Announcement Badge - Sharp corners */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 bg-white shadow-sm border border-slate-100 transition-opacity duration-300 group-hover:opacity-0">
            <div className="flex size-6 items-center justify-center bg-cyan text-white">
              <Bell className="size-3" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">New Update</span>
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
