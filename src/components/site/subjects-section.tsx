"use client";
import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight, Plus, Eye, X as CloseIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SubjectChip } from "@/components/site/subject-chip";
import { subjectThemeMap } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Teacher } from "@/lib/types";

interface SubjectsSectionProps {
  teachers: Teacher[];
}

export function SubjectsSection({ teachers }: SubjectsSectionProps) {
  return (
    <section id="subjects" className="relative bg-[#fcfdfe] pt-8 pb-8 lg:pt-12 lg:pb-12 overflow-hidden">
      <div className="section-shell">
        <div className="mb-12 flex flex-col gap-4 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full-pro text-xs-pro font-bold uppercase tracking-[0.2em] bg-blue-100 text-blue-700 border border-blue-200 shadow-sm-pro mb-4">
              Subjects & Teachers
            </span>
            <h2
              id="teachers"
              className="text-balance mt-4 font-display text-3xl-pro font-black tracking-tight text-slate-900 sm:text-5xl-pro lg:text-6xl-pro leading-tight animate-fade-in-up delay-100"
            >
              Expert teachers for <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Chemistry, Physics, and Maths.</span>
            </h2>
          </div>
          <p className="max-w-lg text-sm sm:text-base font-bold leading-relaxed text-muted/70 tracking-wide lg:max-w-[440px]">
            Learn about our subjects from expert teachers who help you understand everything and get the best grades.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {teachers.map((teacher, index) => (
            <TeacherCard key={teacher.id} teacher={teacher} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TeacherCard({ teacher, index }: { teacher: Teacher; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border-0 bg-white shadow-md-pro transition-all-smooth hover:shadow-xl",
        index === 1 && "lg:translate-y-4"
      )}
    >
      {/* Header-like Badge (Subject) */}
      <div 
        suppressHydrationWarning
        className="absolute top-5 left-5 z-20"
      >
        <div className="px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.25em] shadow-sm rounded-full bg-[#f5f5f5]/30 backdrop-blur-md border border-white/20 text-slate-900">
          {teacher.subject}
        </div>
      </div>

      {/* Mobile View Toggle */}
      <button 
        suppressHydrationWarning
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden absolute top-5 right-5 z-20 p-2.5 rounded-full bg-slate-900/40 backdrop-blur-md border border-white/20 text-white transition-all active:scale-95"
      >
        {isOpen ? <CloseIcon className="size-4" /> : <Eye className="size-4" />}
      </button>

      <div className="relative aspect-square overflow-hidden bg-slate-100">
        <Image
          src={teacher.image_url}
          alt={teacher.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />

        {/* Info Overlay */}
        <div 
          className={cn(
            "absolute inset-x-0 bottom-0 z-30 bg-[#0f172a]/80 p-8 backdrop-blur-xl transition-all duration-500 rounded-t-[2rem] border-t border-white/10",
            "lg:translate-y-full lg:group-hover:translate-y-0", // Desktop: Hover
            isOpen ? "translate-y-0" : "translate-y-full" // Mobile: Toggle
          )}
        >
          <div className="mb-4 flex items-center gap-2">
             <div className="h-px w-6 bg-cyan" />
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan">Profile Detail</p>
          </div>
          <p className="text-sm-pro font-medium leading-[1.8] text-white/90">
            {teacher.short_bio}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 p-8">
        <h3 className="font-display text-2xl font-black tracking-tight text-[#0f4c81] uppercase leading-none">
          {teacher.name}
        </h3>
        <div className="mt-4 flex items-center gap-3">
          <div className="h-px w-5 bg-cyan/40" />
          <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest leading-none">
            {teacher.qualifications}
          </p>
        </div>
      </div>
    </Card>
  );
}
