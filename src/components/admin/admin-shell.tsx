"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Camera, ClipboardList, Image as LucideImage, LayoutDashboard, Menu, MessageSquareText, Settings, Trophy, UserCircle2, Users, X, ChevronRight, LogOut, Globe } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/components/admin/sign-out-button";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/registrations", label: "Registrations", icon: ClipboardList },
  { href: "/admin/feedbacks", label: "Feedbacks", icon: MessageSquareText },
  { href: "/admin/posts", label: "Social Posts", icon: Camera },
  { href: "/admin/teachers", label: "Teachers", icon: Users },
  { href: "/admin/schedules", label: "Schedules", icon: CalendarDays },
  { href: "/admin/gallery", label: "Gallery", icon: LucideImage as any },
  { href: "/admin/results", label: "Results", icon: Trophy },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

interface AdminShellProps {
  userEmail: string;
  children: React.ReactNode;
}

export function AdminShell({ userEmail, children }: AdminShellProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const sidebar = (
    <aside className="relative flex h-full w-full max-w-[280px] flex-col border-r border-slate-200/60 bg-white p-4 shadow-sm">
      {/* Compact Sidebar Brand */}
      <div className="mb-8 flex items-center gap-3 px-2 pt-2">
        <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm border border-slate-100">
          <Image
            src="/ruby-logo.jpeg"
            alt="Logo"
            width={40}
            height={40}
            className="h-full w-full object-cover"
          />
        </div>
        <div>
          <h2 className="font-display text-base font-black text-primary leading-tight">
            RUBY Admin
          </h2>
          <p className="text-[10px] font-bold uppercase tracking-widest text-muted/70">
            Evolution Board
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto pr-1 custom-scrollbar">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "group relative flex items-center justify-between rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300",
                active
                  ? "text-blue-600"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
              )}
            >
              <div className="flex items-center gap-3 relative z-10 transition-transform group-hover:translate-x-0.5">
                <item.icon className={cn("size-[18px] transition-colors", active ? "text-blue-600" : "text-slate-400 group-hover:text-slate-600")} />
                {item.label}
              </div>

              <AnimatePresence>
                {active && (
                  <>
                    <motion.div
                      layoutId="sidebarActive"
                      className="absolute inset-0 rounded-xl bg-blue-50/80 border border-blue-100/50"
                      initial={false}
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                    <motion.div
                      initial={{ opacity: 0, x: -5 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="relative z-10"
                    >
                      <ChevronRight className="size-3.5 text-blue-500" />
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 space-y-2 pt-6 border-t border-slate-100">
        <Button asChild variant="ghost" className="w-full h-12 rounded-xl justify-start gap-3 bg-cyan/5 text-cyan hover:bg-cyan/10 hover:text-cyan border border-cyan/10 px-4 font-bold shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]">
          <Link href="/">
            <Globe className="size-[18px]" />
            View Website
          </Link>
        </Button>
        <div className="px-1"><SignOutButton /></div>
        <div className="mt-4 px-2 text-center">
          <Link 
            href="http://axisxstudio.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-200 transition-all hover:text-cyan hover:tracking-[0.4em]"
          >
            AxisX Studio
          </Link>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <div className="fixed inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(6,182,212,0.03),_transparent_40%)] pointer-events-none" />
      
      <div className="relative z-10 flex">
        {/* Desktop Sidebar */}
        <div className="sticky top-0 hidden h-screen lg:block shrink-0">
          {sidebar}
        </div>

        <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
          {/* Universal Header */}
          <header className="sticky top-0 z-40 flex items-center justify-between border-b border-slate-200 bg-white/80 px-4 py-3 backdrop-blur-md sm:px-6 h-[72px]">
            <div className="flex items-center gap-3 lg:hidden shrink-0">
              <button
                type="button"
                className="ring-focus inline-flex size-11 items-center justify-center rounded-xl bg-slate-50 text-slate-600 border border-slate-200 transition-colors hover:bg-white"
                onClick={() => setOpen((value) => !value)}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>

            <div className="hidden lg:block ml-2">
              <div className="flex items-center gap-2">
                <div className="size-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System Live</span>
              </div>
            </div>

            <div className="flex-1" />

            <div className="flex items-center gap-3">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 border border-slate-200 pl-4 pr-2 py-1.5 transition-all hover:bg-white hover:shadow-sm">
                <div className="hidden sm:block min-w-0">
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 leading-none mb-1">Administrator</p>
                  <p className="truncate text-xs font-bold text-slate-700 max-w-[150px] leading-none">{userEmail}</p>
                </div>
                <div className="flex size-9 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-lg overflow-hidden border border-white/20">
                  <UserCircle2 className="size-6" />
                </div>
              </div>
            </div>
          </header>

          <AnimatePresence>
            {open && (
              <>
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(false)}
                  className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm lg:hidden"
                />
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: 0 }}
                  exit={{ x: "-100%" }}
                  transition={{ type: "spring", damping: 25, stiffness: 200 }}
                  className="fixed inset-y-0 left-0 z-50 w-full max-w-[280px] lg:hidden"
                >
                  {sidebar}
                </motion.div>
              </>
            )}
          </AnimatePresence>

          <main className="flex-1 overflow-x-hidden">
            <motion.div
              key={pathname}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="p-4 sm:p-6 lg:p-10"
            >
              {children}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
