import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ManageSettings } from "@/components/admin/manage-settings";
import { getSiteSettingsData } from "@/lib/data/admin";

export default async function AdminSettingsPage() {
  const { data, live } = await getSiteSettingsData();

  return (
    <div>
      <AdminPageHeader
        eyebrow="Control Center"
        title="Website Settings"
        description="Control maintenance mode, contact details, hero copy, and result-stat labels from one place."
      />
      <ManageSettings initialSettings={data} live={live} />
    </div>
  );
}
