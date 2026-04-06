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

export const defaultSiteSettings: SiteSettings = {
  id: "00000000-0000-0000-0000-000000000001",
  website_paused: false,
  pause_reason: null,
  whatsapp_number: "+94752207369",
  facebook_url: "https://facebook.com/rubyscienceacademy",
  contact_phone: "075 220 7369",
  contact_email: "rubyscienceacademy@gmail.com",
  contact_address: "414/1 (1ST FLOOR), GEORGE R. DE SILVA MAWATHA, COLOMBO 13",
  hero_title: "RUBY Science Academy",
  hero_subtitle: "Expert Tamil Medium Tuition for 2028 A/L Science Stream",
  hero_description:
    "Helping A/L students understand science through clear teaching, better tracking, and top results in Maths, Physics, and Chemistry.",
  footer_credit: "Developed by AxisX Studio",
  pass_rate_label: "95% Pass Rate",
  ab_rate_label: "85% A/B Results",
  district_rankings_label: "Top 100+ Students",
};

export const demoTeachers: Teacher[] = [
  {
    id: "5f531f4d-5c8c-44bf-b4f2-6aa598b1e3d1",
    name: "T. Thuvaragan",
    subject: "Chemistry",
    qualifications: "B.PHARM (HONS) UNIVERSITY OF JAFFNA",
    short_bio:
      "Dr. Thuvaragan makes lessons simple and gives students the right advice to succeed in exams.",
    image_url:
      "/ruby-teacher-chemistry.jpeg",
    display_order: 1,
    active_status: true,
  },
  {
    id: "05756f76-e557-4ddd-b28e-e8376d0e3d5d",
    name: "V. Vinoyan",
    subject: "Physics",
    qualifications: "BSC (HONS) ENGINEERING, UNIVERSITY OF MORATUWA",
    short_bio:
      "A teacher who helps students understand theory and solve problems quickly during exams.",
    image_url:
      "/ruby-teacher-physics.jpeg",
    display_order: 2,
    active_status: true,
  },
  {
    id: "f2e28171-38f3-4c83-aaaf-4b94b313f208",
    name: "R. Ramprasath",
    subject: "Maths",
    qualifications: "BSC (HONS) ENGINEERING, UNIVERSITY OF MORATUWA",
    short_bio:
      "Helps students understand Maths clearly and solve more problems with confidence.",
    image_url:
      "/ruby-teacher-maths.jpeg",
    display_order: 3,
    active_status: true,
  },
];

export const demoSchedules: ScheduleItem[] = [
  {
    id: "b4907b11-2753-43aa-ac4c-fad34e58c572",
    subject: "Chemistry",
    batch_type: "Normal",
    year: 2028,
    day: "Saturday",
    start_time: "08:00:00",
    end_time: "10:30:00",
    batch_details: "Theory Batch A",
    venue: "Main Hall",
    teacher_id: demoTeachers[0].id,
    teacher: {
      id: demoTeachers[0].id,
      name: demoTeachers[0].name,
      subject: demoTeachers[0].subject,
    },
    active_status: true,
    display_order: 1,
  },
  {
    id: "55157e70-6ba0-4a00-b90b-4cc85db9cc5d",
    subject: "Physics",
    batch_type: "Normal",
    year: 2028,
    day: "Saturday",
    start_time: "10:45:00",
    end_time: "13:15:00",
    batch_details: "Concept + Paper Class",
    venue: "Physics Studio",
    teacher_id: demoTeachers[1].id,
    teacher: {
      id: demoTeachers[1].id,
      name: demoTeachers[1].name,
      subject: demoTeachers[1].subject,
    },
    active_status: true,
    display_order: 2,
  },
  {
    id: "e7124589-9f17-481f-9f12-f17f27a2431b",
    subject: "Maths",
    batch_type: "Normal",
    year: 2028,
    day: "Sunday",
    start_time: "08:30:00",
    end_time: "11:30:00",
    batch_details: "Problem Solving Intensive",
    venue: "Maths Lab",
    teacher_id: demoTeachers[2].id,
    teacher: {
      id: demoTeachers[2].id,
      name: demoTeachers[2].name,
      subject: demoTeachers[2].subject,
    },
    active_status: true,
    display_order: 3,
  },
  {
    id: "27c65d46-cf45-42df-af40-89d6e06df34e",
    subject: "Chemistry",
    batch_type: "Repeat",
    year: 2027,
    day: "Sunday",
    start_time: "13:00:00",
    end_time: "15:30:00",
    batch_details: "Repeat Revision Batch",
    venue: "Revision Hall",
    teacher_id: demoTeachers[0].id,
    teacher: {
      id: demoTeachers[0].id,
      name: demoTeachers[0].name,
      subject: demoTeachers[0].subject,
    },
    active_status: true,
    display_order: 4,
  },
];

