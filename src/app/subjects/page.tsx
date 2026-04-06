import { SiteNavbar } from "@/components/site/site-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { SubjectsSection } from "@/components/site/subjects-section";
import { getPublicPageData } from "@/lib/data/public";

export const metadata = {
  title: "Available Subjects | RUBY Science Academy",
  description: "Explore our range of A/L science subjects: Physics, Chemistry, and Combined Maths in Tamil Medium.",
};

export default async function SubjectsPage() {
  const { settings, teachers } = await getPublicPageData();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteNavbar />
      <main className="flex-1 mt-10">
        <SubjectsSection teachers={teachers} />
      </main>
      <SiteFooter settings={settings} />
    </div>
  );
}
