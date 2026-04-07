"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Edit2, Plus, Search, Trash2 } from "lucide-react";
import { LiveDataNotice } from "@/components/admin/live-data-notice";
import { StatusPill } from "@/components/admin/status-pill";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { removeMediaFile, uploadMediaFile } from "@/lib/media";
import type { Post } from "@/lib/types";

interface ManagePostsProps {
  initialItems: Post[];
  live: boolean;
}

type PostFormState = {
  image_url: string;
  media_path: string | null;
  description: string;
  active_status: boolean;
};

const blankPost: PostFormState = {
  image_url: "",
  media_path: null,
  description: "",
  active_status: true,
};

export function ManagePosts({ initialItems, live }: ManagePostsProps) {
  const [items, setItems] = useState(initialItems);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState(blankPost);
  const [upload, setUpload] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const filtered = items.filter((item) => {
    const searchValue = search.trim().toLowerCase();
    return (
      !searchValue ||
      item.description.toLowerCase().includes(searchValue) ||
      item.id.toLowerCase().includes(searchValue)
    );
  });

  const openCreate = () => {
    setEditing(null);
    setForm(blankPost);
    setUpload(null);
    setOpen(true);
  };

  const openEdit = (item: Post) => {
    setEditing(item);
    setForm({
      image_url: item.image_url,
      media_path: item.media_path ?? null,
      description: item.description,
      active_status: item.active_status,
    });
    setUpload(null);
    setOpen(true);
  };

  const saveItem = async () => {
    if (!upload && !form.image_url) {
      toast.error("Please upload an image for the post");
      return;
    }

    setIsSaving(true);
    const supabase = createBrowserSupabaseClient();
    let imageUrl = form.image_url;
    let mediaPath = form.media_path;

    try {
      if (upload) {
        const uploaded = await uploadMediaFile(upload, "posts");
        imageUrl = uploaded.publicUrl;
        mediaPath = uploaded.path;
      }

      const payload = {
        image_url: imageUrl,
        media_path: mediaPath,
        description: form.description,
        active_status: form.active_status,
      };

      if (editing) {
        const { error } = await supabase.from("posts").update(payload).eq("id", editing.id);
        if (error) throw error;

        setItems((current) =>
          current.map((item) => (item.id === editing.id ? { ...item, ...payload } : item)),
        );
      } else {
        const { data, error } = await supabase
          .from("posts")
          .insert(payload)
          .select("*")
          .single();
        if (error) throw error;

        setItems((current) => [data as Post, ...current]);
      }

      toast.success(`Post ${editing ? "updated" : "created"}`);
      setOpen(false);
    } catch (error: any) {
      console.error(error);
      toast.error("Unable to save post", {
        description: error?.message || "Unknown error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const deleteItem = async (item: Post) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.from("posts").delete().eq("id", item.id);

    if (error) {
      toast.error("Unable to delete post", {
        description: error.message,
      });
      return;
    }

    if (item.media_path) {
      await removeMediaFile(item.media_path);
    }
    setItems((current) => current.filter((entry) => entry.id !== item.id));
    toast.success("Post deleted");
  };

  return (
    <>
      <LiveDataNotice live={live} />

      <Card>
        <CardContent className="p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative max-w-md flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search posts"
                className="pl-11"
              />
            </div>
            <Button variant="accent" onClick={openCreate}>
              <Plus className="size-4" />
              Add New Post
            </Button>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title="No posts found"
              description="Create your first social announcement or update."
            />
          ) : (
            <div className="grid gap-4 min-[480px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filtered.map((item) => (
                <div 
                  key={item.id}
                  className="group flex flex-col rounded-2xl border border-border-soft bg-white/50 hover:shadow-lg-pro transition-all-smooth overflow-hidden"
                >
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src={item.image_url}
                      alt="Post image"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                    />
                    <div className="absolute top-3 right-3">
                      <StatusPill
                        label={item.active_status ? "Active" : "Draft"}
                        tone={item.active_status ? "success" : "warning"}
                      />
                    </div>
                  </div>
                  <CardContent className="p-4 flex flex-col flex-1">
                    <p className="text-xs leading-relaxed text-muted/80 line-clamp-3 mb-4 flex-1 italic group-hover:text-primary transition-colors">
                      "{item.description}"
                    </p>
                    
                    <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
                      <div className="overflow-hidden">
                        <p className="text-[9px] font-black uppercase tracking-[0.15em] text-muted/40">Post ID</p>
                        <p className="text-[10px] font-mono text-muted/60 truncate max-w-[80px]">{item.id}</p>
                      </div>
                      <div className="flex gap-1.5">
                        <Button variant="ghost" size="icon" className="size-8 rounded-lg text-muted hover:bg-surface-soft hover:text-primary transition-all-smooth" onClick={() => openEdit(item)}>
                          <Edit2 className="size-3.5" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 rounded-lg text-muted hover:bg-chemistry/10 hover:text-chemistry transition-all-smooth"
                          onClick={() => deleteItem(item)}
                        >
                          <Trash2 className="size-3.5" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl flex flex-col max-h-[90vh] p-0 overflow-hidden rounded-3xl-pro">
          <div className="px-8 pt-8 pb-4 border-b border-slate-50 shadow-sm z-20 bg-white">
            <DialogHeader>
              <DialogTitle className="text-2xl font-black text-primary">
                {editing ? "Update Post" : "Create New Announcement"}
              </DialogTitle>
              <DialogDescription className="text-muted/70 pt-1">
                Share news, updates, or announcements with your students.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto px-8 py-6 bg-slate-50/20">
            <div className="space-y-6">
              <div className="space-y-3">
                <Label className="text-xs font-black uppercase tracking-widest text-primary/50">Upload Post Image</Label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-slate-200 border-dashed rounded-3xl cursor-pointer bg-white hover:bg-slate-50 hover:border-cyan/40 transition-all-smooth relative overflow-hidden group shadow-sm">
                    {upload || form.image_url ? (
                      <div className="relative w-full h-full">
                        <Image 
                          src={upload ? URL.createObjectURL(upload) : form.image_url} 
                          alt="Preview" 
                          fill 
                          className="object-cover opacity-60 group-hover:opacity-40 transition-opacity" 
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center">
                           <p className="text-xs font-bold text-primary bg-white/90 px-3 py-1 rounded-full shadow-sm">Change Image</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <div className="mb-4 rounded-2xl bg-cyan/10 p-4 text-cyan group-hover:scale-110 transition-all duration-300 shadow-sm">
                          <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <p className="mb-2 text-sm font-bold text-primary">Click to select an image</p>
                        <p className="text-xs text-muted/60">High resolution square recommended</p>
                      </div>
                    )}
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(event) => setUpload(event.target.files?.[0] ?? null)}
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-xs font-black uppercase tracking-widest text-primary/50">Post Description</Label>
                <Textarea
                  placeholder="Write your announcement here..."
                  className="min-h-[140px] rounded-2xl bg-white border-slate-200 focus:ring-cyan text-base leading-relaxed"
                  value={form.description}
                  onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                />
              </div>

              <div className="flex items-center justify-between rounded-3xl bg-primary/5 px-6 py-4 border border-primary/10">
                <div>
                  <p className="font-bold text-primary">Pin to Website</p>
                  <p className="text-xs text-muted/70">Only active posts are visible to students</p>
                </div>
                <Switch
                  checked={form.active_status}
                  onCheckedChange={(checked) =>
                    setForm((current) => ({ ...current, active_status: checked }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="px-8 py-6 bg-white border-t border-slate-100 flex items-center justify-between">
            <Button variant="ghost" onClick={() => setOpen(false)} className="rounded-xl px-6">Cancel</Button>
            <Button variant="accent" onClick={saveItem} disabled={isSaving} className="rounded-xl px-8 min-w-[140px]">
              {isSaving ? "Publishing..." : editing ? "Update Post" : "Publish Post"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
