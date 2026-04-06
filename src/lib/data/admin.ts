import { unstable_noStore as noStore } from "next/cache";
import {
  defaultOverview,
  defaultSiteSettings,
  demoFeedbacks,
  demoGalleryItems,
  demoRegistrations,
  demoResults,
  demoSchedules,
  demoTeachers,
} from "@/lib/demo-content";
import { requireAdminUser } from "@/lib/auth";
import { getRatingLabel } from "@/lib/utils";
import type {
  DashboardOverview,
  FeedbackItem,
  GalleryItem,
  Post,
  RegistrationItem,
  ResultAchievement,
  ScheduleItem,
  SiteSettings,
  Teacher,
} from "@/lib/types";

type AdminDataResult<T> = {
  data: T;
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
    approved: feedback.approved ?? false,
    featured: feedback.featured ?? false,
    created_at: feedback.created_at,
  } satisfies FeedbackItem;
}

export async function getDashboardData(): Promise<
  AdminDataResult<{
    overview: DashboardOverview;
    recentRegistrations: RegistrationItem[];
    recentFeedbacks: FeedbackItem[];
  }>
> {
  noStore();

  const { supabase } = await requireAdminUser();

  if (!supabase) {
    return {
      data: {
        overview: defaultOverview,
        recentRegistrations: demoRegistrations,
        recentFeedbacks: demoFeedbacks,
      },
      live: false,
    };
  }

  const [registrationsRes, feedbacksRes, galleryRes, resultsRes, postsRes] =
    await Promise.all([
      supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase.from("feedbacks").select("*").order("created_at", { ascending: false }),
      supabase.from("gallery_items").select("*"),
      supabase.from("results_achievements").select("*"),
      supabase.from("posts").select("*"),
    ]);

  if (
    registrationsRes.error ||
    feedbacksRes.error ||
    galleryRes.error ||
    resultsRes.error ||
    postsRes.error
  ) {
    return {
      data: {
        overview: { ...defaultOverview, totalPosts: 0 },
        recentRegistrations: demoRegistrations,
        recentFeedbacks: demoFeedbacks,
      },
      live: false,
    };
  }

  const registrations = (registrationsRes.data ?? []) as RegistrationItem[];
  const feedbacks = (feedbacksRes.data ?? []).map((item) =>
    normalizeFeedback(item as FeedbackItem),
  );

  return {
    data: {
      overview: {
        totalRegistrations: registrations.length,
        newRegistrations: registrations.filter((item) => item.status === "new").length,
        totalFeedbacks: feedbacks.length,
        totalGalleryItems: (galleryRes.data ?? []).length,
        totalResultsItems: (resultsRes.data ?? []).length,
        totalPosts: (postsRes.data ?? []).length,
      },
      recentRegistrations: registrations.slice(0, 5),
      recentFeedbacks: feedbacks.slice(0, 5),
    },
    live: true,
  };
}

export async function getRegistrationsData(): Promise<AdminDataResult<RegistrationItem[]>> {
  noStore();

  const { supabase } = await requireAdminUser();

  if (!supabase) {
    return { data: demoRegistrations, live: false };
  }

  const result = await supabase
    .from("registrations")
    .select("*")
    .order("created_at", { ascending: false });

  return {
    data: result.error
      ? demoRegistrations
      : ((result.data ?? demoRegistrations) as RegistrationItem[]),
    live: !result.error,
  };
}

export async function getFeedbacksData(): Promise<AdminDataResult<FeedbackItem[]>> {
  noStore();

  const { supabase } = await requireAdminUser();

  if (!supabase) {
    return { data: demoFeedbacks, live: false };
  }

  const result = await supabase
    .from("feedbacks")
    .select("*")
    .order("created_at", { ascending: false });

  return {
    data: result.error
      ? demoFeedbacks
      : ((result.data ?? []).map((item) =>
          normalizeFeedback(item as FeedbackItem),
        ) as FeedbackItem[]),
    live: !result.error,
  };
}

export async function getTeachersData(): Promise<AdminDataResult<Teacher[]>> {
  noStore();

  const { supabase } = await requireAdminUser();

  if (!supabase) {
    return { data: demoTeachers, live: false };
  }

  const result = await supabase
    .from("teachers")
    .select("*")
    .order("display_order", { ascending: true });

  return {
    data: result.error ? demoTeachers : ((result.data ?? demoTeachers) as Teacher[]),
    live: !result.error,
  };
}

export async function getSchedulesData(): Promise<AdminDataResult<ScheduleItem[]>> {
  noStore();

  const { supabase } = await requireAdminUser();

  if (!supabase) {
    return { data: demoSchedules, live: false };
  }

  const result = await supabase
    .from("schedules")
    .select("*, teacher:teachers!schedules_teacher_id_fkey(id, name, subject)")
    .order("display_order", { ascending: true });

  return {
    data: result.error
      ? demoSchedules
      : ((result.data ?? demoSchedules) as ScheduleItem[]),
    live: !result.error,
  };
}

export async function getGalleryData(): Promise<AdminDataResult<GalleryItem[]>> {
  noStore();

  const { supabase } = await requireAdminUser();

  if (!supabase) {
    return { data: demoGalleryItems, live: false };
  }

  const result = await supabase
    .from("gallery_items")
    .select("*")
    .order("display_order", { ascending: true });

  return {
    data: result.error
      ? demoGalleryItems
      : ((result.data ?? demoGalleryItems) as GalleryItem[]),
    live: !result.error,
  };
}

export async function getResultsData(): Promise<AdminDataResult<ResultAchievement[]>> {
  noStore();

  const { supabase } = await requireAdminUser();

  if (!supabase) {
    return { data: demoResults, live: false };
  }

  const result = await supabase
    .from("results_achievements")
    .select("*")
    .order("year", { ascending: false });

  return {
    data: result.error
      ? demoResults
      : ((result.data ?? demoResults) as ResultAchievement[]),
    live: !result.error,
  };
}

export async function getSiteSettingsData(): Promise<AdminDataResult<SiteSettings>> {
  noStore();

  const { supabase } = await requireAdminUser();

  if (!supabase) {
    return { data: defaultSiteSettings, live: false };
  }

  const result = await supabase
    .from("site_settings")
    .select("*")
    .limit(1)
    .maybeSingle();

  return {
    data: result.error
      ? defaultSiteSettings
      : ((result.data ?? defaultSiteSettings) as SiteSettings),
    live: !result.error,
  };
}

export async function getPostsData(): Promise<AdminDataResult<Post[]>> {
  noStore();

  const { supabase } = await requireAdminUser();

  if (!supabase) {
    return { data: [], live: false };
  }

  const result = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });

  return {
    data: (result.data ?? []) as Post[],
    live: !result.error,
  };
}
