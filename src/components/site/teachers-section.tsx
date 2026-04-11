'use client';

import { useState } from "react";
import Image from "next/image";
import { Eye } from "lucide-react";
import { Card } from "@/components/ui/card";
import { subjectThemeMap } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { Teacher } from "@/lib/types";

interface TeachersSectionProps {
  teachers: Teacher[];
}

export function TeachersSection({ teachers }: TeachersSectionProps) {
  const [activeTeacher, setActiveTeacher] = useState<string | null>(null);

  return (
    <section id="teachers" className="section-padding bg-slate-50/50">
      <div className="section-shell">
        <div className="mb-12 max-w-4xl">
          <span className="inline-block px-4 py-2 rounded-full-pro text-xs-pro font-black uppercase tracking-[0.2em] bg-blue-100 text-blue-700 border border-blue-200 shadow-sm-pro mb-6">
            Expert Faculty
          </span>
          <h2 className="text-balance font-display text-4xl-pro sm:text-5xl-pro font-black tracking-tight text-primary leading-tight">
            Meet the Masters of Science
          </h2>
          <p className="mt-4 max-w-2xl text-base-pro leading-relaxed text-slate-600">
            Learn from the top instructors in Colombo, dedicated to simplifying complex science subjects for your A/L success.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {teachers.map((teacher, index) => (
            <Card
              key={teacher.id}
              onClick={() => setActiveTeacher(activeTeacher === teacher.id ? null : teacher.id)}
              className="group relative cursor-pointer overflow-hidden rounded-[3px] border-0 bg-white shadow-lg-pro transition-all-smooth hover:shadow-xl-pro"
            >
              {/* Subject label and Eye icon with pointer-events-none to let clicks pass through to the Card */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none">
                <div className={cn(
                  "px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm rounded-md",
                  subjectThemeMap[teacher.subject]?.soft || "bg-slate-100 text-slate-800"
                )}>
                  {teacher.subject}
                </div>
              </div>

              <div className="absolute top-4 right-4 z-20 pointer-events-none">
                <div className="flex bg-black/20 backdrop-blur-sm size-8 items-center justify-center rounded-full text-white/80 transition-all group-hover:bg-white group-hover:text-primary">
                  <Eye className="size-4" />
                </div>
              </div>

              <div className="relative aspect-square overflow-hidden bg-slate-100">
                <Image
                  src={teacher.image_url}
                  alt={teacher.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105 pointer-events-none"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className={cn(
                  "absolute inset-x-0 bottom-0 z-30 bg-slate-900/70 p-6 backdrop-blur-md transition-transform duration-500 rounded-t-[8px] text-center pointer-events-none",
                  activeTeacher === teacher.id ? "translate-y-0" : "translate-y-full lg:group-hover:translate-y-0"
                )}>
                  <p className="text-sm font-medium leading-relaxed text-white italic">
                    "{teacher.short_bio}"
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 p-6 text-center">
                <h3 className="font-display text-xl font-black tracking-tight text-primary uppercase">
                  {teacher.name}
                </h3>
                <div className="mt-2 flex items-center justify-center gap-2">
                  <div className="h-px w-4 bg-cyan/30" />
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                    {teacher.qualifications}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
