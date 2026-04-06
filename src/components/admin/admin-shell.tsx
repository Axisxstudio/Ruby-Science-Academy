"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CalendarDays, Camera, ClipboardList, Image as LucideImage, LayoutDashboard, Menu, MessageSquareText, Settings, Trophy, UserCircle2, Users, X } from "lucide-react";
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
    <aside className="relative flex h-full w-full max-w-[280px] flex-col border-r border-white/40 bg-white/60 p-4 backdrop-blur-3xl">
      {/* Compact Sidebar Brand */}
      <div className="mb-6 flex items-center gap-3 px-2 pt-2">
        <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-md border border-slate-100">
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
            Control Panel
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1.5 overflow-y-auto pr-2">
        {navItems.map((item) => {
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all-smooth",
                active
                  ? "bg-[linear-gradient(135deg,var(--primary),var(--bright-blue))] text-white shadow-md shadow-blue-600/20"
                  : "text-muted hover:bg-white hover:text-primary hover:shadow-sm",
              )}
            >
              <item.icon className="size-[18px]" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 space-y-3 pt-4 border-t border-slate-200/50">
        <Button asChild variant="accent" className="w-full h-11 rounded-xl shadow-sm">
          <Link href="/">View Website</Link>
        </Button>
        <div className="px-1 truncate"><SignOutButton /></div>
        <div className="mt-2 px-2 text-center">
          <Link 
            href="http://axisxstudio.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300 transition-all hover:text-cyan hover:tracking-[0.25em]"
          >
            AxisX Studio
          </Link>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-slate-50/50">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_right,_rgba(6,182,212,0.08),_transparent_40%),radial-gradient(circle_at_bottom_left,_rgba(17,76,156,0.08),_transparent_40%)] pointer-events-none" />
      <div className="relative z-10 flex">
        <div className="sticky top-0 hidden h-screen lg:block">{sidebar}</div>

        <div className="flex min-h-screen flex-1 flex-col overflow-hidden">
          {/* Universal Header */}
          <header className="fixed top-0 inset-x-0 lg:sticky lg:inset-x-auto z-40 flex items-center justify-between border-b border-slate-200/50 bg-white/95 px-4 py-3 backdrop-blur-xl sm:px-6 h-[64px]">
            <div className="flex items-center gap-3 lg:hidden shrink-0">
              <button
                type="button"
                className="ring-focus inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-primary"
                onClick={() => setOpen((value) => !value)}
              >
                {open ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
              <div className="sm:hidden">
                <p className="font-display text-lg font-black text-primary tracking-tighter uppercase">RUBY</p>
              </div>
            </div>

            {/* Spacer for desktop to push badge to right */}
            <div className="hidden lg:block flex-1" />

            {/* Top Right Mini Profile Badge */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2.5 pr-2">
                <div className="flex size-8 items-center justify-center rounded-full bg-slate-100 text-primary border border-border-soft">
                  <UserCircle2 className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-muted/70 leading-none mb-0.5">Signed in</p>
                  <p className="truncate text-xs font-semibold text-primary max-w-[120px] sm:max-w-[200px] leading-none">{userEmail}</p>
                </div>
              </div>
            </div>
          </header>

          {open ? (
            <div className="fixed inset-0 z-50 bg-primary-deep/40 backdrop-blur-sm lg:hidden">
              <div className="absolute inset-y-0 left-0 w-full max-w-[280px]">
                {sidebar}
              </div>
            </div>
          ) : null}

          <main className="flex-1 p-4 pt-[80px] sm:p-6 sm:pt-[100px] lg:p-8 lg:pt-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
