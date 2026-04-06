"use client";

import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface RatingStarsProps {
  rating: number;
  onRate?: (rating: number) => void;
}

export function RatingStars({ rating, onRate }: RatingStarsProps) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => {
        const value = index + 1;
        const active = value <= rating;

        if (onRate) {
          return (
            <button
              key={value}
              type="button"
              className="ring-focus group rounded-full p-1 transition-transform hover:scale-125 active:scale-95 duration-200"
              onClick={() => onRate(value)}
              aria-label={`Rate ${value} star${value > 1 ? "s" : ""}`}
            >
              <Star
                className={cn(
                  "size-6 transition-all duration-300",
                  active ? "fill-amber-400 text-amber-500 shadow-sm" : "text-slate-300",
                  active && "animate-in zoom-in-50 duration-300"
                )}
              />
            </button>
          );
        }

        return (
          <Star
            key={value}
            className={cn(
              "size-4 transition-all",
              active ? "fill-amber-400 text-amber-500" : "text-slate-200 opacity-30",
            )}
          />
        );
      })}
    </div>
  );
}
