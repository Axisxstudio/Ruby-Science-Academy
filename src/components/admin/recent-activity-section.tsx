"use client";

import { useState } from "react";
import { ArrowRight, Edit2, MessageSquareText, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPhoneNumber } from "@/lib/utils";
import { StatusPill } from "@/components/admin/status-pill";
import Link from "next/link";
import type { RegistrationItem, FeedbackItem } from "@/lib/types";

interface RecentActivitySectionProps {
  recentRegistrations: RegistrationItem[];
  recentFeedbacks: FeedbackItem[];
}

export function RecentActivitySection({ 
  recentRegistrations, 
  recentFeedbacks 
}: RecentActivitySectionProps) {
  const [showAllRegs, setShowAllRegs] = useState(false);
  const [showAllFeedbacks, setShowAllFeedbacks] = useState(false);

  const displayedRegs = showAllRegs ? recentRegistrations : recentRegistrations.slice(0, 5);
  const displayedFeedbacks = showAllFeedbacks ? recentFeedbacks : recentFeedbacks.slice(0, 5);

  return (
    <div className="mt-8 grid gap-6 xl:grid-cols-2">
      {/* Recent Registrations */}
      <div className="relative flex flex-col overflow-hidden rounded-3xl border border-border-soft bg-white/50 p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-cyan/10 text-cyan">
              <ClipboardList className="size-4.5" />
            </div>
            <h2 className="font-display text-2xl font-black text-primary">
              Recent Registrations
            </h2>
          </div>
          <StatusPill label={`${recentRegistrations.length} total`} tone="accent" />
        </div>

        <div className="flex-1 space-y-4">
          {displayedRegs.map((registration) => (
            <Link
              key={registration.id}
              href={`/admin/registrations?search=${registration.full_name}`}
              className="group flex flex-col gap-3 rounded-2xl border border-border-soft bg-white p-4 hover:border-cyan/40 hover:shadow-sm-pro transition-all-smooth md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-display text-lg font-bold text-primary group-hover:text-cyan transition-colors">
                  {registration.full_name}
                </p>
                <p className="mt-1 text-xs text-muted/70">
                  {formatPhoneNumber(registration.phone_number)}
                </p>
                <p className="mt-2 text-[11px] font-medium text-muted/60 uppercase tracking-widest leading-none">
                  {registration.batch_type} • {registration.year} • {registration.selected_subjects.join(", ")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <StatusPill label={registration.status} tone="warning" />
                <div className="flex size-8 items-center justify-center rounded-full bg-slate-50 text-muted group-hover:bg-primary group-hover:text-white transition-all-smooth">
                  <Edit2 className="size-3.5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {recentRegistrations.length > 5 && (
          <div className="mt-8 pt-6 border-t border-slate-100/50">
            <Button asChild variant="outline" className="w-full flex items-center justify-center gap-2 rounded-2xl h-14 font-black border-slate-200 text-primary hover:bg-slate-50 transition-all-smooth group">
              <Link href="/admin/registrations" className="flex items-center gap-2">
                View All Registrations
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        )}
      </div>

      {/* Recent Feedback */}
      <div className="relative flex flex-col overflow-hidden rounded-3xl border border-border-soft bg-white/50 p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex size-9 items-center justify-center rounded-xl bg-physics/10 text-physics">
              <MessageSquareText className="size-4.5" />
            </div>
            <h2 className="font-display text-2xl font-black text-primary">
              Recent Feedback
            </h2>
          </div>
          <StatusPill label={`${recentFeedbacks.length} total`} tone="accent" />
        </div>

        <div className="flex-1 space-y-4">
          {recentFeedbacks.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-border-soft bg-slate-50/50 p-8 text-center text-sm text-muted/60 italic">
              No recent feedback right now.
            </div>
          ) : (
            recentFeedbacks.slice(0, 5).map((feedback) => (
              <Link
                key={feedback.id}
                href={`/admin/feedbacks?search=${feedback.name}`}
                className="group flex flex-col gap-4 rounded-2xl border border-border-soft bg-white p-5 hover:border-cyan/40 hover:shadow-sm-pro transition-all-smooth"
              >
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="font-display text-lg font-bold text-primary group-hover:text-cyan transition-colors">
                      {feedback.name}
                    </p>
                    <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-muted/60">
                      {feedback.role_type === "student" ? "Student" : "Parent"} says
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusPill label={`${feedback.rating}/5`} tone="accent" />
                    <div className="flex size-8 items-center justify-center rounded-full bg-slate-50 text-muted group-hover:bg-primary group-hover:text-white transition-all-smooth">
                      <Edit2 className="size-3.5" />
                    </div>
                  </div>
                </div>
                <p className="text-sm leading-relaxed text-muted/80 italic line-clamp-2">"{feedback.description}"</p>
              </Link>
            ))
          )}
        </div>

        {recentFeedbacks.length > 5 && (
          <div className="mt-8 pt-6 border-t border-slate-100/50">
            <Button asChild variant="outline" className="w-full flex items-center justify-center gap-2 rounded-2xl h-14 font-black border-slate-200 text-primary hover:bg-slate-50 transition-all-smooth group">
              <Link href="/admin/feedbacks" className="flex items-center gap-2">
                View All Feedback
                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
