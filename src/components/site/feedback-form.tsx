"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { startTransition, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProgressSteps } from "@/components/ui/progress-steps";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RatingStars } from "@/components/site/rating-stars";
import { SubjectMultiPicker } from "@/components/site/subject-multi-picker";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { feedbackSchema, type FeedbackFormValues } from "@/lib/validations/feedback";
import { getRatingLabel } from "@/lib/utils";

const stepLabels = ["Identity", "Subjects", "Rating", "Review"];

const defaultValues: FeedbackFormValues = {
  name: "",
  roleType: "student",
  selectedSubjects: [],
  rating: 0,
  description: "",
};

export function FeedbackForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const router = useRouter();

  const form = useForm<FeedbackFormValues>({
    resolver: zodResolver(feedbackSchema),
    defaultValues,
  });

  const values = useWatch({
    control: form.control,
    defaultValue: defaultValues,
  });
  const selectedSubjectsValue = values.selectedSubjects ?? [];
  const ratingValue = values.rating ?? 5;

  const nextStep = async () => {
    const fields =
      step === 0
        ? ["name", "roleType"]
        : step === 1
          ? ["selectedSubjects"]
          : step === 2
            ? ["rating", "description"]
            : [];

    if (fields.length === 0) {
      return;
    }

    const valid = await form.trigger(fields as never, { shouldFocus: true });

    if (valid) {
      const next = Math.min(step + 1, stepLabels.length - 1);
      setStep(next);

      // Final review safety delay
      if (next === stepLabels.length - 1) {
        setCanSubmit(false);
        setTimeout(() => setCanSubmit(true), 800);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && step < stepLabels.length - 1) {
      e.preventDefault();
      nextStep();
    }
  };

  const onSubmit = form.handleSubmit(async (data) => {
    setIsSubmitting(true);

    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.from("feedbacks").insert({
      name: data.name,
      role_type: data.roleType,
      selected_subjects: data.selectedSubjects,
      rating: data.rating,
      description: data.description,
      approved: true,
      featured: false,
    });

    setIsSubmitting(false);

    if (error) {
      toast.error("Unable to submit feedback", {
        description: error.message,
      });
      return;
    }

    toast.success("Feedback submitted", {
      description: "Thank you for sharing your experience!",
    });

    setSubmitted(true);
    form.reset(defaultValues);
    setStep(0);
    startTransition(() => router.refresh());
  });

  return (
    <div className="px-1">
      {/* Header */}
      <div className="mb-4 text-center">
        <h2 className="font-display text-xl font-black text-primary leading-tight">Share Your Experience</h2>
        <p className="mt-1 text-xs text-muted/70">Your feedback helps us improve the academy.</p>
      </div>

      {/* Steps */}
      <div className="mb-5">
        <ProgressSteps labels={stepLabels} currentStep={step} />
      </div>

      {submitted ? (
        <div className="text-center py-6 animate-fade-in-up">
          <div className="inline-flex size-14 items-center justify-center rounded-full bg-physics/10 text-physics border-4 border-physics/5 mb-3">
            <CheckCircle2 className="size-7" />
          </div>
          <h3 className="font-display text-lg font-black text-primary mb-1">Feedback Shared!</h3>
          <p className="text-xs text-muted/70 max-w-sm mx-auto">
            Thank you! Your feedback will now appear on the website.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            <Button size="sm" className="rounded-full px-5" onClick={() => setSubmitted(false)}>Share Another</Button>
            <Button variant="ghost" size="sm" className="rounded-full px-5" onClick={() => window.location.reload()}>Close</Button>
          </div>
        </div>
      ) : (
        <form className="space-y-4" onSubmit={onSubmit} onKeyDown={handleKeyDown}>
          {step === 0 ? (
            <div className="grid gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted/60">Full Name</Label>
                <Input id="feedback-name" className="h-9 rounded-lg text-sm border-slate-200 bg-slate-50/50" {...form.register("name")} placeholder="Your name" />
                {form.formState.errors.name && <p className="text-xs text-chemistry">{form.formState.errors.name.message}</p>}
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted/60">I am a...</Label>
                <Select
                  id="feedback-role"
                  className="h-9 rounded-lg border-slate-200 bg-slate-50/50 text-sm"
                  value={values.roleType}
                  onChange={(e) => form.setValue("roleType", e.target.value as FeedbackFormValues["roleType"], { shouldValidate: true })}
                >
                  <option value="student">Student</option>
                  <option value="parent">Parent</option>
                </Select>
              </div>
            </div>
          ) : null}

          {step === 1 ? (
            <div className="space-y-1">
              <Label className="text-xs font-bold uppercase tracking-widest text-muted/60">Classes I've Attended</Label>
              <SubjectMultiPicker
                value={selectedSubjectsValue}
                onChange={(v) => form.setValue("selectedSubjects", v, { shouldValidate: true })}
              />
              {form.formState.errors.selectedSubjects && (
                <p className="text-xs text-chemistry">{form.formState.errors.selectedSubjects.message}</p>
              )}
            </div>
          ) : null}

          {step === 2 ? (
            <div className="space-y-3">
              <div className="space-y-1">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted/60 block text-center">Overall Experience</Label>
                <div className="rounded-2xl border border-slate-100 bg-slate-50/30 p-6 flex flex-col items-center">
                  <RatingStars
                    rating={ratingValue}
                    onRate={(r) => form.setValue("rating", r, { shouldValidate: true })}
                  />
                  {ratingValue > 0 ? (
                    <p className="mt-4 font-display text-xl-pro font-black text-blue-700 animate-in zoom-in-50 duration-300">
                      {getRatingLabel(ratingValue)}
                    </p>
                  ) : (
                    <p className="mt-4 font-display text-sm-pro font-bold text-slate-400">Select a rating</p>
                  )}
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs font-bold uppercase tracking-widest text-muted/60">Write Your Review</Label>
                <Textarea
                  id="feedback-description"
                  className="min-h-[80px] rounded-lg text-sm p-3 border-slate-200 bg-slate-50/50 resize-none"
                  {...form.register("description")}
                  placeholder="What did you like about the teaching style or classes?"
                />
                {form.formState.errors.description && (
                  <p className="text-xs text-chemistry">{form.formState.errors.description.message}</p>
                )}
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div className="space-y-2 animate-fade-in-up">
              <div className="rounded-xl border border-primary/15 bg-gradient-to-br from-primary/5 to-cyan/5 p-4 space-y-2">
                {/* Identity row */}
                <div className="flex items-center gap-3 bg-white/70 rounded-lg px-3 py-2 border border-white/30">
                  <div className="size-8 rounded-lg bg-gradient-to-br from-primary to-cyan flex items-center justify-center font-black text-white text-sm shrink-0">
                    {values.name ? values.name.charAt(0) : "U"}
                  </div>
                  <div>
                    <p className="text-sm font-black text-primary-deep leading-none">{values.name || "Anonymous"}</p>
                    <p className="text-[10px] uppercase tracking-widest text-muted/50">
                      {values.roleType === "student" ? "Student" : "Parent"} · {selectedSubjectsValue.join(", ") || "General"}
                    </p>
                  </div>
                </div>
                {/* Rating + review */}
                <div className="bg-white/70 rounded-lg px-3 py-2 border border-white/30">
                  <div className="flex items-center gap-2 mb-1">
                    <RatingStars rating={ratingValue} />
                    <span className="text-xs font-bold text-primary/50">{getRatingLabel(ratingValue)}</span>
                  </div>
                  <p className="text-xs text-muted leading-relaxed italic line-clamp-2">
                    {values.description || "No review written"}
                  </p>
                </div>
              </div>
              <p className="text-center text-[10px] text-blue-700 bg-blue-50/60 border border-blue-200/50 rounded-lg py-1.5 px-3">
                ℹ️ Your feedback will be visible publicly on the website.
              </p>
            </div>
          ) : null}

          {/* Navigation */}
          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="rounded-full px-4 text-muted"
              onClick={() => setStep((c) => Math.max(c - 1, 0))}
              disabled={step === 0}
            >
              Back
            </Button>
            {step < stepLabels.length - 1 ? (
              <Button type="button" size="sm" className="rounded-full px-6 font-black" onClick={nextStep}>
                Continue
              </Button>
            ) : (
              <Button
                type="submit"
                variant="accent"
                size="sm"
                className="rounded-full px-6 font-black bg-gradient-to-r from-cyan to-bright-blue transition-all-smooth"
                disabled={isSubmitting || !canSubmit}
              >
                {isSubmitting ? (
                  <><div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin mr-1.5" />Publishing...</>
                ) : (
                  "Publish Feedback"
                )}
              </Button>
            )}
          </div>
        </form>
      )}
    </div>
  );
}



