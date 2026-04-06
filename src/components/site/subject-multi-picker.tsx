"use client";

import { selectableSubjects } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { SubjectName } from "@/lib/types";

interface SubjectMultiPickerProps {
  value: Array<SubjectName | "All">;
  onChange: (nextValue: Array<SubjectName | "All">) => void;
  disabled?: boolean;
}

export function SubjectMultiPicker({
  value,
  onChange,
  disabled,
}: SubjectMultiPickerProps) {
  const allSelected = value.includes("All");

  const handleToggle = (subject: SubjectName | "All") => {
    if (disabled) {
      return;
    }

    if (subject === "All") {
      onChange(allSelected ? [] : ["All"]);
      return;
    }

    const withoutAll = value.filter((item) => item !== "All");
    const exists = withoutAll.includes(subject);
    const nextValue = exists
      ? withoutAll.filter((item) => item !== subject)
      : [...withoutAll, subject];

    onChange(nextValue);
  };

  return (
    <div className="flex flex-wrap gap-3">
      {selectableSubjects.map((subject) => {
        const isSelected = value.includes(subject);
        const isDisabled =
          disabled ||
          (subject === "All" ? value.length > 0 && !allSelected : allSelected);

        return (
          <button
            key={subject}
            type="button"
            disabled={isDisabled}
            onClick={() => handleToggle(subject)}
            className={cn(
              "ring-focus rounded-full border px-4 py-2 text-sm font-semibold transition",
              isSelected
                ? "border-primary bg-primary text-white"
                : "border-border-soft bg-white text-primary hover:bg-surface-soft",
              isDisabled && "cursor-not-allowed opacity-50",
            )}
          >
            {subject}
          </button>
        );
      })}
    </div>
  );
}
