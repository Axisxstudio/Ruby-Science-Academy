"use client";

import { ShieldCheck, Lock, ArrowRight, Monitor } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface MaintenanceScreenProps {
  reason?: string | null;
}

const AcademyTitle = () => {
  const text = "Ruby Science Academy";
  const [displayText, setDisplayText] = useState("");
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      setDisplayText(text.slice(0, index + 1));
      index++;
      if (index >= text.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="font-display text-lg font-black uppercase tracking-[0.5em] text-cyan">
      {displayText}
      <motion.span 
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity }}
        className="inline-block w-[2px] h-[1em] bg-cyan ml-1 align-middle"
      />
    </span>
  );
};

export function MaintenanceScreen({ reason }: MaintenanceScreenProps) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#0a1628] overflow-hidden px-6">
      {/* Centered Minimal Content */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 flex flex-col items-center max-w-lg w-full"
      >
        {/* Logo with Soft Pulse */}
        <div className="relative mb-8">
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -inset-8 rounded-full bg-cyan/10 blur-3xl"
          />
          <div className="relative size-32">
            <Image
              src="/ruby-science-logo.png"
              alt="RSA Logo"
              width={128}
              height={128}
              className="h-full w-full object-contain"
            />
          </div>
        </div>

        {/* Branded Typing Title */}
        <div className="mb-6 h-8 flex items-center justify-center">
          <AcademyTitle />
        </div>

        <h1 className="text-3xl sm:text-4xl font-display font-black text-white text-center leading-tight mb-6">
          System Update <br />
          <span className="text-white/40">In Progress</span>
        </h1>

        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-cyan/50 to-transparent mb-8" />

        <p className="text-slate-400 text-center text-sm font-medium leading-relaxed mb-10 max-w-xs">
          {reason?.trim() || "Our technical team is currently updating the academic portal. We will be back online shortly."}
        </p>

        {/* Minimal Admin Access Icon */}
        <Link
          href="/admin"
          className="group flex flex-col items-center gap-2 text-slate-600 transition-all hover:text-cyan"
        >
          <div className="size-10 rounded-full border border-slate-800 flex items-center justify-center group-hover:border-cyan/30 group-hover:bg-cyan/5">
            <Lock className="size-4" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest opacity-0 -translate-y-2 transition-all group-hover:opacity-100 group-hover:translate-y-0">
            Admin Log
          </span>
        </Link>
      </motion.div>

      {/* AxisX Branding Footer */}
      <footer className="absolute bottom-10 left-0 right-0 flex flex-col items-center gap-3">
        <div className="h-[1px] w-8 bg-slate-800 mb-2" />
        <Link 
          href="http://axisxstudio.com/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group flex flex-col items-center"
        >
          <span className="text-[9px] font-black uppercase tracking-[0.5em] text-slate-700 transition-all group-hover:text-slate-500 group-hover:tracking-[0.6em]">
            AxisX Studio
          </span>
          <span className="text-[7px] font-bold uppercase tracking-widest text-slate-800 mt-1">
            Premium Digital Experience
          </span>
        </Link>
      </footer>

      {/* Ambient background bloom */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vh] bg-cyan/[0.03] rounded-full blur-[120px] pointer-events-none" />
    </main>
  );
}