export const demoResults: ResultAchievement[] = [
  {
    id: "daa4e478-1c49-4728-a7f8-91db6cd0741b",
    title: "2025 Chemistry High Achievers",
    caption: "Screenshot proof from the academy’s top-performing Chemistry batch.",
    image_url: "/demo/result-sheet-1.svg",
    year: 2025,
    subject: "Chemistry",
    type: "Results Sheet",
    featured: true,
    active_status: true,
  },
  {
    id: "a36cb6a7-cb7e-4621-a33d-ef3b84cde1db",
    title: "Island Rank Celebration",
    caption: "Recognition board for high district and island-level placements.",
    image_url: "/demo/result-sheet-2.svg",
    year: 2024,
    subject: "Physics",
    type: "Rank List",
    featured: true,
    active_status: true,
  },
  {
    id: "0a2da321-4c65-49eb-a8e5-3861d88cc8e5",
    title: "Maths Distinction Batch",
    caption: "A/B performance snapshot from recent Maths exam sittings.",
    image_url: "/demo/result-sheet-3.svg",
    year: 2025,
    subject: "Maths",
    type: "Achievement Board",
    featured: false,
    active_status: true,
  },
];

export const demoGalleryItems: GalleryItem[] = [
  {
    id: "bf7544e6-8f3e-4387-a0f3-c281808b369a",
    title: "Focused classroom session",
    image_url:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80",
    category: "Classroom",
    display_order: 1,
    active_status: true,
  },
  {
    id: "5d4a6c98-e552-4384-98a5-82af14c03e41",
    title: "Lecture in progress",
    image_url:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80",
    category: "Lecture",
    display_order: 2,
    active_status: true,
  },
  {
    id: "3c1ec20b-cba1-4bd0-a194-a4d7ee36f0a8",
    title: "Group study energy",
    image_url:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80",
    category: "Group Study",
    display_order: 3,
    active_status: true,
  },
  {
    id: "4dfd153f-99ef-4720-a733-65379f4630cf",
    title: "Revision workshop",
    image_url:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    category: "Revision",
    display_order: 4,
    active_status: true,
  },
  {
    id: "f19ad72b-53c8-4ec9-b18d-c26347a0df2b",
    title: "Student discussion corner",
    image_url:
      "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80",
    category: "Campus Life",
    display_order: 5,
    active_status: true,
  },
  {
    id: "5d9517b5-41ef-4b79-b76b-92ccb3fa4c43",
    title: "Exam strategy briefing",
    image_url:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80",
    category: "Workshop",
    display_order: 6,
    active_status: true,
  },
];

