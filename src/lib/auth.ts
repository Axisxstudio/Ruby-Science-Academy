import type { User } from "@supabase/supabase-js";
import { redirect } from "next/navigation";
import { serverEnv } from "@/lib/env";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export function isAdminUser(user: User | null) {
  if (!user) {
    return false;
  }

  const role =
    typeof user.app_metadata?.role === "string"
      ? user.app_metadata.role
      : typeof user.user_metadata?.role === "string"
        ? user.user_metadata.role
        : "";

  return role === "admin" || user.email === serverEnv.defaultAdminEmail;
}

export async function requireAdminUser() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    redirect("/admin/login");
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!isAdminUser(user)) {
    redirect("/admin/login");
  }

  return { supabase, user: user! };
}

export async function getCurrentUser() {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return null;
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
}
