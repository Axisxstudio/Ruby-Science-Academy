"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Menu, X, Home, BookOpen, Users, Calendar,
  Trophy, Image as ImageIcon, MessageSquare,
  Phone, Sparkles, ArrowRight
} from "lucide-react";
import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home", icon: Home },
  { href: "/posts", label: "Posts", icon: Sparkles },
  { href: "/#subjects", label: "Subjects", icon: BookOpen },
  { href: "/#teachers", label: "Teachers", icon: Users },
  { href: "/#schedule", label: "Schedule", icon: Calendar },
  { href: "/#results", label: "Results", icon: Trophy },
  { href: "/#gallery", label: "Gallery", icon: ImageIcon },
  { href: "/#feedback", label: "Feedback", icon: MessageSquare },
  { href: "/#contact", label: "Contact", icon: Phone },
];

export function SiteNavbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-white/80 backdrop-blur-lg shadow-md h-16" : "bg-white h-20"
        )}
      >
        <div className="section-shell flex h-full items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="flex size-10 sm:size-12 items-center justify-center overflow-hidden rounded-xl border-2 border-primary/10 bg-white shadow-md transition-all-smooth group-hover:scale-110 group-hover:rotate-3">
              <Image
                src="/ruby-logo.jpeg"
                alt="Logo"
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <p className="font-display text-base font-black tracking-tight text-primary leading-none uppercase">
                RUBY
              </p>
              <p className="font-display text-[9px] font-black tracking-[0.2em] text-cyan uppercase mt-0.5 whitespace-nowrap">
                Science Academy
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-sm font-bold text-slate-600 transition hover:text-primary uppercase tracking-wide"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-cyan transition-all-smooth group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <Button asChild variant="accent" size="sm" className="rounded-full px-6 font-black uppercase tracking-widest">
              <Link href="/#registration">Enroll Now</Link>
            </Button>
          </div>

          {/* Mobile Toggle */}
          <button
            suppressHydrationWarning
            className="ring-focus inline-flex size-10 items-center justify-center rounded-xl bg-slate-50 text-primary lg:hidden transition-colors hover:bg-slate-100"
            onClick={() => setOpen((prev) => !prev)}
            type="button"
            aria-label="Open menu"
          >
            <Menu className="size-6" />
          </button>
        </div>
      </header>

      {/* Professional Framer Motion Mobile Navigation - Outside Header */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] lg:hidden"
          >
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Content Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 200,
                mass: 0.8
              }}
              className="absolute inset-0 h-full w-full bg-white flex flex-col shadow-2xl overflow-y-auto"
            >
              {/* Header inside drawer */}
              <div className="flex h-20 items-center justify-between border-b border-slate-50 px-6 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="size-10 overflow-hidden rounded-xl border border-primary/10 shadow-sm">
                    <Image src="/ruby-logo.jpeg" alt="Logo" width={40} height={40} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-display text-base font-black text-primary leading-none uppercase tracking-tight">RUBY</p>
                    <p className="font-display text-[10px] font-black text-cyan uppercase tracking-widest mt-1 whitespace-nowrap">Science Academy</p>
                  </div>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="size-12 flex items-center justify-center rounded-2xl bg-slate-50 text-slate-500 hover:bg-slate-100 transition-colors border border-slate-100"
                >
                  <X className="size-6" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex-1 px-6 py-8 flex flex-col justify-between">
                <nav className="flex flex-col gap-3">
                  {navLinks.map((link, i) => {
                    const Icon = link.icon;
                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="group flex items-center gap-4 rounded-2xl p-4 text-slate-700 transition-all hover:bg-primary/5 hover:translate-x-2 border border-slate-50 hover:border-primary/10"
                        >
                          <div className="flex size-12 items-center justify-center rounded-xl bg-slate-50 text-slate-400 group-hover:bg-primary group-hover:text-white transition-all shadow-sm border border-slate-100 group-hover:border-primary">
                            <Icon className="size-6" />
                          </div>
                          <span className="text-lg font-bold tracking-tight text-primary-deep uppercase">{link.label}</span>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                <div className="mt-8 pt-8 border-t border-slate-50 pb-12">
                  <Button
                    asChild
                    className="w-full h-16 rounded-full bg-gradient-to-r from-bright-blue to-cyan font-black text-lg shadow-xl shadow-bright-blue/20 uppercase tracking-widest"
                    onClick={() => setOpen(false)}
                  >
                    <Link href="/#registration" className="flex items-center justify-center gap-2">
                      Enroll Now
                      <ArrowRight className="size-5" />
                    </Link>
                  </Button>
                  
                  <p className="text-center mt-6 text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
                    © 2026 Ruby Science Academy
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
