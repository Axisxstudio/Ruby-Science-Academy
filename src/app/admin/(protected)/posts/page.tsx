import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ManagePosts } from "@/components/admin/manage-posts";
import { getPostsData } from "@/lib/data/admin";

export const metadata = {
  title: "Manage Posts | RUBY Admin",
  description: "Create and manage social announcements and updates.",
};

export default async function AdminPostsPage() {
  const { data, live } = await getPostsData();

  return (
    <div>
      <AdminPageHeader
        eyebrow="Announcements"
        title="Social Posts"
        description="Manage the updates and news posts that appear on your website and dashboard."
      />
      <ManagePosts initialItems={data} live={live} />
    </div>
  );
}
