import Image from "next/image";
import Link from "next/link";
import { Lock, Mail, MapPin, Phone } from "lucide-react";
import { AxisXBranding } from "@/components/site/axisx-branding";
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
      <div className="section-shell grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr_0.9fr]">
        <div>
        <div className="flex items-center gap-4 mb-6">
          <Image
            src="/ruby-logo.jpeg"
            alt="RUBY Science Academy logo"
            width={56}
            height={56}
            className="rounded-xl border border-white/20 shadow-lg"
          />
          <p className="font-display text-xl sm:text-2xl font-extrabold uppercase tracking-tight leading-none">
            RUBY
            <br />
            <span className="text-lg sm:text-xl text-white/80">Science Academy</span>
          </p>
        </div>
          <p className="mt-4 max-w-lg leading-7 text-white/75">
            Top Tamil medium A/L science classes in Colombo Kotahena for students who want better guidance and clear
            results.
          </p>
          <p className="mt-6 text-sm text-white/65">{settings.footer_credit}</p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Quick Links</p>
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
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Contact</p>
          <div className="mt-4 space-y-3 text-sm text-white/75">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(settings.contact_address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex gap-3 transition-colors hover:text-white"
            >
              <MapPin className="mt-0.5 size-4 shrink-0 text-cyan transition-transform group-hover:scale-110" />
              <span>{settings.contact_address}</span>
            </a>
            <a 
              href={`tel:${settings.contact_phone}`} 
              className="group flex gap-3 transition-colors hover:text-white"
            >
              <Phone className="mt-0.5 size-4 shrink-0 text-cyan transition-transform group-hover:scale-110" />
              <span>{settings.contact_phone}</span>
            </a>
            <a 
              href={`mailto:${settings.contact_email}`} 
              className="group flex gap-3 transition-colors hover:text-white"
            >
              <Mail className="mt-0.5 size-4 shrink-0 text-cyan transition-transform group-hover:scale-110" />
              <span>{settings.contact_email}</span>
            </a>
            <div className="flex gap-3">
              <svg viewBox="0 0 24 24" className="mt-0.5 size-4 shrink-0 fill-cyan" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <Link href={settings.facebook_url} target="_blank" rel="noreferrer">
                Facebook
              </Link>
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan">Connect</p>
          <div className="mt-4 space-y-3">
            <a
              href="http://www.youtube.com/@buzzer_AL"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-sm text-white/75 transition hover:text-white"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-red-500/30 bg-red-600/20 transition-colors group-hover:bg-red-600/30">
                <svg className="size-4 fill-red-400" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </span>
              <span className="leading-snug">
                YouTube Channel
                <br />
                <span className="text-xs text-white/45">@buzzer_AL</span>
              </span>
            </a>

            <a
              href="https://chat.whatsapp.com/JQlquaPwjOLCb58c3Ehmfv"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 text-sm text-white/75 transition hover:text-white"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-green-500/30 bg-green-600/20 transition-colors group-hover:bg-green-600/30">
                <svg className="size-4 fill-green-400" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </span>
              <span className="leading-snug">
                WhatsApp Community
                <br />
                <span className="text-xs text-white/45">Join our group</span>
              </span>
            </a>
          </div>
        </div>
      </div>

      <div className="section-shell mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 text-[11px] font-bold uppercase tracking-widest text-white/40 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span>&copy; {new Date().getFullYear()} RUBY Science Academy. All rights reserved.</span>
          <span className="hidden text-white/20 sm:inline-block">|</span>
          <AxisXBranding />
        </div>
        <Link
          href="/admin/login"
          className="group flex items-center gap-2 transition-colors hover:text-white"
          title="Admin Login"
        >
          <Lock className="size-3.5 transition-transform group-hover:translate-x-0.5" />
          <span className="sr-only sm:not-sr-only sm:inline-block">Admin Login</span>
        </Link>
      </div>
    </footer>
  );
}
