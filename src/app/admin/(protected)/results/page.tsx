import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ManageResults } from "@/components/admin/manage-results";
import { getResultsData } from "@/lib/data/admin";

export default async function AdminResultsPage() {
  const { data, live } = await getResultsData();

  return (
    <div>
      <AdminPageHeader
        eyebrow="Proof"
        title="Manage Results & Achievements"
        description="Upload result sheets, rank boards, and certificates to build trust on the public website."
      />
      <ManageResults initialResults={data} live={live} />
    </div>
  );
}
