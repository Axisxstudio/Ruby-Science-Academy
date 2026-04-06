"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Posts" },
  { href: "/#subjects", label: "Subjects" },
  { href: "/#teachers", label: "Teachers" },
  { href: "/#schedule", label: "Schedule" },
  { href: "/#results", label: "Results" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#feedback", label: "Feedback" },
  { href: "/#contact", label: "Contact" },
];

export function SiteNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm transition-all-smooth">
      <div className="section-shell flex h-20 items-center justify-between gap-4">
          <div className="flex items-center gap-4 group">
            <div className="flex size-14 items-center justify-center overflow-hidden rounded-2xl border-2 border-primary/10 bg-white shadow-md ring-4 ring-primary/5 transition-all-smooth group-hover:scale-110 group-hover:rotate-3">
              <Image
                src="/ruby-logo.jpeg"
                alt="RUBY Science Academy logo"
                width={56}
                height={56}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="font-display text-lg sm:text-l font-black tracking-tight text-primary leading-none uppercase">
                RUBY
              </p>
              <p className="font-display text-[10px] sm:text-xs font-black tracking-[0.2em] text-cyan uppercase mt-0.5 whitespace-nowrap">
                Science Academy
              </p>
            </div>
          </div>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              style={{ animationDelay: `${i * 75}ms` }}
              className="group relative text-sm font-semibold text-muted transition hover:text-primary animate-in fade-in slide-in-from-top-2 fill-mode-both duration-700"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-cyan transition-all-smooth group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex animate-in fade-in slide-in-from-right duration-700">
          <Button asChild variant="accent">
            <Link href="/#registration">Enroll Now</Link>
          </Button>
        </div>

        <button
          className="ring-focus inline-flex size-11 items-center justify-center rounded-full border border-border-soft bg-white text-primary lg:hidden"
          onClick={() => setOpen((value) => !value)}
          type="button"
          aria-label="Open menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {/* Professional Full-Screen Mobile Drawer - Positioned below fixed header */}
      <div
        className={cn(
          "fixed inset-x-0 bottom-0 top-20 z-40 bg-white/98 backdrop-blur-2xl transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] lg:hidden",
          open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col h-full section-shell pb-12 overflow-y-auto pt-8">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "py-4 text-2xl font-bold tracking-tight text-slate-900 transition-all duration-500",
                  open ? "translate-x-0 opacity-100" : "translate-x-12 opacity-0"
                )}
                style={{ transitionDelay: `${i * 50 + 100}ms` }}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className={cn(
            "mt-8 transition-all duration-700 delay-700",
            open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <Button asChild variant="accent" className="w-full rounded-2xl py-7 text-lg font-bold" onClick={() => setOpen(false)}>
              <Link href="/#registration">Enroll Now</Link>
            </Button>
          </div>

          <div className={cn(
            "mt-auto pt-8 border-t border-slate-100 transition-all duration-700 delay-1000",
            open ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <div className="flex flex-col gap-4 text-slate-400">
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-cyan">Official Academy Details</p>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-500">075 220 7369</p>
                <p className="text-xs font-semibold text-slate-500 leading-relaxed">414/1, George R. De Silva Mawatha, Colombo 13</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
