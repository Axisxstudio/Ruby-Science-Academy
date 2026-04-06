import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name is required."),
  phoneNumber: z
    .string()
    .regex(/^(?:\+94|0)\d{9}$/, "Enter a valid Sri Lankan phone number."),
  batchType: z.enum(["Normal", "Repeat"], {
    error: "Select a batch type.",
  }),
  year: z.number().min(2026).max(2035),
  selectedSubjects: z
    .array(z.enum(["Maths", "Chemistry", "Physics", "All"]))
    .min(1, "Select at least one subject."),
});

export type RegistrationFormValues = z.infer<typeof registrationSchema>;
