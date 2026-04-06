import { BarChart3, Camera, ClipboardList, Edit2, MessageSquareText, Trophy } from "lucide-react";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { LiveDataNotice } from "@/components/admin/live-data-notice";
import { Card, CardContent } from "@/components/ui/card";
import { getDashboardData } from "@/lib/data/admin";
import { RecentActivitySection } from "@/components/admin/recent-activity-section";

const summaryCards = [
  {
    key: "totalRegistrations",
    label: "Total Registrations",
    icon: ClipboardList,
  },
  {
    key: "newRegistrations",
    label: "New Registrations",
    icon: BarChart3,
  },
  {
    key: "totalFeedbacks",
    label: "Total Feedbacks",
    icon: MessageSquareText,
  },
  {
    key: "totalGalleryItems",
    label: "Gallery Items",
    icon: Camera,
  },
  {
    key: "totalResultsItems",
    label: "Results Items",
    icon: Trophy,
  },
] as const;

export default async function AdminDashboardPage() {
  const { data, live } = await getDashboardData();

  return (
    <div>
      <AdminPageHeader
        eyebrow="Overview"
        title="Dashboard Overview"
        description="A quick snapshot of registrations, feedback moderation, and media content in the RUBY admin portal."
      />

      <LiveDataNotice live={live} />

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-6">
        {summaryCards.map((card) => (
          <div key={card.key} className="relative overflow-hidden rounded-3xl border border-border-soft bg-white/50 p-6 hover:bg-white hover:shadow-lg-pro transition-all-smooth">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <card.icon className="size-12 text-primary" />
            </div>
            <div className="relative z-10">
              <div className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <card.icon className="size-5" />
              </div>
              <p className="mt-5 text-[10px] font-black uppercase tracking-[0.18em] text-muted/60">
                {card.label}
              </p>
              <p className="mt-2 font-display text-4xl font-black text-primary">
                {data.overview[card.key]}
              </p>
            </div>
          </div>
        ))}
      </div>

      <RecentActivitySection 
        recentRegistrations={data.recentRegistrations} 
        recentFeedbacks={data.recentFeedbacks} 
      />
    </div>
  );
}
