"use client";

import Image from "next/image";
import { ArrowRight, CheckCircle2, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
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
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Dynamic Background */}
      <div className="absolute inset-0">
        <Image
          src="/ruby-logo.jpeg"
          alt="RUBY Science Academy"
          fill
          className="object-cover opacity-[0.03] mix-blend-overlay grayscale"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-[#0f4c81]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,194,255,0.1),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(30,136,229,0.12),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1628] via-primary-deep/95 to-transparent" />
        
        {/* Animated Ambient Glows */}
        <div className="absolute -top-[10%] -left-[5%] w-[60%] h-[60%] bg-cyan/5 rounded-full blur-[140px] animate-pulse duration-[12s]" />
        <div className="absolute top-[20%] right-[10%] w-[50%] h-[50%] bg-bright-blue/5 rounded-full blur-[120px] animate-pulse delay-1000 duration-[10s]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-0">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-20 items-center">
          
          {/* Content Section */}
          <div className="relative z-20 text-left space-y-8 lg:space-y-12">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-1000">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan shadow-[0_0_8px_rgba(6,182,212,1)]"></span>
                </span>
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan pt-0.5 leading-none">Premier Tuition Center</span>
              </div>
              
              <div className="space-y-4 lg:space-y-6">
                <p className="text-xs sm:text-sm font-black text-white/30 uppercase tracking-[0.5em] animate-in fade-in slide-in-from-left-4 duration-700 delay-150">
                  Welcome to RUBY Academy
                </p>
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[0.9] text-white animate-in fade-in slide-in-from-left-4 duration-1000 delay-300">
                  2028 A/L <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-cyan/80 drop-shadow-sm">
                    Science Stream
                  </span>
                </h1>
                <p className="text-sm sm:text-base lg:text-lg font-bold leading-relaxed text-white/50 max-w-lg animate-in fade-in slide-in-from-left-4 duration-1000 delay-500 tracking-wide lg:max-w-[480px]">
                  Professional Physics, Chemistry & Maths guidance. Colombo&rsquo;s most targeted Tamil medium classes for peak A/L performance.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-700">
              <div className="flex flex-col gap-6 w-full sm:w-auto">
                <div className="flex flex-col sm:flex-row gap-4 items-center">
                  <Button asChild size="lg" className="h-16 bg-gradient-to-r from-cyan to-bright-blue hover:brightness-110 text-white shadow-[0_20px_50px_rgba(6,182,212,0.2)] transition-all duration-500 hover:scale-[1.03] active:scale-95 px-12 text-xs font-black uppercase tracking-widest rounded-2xl w-full sm:w-auto">
                    <Link href="#registration">Enroll Now <ArrowRight className="size-4 ml-3" /></Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-16 bg-white/5 backdrop-blur-md border-white/10 text-white hover:bg-white/10 transition-all duration-300 px-12 text-xs font-black uppercase tracking-widest rounded-2xl border-2 w-full sm:w-auto">
                    <Link href="#schedule">Schedule</Link>
                  </Button>
                </div>
                
                <div className="flex items-center gap-4 px-2">
                  <div className="flex -space-x-3">
                    {studentAvatars.map((url, i) => (
                      <div key={i} className="relative size-10 rounded-full border-2 border-[#114c9c] overflow-hidden bg-white/10">
                        <Image src={url} alt={`Student ${i}`} fill className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((s) => <Star key={s} className="size-3 fill-cyan text-cyan" />)}
                      <span className="ml-1 text-xs font-black text-white">5.0</span>
                    </div>
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.2em] mt-1">Join 100+ Top Students</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-10 grid grid-cols-2 sm:grid-cols-3 gap-8 border-t border-white/5 animate-in fade-in duration-1000 delay-1000">
              <div className="space-y-1.5">
                <p className="text-2xl font-black text-white tracking-tighter"><AnimatedCounter end={95} suffix="%" /></p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/25">Pass Rate</p>
              </div>
              <div className="space-y-1.5">
                <p className="text-2xl font-black text-white tracking-tighter">Island Top</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/25">A/L Results</p>
              </div>
              <div className="hidden sm:block space-y-1.5">
                <p className="text-2xl font-black text-white tracking-tighter">Expert Team</p>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/25">Teacher Panel</p>
              </div>
            </div>
          </div>

          <div className="relative group perspective-1000 mt-12 lg:mt-0 animate-in fade-in zoom-in-95 duration-1000 delay-500">
            {/* Background Accent Glow */}
            <div className="absolute inset-x-0 -inset-y-10 bg-cyan/10 blur-[130px] rounded-full scale-90 group-hover:scale-100 transition-transform duration-1000" />
            
            {/* The Logo Card - Refined Size & Professionalism */}
            <div className="relative z-10 w-full aspect-square max-w-[440px] mx-auto flex items-center justify-center">
               <div className="relative w-[92%] h-[92%] rounded-[3.5rem] bg-white p-2 shadow-[0_32px_80px_rgba(0,0,0,0.35)] transition-all duration-700 hover:rotate-2 group-hover:scale-[1.02]">
                  <div className="relative w-full h-full rounded-[2.8rem] bg-[#fdfdfe] overflow-hidden flex items-center justify-center border-2 border-slate-50 shadow-inner">
                    <div className="relative w-[80%] h-[80%] transition-transform duration-[8s] group-hover:scale-[1.08]">
                      <Image
                        src="/ruby-logo.jpeg"
                        alt="RUBY Science Academy logo"
                        fill
                        className="object-contain"
                        priority
                      />
                    </div>
                  </div>
               </div>

              {/* Floating Status Badge Card */}
              <div className="absolute -bottom-4 -right-1 lg:-right-4 w-44 lg:w-48 h-auto animate-float z-20">
                <div className="bg-white/95 backdrop-blur-3xl border border-white p-3 lg:p-4 rounded-3xl shadow-[0_15px_40px_rgba(0,0,0,0.12)]">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-cyan/10 text-[7px] font-black text-cyan uppercase tracking-widest leading-none">Registration</span>
                    <span className="w-1 h-1 rounded-full bg-green-500 animate-pulse" />
                  </div>
                  <p className="text-sm lg:text-base font-black text-primary leading-tight">Open for <br /><span className="text-cyan">2028 Intake</span></p>
                  <div className="mt-3 flex items-center justify-between gap-2 border-t border-slate-100 pt-2.5">
                    <div className="flex -space-x-1.5">
                       {[1,2,3].map(i => <div key={i} className="size-5 rounded-full border-2 border-white bg-slate-100 overflow-hidden shadow-sm" />)}
                    </div>
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest pt-0.5">New Batch</p>
                  </div>
                </div>
              </div>

               {/* Decorative floating dots/grid */}
               <div className="absolute -top-10 -left-10 size-32 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.08)_1.5px,transparent_1px)] bg-[size:12px_12px] opacity-60" />
            </div>
          </div>

        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-4 text-white/10 animate-bounce">
        <span className="text-[9px] font-black uppercase tracking-[0.4em] rotate-90 origin-left translate-x-2.5">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-t from-cyan/40 to-transparent" />
      </div>
    </section>
  );
}
