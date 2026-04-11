create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select coalesce(auth.jwt() -> 'app_metadata' ->> 'role' = 'admin', false);
$$;

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  website_paused boolean not null default false,
  pause_reason text,
  whatsapp_number text not null default '+94771234567',
  facebook_url text not null default 'https://facebook.com/rubyscienceacademy',
  contact_phone text not null default '+94 77 123 4567',
  contact_email text not null default 'rubyscienceacademy@gmail.com',
  contact_address text not null default 'No. 84, Kotahena Street, Colombo 13, Sri Lanka',
  hero_title text not null default '2028 A/L Science Stream',
  hero_subtitle text not null default 'Tamil Medium Classes | Colombo Kotahena',
  hero_description text not null default 'Focused science tuition built for A/L students who need clarity, structure, and consistent results in Maths, Physics, and Chemistry.',
  footer_credit text not null default 'Developed by AxisX Studio',
  pass_rate_label text not null default '95% Pass Rate',
  ab_rate_label text not null default '80% A/B Results',
  district_rankings_label text not null default 'Top District Rankings',
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.teachers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  subject text not null check (subject in ('Maths', 'Physics', 'Chemistry')),
  qualifications text not null,
  short_bio text not null,
  image_url text not null,
  media_path text,
  display_order integer not null default 0,
  active_status boolean not null default true,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.schedules (
  id uuid primary key default gen_random_uuid(),
  subject text not null check (subject in ('Maths', 'Physics', 'Chemistry')),
  batch_type text not null check (batch_type in ('Normal', 'Repeat')),
  year integer not null,
  day text not null check (day in ('Saturday', 'Sunday')),
  start_time time not null,
  end_time time not null,
  teacher_id uuid references public.teachers(id) on delete set null,
  batch_details text not null,
  venue text,
  active_status boolean not null default true,
  display_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.registrations (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone_number text not null,
  batch_type text not null check (batch_type in ('Normal', 'Repeat')),
  year integer not null,
  selected_subjects text[] not null default '{}',
  created_at timestamptz not null default timezone('utc', now()),
  status text not null default 'new' check (status in ('new', 'reviewed', 'contacted', 'enrolled')),
  notes text
);

create table if not exists public.feedbacks (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role_type text not null check (role_type in ('student', 'parent')),
  selected_subjects text[] not null default '{}',
  rating integer not null check (rating between 1 and 5),
  rating_text text generated always as (
    case
      when rating = 1 then 'Very Poor'
      when rating = 2 then 'Poor'
      when rating = 3 then 'Average'
      when rating = 4 then 'Good'
      else 'Excellent'
    end
  ) stored,
  description text not null,
  approved boolean not null default false,
  featured boolean not null default false,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  image_url text not null,
  media_type text not null default 'image' check (media_type in ('image', 'video')),
  media_path text,
  category text not null default 'Gallery',
  display_order integer not null default 0,
  active_status boolean not null default true,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.results_achievements (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  caption text not null,
  image_url text not null,
  media_type text not null default 'image' check (media_type in ('image', 'video')),
  media_path text,
  subject text check (subject in ('Maths', 'Physics', 'Chemistry', 'All')),
  year integer not null,
  type text not null,
  featured boolean not null default false,
  active_status boolean not null default true,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  message text not null,
  status text not null default 'new' check (status in ('new', 'reviewed', 'contacted')),
  created_at timestamptz not null default timezone('utc', now())
);

drop trigger if exists site_settings_set_updated_at on public.site_settings;
create trigger site_settings_set_updated_at
before update on public.site_settings
for each row
execute function public.set_updated_at();

alter table public.site_settings enable row level security;
alter table public.teachers enable row level security;
alter table public.schedules enable row level security;
alter table public.registrations enable row level security;
alter table public.feedbacks enable row level security;
alter table public.gallery_items enable row level security;
alter table public.results_achievements enable row level security;
alter table public.contact_messages enable row level security;
alter table public.posts enable row level security;

-- Posts table definition
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  media_path text,
  description text not null,
  active_status boolean not null default true,
  created_at timestamptz not null default timezone('utc', now())
);

-- Posts RLS Policies
drop policy if exists "posts public read" on public.posts;
create policy "posts public read"
on public.posts
for select
using (active_status = true);

drop policy if exists "posts admin manage" on public.posts;
create policy "posts admin manage"
on public.posts
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "site_settings public read" on public.site_settings;
create policy "site_settings public read"
on public.site_settings
for select
using (true);

drop policy if exists "site_settings admin manage" on public.site_settings;
create policy "site_settings admin manage"
on public.site_settings
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "teachers public read" on public.teachers;
create policy "teachers public read"
on public.teachers
for select
using (active_status = true);

drop policy if exists "teachers admin manage" on public.teachers;
create policy "teachers admin manage"
on public.teachers
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "schedules public read" on public.schedules;
create policy "schedules public read"
on public.schedules
for select
using (active_status = true);

drop policy if exists "schedules admin manage" on public.schedules;
create policy "schedules admin manage"
on public.schedules
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "registrations public insert" on public.registrations;
create policy "registrations public insert"
on public.registrations
for insert
to anon, authenticated
with check (true);

drop policy if exists "registrations admin manage" on public.registrations;
create policy "registrations admin manage"
on public.registrations
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "feedbacks public read approved" on public.feedbacks;
create policy "feedbacks public read approved"
on public.feedbacks
for select
using (approved = true);

drop policy if exists "feedbacks public insert" on public.feedbacks;
create policy "feedbacks public insert"
on public.feedbacks
for insert
to anon, authenticated
with check (true);

drop policy if exists "feedbacks admin manage" on public.feedbacks;
create policy "feedbacks admin manage"
on public.feedbacks
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "gallery public read" on public.gallery_items;
create policy "gallery public read"
on public.gallery_items
for select
using (active_status = true);

drop policy if exists "gallery admin manage" on public.gallery_items;
create policy "gallery admin manage"
on public.gallery_items
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "results public read" on public.results_achievements;
create policy "results public read"
on public.results_achievements
for select
using (active_status = true);

drop policy if exists "results admin manage" on public.results_achievements;
create policy "results admin manage"
on public.results_achievements
for all
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "contact public insert" on public.contact_messages;
create policy "contact public insert"
on public.contact_messages
for insert
to anon, authenticated
with check (true);

drop policy if exists "contact admin manage" on public.contact_messages;
create policy "contact admin manage"
on public.contact_messages
for all
using (public.is_admin())
with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('academy-media', 'academy-media', true)
on conflict (id) do nothing;

drop policy if exists "academy-media public read" on storage.objects;
create policy "academy-media public read"
on storage.objects
for select
using (bucket_id = 'academy-media');

drop policy if exists "academy-media admin insert" on storage.objects;
create policy "academy-media admin insert"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'academy-media' and public.is_admin());

