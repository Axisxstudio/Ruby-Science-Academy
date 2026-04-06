import { SiteNavbar } from "@/components/site/site-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { TestimonialsSection } from "@/components/site/testimonials-section";
import { FeedbackForm } from "@/components/site/feedback-form";
import { getPublicPageData } from "@/lib/data/public";

export const metadata = {
  title: "Student Feedbacks | RUBY Science Academy",
  description: "Read what our students and parents say about their experience with RUBY Science Academy.",
};

export default async function FeedbackPage() {
  const { settings, feedbacks } = await getPublicPageData();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteNavbar />
      <main className="flex-1 py-10">
        <TestimonialsSection feedbacks={feedbacks} />
        <FeedbackForm />
      </main>
      <SiteFooter settings={settings} />
    </div>
  );
}
