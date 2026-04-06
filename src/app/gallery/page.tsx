import { SiteNavbar } from "@/components/site/site-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { GallerySection } from "@/components/site/gallery-section";
import { getPublicPageData } from "@/lib/data/public";

export const metadata = {
  title: "Academy Gallery | RUBY Science Academy",
  description: "Take a visual tour of our campus, classrooms, and student events.",
};

export default async function GalleryPage() {
  const { settings, galleryItems } = await getPublicPageData();

  return (
    <div className="flex min-h-screen flex-col bg-white">
      <SiteNavbar />
      <main className="flex-1 mt-10">
        <GallerySection items={galleryItems} />
      </main>
      <SiteFooter settings={settings} />
    </div>
  );
}
