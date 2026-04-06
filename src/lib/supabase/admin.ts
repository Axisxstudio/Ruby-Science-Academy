import { createClient } from "@supabase/supabase-js";
import { isSupabaseAdminConfigured, publicEnv, serverEnv } from "@/lib/env";

export function createAdminSupabaseClient() {
  if (!isSupabaseAdminConfigured()) {
    return null;
  }

  return createClient(publicEnv.supabaseUrl, serverEnv.serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
