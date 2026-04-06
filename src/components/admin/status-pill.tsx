import { cn } from "@/lib/utils";

interface StatusPillProps {
  label: string;
  tone?: "neutral" | "success" | "warning" | "accent";
}

export function StatusPill({ label, tone = "neutral" }: StatusPillProps) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]",
        tone === "neutral" && "bg-primary/8 text-primary",
        tone === "success" && "bg-maths/15 text-[#00645d]",
        tone === "warning" && "bg-physics/18 text-[#8c5a00]",
        tone === "accent" && "bg-cyan/15 text-primary-deep",
      )}
    >
      {label}
    </span>
  );
}
