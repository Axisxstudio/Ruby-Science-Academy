export type SubjectName = "Maths" | "Physics" | "Chemistry";
export type BatchType = "Normal" | "Repeat";
export type RegistrationStatus = "new" | "reviewed" | "contacted" | "enrolled";
export type FeedbackRoleType = "student" | "parent";
export type ScheduleDay = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
export type MediaType = "image" | "video";

export interface Teacher {
  id: string;
  name: string;
  subject: SubjectName;
  qualifications: string;
  short_bio: string;
  image_url: string;
  media_path?: string | null;
  display_order: number;
  active_status: boolean;
}

export interface ScheduleItem {
  id: string;
  subject: SubjectName;
  batch_type: BatchType;
  year: number;
  day: ScheduleDay;
  start_time: string;
  end_time: string;
  batch_details: string;
  venue?: string | null;
  teacher_id?: string | null;
  active_status: boolean;
  display_order: number;
  teacher?: Pick<Teacher, "id" | "name" | "subject"> | null;
}

export interface ResultAchievement {
  id: string;
  title: string;
  caption: string;
  image_url: string;
  media_type?: MediaType;
  media_path?: string | null;
  subject?: SubjectName | "All" | null;
  year: number;
  type: string;
  featured: boolean;
  active_status?: boolean;
  created_at?: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  image_url: string;
  media_type?: MediaType;
  media_path?: string | null;
  video_url?: string | null;
  description?: string | null;
  category: string;
  display_order: number;
  active_status: boolean;
}

export interface FeedbackItem {
  id: string;
  name: string;
  role_type: FeedbackRoleType;
  selected_subjects: Array<SubjectName | "All">;
  rating: number;
  rating_text?: string;
  description: string;
  approved: boolean;
  featured: boolean;
  created_at?: string;
}

export interface RegistrationItem {
  id: string;
  full_name: string;
  phone_number: string;
  batch_type: BatchType;
  year: number;
  selected_subjects: Array<SubjectName | "All">;
  created_at?: string;
  status: RegistrationStatus;
  notes?: string | null;
}

export interface ContactMessage {
  id: string;
  name: string;
  phone: string;
  message: string;
  created_at?: string;
  status?: "new" | "reviewed" | "contacted";
}

export interface SiteSettings {
  id: string;
  website_paused: boolean;
  pause_reason: string | null;
  whatsapp_number: string;
  facebook_url: string;
  contact_phone: string;
  contact_email: string;
  contact_address: string;
  hero_title: string;
  hero_subtitle: string;
  hero_description: string;
  footer_credit: string;
  pass_rate_label: string;
  ab_rate_label: string;
  district_rankings_label: string;
  admin_password?: string;
  updated_at?: string;
}

export interface Post {
  id: string;
  image_url: string;
  media_path?: string | null;
  description: string;
  active_status: boolean;
  created_at?: string;
}

export interface PublicPageData {
  settings: SiteSettings;
  teachers: Teacher[];
  schedules: ScheduleItem[];
  results: ResultAchievement[];
  galleryItems: GalleryItem[];
  feedbacks: FeedbackItem[];
  posts: Post[];
}

export interface DashboardOverview {
  totalRegistrations: number;
  newRegistrations: number;
  totalFeedbacks: number;
  totalGalleryItems: number;
  totalResultsItems: number;
  totalPosts: number;
}
