"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const desktopPopoverQuery = "(min-width: 640px) and (hover: hover) and (pointer: fine)";

export function AxisXBranding() {
  const [hovered, setHovered] = useState(false);
  const [canClick, setCanClick] = useState(false);
  const [canShowPopover, setCanShowPopover] = useState(false);

  const whatsappUrl =
    "https://wa.me/94771354761?text=Hello+AxisX+Studio%21+I%27d+like+to+discuss+a+project+and+learn+more+about+your+services.";
  const websiteUrl = "https://axisxstudio.com";

  useEffect(() => {
    const mediaQuery = window.matchMedia(desktopPopoverQuery);

    const syncPopoverSupport = () => {
      const matches = mediaQuery.matches;
      setCanShowPopover(matches);

      if (!matches) {
        setHovered(false);
        setCanClick(false);
      }
    };

    syncPopoverSupport();
    mediaQuery.addEventListener("change", syncPopoverSupport);

    return () => mediaQuery.removeEventListener("change", syncPopoverSupport);
  }, []);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;

    if (hovered && canShowPopover) {
      timer = setTimeout(() => {
        setCanClick(true);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [hovered, canShowPopover]);

  return (
    <div
      className={`relative inline-flex max-w-full items-center ${canShowPopover ? "pb-8 -mb-8" : ""}`}
      onMouseEnter={
        canShowPopover
          ? () => {
              setHovered(true);
              setCanClick(false);
            }
          : undefined
      }
      onMouseLeave={
        canShowPopover
          ? () => {
              setHovered(false);
              setCanClick(false);
            }
          : undefined
      }
    >
      {canShowPopover ? (
        <div
          className={`absolute bottom-[110%] left-0 z-[9999] hidden w-64 rounded-2xl border border-white/10 bg-[#0a1628]/95 p-5 shadow-2xl backdrop-blur-xl transition-all duration-300 sm:block ${
            hovered
              ? "translate-y-0 scale-100 pointer-events-auto opacity-100"
              : "translate-y-4 scale-95 pointer-events-none opacity-0"
          }`}
        >
          <div className="mb-4 w-fit">
            <Image
              src="/axisx-logo.png"
              alt="AxisX Studio"
              width={120}
              height={40}
              className="object-contain"
            />
          </div>

          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-wider text-white">Need a premium website?</p>
            <p className="mt-1 text-[11px] text-white/50">
              Crafting high-end digital experiences that convert.
            </p>
          </div>

          <a
            href={canClick ? whatsappUrl : undefined}
            target={canClick ? "_blank" : undefined}
            rel={canClick ? "noopener noreferrer" : undefined}
            className={`relative z-50 flex w-full items-center justify-center gap-2.5 rounded-xl px-4 py-3 text-xs font-bold text-white shadow-lg transition-all duration-300 ${
              canClick
                ? "cursor-pointer bg-green-500 shadow-green-500/20 hover:bg-green-600 active:scale-95"
                : "pointer-events-none cursor-wait bg-white/10 text-white/30"
            }`}
          >
            <svg className={`size-4 fill-current ${canClick ? "text-white" : "text-white/20"}`} viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat with us on WhatsApp
          </a>
        </div>
      ) : null}

      <a
        href={websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group z-10 max-w-full cursor-pointer select-none text-[9px] font-bold tracking-wide sm:text-[10px]"
      >
        <span className="text-white/30 transition-colors group-hover:text-white/60">Developed by </span>
        <span className="bg-gradient-to-r from-cyan to-bright-blue bg-clip-text text-transparent transition-all hover:brightness-110">
          AxisX Studio
        </span>
      </a>
    </div>
  );
}
