"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

export function SignOutButton() {
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createBrowserSupabaseClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <Button
      type="button"
      variant="accent"
      className="w-full h-11 rounded-xl font-bold transition-all-smooth hover:brightness-105 active:scale-95 shadow-sm"
      onClick={handleSignOut}
    >
      <LogOut className="size-[14px] mr-2" />
      Sign out
    </Button>
  );
}
