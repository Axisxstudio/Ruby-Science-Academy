"use client";

import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { slugify } from "@/lib/utils";

export async function uploadMediaFile(file: File, folder: string) {
  const supabase = createBrowserSupabaseClient();
  const extension = file.name.split(".").pop() ?? "file";
  const baseName = file.name.replace(/\.[^/.]+$/, "");
  const path = `${folder}/${Date.now()}-${slugify(baseName)}.${extension}`;

  const { error } = await supabase.storage
    .from("academy-media")
    .upload(path, file, {
      upsert: true,
      contentType: file.type,
    });

  if (error) {
    throw error;
  }

  const { data } = supabase.storage.from("academy-media").getPublicUrl(path);

  return {
    path,
    publicUrl: data.publicUrl,
    mediaType: (file.type.startsWith("video/") ? "video" : "image") as
      | "image"
      | "video",
  };
}

export async function removeMediaFile(path?: string | null) {
  if (!path) {
    return;
  }

  const supabase = createBrowserSupabaseClient();
  await supabase.storage.from("academy-media").remove([path]);
}
