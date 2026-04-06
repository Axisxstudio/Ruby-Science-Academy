import { SiteNavbar } from "@/components/site/site-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { ContactSection } from "@/components/site/contact-section";
import { getPublicPageData } from "@/lib/data/public";

export const metadata = {
  title: "Get in Touch | RUBY Science Academy",
  description: "Contact our Colombo 13 campus for enrollments, subject inquiries, and more.",
};

export default async function ContactPage() {
  const { settings } = await getPublicPageData();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteNavbar />
      <main className="flex-1 mt-10">
        <ContactSection settings={settings} />
      </main>
      <SiteFooter settings={settings} />
    </div>
  );
}