export const demoFeedbacks: FeedbackItem[] = [
  {
    id: "3ad06d99-5c6c-4299-8d9f-20bd4cff2d6f",
    name: "N. Harini",
    role_type: "student",
    selected_subjects: ["Chemistry", "Physics"],
    rating: 5,
    rating_text: getRatingLabel(5),
    description:
      "Weekly papers and personal attention helped me feel more confident before my exams.",
    approved: true,
    featured: true,
    created_at: "2026-03-02T10:00:00Z",
  },
  {
    id: "d11c4fb8-3a16-4bc4-83ae-0e621750883c",
    name: "R. Praveen",
    role_type: "student",
    selected_subjects: ["Maths"],
    rating: 5,
    rating_text: getRatingLabel(5),
    description:
      "Maths classes are easy to follow. Hard problems are explained simply until everyone understands.",
    approved: true,
    featured: true,
    created_at: "2026-02-22T08:30:00Z",
  },
  {
    id: "17be5da0-5d87-42b1-ad9c-5e72118f01f5",
    name: "Parent of K. Vishal",
    role_type: "parent",
    selected_subjects: ["All"],
    rating: 4,
    rating_text: getRatingLabel(4),
    description:
      "We liked the quick updates and the good study environment. Our son is now much more organized and focused.",
    approved: true,
    featured: true,
    created_at: "2026-01-12T12:00:00Z",
  },
  {
    id: "829e45f6-99f2-456e-b784-c91cf98726eb",
    name: "A. Yathurshan",
    role_type: "student",
    selected_subjects: ["Physics"],
    rating: 5,
    rating_text: getRatingLabel(5),
    description:
      "Physics lessons are simple and clear. The past paper discussions before tests were very helpful.",
    approved: true,
    featured: false,
    created_at: "2026-03-14T09:45:00Z",
  },
  {
    id: "9a1f1ed1-83f0-49f8-a0d9-349f9b8e847a",
    name: "Parent of T. Nivetha",
    role_type: "parent",
    selected_subjects: ["Chemistry"],
    rating: 4,
    rating_text: getRatingLabel(4),
    description:
      "The academy gives good guidance and my daughter has improved a lot in her exam writing.",
    approved: true,
    featured: false,
    created_at: "2026-03-28T11:00:00Z",
  },
  {
    id: "de19daa6-597d-4992-a040-caab0bffb209",
    name: "S. Rajesh",
    role_type: "student",
    selected_subjects: ["Maths", "Physics"],
    rating: 5,
    rating_text: getRatingLabel(5),
    description:
      "I joined late, but the teachers helped me catch up with extra help and practice papers.",
    approved: true,
    featured: false,
    created_at: "2026-04-01T07:15:00Z",
  },
];

export const demoRegistrations: RegistrationItem[] = [
  {
    id: "dbde6732-7f70-4038-881a-e0d4aef3b441",
    full_name: "A. Dilshan",
    phone_number: "0771234567",
    batch_type: "Normal",
    year: 2028,
    selected_subjects: ["Chemistry", "Physics"],
    status: "new",
    notes: "Interested in weekend batch only.",
    created_at: "2026-04-04T09:00:00Z",
  },
  {
    id: "9285ff8f-9dc6-46f1-9803-8fe75875f765",
    full_name: "J. Keshani",
    phone_number: "0719876543",
    batch_type: "Repeat",
    year: 2027,
    selected_subjects: ["All"],
    status: "reviewed",
    notes: "Requested call after school hours.",
    created_at: "2026-04-03T12:45:00Z",
  },
  {
    id: "ed043042-78e4-4b73-88af-098ab181bc29",
    full_name: "M. Tharshan",
    phone_number: "0762345678",
    batch_type: "Normal",
    year: 2028,
    selected_subjects: ["Maths"],
    status: "contacted",
    notes: null,
    created_at: "2026-04-01T14:20:00Z",
  },
];

export const demoPosts: Post[] = [
  {
    id: "eb76a211-1a3b-4c22-b5f3-c281808b369b",
    image_url: "https://plus.unsplash.com/premium_photo-1661601002347-154dfc4a034f?auto=format&fit=crop&w=1200&q=80",
    media_path: null,
    description: "Welcome back students! The 2028 Physics Theory Batch enrollment is now open. Join us this Saturday.",
    active_status: true,
    created_at: "2026-04-06T10:00:00Z",
  },
  {
    id: "f8273b44-9f12-4d11-ad9c-c91cf98726ec",
    image_url: "https://images.unsplash.com/photo-1576091160550-217359f42f8c?auto=format&fit=crop&w=1200&q=80",
    media_path: null,
    description: "Congratulations to our students who achieved A & B results in the recent trial exams!",
    active_status: true,
    created_at: "2026-04-01T08:30:00Z",
  },
];

export const defaultOverview: DashboardOverview = {
  totalRegistrations: demoRegistrations.length,
  newRegistrations: demoRegistrations.filter((item) => item.status === "new").length,
  totalFeedbacks: demoFeedbacks.length,
  totalGalleryItems: demoGalleryItems.length,
  totalResultsItems: demoResults.length,
  totalPosts: demoPosts.length,
};
