import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ManageTeachers } from "@/components/admin/manage-teachers";
import { getTeachersData } from "@/lib/data/admin";

export default async function AdminTeachersPage() {
  const { data, live } = await getTeachersData();

  return (
    <div>
      <AdminPageHeader
        eyebrow="Faculty"
        title="Manage Teachers"
        description="Create, edit, reorder, activate, and remove teacher profiles displayed on the public website."
      />
      <ManageTeachers initialTeachers={data} live={live} />
    </div>
  );
}
