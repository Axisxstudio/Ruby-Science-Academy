import { ArrowRight, Sparkles } from "lucide-react";
import { AboutSection } from "@/components/site/about-section";
import { ContactSection } from "@/components/site/contact-section";
import { FeedbackForm } from "@/components/site/feedback-form";
import { GallerySection } from "@/components/site/gallery-section";
import { HeroSection } from "@/components/site/hero-section";
import { MaintenanceScreen } from "@/components/site/maintenance-screen";
import { RegistrationForm } from "@/components/site/registration-form";
import { ScheduleSection } from "@/components/site/schedule-section";
import { SectionReveal } from "@/components/ui/section-reveal";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteNavbar } from "@/components/site/site-navbar";
import { SubjectsSection } from "@/components/site/subjects-section";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { WhatsAppFloat } from "@/components/site/whatsapp-float";
import { LatestPostPopup } from "@/components/site/latest-post-popup";
import { PostsSection } from "@/components/site/posts-section";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getPublicPageData } from "@/lib/data/public";
import type { Post } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { settings, teachers, schedules, galleryItems, feedbacks, posts, live } =
    await getPublicPageData();

  if (settings.website_paused) {
    return <MaintenanceScreen reason={settings.pause_reason} />;
  }

  const latestPost = posts.find((p: Post) => p.active_status) || null;

  const schema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    name: "RUBY Science Academy",
    address: settings.contact_address,
    email: settings.contact_email,
    telephone: settings.contact_phone,
    url: "https://ruby-science-academy.vercel.app",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="min-h-screen bg-background overflow-x-hidden pt-20">
        <SiteNavbar />
        <LatestPostPopup post={latestPost} />

        {!live ? (
          <div className="border-b border-cyan/20 bg-cyan/10">
            <div className="section-shell flex flex-col gap-2 py-3 text-sm text-primary sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="size-4" />
                Site is currently running in preview mode using demo content.
              </div>
              <a href="/admin/login" className="font-semibold underline underline-offset-4">
                Open admin login
              </a>
            </div>
          </div>
        ) : null}

        <main>
          <SectionReveal threshold={0}>
            <HeroSection settings={settings} teachers={teachers} />
          </SectionReveal>

          <SectionReveal>
            <AboutSection />
          </SectionReveal>

          <SectionReveal>
            <SubjectsSection teachers={teachers} />
          </SectionReveal>

          <SectionReveal>
            <ScheduleSection schedules={schedules} />
          </SectionReveal>

          <SectionReveal>
            <GallerySection items={galleryItems} />
          </SectionReveal>

          <SectionReveal>
            <TestimonialsSection feedbacks={feedbacks} />
          </SectionReveal>

          <SectionReveal>
            <section className="section-padding">
              <div className="section-shell">
                <div className="mb-12 max-w-4xl">
                  <span className="inline-block px-4 py-2 rounded-full-pro text-xs-pro font-bold uppercase tracking-[0.2em] bg-blue-100 text-blue-700 border border-blue-200 shadow-sm-pro mb-6">
                    Enroll Now
                  </span>
                  <h2 className="text-balance font-display text-4xl-pro sm:text-5xl-pro font-black tracking-tight text-primary leading-tight">
                    A focused learning atmosphere families trust for results.
                  </h2>
                  <p className="mt-6 max-w-2xl text-base-pro leading-relaxed text-slate-600">
                    We are dedicated to creating the ultimate science stream experience with expert lecturers and comprehensive support to ensure every student's success.
                  </p>
                </div>

                <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
                  <RegistrationForm />
                  <Card className="rounded-[1.4rem] overflow-hidden border-0 bg-[linear-gradient(135deg,_#0f4c81_0%,_#0b3558_100%)] text-white shadow-xl-pro lg:sticky lg:top-24">
                    <CardContent className="h-full p-8 sm:p-10 flex flex-col justify-center">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm mb-6">
                        <Sparkles className="size-6 text-cyan" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.25em] text-cyan">
                        Why enroll now
                      </p>
                      <h3 className="mt-4 font-display text-3xl font-black leading-tight">
                        Secure your batch early and get a clear weekend study plan from day one.
                      </h3>
                      <p className="mt-6 leading-relaxed text-white/85">
                        Your registration helps us prepare premium materials and arrange optimal time slots that fit your schedule perfectly.
                      </p>

                      <div className="mt-10 space-y-4">
                        <div className="flex items-center gap-3">
                          <div className="size-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                          <p className="text-sm font-semibold">Priority Batch Selection</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="size-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                          <p className="text-sm font-semibold">Personalized Study Materials</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="size-1.5 rounded-full bg-cyan shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                          <p className="text-sm font-semibold">Direct Teacher Mentoring</p>
                        </div>
                      </div>

                      <div className="mt-10">
                        <Button asChild size="lg" className="rounded-full h-12 px-8 bg-white text-primary font-bold hover:bg-white/90 transition-all-smooth w-fit">
                          <a href="#contact">
                            Need help before enrolling?
                            <ArrowRight className="size-4 ml-2" />
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>
          </SectionReveal>

          <SectionReveal>
            <ContactSection settings={settings} />
          </SectionReveal>
        </main>

        <SiteFooter settings={settings} />
        <WhatsAppFloat phoneNumber={settings.whatsapp_number} />
      </div>
    </>
  );
}
