import { SiteNavbar } from "@/components/site/site-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { TeachersSection } from "@/components/site/teachers-section";
import { getPublicPageData } from "@/lib/data/public";

export const metadata = {
  title: "Expert Faculty | RUBY Science Academy",
  description: "Meet our dedicated teachers for A/L Science, including the top Tamil medium instructors in Colombo.",
};

export default async function TeachersPage() {
  const { settings, teachers } = await getPublicPageData();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteNavbar />
      <main className="flex-1 mt-10">
        <TeachersSection teachers={teachers} />
      </main>
      <SiteFooter settings={settings} />
    </div>
  );
}
