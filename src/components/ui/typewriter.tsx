"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export function Typewriter({
  text,
  speed = 50,
  delay = 0,
  className,
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayText(text.slice(0, i + 1));
        i++;
        if (i === text.length) {
          clearInterval(interval);
          setIsDone(true);
        }
      }, speed);
      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return (
    <span className={cn("inline-block", className)}>
      {displayText}
      {!isDone && (
        <span className="inline-block w-[2px] h-[1em] bg-current ml-1 animate-pulse" />
      )}
    </span>
  );
}
