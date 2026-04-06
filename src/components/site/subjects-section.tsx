import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
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
    <section id="subjects" className="bg-[linear-gradient(180deg,_rgba(217,236,255,0.3),_rgba(247,251,255,1))] py-20 lg:py-28">
      <div className="section-shell">
        <div className="mb-12 flex flex-col gap-4 lg:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <span className="inline-block px-4 py-2 rounded-full-pro text-xs-pro font-bold uppercase tracking-[0.2em] bg-blue-100 text-blue-700 border border-blue-200 shadow-sm-pro mb-4">
              Subjects & Teachers
            </span>
            <h2
              id="teachers"
              className="text-balance mt-4 font-display text-4xl font-extrabold tracking-tight text-primary sm:text-5xl"
            >
              Expert teachers for Chemistry, Physics, and Maths.
            </h2>
          </div>
          <p className="max-w-xl text-base leading-7 text-muted">
            Learn about our subjects from expert teachers who help you understand everything and get the best grades.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {teachers.map((teacher, index) => (
            <Card
              key={teacher.id}
              className={cn("group relative overflow-hidden rounded-[3px] border-0 bg-white shadow-md-pro transition-all-smooth hover:shadow-xl", index === 1 && "lg:translate-y-4")}
            >
              {/* Header-like Badge (Subject) */}
              <div className="absolute top-4 left-4 z-20">
                <div className={cn(
                  "px-3 py-1 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm",
                  subjectThemeMap[teacher.subject].soft
                )}>
                  {teacher.subject}
                </div>
              </div>

              <div className="relative aspect-square overflow-hidden bg-slate-100">
                <Image
                  src={teacher.image_url}
                  alt={teacher.name}
                  fill
                  className="object-cover transition duration-700 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />

                {/* Instagram-style Transparent Gray Overlay with 8px top radius */}
                <div className="absolute inset-x-0 bottom-0 z-30 translate-y-full bg-slate-900/60 p-6 backdrop-blur-md transition-transform duration-500 rounded-t-[8px] group-hover:translate-y-0">
                  <p className="text-sm font-medium leading-relaxed text-white">
                    {teacher.short_bio}
                  </p>
                </div>
              </div>

              {/* Instagram-style Footer */}
              <div className="border-t border-slate-100 p-5">
                <h3 className="font-display text-lg font-black tracking-tight text-primary uppercase">
                  {teacher.name}
                </h3>
                <div className="mt-1 flex items-center gap-2">
                  <div className="h-px w-4 bg-bright-blue/30" />
                  <p className="text-[11px] font-bold text-muted/60 uppercase tracking-widest">
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
