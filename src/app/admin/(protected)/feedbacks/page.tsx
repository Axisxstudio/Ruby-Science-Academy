import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ManageFeedbacks } from "@/components/admin/manage-feedbacks";
import { getFeedbacksData } from "@/lib/data/admin";

export default async function AdminFeedbacksPage() {
  const { data, live } = await getFeedbacksData();

  return (
    <div>
      <AdminPageHeader
        eyebrow="Moderation"
        title="Manage Feedback"
        description="Approve, reject, feature, edit, and filter testimonials before they appear on the public website."
      />
      <ManageFeedbacks initialFeedbacks={data} live={live} />
    </div>
  );
}