drop policy if exists "academy-media admin update" on storage.objects;
create policy "academy-media admin update"
on storage.objects
for update
to authenticated
using (bucket_id = 'academy-media' and public.is_admin())
with check (bucket_id = 'academy-media' and public.is_admin());

drop policy if exists "academy-media admin delete" on storage.objects;
create policy "academy-media admin delete"
on storage.objects
for delete
to authenticated
using (bucket_id = 'academy-media' and public.is_admin());

insert into public.site_settings (
  id,
  website_paused,
  whatsapp_number,
  facebook_url,
  contact_phone,
  contact_email,
  contact_address,
  hero_title,
  hero_subtitle,
  hero_description,
  footer_credit,
  pass_rate_label,
  ab_rate_label,
  district_rankings_label
)
values (
  '00000000-0000-0000-0000-000000000001',
  false,
  '+94771234567',
  'https://facebook.com/rubyscienceacademy',
  '+94 77 123 4567',
  'rubyscienceacademy@gmail.com',
  'No. 84, Kotahena Street, Colombo 13, Sri Lanka',
  '2028 A/L Science Stream',
  'Tamil Medium Classes | Colombo Kotahena',
  'Focused science tuition built for A/L students who need clarity, structure, and consistent results in Maths, Physics, and Chemistry.',
  'Developed by AxisX Studio',
  '95% Pass Rate',
  '80% A/B Results',
  'Top District Rankings'
)
on conflict (id) do nothing;

