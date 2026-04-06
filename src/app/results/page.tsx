import { SiteNavbar } from "@/components/site/site-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { ResultsSection } from "@/components/site/results-section";
import { getPublicPageData } from "@/lib/data/public";

export const metadata = {
  title: "Outstanding Results | RUBY Science Academy",
  description: "Browse our legacy of A/L science success, showcasing student results in Maths, Physics, and Chemistry.",
};

export default async function ResultsPage() {
  const { settings } = await getPublicPageData();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteNavbar />
      <main className="flex-1 mt-10">
        <ResultsSection />
      </main>
      <SiteFooter settings={settings} />
    </div>
  );
}
