"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { Globe, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import type { SiteSettings } from "@/lib/types";

interface ContactSectionProps {
  settings: SiteSettings;
}

export function ContactSection({ settings }: ContactSectionProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim() || !phone.trim() || !message.trim()) {
      toast.error("Please fill in all contact form fields.");
      return;
    }

    setIsSubmitting(true);
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.from("contact_messages").insert({
      name,
      phone,
      message,
      status: "new",
    });

    setIsSubmitting(false);

    if (error) {
      toast.error("Unable to submit contact message", {
        description: error.message,
      });
      return;
    }

    toast.success("Message sent", {
      description: "Our team will contact you shortly.",
    });
    setName("");
    setPhone("");
    setMessage("");
  };

  return (
    <section id="contact" className="section-shell py-20 lg:py-28">
      <div className="mb-12 max-w-3xl animate-fade-in-up">
        <span className="inline-block px-4 py-2 rounded-full-pro text-xs-pro font-bold uppercase tracking-[0.2em] bg-blue-100 text-blue-700 border border-blue-200 shadow-sm-pro">
          Contact Details
        </span>
        <h2 className="text-balance mt-4 font-display text-4xl font-extrabold tracking-tight text-primary sm:text-5xl animate-fade-in-up delay-100">
          <span className="hidden md:inline">Connect with us effortlessly via WhatsApp, social media, or the form below.</span>
          <span className="md:hidden">Connect with us effortlessly.</span>
        </h2>
      </div>

      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <Card className="animate-fade-in-up delay-300">
          <CardContent className="space-y-6 p-6">
            <div className="flex gap-4">
              <MapPin className="mt-1 size-5 text-cyan" />
              <div>
                <p className="font-semibold text-primary">Address</p>
                <p className="mt-1 leading-7 text-muted">{settings.contact_address}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Phone className="mt-1 size-5 text-cyan" />
              <div>
                <p className="font-semibold text-primary">Phone</p>
                <p className="mt-1 leading-7 text-muted">{settings.contact_phone}</p>
              </div>
            </div>
            <div className="flex gap-4">
              <Mail className="mt-1 size-5 text-cyan" />
              <div>
                <p className="font-semibold text-primary">Email</p>
                <p className="mt-1 leading-7 text-muted">{settings.contact_email}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button asChild variant="accent" className="rounded-full px-6">
                <Link
                  href={`https://wa.me/${settings.whatsapp_number.replace(/[^\d]/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg className="size-5 mr-1.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.29-.497.093-.198.048-.372-.025-.521-.075-.148-.67-1.611-.918-2.214-.242-.588-.487-.51-.67-.513-.173-.003-.371-.004-.57-.004-.199 0-.523.074-.797.373-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.066 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72 1.662c1.72 1.72 4.113 5.95 2.61a11.872 11.872 0 0011.89-11.89c-.003-3.169-1.233-6.147-3.466-8.377z" />
                  </svg>
                  WhatsApp
                </Link>
              </Button>
              <Button asChild variant="secondary" className="rounded-full px-6">
                <Link href={settings.facebook_url} target="_blank" rel="noreferrer">
                  <svg className="size-5 mr-1.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </Link>
              </Button>
            </div>

            <div className="overflow-hidden rounded-[1.5rem] border border-border-soft">
              <iframe
                title="RUBY Science Academy map"
                src="https://www.google.com/maps?q=414/1%20George%20R.%20De%20Silva%20Mawatha%2C%20Colombo%2013&z=15&output=embed"
                className="h-[300px] w-full"
                loading="lazy"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="animate-fade-in-up delay-500 self-start">
          <CardContent className="p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-muted/50 mb-5">Send Us a Message</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <Label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-widest text-muted/60">Name</Label>
                <Input
                  id="contact-name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Your name"
                  className="h-10 rounded-xl text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-phone" className="text-xs font-bold uppercase tracking-widest text-muted/60">Phone</Label>
                <Input
                  id="contact-phone"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="0771234567"
                  className="h-10 rounded-xl text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-widest text-muted/60">Message</Label>
                <Textarea
                  id="contact-message"
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Tell us what you need help with"
                  className="min-h-[100px] rounded-xl text-sm resize-none"
                />
              </div>
              <div className="flex items-center justify-between pt-1">
                <p className="text-xs text-muted/60">We reply within 24 hrs</p>
                <Button type="submit" variant="accent" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>

            <div className="mt-5 pt-5 border-t border-border-soft grid grid-cols-2 gap-4">
              <div className="flex items-start gap-2">
                <Phone className="mt-0.5 size-4 text-cyan shrink-0" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted/50">Phone</p>
                  <p className="text-sm font-semibold text-primary mt-0.5">{settings.contact_phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="mt-0.5 size-4 text-cyan shrink-0" />
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted/50">Email</p>
                  <p className="text-sm font-semibold text-primary mt-0.5 break-all">{settings.contact_email}</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
