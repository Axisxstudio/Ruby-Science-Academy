"use client";

import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { Edit2, Plus, Search, Trash2 } from "lucide-react";
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
import type { SubjectName, Teacher } from "@/lib/types";

interface ManageTeachersProps {
  initialTeachers: Teacher[];
  live: boolean;
}

const blankTeacher = {
  name: "",
  subject: "Chemistry" as SubjectName,
  qualifications: "",
  short_bio: "",
  image_url: "",
  media_path: null as string | null,
  display_order: 1,
  active_status: true,
};

export function ManageTeachers({ initialTeachers, live }: ManageTeachersProps) {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Teacher | null>(null);
  const [form, setForm] = useState(blankTeacher);
  const [upload, setUpload] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const filtered = teachers.filter((teacher) => {
    const searchValue = search.trim().toLowerCase();
    return (
      !searchValue ||
      teacher.name.toLowerCase().includes(searchValue) ||
      teacher.qualifications.toLowerCase().includes(searchValue) ||
      teacher.subject.toLowerCase().includes(searchValue)
    );
  });

  const openCreate = () => {
    setEditing(null);
    setForm(blankTeacher);
    setUpload(null);
    setOpen(true);
  };

  const openEdit = (teacher: Teacher) => {
    setEditing(teacher);
    setForm({
      name: teacher.name,
      subject: teacher.subject,
      qualifications: teacher.qualifications,
      short_bio: teacher.short_bio,
      image_url: teacher.image_url,
      media_path: teacher.media_path ?? null,
      display_order: teacher.display_order,
      active_status: teacher.active_status,
    });
    setUpload(null);
    setOpen(true);
  };

  const saveTeacher = async () => {
    setIsSaving(true);
    const supabase = createBrowserSupabaseClient();
    let imageUrl = form.image_url;
    let mediaPath = form.media_path;

    try {
      if (upload) {
        const uploaded = await uploadMediaFile(upload, "teachers");
        imageUrl = uploaded.publicUrl;
        mediaPath = uploaded.path;
      }

      const payload = {
        name: form.name,
        subject: form.subject,
        qualifications: form.qualifications,
        short_bio: form.short_bio,
        image_url: imageUrl,
        media_path: mediaPath,
        display_order: form.display_order,
        active_status: form.active_status,
      };

      if (editing) {
        const { error } = await supabase.from("teachers").update(payload).eq("id", editing.id);

        if (error) {
          throw error;
        }

        setTeachers((current) =>
          current.map((item) => (item.id === editing.id ? { ...item, ...payload } : item)),
        );
      } else {
        const { data, error } = await supabase
          .from("teachers")
          .insert(payload)
          .select("*")
          .single();

        if (error) {
          throw error;
        }

        setTeachers((current) =>
          [...current, data as Teacher].sort((a, b) => a.display_order - b.display_order),
        );
      }

      toast.success(`Teacher ${editing ? "updated" : "created"}`);
      setOpen(false);
    } catch (error: any) {
      console.error(error);
      toast.error("Unable to save teacher", {
        description: error?.message || "Unknown error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const deleteTeacher = async (teacher: Teacher) => {
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.from("teachers").delete().eq("id", teacher.id);

    if (error) {
      toast.error("Unable to delete teacher", {
        description: error.message,
      });
      return;
    }

    await removeMediaFile(teacher.media_path);
    setTeachers((current) => current.filter((item) => item.id !== teacher.id));
    toast.success("Teacher deleted");
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
                placeholder="Search teachers"
                className="pl-11"
              />
            </div>
            <Button variant="accent" onClick={openCreate}>
              <Plus className="size-4" />
              Add Teacher
            </Button>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title="No teachers found"
              description="Create a teacher profile or widen your search."
            />
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {filtered.map((teacher) => (
                <div 
                  key={teacher.id}
                  className="rounded-3xl border border-border-soft bg-white/50 hover:shadow-lg-pro transition-all-smooth overflow-hidden"
                >
                  <CardContent className="flex flex-col gap-5 p-5 sm:flex-row">
                    <div className="relative h-36 w-full overflow-hidden rounded-[1.5rem] sm:w-36">
                      <Image
                        src={teacher.image_url}
                        alt={teacher.name}
                        fill
                        className="object-cover"
                        sizes="144px"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <SubjectChip subject={teacher.subject} />
                        <StatusPill
                          label={teacher.active_status ? "Active" : "Inactive"}
                          tone={teacher.active_status ? "success" : "warning"}
                        />
                      </div>
                      <h3 className="mt-3 font-display text-2xl font-extrabold text-primary">
                        {teacher.name}
                      </h3>
                      <p className="mt-2 text-sm text-muted">{teacher.qualifications}</p>
                      <p className="mt-3 leading-7 text-muted">{teacher.short_bio}</p>
                      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                        <p className="text-xs font-bold text-muted/60 uppercase tracking-widest">Order: {teacher.display_order}</p>
                        <div className="flex gap-2">
                          <Button variant="ghost" size="icon" className="size-9 rounded-full text-muted hover:bg-surface-soft hover:text-primary" onClick={(e) => { e.stopPropagation(); openEdit(teacher); }}>
                            <Edit2 className="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="size-9 rounded-full text-muted hover:bg-chemistry/10 hover:text-chemistry" onClick={(e) => { e.stopPropagation(); deleteTeacher(teacher); }}>
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
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
              <DialogTitle>{editing ? "Edit Teacher" : "Add Teacher"}</DialogTitle>
              <DialogDescription>
                Upload a profile image from Supabase Storage or provide a direct URL.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 relative bg-slate-50/30">
            <div className="grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                />
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select
                  value={form.subject}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, subject: event.target.value as SubjectName }))
                  }
                >
                  <option value="Chemistry">Chemistry</option>
                  <option value="Physics">Physics</option>
                  <option value="Maths">Maths</option>
                </Select>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Qualifications</Label>
                <Input
                  value={form.qualifications}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, qualifications: event.target.value }))
                  }
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Short Bio</Label>
                <Textarea
                  value={form.short_bio}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, short_bio: event.target.value }))
                  }
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label>Profile Picture</Label>
                <div className="flex items-center justify-center w-full">
                  <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-slate-200 border-dashed rounded-[1.5rem] cursor-pointer bg-slate-50/50 hover:bg-slate-50 hover:border-cyan/40 transition-all-smooth relative overflow-hidden group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <div className="mb-3 rounded-full bg-cyan/10 p-3 text-cyan group-hover:scale-110 transition-transform duration-300">
                        <svg className="size-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                      </div>
                      <p className="mb-2 text-sm font-semibold text-primary"><span className="text-cyan">Click to upload</span> profile photo</p>
                      <p className="text-xs text-muted/70 line-clamp-1 px-4 text-center">
                        {upload ? (
                          <span className="text-cyan font-semibold">{upload.name}</span>
                        ) : (
                          "PNG or JPG, ideally 1:1 square ratio"
                        )}
                      </p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={(event) => setUpload(event.target.files?.[0] ?? null)}
                    />
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={form.display_order}
                  onChange={(event) =>
                    setForm((current) => ({ ...current, display_order: Number(event.target.value) }))
                  }
                />
              </div>
              <div className="flex items-center justify-between rounded-[1.5rem] bg-surface-soft px-4 py-3">
                <div>
                  <p className="font-semibold text-primary">Active status</p>
                  <p className="text-sm text-muted">Hide inactive teachers from the public site</p>
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
          </div>

          <div className="mt-auto px-6 py-4 border-t border-slate-100 bg-slate-50/90 backdrop-blur-md rounded-b-[2rem] flex-shrink-0 z-10 w-full shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
            <div className="flex justify-end">
              <Button variant="accent" onClick={saveTeacher} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save teacher"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
