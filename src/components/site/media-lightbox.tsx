"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { MediaType } from "@/lib/types";

interface LightboxItem {
  title: string;
  caption?: string;
  image_url: string;
  media_type?: MediaType;
}

interface MediaLightboxProps {
  items: LightboxItem[];
  activeIndex: number | null;
  onClose: () => void;
  onChange: (nextIndex: number) => void;
}

export function MediaLightbox({
  items,
  activeIndex,
  onClose,
  onChange,
}: MediaLightboxProps) {
  const item = activeIndex !== null ? items[activeIndex] : null;

  return (
    <Dialog open={activeIndex !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl p-4 sm:p-6">
        {item ? (
          <>
            <DialogHeader className="pb-4">
              <DialogTitle>{item.title}</DialogTitle>
              {item.caption ? <DialogDescription>{item.caption}</DialogDescription> : null}
            </DialogHeader>

            <div className="relative overflow-hidden rounded-[1.5rem] bg-surface-soft">
              <div className="relative aspect-[16/10]">
                {item.media_type === "video" ? (
                  <video
                    controls
                    className="h-full w-full object-cover"
                    src={item.image_url}
                  />
                ) : (
                  <Image
                    src={item.image_url}
                    alt={item.title}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                )}
              </div>
            </div>

            {items.length > 1 ? (
              <div className="mt-5 flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    onChange((activeIndex! - 1 + items.length) % items.length)
                  }
                >
                  <ChevronLeft className="size-4" />
                  Previous
                </Button>
                <p className="text-sm text-muted">
                  {activeIndex! + 1} / {items.length}
                </p>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onChange((activeIndex! + 1) % items.length)}
                >
                  Next
                  <ChevronRight className="size-4" />
                </Button>
              </div>
            ) : null}
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
