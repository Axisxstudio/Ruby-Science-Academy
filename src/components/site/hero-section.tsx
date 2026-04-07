import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, BookOpenCheck, CheckCircle2, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SubjectChip } from "@/components/site/subject-chip";
import { cn } from "@/lib/utils";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import type { SiteSettings, Teacher } from "@/lib/types";

interface HeroSectionProps {
  settings: SiteSettings;
  teachers: Teacher[];
}

export function HeroSection({ settings, teachers }: HeroSectionProps) {
  const spotlightTeachers = teachers.slice(0, 2);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Full Screen Hero Banner Background */}
      <div className="absolute inset-0">
        <Image
          src="/hero-banner.png"
          alt="RUBY Science Academy Students"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-deep/90 via-primary/80 to-bright-blue/85" />
        
        {/* Animated Glow Effects */}
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-bright-blue/8 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-primary/6 rounded-full blur-3xl animate-pulse delay-500" />
        </div>
        
        {/* Abstract Shapes */}
        <div className="absolute top-20 right-20 w-64 h-64 border border-white/5 rounded-full rotate-45" />
        <div className="absolute bottom-20 left-20 w-48 h-48 border border-white/3 rounded-full rotate-12" />
      </div>

      {/* Premium Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 animate-fade-in">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" />
            <span className="text-xs font-semibold text-white tracking-wide">Premier Tuition Center</span>
          </div>
          
          {/* Main Headline */}
          <div className="space-y-4 max-w-4xl mx-auto">
            <p className="text-lg sm:text-xl font-semibold text-cyan tracking-wide animate-fade-in-up">
              Welcome to RUBY Science Academy
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white animate-fade-in-up delay-100">
              2028 A/L Science Stream
            </h1>
            
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-white/90 animate-fade-in-up delay-200">
              Master Physics, Chemistry & Maths with Expert Teachers
            </h2>
            
            <p className="text-lg text-white/80 animate-fade-in-up delay-300">
              Tamil Medium Classes | Colombo 13 | Proven A/L Results
            </p>
          </div>
          
          {/* Highlight Features */}
          <div className="flex justify-center flex-wrap gap-8 lg:gap-12 max-w-4xl mx-auto animate-fade-in-up delay-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan/20 to-cyan/10 border border-cyan/30 flex items-center justify-center transition-transform hover:scale-110">
                <svg className="w-5 h-5 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white"><AnimatedCounter end={95} suffix="%" /> Pass Rate</h3>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan/20 to-cyan/10 border border-cyan/30 flex items-center justify-center transition-transform hover:scale-110">
                <svg className="w-5 h-5 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Top District Results</h3>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan/20 to-cyan/10 border border-cyan/30 flex items-center justify-center transition-transform hover:scale-110">
                <svg className="w-5 h-5 text-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Experienced Teachers</h3>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 animate-fade-in-up delay-700">
            <Button asChild size="lg" className="bg-gradient-to-r from-cyan to-bright-blue hover:from-cyan/90 hover:to-bright-blue/90 text-white shadow-lg shadow-cyan/30 transition-all duration-300 hover:scale-105 px-8 py-4 text-base font-semibold rounded-full">
              <Link href="#registration">
                Enroll Now
                <ArrowRight className="size-4 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/10 backdrop-blur-md border-white/30 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 px-8 py-4 text-base font-medium rounded-full">
              <Link href="#schedule">View Schedule</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
