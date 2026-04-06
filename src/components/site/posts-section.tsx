"use client";

import Image from "next/image";
import { Send, MoreHorizontal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import type { Post } from "@/lib/types";

interface PostsSectionProps {
  posts: Post[];
}

export function PostsSection({ posts }: PostsSectionProps) {
  if (posts.length === 0) return null;

  return (
    <section id="posts" className="section-padding bg-slate-50/30">
      <div className="section-shell">
        <div className="mb-12 max-w-4xl">
          <span className="inline-block px-4 py-2 rounded-full-pro text-xs-pro font-bold uppercase tracking-[0.2em] bg-blue-100 text-blue-700 border border-blue-200 shadow-sm-pro mb-6">
            Latest Updates
          </span>
          <h2 className="text-balance font-display text-4xl-pro sm:text-5xl-pro font-black tracking-tight text-primary leading-tight">
            Academy Feed
          </h2>
          <p className="mt-4 max-w-2xl text-base-pro leading-relaxed text-slate-600">
            Stay updated with our latest announcements, student achievements, and classroom highlights.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden border border-slate-200 bg-white shadow-sm-pro transition-all-smooth hover:shadow-lg-pro rounded-xl">
              {/* Instagram Header */}
              <div className="flex items-center justify-between p-3 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <div className="size-8 rounded-full border border-slate-100 overflow-hidden bg-white">
                    <Image src="/ruby-logo.jpeg" alt="Academy Logo" width={32} height={32} className="object-cover" />
                  </div>
                  <div>
                    <p className="text-xs font-black text-primary leading-none">ruby_science_academy</p>
                    <p className="text-[10px] text-muted leading-none mt-1">Colombo 13</p>
                  </div>
                </div>
                <MoreHorizontal className="size-4 text-muted" />
              </div>

              {/* Instagram Image */}
              <div className="relative aspect-square bg-slate-100 overflow-hidden">
                <Image
                  src={post.image_url}
                  alt="Academy Post"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Caption Area - Premium Insta-Style */}
              <div className="px-4 pb-5 pt-4 border-t border-slate-50 bg-white">
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[13px] font-black tracking-tight text-[#0f4c81] hover:underline cursor-pointer">
                      ruby_science_academy
                    </span>
                    <svg className="size-3 text-blue-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zM9 17.414L4.586 13 6 11.586l3 3 7.586-7.586L18 8.414 9 17.414z" />
                    </svg>
                    <p className="text-[13px] text-slate-700 leading-relaxed break-words">
                      {post.description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.1em] text-slate-400">
                    {new Date(post.created_at || Date.now()).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>
                  <button
                    onClick={() => {
                      const shareData = {
                        title: 'RUBY Science Academy Update',
                        text: post.description,
                        url: window.location.href,
                      };
                      if (navigator.share) {
                        navigator.share(shareData).catch(console.error);
                      } else {
                        navigator.clipboard.writeText(window.location.href);
                        toast.success("Link copied to clipboard!");
                      }
                    }}
                    className="text-slate-400 hover:text-blue-500 transition-all-smooth"
                    title="Share post"
                  >
                    <Send className="size-4 -rotate-12" />
                  </button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
