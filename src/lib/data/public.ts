import { unstable_noStore as noStore } from "next/cache";
import {
  defaultSiteSettings,
  demoFeedbacks,
  demoGalleryItems,
  demoPosts,
  demoResults,
  demoSchedules,
  demoTeachers,
} from "@/lib/demo-content";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { getRatingLabel } from "@/lib/utils";
import type {
  FeedbackItem,
  GalleryItem,
  Post,
  PublicPageData,
  ResultAchievement,
  ScheduleItem,
  SiteSettings,
  Teacher,
} from "@/lib/types";

type PublicDataResult = PublicPageData & {
  live: boolean;
};

function normalizeFeedback(
  feedback: Partial<FeedbackItem> & {
    rating: number;
    description: string;
    name: string;
    role_type: FeedbackItem["role_type"];
  },
) {
  return {
    id: feedback.id ?? crypto.randomUUID(),
    name: feedback.name,
    role_type: feedback.role_type,
    selected_subjects: feedback.selected_subjects?.length
      ? feedback.selected_subjects
      : ["All"],
    rating: feedback.rating,
    rating_text: feedback.rating_text ?? getRatingLabel(feedback.rating),
    description: feedback.description,
    approved: feedback.approved ?? true,
    featured: feedback.featured ?? false,
    created_at: feedback.created_at,
  } satisfies FeedbackItem;
}

function normalizeSchedule(schedule: Partial<ScheduleItem>) {
  return {
    id: schedule.id ?? crypto.randomUUID(),
    subject: schedule.subject ?? "Chemistry",
    batch_type: schedule.batch_type ?? "Normal",
    year: schedule.year ?? 2028,
    day: schedule.day ?? "Saturday",
    start_time: schedule.start_time ?? "08:00:00",
    end_time: schedule.end_time ?? "10:00:00",
    batch_details: schedule.batch_details ?? "Theory Batch",
    venue: schedule.venue ?? "Main Hall",
    teacher_id: schedule.teacher_id ?? null,
    teacher: schedule.teacher ?? null,
    active_status: schedule.active_status ?? true,
    display_order: schedule.display_order ?? 0,
  } satisfies ScheduleItem;
}

export async function getPublicPageData(): Promise<PublicDataResult> {
  noStore();

  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return {
      settings: defaultSiteSettings,
      teachers: demoTeachers,
      schedules: demoSchedules,
      results: demoResults,
      galleryItems: demoGalleryItems,
      feedbacks: demoFeedbacks,
      posts: demoPosts,
      live: false,
    };
  }

  const [settingsRes, teachersRes, schedulesRes, resultsRes, galleryRes, feedbackRes, postsRes] =
    await Promise.all([
      supabase.from("site_settings").select("*").limit(1).maybeSingle(),
      supabase
        .from("teachers")
        .select("*")
        .order("display_order", { ascending: true })
        .eq("active_status", true),
      supabase
        .from("schedules")
        .select("*, teacher:teachers!schedules_teacher_id_fkey(id, name, subject)")
        .order("display_order", { ascending: true })
        .eq("active_status", true),
      supabase
        .from("results_achievements")
        .select("*")
        .order("featured", { ascending: false })
        .order("year", { ascending: false })
        .eq("active_status", true),
      supabase
        .from("gallery_items")
        .select("*")
        .order("display_order", { ascending: true })
        .eq("active_status", true),
      supabase
        .from("feedbacks")
        .select("*")
        .order("featured", { ascending: false })
        .order("created_at", { ascending: false })
        .eq("approved", true),
      supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false })
        .eq("active_status", true),
    ]);

  const safeSettings = (settingsRes.data as SiteSettings | null) ?? defaultSiteSettings;
  if (safeSettings.admin_password) {
    delete safeSettings.admin_password;
  }

  return {
    settings: safeSettings,
    teachers: teachersRes.error
      ? demoTeachers
      : ((teachersRes.data ?? demoTeachers) as Teacher[]),
    schedules: schedulesRes.error
      ? demoSchedules
      : ((schedulesRes.data ?? []).map((item) =>
          normalizeSchedule(item as Partial<ScheduleItem>),
        ) as ScheduleItem[]),
    results: resultsRes.error
      ? demoResults
      : ((resultsRes.data ?? demoResults) as ResultAchievement[]),
    galleryItems: galleryRes.error
      ? demoGalleryItems
      : ((galleryRes.data ?? demoGalleryItems) as GalleryItem[]),
    feedbacks: feedbackRes.error
      ? demoFeedbacks
      : ((feedbackRes.data ?? []).map((item) =>
          normalizeFeedback(item as FeedbackItem),
        ) as FeedbackItem[]),
    posts: (postsRes.data?.length ? postsRes.data : demoPosts) as Post[],
    live:
      !settingsRes.error &&
      !teachersRes.error &&
      !schedulesRes.error &&
      !resultsRes.error &&
      !galleryRes.error &&
      !feedbackRes.error &&
      !postsRes.error,
  };
}