insert into public.teachers (
  id,
  name,
  subject,
  qualifications,
  short_bio,
  image_url,
  display_order,
  active_status
)
values
  ('5f531f4d-5c8c-44bf-b4f2-6aa598b1e3d1', 'Dr. S. Kuganathan', 'Chemistry', 'Ph.D. Organic Chemistry | 15+ Years Teaching', 'Known for simplifying reaction mechanisms, structured revision, and exam-smart answer writing for Tamil medium students.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwM-t85FSQ037tzeC9wfTo7AUbrOgcoPLv_qLO0YHPLZiXXwq1wXO06QV80IoSDJ8uo8kixO6fqpqiEAkLXtPrHpuZAmAx7oA4eLdd-DyMkvhWgWk_Vf8JTywAgQ9PqW6j_mLQSFweHb5J8et-ddMcsdOMtrBSzpJfVkda8nS_2XE3qG3VmLTjVGJD9h2CfG13_4qkPJr5soyDRsNGlxHJCmPBYHO46KboUmS7qNK0ItRSzz2KcfEsmXkXOG72qesma7rnc-Ys6w1N', 1, true),
  ('05756f76-e557-4ddd-b28e-e8376d0e3d5d', 'Eng. R. Sivakumar', 'Physics', 'B.Sc. Eng. (Hons) | University of Moratuwa', 'A results-focused lecturer who helps students master theory, calculations, and time management through weekly drills.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuBfn31DvBBUFVx5yXjWsKY9kDPbwqzbrsKW89CuWkf_1Oq5WLfdbtuWLdI1DuwXr_EGYRGBbmuYF_zjAf6aTmOd7ty0FDZrUj7WxFfbYNeYzHYOGXjMaNZmFvrmJ5EozK1-b6sTPI2PbIEeDgMiphY_X-Z8dSEdjCCyxPLso_ip6Mc4MhOzwM3odVOJTs_qbaabNvQ3HjEPEOThbrBYOJvhuUTHv7QMguD7cfg8BOdM47VXc_c51O2QeMpboI-1niYQFDj5iavZQMc1', 2, true),
  ('f2e28171-38f3-4c83-aaaf-4b94b313f208', 'Mrs. V. Janani', 'Maths', 'M.Sc. Theoretical Mathematics', 'Blends conceptual teaching with high-volume practice for Pure Maths and Applied Maths, with strong parent communication.', 'https://lh3.googleusercontent.com/aida-public/AB6AXuAt5u_XuN2HJI21flT2kgl9QuQ9ofk5bZXOvoMzNXWJT4NV8481CD-EC-6vNrgAvV7s1ZzaMOCOmukzJlW0rvLEB12kCRohCIJqbN9e8mGVsenwcQqrX9ZuFDVRsPxdw2mAPwAiMNkP5An4EIHFv-ZHdCtd9YCf5EGiOwe9KZhRlP17HiMcc9BXdCZglOQwsSchaQQqfmwt9Hg-HA3w8PSk_jII3qHJt4ZwxdZPUnqRmuMRYnnuBaITjUC4-dCm_wNiN2untzsAvCLR', 3, true)
on conflict (id) do nothing;

insert into public.schedules (
  id,
  subject,
  batch_type,
  year,
  day,
  start_time,
  end_time,
  teacher_id,
  batch_details,
  venue,
  active_status,
  display_order
)
values
  ('b4907b11-2753-43aa-ac4c-fad34e58c572', 'Chemistry', 'Normal', 2028, 'Saturday', '08:00', '10:30', '5f531f4d-5c8c-44bf-b4f2-6aa598b1e3d1', 'Theory Batch A', 'Main Hall', true, 1),
  ('55157e70-6ba0-4a00-b90b-4cc85db9cc5d', 'Physics', 'Normal', 2028, 'Saturday', '10:45', '13:15', '05756f76-e557-4ddd-b28e-e8376d0e3d5d', 'Concept + Paper Class', 'Physics Studio', true, 2),
  ('e7124589-9f17-481f-9f12-f17f27a2431b', 'Maths', 'Normal', 2028, 'Sunday', '08:30', '11:30', 'f2e28171-38f3-4c83-aaaf-4b94b313f208', 'Problem Solving Intensive', 'Maths Lab', true, 3),
  ('27c65d46-cf45-42df-af40-89d6e06df34e', 'Chemistry', 'Repeat', 2027, 'Sunday', '13:00', '15:30', '5f531f4d-5c8c-44bf-b4f2-6aa598b1e3d1', 'Repeat Revision Batch', 'Revision Hall', true, 4)
