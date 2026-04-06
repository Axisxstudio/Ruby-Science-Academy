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
import { SubjectMultiPicker } from "@/components/site/subject-multi-picker";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { registrationSchema, type RegistrationFormValues } from "@/lib/validations/registration";

const stepLabels = ["Student", "Batch", "Subjects", "Summary"];

const defaultValues: RegistrationFormValues = {
  fullName: "",
  phoneNumber: "",
  batchType: "Normal",
  year: 2028,
  selectedSubjects: [],
};

export function RegistrationForm() {
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const router = useRouter();

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues,
  });

  const values = useWatch({
    control: form.control,
    defaultValue: defaultValues,
  });
  const selectedSubjectsValue = values.selectedSubjects ?? [];

  const nextStep = async () => {
    const fields =
      step === 0
        ? ["fullName", "phoneNumber"]
        : step === 1
          ? ["batchType", "year"]
          : step === 2
            ? ["selectedSubjects"]
            : [];

    const valid = await form.trigger(fields as never, {
      shouldFocus: true,
    });

    if (valid) {
      const next = Math.min(step + 1, stepLabels.length - 1);
      setStep(next);
      
      // If moving to the final summary step, add a small safety delay before enabling submission
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
    const { error } = await supabase.from("registrations").insert({
      full_name: data.fullName,
      phone_number: data.phoneNumber,
      batch_type: data.batchType,
      year: data.year,
      selected_subjects: data.selectedSubjects,
      status: "new",
    });

    setIsSubmitting(false);

    if (error) {
      toast.error("Unable to submit registration", {
        description: error.message,
      });
      return;
    }

    toast.success("Registration submitted", {
      description: "Our team will contact you soon.",
    });

    setSubmitted(true);
    form.reset(defaultValues);
    setStep(0);
    startTransition(() => router.refresh());
  });

  return (
    <div id="registration" className="relative group rounded-2xl border border-border-soft bg-white/40 p-0.5 backdrop-blur-sm transition-all-smooth hover:shadow-lg-pro">
      <div className="rounded-[1.4rem] bg-white p-6 md:p-8">
        <div className="mb-6 text-center">
          <h2 className="font-display text-2xl font-black text-primary leading-tight">
            Join the RUBY Family
          </h2>
          <p className="mt-1.5 text-sm text-muted/70 max-w-lg mx-auto">
            Reserve your seat for the next batch in just a few simple steps.
          </p>
        </div>

        <div className="mb-7 max-w-2xl mx-auto">
          <ProgressSteps labels={stepLabels} currentStep={step} />
        </div>

        {submitted ? (
          <div className="max-w-xl mx-auto text-center py-6 animate-fade-in-up">
            <div className="inline-flex size-16 items-center justify-center rounded-full bg-maths/10 text-maths border-4 border-maths/5 mb-5">
              <CheckCircle2 className="size-8" />
            </div>
            <h3 className="font-display text-xl font-black text-primary mb-2">Registration Received!</h3>
            <p className="text-sm text-muted/70 leading-relaxed max-w-md mx-auto">
              Our academic team has received your inquiry. We'll reach out to your phone number shortly to confirm your batch allocation.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button size="sm" className="rounded-full px-6" onClick={() => setSubmitted(false)}>
                Enroll Another Student
              </Button>
              <Button variant="ghost" size="sm" className="rounded-full px-6" onClick={() => window.location.reload()}>
                Back to Home
              </Button>
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto animate-fade-in-up">
            <form className="space-y-5" onSubmit={onSubmit} onKeyDown={handleKeyDown}>
              {step === 0 ? (
                <div className="grid gap-4">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted/60 px-1">Full Student Name</Label>
                    <Input id="fullName" className="h-11 rounded-xl text-sm px-4 border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-primary/20 focus:border-primary/50" {...form.register("fullName")} placeholder="e.g. Malith Perera" />
                    {form.formState.errors.fullName ? (
                      <p className="text-xs font-medium text-chemistry px-1">{form.formState.errors.fullName.message}</p>
                    ) : null}
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted/60 px-1">Permanent Contact Number</Label>
                    <Input id="phoneNumber" className="h-11 rounded-xl text-sm px-4 border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-primary/20 focus:border-primary/50" {...form.register("phoneNumber")} placeholder="e.g. 077 123 4567" />
                    {form.formState.errors.phoneNumber ? (
                      <p className="text-xs font-medium text-chemistry px-1">{form.formState.errors.phoneNumber.message}</p>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {step === 1 ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted/60 px-1">Select Batch Type</Label>
                    <Select
                      id="batchType"
                      className="h-11 rounded-xl border-slate-200 bg-slate-50/50 text-sm px-4"
                      value={values.batchType}
                      onChange={(event) =>
                        form.setValue("batchType", event.target.value as RegistrationFormValues["batchType"], {
                          shouldValidate: true,
                        })
                      }
                    >
                      <option value="Normal">Regular Batch</option>
                      <option value="Repeat">Repeaters / Revision</option>
                    </Select>
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted/60 px-1">Academic Year</Label>
                    <Input
                      id="year"
                      type="number"
                      min={2026}
                      max={2035}
                      className="h-11 rounded-xl text-sm px-4 border-slate-200 bg-slate-50/50 focus:bg-white"
                      value={values.year}
                      onChange={(event) =>
                        form.setValue("year", Number(event.target.value), { shouldValidate: true })
                      }
                    />
                    {form.formState.errors.year ? (
                      <p className="text-xs font-medium text-chemistry px-1">{form.formState.errors.year.message}</p>
                    ) : null}
                  </div>
                </div>
              ) : null}

              {step === 2 ? (
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted/60 px-1">Preferred Subjects</Label>
                  <SubjectMultiPicker
                    value={selectedSubjectsValue}
                    onChange={(selectedSubjects) =>
                      form.setValue("selectedSubjects", selectedSubjects, {
                        shouldValidate: true,
                      })
                    }
                  />
                  {form.formState.errors.selectedSubjects ? (
                    <p className="text-xs font-medium text-chemistry px-1">
                      {form.formState.errors.selectedSubjects.message}
                    </p>
                  ) : null}
                </div>
              ) : null}

              {step === 3 ? (
                <div className="animate-fade-in-up space-y-3">
                  <div className="rounded-xl border border-primary/15 bg-gradient-to-br from-primary/5 to-cyan/5 p-5 shadow-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 -m-6 size-32 rounded-full bg-gradient-to-br from-primary/15 to-cyan/15 blur-2xl" />
                    <div className="relative z-10 space-y-3">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-cyan flex items-center justify-center shadow">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan">Final Review</p>
                          <h4 className="font-display text-base font-black text-primary">Confirm Your Registration</h4>
                        </div>
                      </div>

                      <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-white/30 px-4 py-3 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-physics to-chemistry flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted/50">Student</p>
                          <p className="text-sm font-black text-primary-deep">{values.fullName}</p>
                          <p className="text-xs font-medium text-muted/70">{values.phoneNumber}</p>
                        </div>
                      </div>

                      <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-white/30 px-4 py-3 flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-maths to-cyan flex items-center justify-center shrink-0">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-muted/50">Program</p>
                          <p className="text-sm font-black text-primary-deep">{values.batchType} Batch · A/L {values.year}</p>
                        </div>
                      </div>

                      <div className="bg-white/70 backdrop-blur-sm rounded-lg border border-white/30 px-4 py-3">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-muted/50 mb-2">Subjects</p>
                        <div className="flex flex-wrap gap-2">
                          {selectedSubjectsValue.flatMap((s) =>
                            s === "All" ? ["Chemistry", "Physics", "Maths"] as const : [s]
                          ).map((s, idx) => (
                            <span key={`${s}-${idx}`} className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 border border-primary/15">
                              <span className="size-1.5 rounded-full bg-cyan" />
                              <span className="text-xs font-bold text-primary">{s}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 bg-amber-50/60 border border-amber-200/50 rounded-xl">
                    <p className="text-center text-xs text-amber-800 font-medium">
                      ⚠️ Review all details carefully. Click "Submit Registration" only once.
                    </p>
                  </div>
                </div>
              ) : null}

              <div className="flex flex-row items-center justify-between gap-3 pt-4 mt-2 border-t border-slate-50">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-9 rounded-full px-5 text-sm text-muted font-bold hover:bg-slate-100 hover:text-primary transition-all-smooth"
                  onClick={() => setStep((current) => Math.max(current - 1, 0))}
                  disabled={step === 0}
                >
                  Back
                </Button>

                {step < stepLabels.length - 1 ? (
                  <Button type="button" size="sm" className="h-9 rounded-full px-8 text-sm font-black shadow-md-pro transition-all-smooth" onClick={nextStep}>
                    Next Step
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="accent"
                    size="sm"
                    className="h-9 rounded-full px-8 text-sm font-black shadow-md-pro transition-all-smooth bg-gradient-to-r from-primary to-cyan hover:from-primary/90 hover:to-cyan/90"
                    disabled={isSubmitting || !canSubmit}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Submit Registration
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
