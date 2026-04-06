import { SiteNavbar } from "@/components/site/site-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { ScheduleSection } from "@/components/site/schedule-section";
import { getPublicPageData } from "@/lib/data/public";

export const metadata = {
  title: "Class Schedule | RUBY Science Academy",
  description: "Check the full weekly timetable for A/L science subjects including Physics, Chemistry, and Combined Maths.",
};

export default async function SchedulePage() {
  const { settings, schedules } = await getPublicPageData();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteNavbar />
      <main className="flex-1 mt-10">
        <ScheduleSection schedules={schedules} />
      </main>
      <SiteFooter settings={settings} />
    </div>
  );
}
