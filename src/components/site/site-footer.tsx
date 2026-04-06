import Link from "next/link";
import Image from "next/image";
import { Globe, LogIn, Mail, MapPin, Phone } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

interface SiteFooterProps {
  settings: SiteSettings;
}

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/posts", label: "Posts" },
  { href: "/#subjects", label: "Subjects" },
  { href: "/#teachers", label: "Teachers" },
  { href: "/#schedule", label: "Schedule" },
  { href: "/#results", label: "Results" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#feedback", label: "Feedback" },
  { href: "/#contact", label: "Contact" },
];

export function SiteFooter({ settings }: SiteFooterProps) {
  return (
    <footer className="bg-[linear-gradient(180deg,_#0f4c81,_#0b3558)] py-12 text-white">
      <div className="section-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <Image
            src="/ruby-logo.jpeg"
            alt="RUBY Science Academy logo"
            width={60}
            height={60}
            className="mb-4 rounded-xl border border-white/20 shadow-lg"
          />
          <p className="font-display text-2xl font-extrabold uppercase tracking-tight">
            RUBY Science<br />Academy
          </p>
          <p className="mt-4 max-w-lg leading-7 text-white/75">
            Top Tamil medium A/L science classes in Colombo Kotahena for
            students who want better guidance and clear results.
          </p>
          <p className="mt-6 text-sm text-white/65">{settings.footer_credit}</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">
            Quick Links
          </p>
          <div className="mt-4 flex flex-col gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-white/75 transition hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">
            Contact
          </p>
          <div className="mt-4 space-y-3 text-sm text-white/75">
            <div className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-cyan" />
              <span>{settings.contact_address}</span>
            </div>
            <div className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-cyan" />
              <span>{settings.contact_phone}</span>
            </div>
            <div className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-cyan" />
              <span>{settings.contact_email}</span>
            </div>
            <div className="flex gap-3">
              <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 fill-cyan" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <Link href={settings.facebook_url} target="_blank" rel="noreferrer">
                Facebook
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="section-shell mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-[11px] font-bold uppercase tracking-widest text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span>© {new Date().getFullYear()} RUBY Science Academy.</span>
          <span className="h-3 w-px bg-white/20" />
          <Link 
            href="http://axisxstudio.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="transition-all hover:tracking-[0.12em] bg-[linear-gradient(90deg,_#22d3ee,_#3b82f6)] bg-clip-text text-transparent group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
          >
            Developed by AxisX Studio
          </Link>
        </div>
        <Link href="/admin/login" className="flex items-center gap-2 transition hover:text-white group">
          <LogIn className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          <span>Staff Login</span>
        </Link>
      </div>
    </footer>
  );
}
