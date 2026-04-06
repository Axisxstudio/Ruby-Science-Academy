import { z } from "zod";

export const feedbackSchema = z.object({
  name: z.string().min(2, "Name is required."),
  roleType: z.enum(["student", "parent"], {
    error: "Select who is giving the feedback.",
  }),
  selectedSubjects: z
    .array(z.enum(["Maths", "Chemistry", "Physics", "All"]))
    .min(1, "Select at least one subject."),
  rating: z.number().int().min(1).max(5),
  description: z.string().min(12, "Share a little more detail."),
});

export type FeedbackFormValues = z.infer<typeof feedbackSchema>;
