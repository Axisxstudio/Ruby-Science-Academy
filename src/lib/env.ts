export const publicEnv = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const serverEnv = {
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  defaultAdminEmail: process.env.DEFAULT_ADMIN_EMAIL ?? "",
  defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD ?? "",
};

export function isSupabaseConfigured() {
  return Boolean(publicEnv.supabaseUrl && publicEnv.supabaseAnonKey);
}

export function isSupabaseAdminConfigured() {
  return Boolean(
    publicEnv.supabaseUrl &&
      publicEnv.supabaseAnonKey &&
      serverEnv.serviceRoleKey,
  );
}
