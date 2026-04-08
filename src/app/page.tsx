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
import { ScrollingBanner } from "@/components/site/scrolling-banner";
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
        <ScrollingBanner phone={settings.contact_phone} />

        <main className="space-y-6 sm:space-y-8 lg:space-y-12 pb-8">
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
            <section className="py-6 sm:py-10">
              <div className="section-shell">
                <div className="mb-12 max-w-4xl">
                  <span className="inline-block px-4 py-2 rounded-full-pro text-xs-pro font-bold uppercase tracking-[0.2em] bg-blue-100 text-blue-700 border border-blue-200 shadow-sm-pro mb-6">
                    Enroll Now
                  </span>
                  <h2 className="text-balance font-display text-4xl-pro font-black tracking-tight text-slate-900 sm:text-5xl-pro lg:text-7xl-pro leading-[1.1] animate-fade-in-up delay-100">
                    A focused learning atmosphere <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">families trust for results.</span>
                  </h2>
                  <p className="mt-8 max-w-2xl text-lg-pro leading-relaxed text-slate-600">
                    We are dedicated to creating the ultimate science stream experience with expert Teachers and comprehensive support to ensure every student's success.
                  </p>
                </div>

                <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-start pt-8">
                  <RegistrationForm />
                  <Card className="rounded-[2rem] overflow-hidden border-0 bg-[linear-gradient(135deg,_#0f4c81_0%,_#0b3558_100%)] text-white shadow-2xl lg:sticky lg:top-24 mt-12 lg:mt-0">
                    <CardContent className="h-full p-10 sm:p-12 flex flex-col justify-center">
                      <div className="flex size-14 items-center justify-center rounded-2xl bg-white/10 backdrop-blur-sm mb-8">
                        <Sparkles className="size-7 text-cyan" />
                      </div>
                      <p className="text-[11px] font-black uppercase tracking-[0.3em] text-cyan">
                        Why enroll now
                      </p>
                      <h3 className="mt-6 font-display text-3xl sm:text-4xl font-black leading-tight tracking-tight">
                        Secure your batch early and get a clear weekend study plan from day one.
                      </h3>
                      <p className="mt-8 text-lg-pro leading-relaxed text-white/85">
                        Your registration helps us prepare premium materials and arrange optimal time slots that fit your schedule perfectly.
                      </p>

                      <div className="mt-12 space-y-5">
                        <div className="flex items-center gap-4">
                          <div className="size-2 rounded-full bg-cyan shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
                          <p className="text-base font-bold">Priority Batch Selection</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="size-2 rounded-full bg-cyan shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
                          <p className="text-base font-bold">Personalized Study Materials</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="size-2 rounded-full bg-cyan shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
                          <p className="text-base font-bold">Direct Teacher Mentoring</p>
                        </div>
                      </div>

                      <div className="mt-12">
                        <Button asChild size="lg" className="rounded-2xl h-[60px] px-10 bg-white text-primary font-black uppercase tracking-widest text-xs hover:bg-white/90 transition-all duration-300 w-fit shadow-xl hover:scale-105 active:scale-95">
                          <a href="#contact">
                            Need help? <ArrowRight className="size-4 ml-3" />
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