on conflict (id) do nothing;

insert into public.results_achievements (
  id,
  title,
  caption,
  image_url,
  subject,
  year,
  type,
  featured,
  active_status
)
values
  ('daa4e478-1c49-4728-a7f8-91db6cd0741b', '2025 Chemistry High Achievers', 'Screenshot proof from the academy''s top-performing Chemistry batch.', '/demo/result-sheet-1.svg', 'Chemistry', 2025, 'Results Sheet', true, true),
  ('a36cb6a7-cb7e-4621-a33d-ef3b84cde1db', 'Island Rank Celebration', 'Recognition board for high district and island-level placements.', '/demo/result-sheet-2.svg', 'Physics', 2024, 'Rank List', true, true),
  ('0a2da321-4c65-49eb-a8e5-3861d88cc8e5', 'Maths Distinction Batch', 'A/B performance snapshot from recent Maths exam sittings.', '/demo/result-sheet-3.svg', 'Maths', 2025, 'Achievement Board', false, true)
on conflict (id) do nothing;

insert into public.gallery_items (
  id,
  title,
  image_url,
  category,
  display_order,
  active_status
)
values
  ('bf7544e6-8f3e-4387-a0f3-c281808b369a', 'Focused classroom session', 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80', 'Classroom', 1, true),
  ('5d4a6c98-e552-4384-98a5-82af14c03e41', 'Lecture in progress', 'https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1200&q=80', 'Lecture', 2, true),
  ('3c1ec20b-cba1-4bd0-a194-a4d7ee36f0a8', 'Group study energy', 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80', 'Group Study', 3, true),
  ('4dfd153f-99ef-4720-a733-65379f4630cf', 'Revision workshop', 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80', 'Revision', 4, true),
  ('f19ad72b-53c8-4ec9-b18d-c26347a0df2b', 'Student discussion corner', 'https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=1200&q=80', 'Campus Life', 5, true),
  ('5d9517b5-41ef-4b79-b76b-92ccb3fa4c43', 'Exam strategy briefing', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80', 'Workshop', 6, true)
on conflict (id) do nothing;

insert into public.feedbacks (
  id,
  name,
  role_type,
  selected_subjects,
  rating,
  description,
  approved,
  featured,
  created_at
)
values
  ('3ad06d99-5c6c-4299-8d9f-20bd4cff2d6f', 'N. Harini', 'student', '{"Chemistry","Physics"}', 5, 'The weekly papers and close attention helped me stay disciplined and improve my confidence before exams.', true, true, '2026-03-02T10:00:00Z'),
  ('d11c4fb8-3a16-4bc4-83ae-0e621750883c', 'R. Praveen', 'student', '{"Maths"}', 5, 'Maths classes are very structured. Difficult sums are broken down until everyone understands the method clearly.', true, true, '2026-02-22T08:30:00Z'),
  ('17be5da0-5d87-42b1-ad9c-5e72118f01f5', 'Parent of K. Vishal', 'parent', '{"All"}', 4, 'We appreciated the communication and the seriousness of the class environment. My son became much more organized.', true, true, '2026-01-12T12:00:00Z'),
  ('829e45f6-99f2-456e-b784-c91cf98726eb', 'A. Yathurshan', 'student', '{"Physics"}', 5, 'Physics explanations are simple and fast. I especially liked the paper discussion sessions before term tests.', true, false, '2026-03-14T09:45:00Z')
on conflict (id) do nothing;
