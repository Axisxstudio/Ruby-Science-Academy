import type { BatchType, FeedbackRoleType, RegistrationStatus, SubjectName } from "@/lib/types";

export const instituteName = "RUBY Science Academy";

export const teacherSubjects: SubjectName[] = ["Chemistry", "Physics", "Maths"];
export const selectableSubjects = ["Maths", "Chemistry", "Physics", "All"] as const;
export const batchTypes: BatchType[] = ["Normal", "Repeat"];
export const feedbackRoleOptions: FeedbackRoleType[] = ["student", "parent"];
export const registrationStatuses: RegistrationStatus[] = [
  "new",
  "reviewed",
  "contacted",
  "enrolled",
];

export const subjectThemeMap: Record<
  SubjectName | "All",
  {
    accent: string;
    soft: string;
    glow: string;
  }
> = {
  Chemistry: {
    accent: "bg-chemistry",
    soft: "bg-chemistry/12 text-chemistry",
    glow: "shadow-[0_18px_30px_rgba(255,107,44,0.18)]",
  },
  Physics: {
    accent: "bg-physics",
    soft: "bg-physics/15 text-[#8c5a00]",
    glow: "shadow-[0_18px_30px_rgba(255,167,38,0.18)]",
  },
  Maths: {
    accent: "bg-maths",
    soft: "bg-maths/15 text-[#00645d]",
    glow: "shadow-[0_18px_30px_rgba(0,169,157,0.18)]",
  },
  All: {
    accent: "bg-primary",
    soft: "bg-primary/10 text-primary",
    glow: "shadow-[0_18px_30px_rgba(15,76,129,0.18)]",
  },
};
