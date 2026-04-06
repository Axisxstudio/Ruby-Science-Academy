"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Edit2, Plus, Search, Trash2, Video } from "lucide-react";
import { LiveDataNotice } from "@/components/admin/live-data-notice";
import { StatusPill } from "@/components/admin/status-pill";
import { SubjectChip } from "@/components/site/subject-chip";
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
import { Select } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { removeMediaFile, uploadMediaFile } from "@/lib/media";
import type { ResultAchievement } from "@/lib/types";

interface ManageResultsProps {
  initialResults: ResultAchievement[];
  live: boolean;
}

type ResultFormState = {
  title: string;
  caption: string;
  image_url: string;
  media_type: "image" | "video";
  media_path: string | null;
  subject: ResultAchievement["subject"];
  year: number;
  type: string;
  featured: boolean;
  active_status: boolean;
};

const blankResult: ResultFormState = {
  title: "",
  caption: "",
  image_url: "",
  media_type: "image",
  media_path: null,
  subject: "Chemistry",
  year: 2025,
  type: "Results Sheet",
  featured: false,
  active_status: true,
};

export function ManageResults({ initialResults, live }: ManageResultsProps) {
  const [results, setResults] = useState(initialResults);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ResultAchievement | null>(null);
  const [form, setForm] = useState(blankResult);
  const [upload, setUpload] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const filtered = results.filter((result) => {
    const searchValue = search.trim().toLowerCase();
    return (
      !searchValue ||
      result.title.toLowerCase().includes(searchValue) ||
      result.caption.toLowerCase().includes(searchValue) ||
      result.type.toLowerCase().includes(searchValue)
    );
  });

  const openCreate = () => {
    setEditing(null);
    setForm(blankResult);
    setUpload(null);
    setOpen(true);
  };

  const openEdit = (result: ResultAchievement) => {
    setEditing(result);
    setForm({
      title: result.title,
      caption: result.caption,
      image_url: result.image_url,
      media_type: result.media_type ?? "image",
      media_path: result.media_path ?? null,
      subject: result.subject ?? "Chemistry",
      year: result.year,
      type: result.type,
      featured: result.featured,
      active_status: result.active_status ?? true,
    });
    setUpload(null);
    setOpen(true);
  };

  const saveResult = async () => {
    setIsSaving(true);
    const supabase = createBrowserSupabaseClient();
    let imageUrl = form.image_url;
    let mediaPath = form.media_path;
    let mediaType = form.media_type;

    try {
      if (upload) {
        const uploaded = await uploadMediaFile(upload, "results");
        imageUrl = uploaded.publicUrl;
        mediaPath = uploaded.path;
        mediaType = uploaded.mediaType;
      }

      const payload = {
        title: form.title,
        caption: form.caption,
        image_url: imageUrl,
        media_path: mediaPath,
        media_type: mediaType,
        subject: form.subject,
        year: form.year,
        type: form.type,
        featured: form.featured,
        active_status: form.active_status,
      };

      if (editing) {
        const { error } = await supabase
          .from("results_achievements")
          .update(payload)
          .eq("id", editing.id);
        if (error) throw error;

        setResults((current) =>
          current.map((item) => (item.id === editing.id ? { ...item, ...payload } : item)),
        );
      } else {
        const { data, error } = await supabase
          .from("results_achievements")
          .insert(payload)
          .select("*")
          .single();
        if (error) throw error;

        setResults((current) => [data as ResultAchievement, ...current]);
      }

      toast.success(`Result item ${editing ? "updated" : "created"}`);
      setOpen(false);
    } catch (error: any) {
      console.error(error);
      toast.error("Unable to save result item", {
        description: error?.message || "Unknown error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const deleteResult = async (result: ResultAchievement) => {
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase
      .from("results_achievements")
      .delete()
      .eq("id", result.id);

    if (error) {
      toast.error("Unable to delete result item", {
        description: error.message,
      });
      return;
    }

    await removeMediaFile(result.media_path);
    setResults((current) => current.filter((item) => item.id !== result.id));
    toast.success("Result item deleted");
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
                placeholder="Search result proof"
                className="pl-11"
              />
            </div>
            <Button variant="accent" onClick={openCreate}>
              <Plus className="size-4" />
              Add Result Item
            </Button>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title="No result items found"
              description="Add a result screenshot or achievement card to get started."
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {filtered.map((result) => (
                <div 
                   key={result.id}
                   className="group rounded-3xl border border-border-soft bg-white/50 hover:shadow-lg-pro transition-all-smooth overflow-hidden"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-t-[var(--radius-card)]">
                    {result.media_type === "video" ? (
                      <div className="flex h-full items-center justify-center bg-primary/10 text-primary">
                        <Video className="size-10" />
                      </div>
                    ) : (
                      <Image
                        src={result.image_url}
                        alt={result.title}
                        fill
                        className="object-cover"
                        sizes="33vw"
                      />
                    )}
                  </div>
                  <CardContent className="p-5">
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-2">
                          {result.subject ? <SubjectChip subject={result.subject} /> : null}
                          <StatusPill label={`${result.year}`} tone="accent" />
                        </div>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="size-9 rounded-full text-muted hover:bg-surface-soft hover:text-primary transition-all-smooth" onClick={() => openEdit(result)}>
                            <Edit2 className="size-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="size-9 rounded-full text-muted hover:bg-chemistry/10 hover:text-chemistry transition-all-smooth"
                            onClick={() => deleteResult(result)}
                          >
                            <Trash2 className="size-4" />
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
        <DialogContent className="max-w-3xl flex flex-col max-h-[90vh] p-0 overflow-hidden">
          <div className="px-6 pt-6 pb-2 border-b border-transparent shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] z-20 bg-white">
            <DialogHeader>
              <DialogTitle>{editing ? "Edit Result Item" : "Add Result Item"}</DialogTitle>
              <DialogDescription>
                Upload screenshots, certificates, or proof visuals for the results section.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 relative bg-slate-50/30 mb-2">
            <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(event) => setForm((current) => ({ ...current, title: event.target.value }))}
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Caption</Label>
              <Textarea
                value={form.caption}
                onChange={(event) =>
                  setForm((current) => ({ ...current, caption: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Subject</Label>
              <Select
                value={form.subject ?? "Chemistry"}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    subject: event.target.value as ResultAchievement["subject"],
                  }))
                }
              >
                <option value="Chemistry">Chemistry</option>
                <option value="Physics">Physics</option>
                <option value="Maths">Maths</option>
                <option value="All">All</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Year</Label>
              <Input
                type="number"
                value={form.year}
                onChange={(event) =>
                  setForm((current) => ({ ...current, year: Number(event.target.value) }))
                }
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Type</Label>
              <Input
                value={form.type}
                onChange={(event) => setForm((current) => ({ ...current, type: event.target.value }))}
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label>Upload Screenshot/Proof</Label>
              <div className="flex items-center justify-center w-full">
                <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-slate-200 border-dashed rounded-[1.5rem] cursor-pointer bg-slate-50/50 hover:bg-slate-50 hover:border-cyan/40 transition-all-smooth relative overflow-hidden group">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <div className="mb-3 rounded-full bg-cyan/10 p-3 text-cyan group-hover:scale-110 transition-transform duration-300">
                      <svg className="size-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                    </div>
                    <p className="mb-2 text-sm font-semibold text-primary"><span className="text-cyan">Click to upload</span> or drag and drop</p>
                    <p className="text-xs text-muted/70 line-clamp-1 px-4 text-center">
                      {upload ? (
                        <span className="text-cyan font-semibold">{upload.name}</span>
                      ) : (
                        "PNG, JPG, MP4 or WEBM (Max. 50MB)"
                      )}
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,video/*"
                    onChange={(event) => setUpload(event.target.files?.[0] ?? null)}
                  />
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between rounded-[1.5rem] bg-surface-soft px-4 py-3">
              <div>
                <p className="font-semibold text-primary">Featured</p>
                <p className="text-sm text-muted">Highlight on the homepage first</p>
              </div>
              <Switch
                checked={form.featured}
                onCheckedChange={(checked) =>
                  setForm((current) => ({ ...current, featured: checked }))
                }
              />
            </div>
            <div className="flex items-center justify-between rounded-[1.5rem] bg-surface-soft px-4 py-3">
              <div>
                <p className="font-semibold text-primary">Active</p>
                <p className="text-sm text-muted">Show on the public results section</p>
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

          <div className="mt-auto px-6 py-4 border-t border-slate-100 bg-slate-50/90 backdrop-blur-md rounded-b-[2rem] flex-shrink-0 z-10 w-full shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
            <div className="flex justify-end">
              <Button variant="accent" onClick={saveResult} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save result"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
