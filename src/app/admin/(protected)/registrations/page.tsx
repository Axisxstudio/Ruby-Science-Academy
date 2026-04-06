import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ManageRegistrations } from "@/components/admin/manage-registrations";
import { getRegistrationsData } from "@/lib/data/admin";

export default async function AdminRegistrationsPage() {
  const { data, live } = await getRegistrationsData();

  return (
    <div>
      <AdminPageHeader
        eyebrow="Admissions"
        title="Manage Registrations"
        description="Search, review, and update registration leads as they move from inquiry to enrolled student."
      />
      <ManageRegistrations initialRegistrations={data} live={live} />
    </div>
  );
}
