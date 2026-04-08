"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2, Star, Users, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { Typewriter } from "@/components/ui/typewriter";
import type { SiteSettings, Teacher } from "@/lib/types";
import Link from "next/link";

interface HeroSectionProps {
  settings: SiteSettings;
  teachers: Teacher[];
}

export function HeroSection({ settings, teachers }: HeroSectionProps) {
  // Mock student avatars for social proof
  const studentAvatars = [
    "https://i.pravatar.cc/150?u=1",
    "https://i.pravatar.cc/150?u=2",
    "https://i.pravatar.cc/150?u=3",
    "https://i.pravatar.cc/150?u=4",
  ];

  return (
    <section
      id="home"
      className="relative min-h-[85vh] lg:min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[#0f4c81]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,194,255,0.1),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(30,136,229,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-primary-deep/95 to-transparent" />

        {/* Large Background Decorative Text */}
        <div className="absolute -right-24 top-1/2 -translate-y-1/2 select-none pointer-events-none opacity-[0.03] rotate-90 origin-center hidden lg:block">
          <span className="text-[25rem] font-black tracking-tighter whitespace-nowrap text-white leading-none">RSA</span>
        </div>

        {/* Animated Ambient Glows */}
        <div className="absolute -top-[10%] -left-[5%] w-[60%] h-[60%] bg-cyan/5 rounded-full blur-[140px] animate-pulse duration-[12s]" />
        <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-bright-blue/5 rounded-full blur-[120px] animate-pulse delay-1000 duration-[10s]" />
        <div className="absolute -bottom-[20%] left-1/2 -translate-x-1/2 w-[80%] h-[40%] bg-cyan/5 rounded-full blur-[160px]" />
      </div>

      <div className="section-shell relative z-10 py-12 lg:py-0 flex items-center min-h-[inherit]">
        <div className="w-full grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">

          {/* Content Section */}
          <div className="relative z-20 text-left space-y-10 lg:space-y-14">
            <div className="space-y-6 lg:space-y-8">
              <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-1000">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan shadow-[0_0_12px_rgba(6,182,212,1)]"></span>
                </span>
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-cyan pt-0.5 leading-none px-1">Premier Academy</span>
              </div>

              <div className="space-y-4 lg:space-y-6">
                <div className="text-[10px] sm:text-xs font-black text-cyan uppercase tracking-[0.4em] animate-in fade-in slide-in-from-left-4 duration-700 delay-150">
                  <Typewriter text="Welcome to RUBY SCIENCE ACADEMY" speed={60} delay={500} />
                </div>
                <h1 className="text-3xl sm:text-5xl lg:text-[72px] font-black tracking-tighter leading-[0.95] text-white animate-in fade-in slide-in-from-left-4 duration-1000 delay-300">
                  2028 A/L <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-cyan/80 drop-shadow-sm">
                    Science Stream
                  </span>
                  <span className="block text-lg sm:text-xl lg:text-2xl mt-6 font-bold text-cyan/90 tracking-tight">
                    Master Physics, Chemistry & Maths
                  </span>
                </h1>
                <div className="max-w-xl animate-in fade-in slide-in-from-left-4 duration-1000 delay-500">
                  <p className="text-xs sm:text-sm lg:text-base font-medium leading-relaxed text-white/50 border-l-2 border-cyan/30 pl-6 py-1">
                    Tamil Medium Classes | Colombo Kotahena | Proven A/L Results
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Button asChild size="lg" className="h-[60px] bg-gradient-to-r from-cyan to-bright-blue hover:from-cyan/90 hover:to-bright-blue/90 text-white shadow-[0_20px_40px_rgba(6,182,212,0.3)] transition-all duration-500 hover:scale-[1.05] active:scale-95 px-12 text-xs font-black uppercase tracking-widest rounded-2xl w-full sm:w-auto overflow-hidden group">
                  <Link href="#registration" className="relative z-10 flex items-center">
                    Join Now <ArrowRight className="size-4 ml-3 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="h-[60px] bg-white/5 backdrop-blur-md border-white/10 text-white hover:bg-white/10 transition-all duration-300 px-12 text-xs font-black uppercase tracking-widest rounded-2xl border-2 w-full sm:w-auto">
                  <Link href="#schedule">View Schedule</Link>
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-x-12 gap-y-10 border-t border-white/5 pt-10">
                <div className="flex items-center gap-5 px-1">
                  <div className="flex -space-x-3">
                    {studentAvatars.map((url, i) => (
                      <div key={i} className="relative size-12 rounded-full border-2 border-[#114c9c] overflow-hidden bg-white/10 ring-4 ring-cyan/5 transition-transform hover:scale-110 hover:z-10">
                        <Image src={url} alt={`Student ${i}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="size-3.5 fill-cyan text-cyan" />)}
                      <span className="ml-1 text-sm font-black text-white">5.0</span>
                    </div>
                    <p className="text-[10px] font-black text-white/30 uppercase tracking-widest">Join 100+ Top Students</p>
                  </div>
                </div>

                <div className="flex items-center gap-12">
                  <div className="h-12 w-px bg-white/10 hidden md:block" />
                  <div className="flex items-center gap-10">
                    <div className="space-y-1 group cursor-default">
                      <p className="text-2xl lg:text-3xl font-black text-white tracking-tighter group-hover:text-cyan transition-colors duration-500"><AnimatedCounter end={95} suffix="%" /></p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Pass Rate</p>
                    </div>
                    <div className="space-y-1 group cursor-default">
                      <p className="text-2xl lg:text-3xl font-black text-white tracking-tighter group-hover:text-cyan transition-colors duration-500">Island Top</p>
                      <p className="text-[10px] font-black uppercase tracking-widest text-white/40">Results</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative group perspective-2000 mt-12 lg:mt-0 animate-in fade-in zoom-in-95 duration-1000 delay-500">
            {/* Background Accent Glow */}
            <div className="absolute inset-x-0 -inset-y-32 bg-cyan/10 blur-[200px] rounded-full scale-90 group-hover:scale-110 transition-transform duration-[2000ms]" />

            {/* The Logo - Direct and Floating */}
            <div className="relative z-10 w-full aspect-square flex items-center justify-center p-12 lg:-mr-12">
              <div className="relative w-full h-full transition-all duration-[2000ms] hover:scale-105 active:scale-95 animate-float group-hover:drop-shadow-[0_0_120px_rgba(6,182,212,0.4)]">
                <Image
                  src="/ruby-science-logo.png"
                  alt="RUBY SCIENCE ACADEMY"
                  fill
                  className="object-contain drop-shadow-[0_60px_120px_rgba(0,0,0,0.6)] transition-transform duration-1000 ease-out"
                  priority
                />
              </div>
            </div>

            {/* Floating Stat Card - 95% Pass Rate */}
            <div className="absolute -top-10 -left-10 w-44 h-auto animate-float-slow z-30 animate-in fade-in zoom-in duration-1000 delay-[1200ms]">
              <div className="bg-[#0a1628]/95 backdrop-blur-3xl border border-white/10 p-5 rounded-3xl shadow-[0_30px_60px_rgba(0,0,0,0.5)] overflow-hidden group/card relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan/20 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-1000" />
                <div className="relative z-10 text-center">
                  <p className="text-3xl font-black text-white tracking-tighter flex items-center justify-center gap-1">
                    95<span className="text-cyan text-sm font-bold">%</span>
                  </p>
                  <p className="text-[9px] font-bold uppercase tracking-widest text-white/40 mt-0.5">Pass Rate</p>
                  <div className="mt-3 flex items-center justify-center gap-1.5">
                    <div className="size-1.5 rounded-full bg-cyan animate-pulse shadow-[0_0_8px_rgba(6,182,212,1)]" />
                    <p className="text-[8px] font-black text-cyan uppercase tracking-widest">Excellence</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Status Badge Card */}
            <div className="hidden lg:block absolute -bottom-6 -right-2 w-44 h-auto animate-float z-30 animate-in fade-in zoom-in duration-1000 delay-[1500ms] text-black">
              <div className="bg-white/95 group-hover:bg-white backdrop-blur-3xl border border-white p-4 rounded-3xl shadow-[0_25px_50px_rgba(0,0,0,0.2)] transition-all duration-700">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-cyan/10 text-[7px] font-black text-cyan uppercase tracking-widest leading-none">Registration</span>
                  <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
                </div>
                <p className="text-base font-black text-slate-900 leading-tight tracking-tight">Open for <br /><span className="text-cyan text-xl">2028 Intake</span></p>
                <div className="mt-4 flex items-center justify-between gap-2 border-t border-slate-100 pt-4">
                  <div className="flex -space-x-1.5">
                    {[1, 2, 3].map(i => <div key={i} className="size-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm" />)}
                  </div>
                  <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">New Batch</p>
                </div>
              </div>
            </div>

            {/* Decorative elements around image */}
            <div className="absolute -top-12 -right-12 size-40 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_1.5px,transparent_1px)] bg-[size:16px_16px] opacity-25 -z-10" />
            <div className="absolute -bottom-12 -left-12 size-48 bg-gradient-to-tr from-cyan/15 to-transparent blur-[80px] opacity-35 -z-10 transition-transform duration-1000 group-hover:scale-125" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-6 text-white/20 animate-bounce">
        <span className="text-[11px] font-black uppercase tracking-[0.6em] rotate-90 origin-left translate-x-3.5">Scroll</span>
        <div className="w-[2px] h-20 bg-gradient-to-t from-cyan/60 to-transparent" />
      </div>
    </section>
  );
}
