import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { SubjectName } from "@/lib/types";

interface SubjectChipProps {
  subject: SubjectName | "All";
  size?: "sm" | "md";
}

export function SubjectChip({ subject, size = "md" }: SubjectChipProps) {
  const variant =
    subject === "Chemistry"
      ? "chemistry"
      : subject === "Physics"
        ? "physics"
        : subject === "Maths"
          ? "maths"
          : "default";

  return (
    <Badge 
      variant={variant}
      className={cn(
        "rounded-full uppercase tracking-widest font-bold",
        size === "md" ? "px-4 py-1.5 text-xs" : "px-2.5 py-0.5 text-[9px]",
        subject === "Chemistry" && "bg-chemistry/20 text-chemistry border-chemistry/30 shadow-[0_0_15px_rgba(0,255,255,0.1)]",
        subject === "Physics" && "bg-physics/20 text-physics border-physics/30 shadow-[0_0_15px_rgba(255,165,0,0.1)]",
        subject === "Maths" && "bg-maths/20 text-maths border-maths/30 shadow-[0_0_15px_rgba(0,194,255,0.1)]"
      )}
    >
      {subject}
    </Badge>
  );
}
