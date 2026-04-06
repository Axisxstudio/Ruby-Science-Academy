import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ManageGallery } from "@/components/admin/manage-gallery";
import { getGalleryData } from "@/lib/data/admin";

export default async function AdminGalleryPage() {
  const { data, live } = await getGalleryData();

  return (
    <div>
      <AdminPageHeader
        eyebrow="Media"
        title="Manage Gallery"
        description="Upload classroom images or videos, organize categories, and control which items appear in the public slider."
      />
      <ManageGallery initialItems={data} live={live} />
    </div>
  );
}
