import { SiteNavbar } from "@/components/site/site-navbar";
import { SiteFooter } from "@/components/site/site-footer";
import { PostsSection } from "@/components/site/posts-section";
import { getPublicPageData } from "@/lib/data/public";
import { SectionReveal } from "@/components/ui/section-reveal";

export const metadata = {
  title: "Academy Updates | RUBY Science Academy",
  description: "Check our latest classroom highlights, results announcements, and news updates.",
};

export default async function PostsPage() {
  const { settings, posts } = await getPublicPageData();

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 pt-20">
      <SiteNavbar />
      <main className="flex-1">
        <div className="py-12 bg-white border-b border-slate-100">
          <div className="section-shell">
            <h1 className="font-display text-4xl font-black text-primary tracking-tight">Academy News</h1>
            <p className="mt-2 text-slate-500 font-medium">Follow our official updates and student milestones</p>
          </div>
        </div>
        <PostsSection posts={posts} />
      </main>
      <SiteFooter settings={settings} />
    </div>
  );
}
