"use client";

import { ShieldCheck, Wrench, Lock, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface MaintenanceScreenProps {
  reason?: string | null;
}

export function MaintenanceScreen({ reason }: MaintenanceScreenProps) {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-[#0a1628] overflow-hidden px-4 py-12">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/5 blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 w-full max-w-2xl text-center"
      >
        {/* Branding */}
        <div className="mb-10 flex flex-col items-center">
          <div className="relative size-24 mb-6 rounded-3xl bg-white shadow-2xl p-4 border border-white/20 animate-float-premium">
            <Image
              src="/ruby-science-logo.png"
              alt="RSA Logo"
              width={96}
              height={96}
              className="h-full w-full object-contain"
            />
          </div>
          <h2 className="font-display text-sm font-black uppercase tracking-[0.4em] text-cyan mb-2">
            Ruby Science Academy
          </h2>
          <div className="h-1 w-12 bg-gradient-to-r from-cyan to-blue-600 rounded-full" />
        </div>

        <Card className="border-white/5 bg-white/5 backdrop-blur-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.5)] overflow-hidden">
          <CardContent className="p-10 border-t border-white/10">
            <div className="mb-8 flex flex-col items-center">
              <div className="mb-6 flex size-16 items-center justify-center rounded-2xl bg-cyan/10 text-cyan">
                <Wrench className="size-8" />
              </div>
              <h1 className="font-display text-3xl font-black text-white sm:text-4xl leading-tight">
                Academic Portal <br /> 
                <span className="text-white/60">Temporarily Paused</span>
              </h1>
            </div>

            <p className="text-base leading-relaxed text-slate-400 max-w-md mx-auto">
              We&apos;re currently optimizing the student registration system and updating content for the next batch.
            </p>

            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mt-10 rounded-2xl bg-white/5 border border-white/10 p-6 text-left"
            >
              <div className="mb-3 flex items-center gap-3 text-cyan">
                <ShieldCheck className="size-5" />
                <p className="text-xs font-black uppercase tracking-widest leading-none">Administration Notice</p>
              </div>
              <p className="text-sm font-medium leading-relaxed text-slate-300">
                {reason?.trim() || "The website is currently under maintenance. Please check back soon for the 2028 registration opening."}
              </p>
            </motion.div>
          </CardContent>
        </Card>

        {/* Professional Footer with Admin Entry */}
        <div className="mt-12 flex flex-col items-center gap-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">
            Evolution through clarity
          </p>

          <Link
            href="/admin"
            className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-xs font-bold text-slate-400 transition-all hover:bg-white/10 hover:text-white"
          >
            <Lock className="size-3.5 transition-colors group-hover:text-cyan" />
            <span>Administrator Access</span>
            <ArrowRight className="size-3 opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
