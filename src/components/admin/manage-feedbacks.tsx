"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { CheckCircle, Edit2, Search, Star, Trash2 } from "lucide-react";
import { LiveDataNotice } from "@/components/admin/live-data-notice";
import { StatusPill } from "@/components/admin/status-pill";
import { RatingStars } from "@/components/site/rating-stars";
import { SubjectChip } from "@/components/site/subject-chip";
import { SubjectMultiPicker } from "@/components/site/subject-multi-picker";
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
import { Textarea } from "@/components/ui/textarea";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import type { FeedbackItem } from "@/lib/types";

interface ManageFeedbacksProps {
  initialFeedbacks: FeedbackItem[];
  live: boolean;
}

export function ManageFeedbacks({
  initialFeedbacks,
  live,
}: ManageFeedbacksProps) {
  const [feedbacks, setFeedbacks] = useState(initialFeedbacks);
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("all");
  const [role, setRole] = useState("all");
  const [rating, setRating] = useState("all");
  const [selected, setSelected] = useState<FeedbackItem | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSubjects, setSelectedSubjects] = useState<FeedbackItem["selected_subjects"]>([]);
  const [selectedRole, setSelectedRole] = useState<FeedbackItem["role_type"]>("student");
  const [selectedRating, setSelectedRating] = useState(5);
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState<"card" | "row">("card");

  const filtered = feedbacks.filter((item) => {
    const searchValue = search.trim().toLowerCase();
    const matchesSearch =
      !searchValue ||
      item.name.toLowerCase().includes(searchValue) ||
      item.description.toLowerCase().includes(searchValue);
    const matchesSubject =
      subject === "all" || item.selected_subjects.includes(subject as never);
    const matchesRole = role === "all" || item.role_type === role;
    const matchesRating = rating === "all" || item.rating === Number(rating);

    return matchesSearch && matchesSubject && matchesRole && matchesRating;
  });

  const openEditor = (item: FeedbackItem) => {
    setSelected(item);
    setName(item.name);
    setDescription(item.description);
    setSelectedSubjects(item.selected_subjects);
    setSelectedRole(item.role_type);
    setSelectedRating(item.rating);
  };

  const toggleState = async (
    item: FeedbackItem,
    key: "approved" | "featured",
    value: boolean,
  ) => {
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.from("feedbacks").update({ [key]: value }).eq("id", item.id);

    if (error) {
      toast.error("Unable to update feedback", {
        description: error.message,
      });
      return;
    }

    setFeedbacks((current) =>
      current.map((entry) =>
        entry.id === item.id ? { ...entry, [key]: value } : entry,
      ),
    );
    toast.success("Feedback updated");
  };

  const deleteFeedback = async (item: FeedbackItem) => {
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.from("feedbacks").delete().eq("id", item.id);

    if (error) {
      toast.error("Unable to delete feedback", {
        description: error.message,
      });
      return;
    }

    setFeedbacks((current) => current.filter((entry) => entry.id !== item.id));
    toast.success("Feedback deleted");
  };

  const saveFeedback = async () => {
    if (!selected) {
      return;
    }

    setIsSaving(true);
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase
      .from("feedbacks")
      .update({
        name,
        description,
        selected_subjects: selectedSubjects,
        role_type: selectedRole,
        rating: selectedRating,
      })
      .eq("id", selected.id);

    setIsSaving(false);

    if (error) {
      toast.error("Unable to save feedback", {
        description: error.message,
      });
      return;
    }

    setFeedbacks((current) =>
      current.map((item) =>
        item.id === selected.id
          ? {
              ...item,
              name,
              description,
              selected_subjects: selectedSubjects,
              role_type: selectedRole,
              rating: selectedRating,
            }
          : item,
      ),
    );
    toast.success("Feedback saved");
    setSelected(null);
  };

  return (
    <>
      <LiveDataNotice live={live} />

      <Card>
        <CardContent className="p-6">
          <div className="mb-6 grid gap-4 xl:grid-cols-[1.3fr_1fr_1fr_1fr]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name or feedback text"
                className="pl-11"
              />
            </div>
            <Select value={subject} onChange={(event) => setSubject(event.target.value)}>
              <option value="all">All subjects</option>
              <option value="Maths">Maths</option>
              <option value="Chemistry">Chemistry</option>
              <option value="Physics">Physics</option>
              <option value="All">All</option>
            </Select>
            <Select value={role} onChange={(event) => setRole(event.target.value)}>
              <option value="all">All types</option>
              <option value="student">Student says</option>
              <option value="parent">Parent says</option>
            </Select>
            <Select value={rating} onChange={(event) => setRating(event.target.value)}>
              <option value="all">All ratings</option>
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </Select>
            <Select value={viewMode} onChange={(event) => setViewMode(event.target.value as "card" | "row")}>
              <option value="card">Card View</option>
              <option value="row">Row View</option>
            </Select>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title="No feedback matches these filters"
              description="Try widening the subject, type, or rating filter."
            />
          ) : viewMode === "card" ? (
            <div className="grid gap-4 xl:grid-cols-2">
              {filtered.map((item) => (
                <div 
                  key={item.id} 
                  className="group relative rounded-3xl border border-border-soft bg-white/50 hover:border-cyan/40 hover:bg-white hover:shadow-lg-pro transition-all-smooth cursor-pointer"
                  onClick={() => openEditor(item)}
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <p className="font-display text-2xl font-extrabold text-primary">
                          {item.name}
                        </p>
                        <p className="mt-1 text-xs font-semibold uppercase tracking-[0.22em] text-muted">
                          {item.role_type === "student" ? "Student says" : "Parent says"}
                        </p>
                      </div>
                      <RatingStars rating={item.rating} />
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.selected_subjects.map((selectedSubject) => (
                        <SubjectChip
                          key={`${item.id}-${selectedSubject}`}
                          subject={selectedSubject}
                        />
                      ))}
                    </div>

                    <p className="mt-4 leading-7 text-muted">{item.description}</p>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <StatusPill
                          label={item.featured ? "Featured" : "Standard"}
                          tone={item.featured ? "accent" : "neutral"}
                        />
                      </div>
                      <div className="flex gap-2">

                        <Button
                          variant="ghost"
                          size="icon"
                          className={cn("size-9 rounded-full", item.featured ? "text-physics hover:bg-physics/10" : "text-muted hover:bg-surface-soft")}
                          onClick={(e) => { e.stopPropagation(); toggleState(item, "featured", !item.featured); }}
                          title={item.featured ? "Unfeature" : "Feature"}
                        >
                          <Star className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-9 rounded-full text-muted hover:bg-surface-soft hover:text-primary"
                          onClick={(e) => { e.stopPropagation(); openEditor(item); }}
                        >
                          <Edit2 className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-9 rounded-full text-muted hover:bg-chemistry/10 hover:text-chemistry"
                          onClick={(e) => { e.stopPropagation(); deleteFeedback(item); }}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[860px] text-left">
                <thead>
                  <tr className="border-b border-border-soft text-xs uppercase tracking-[0.18em] text-muted">
                    <th className="pb-4 pt-2">Name</th>
                    <th className="pb-4 pt-2">Type</th>
                    <th className="pb-4 pt-2">Rating</th>
                    <th className="pb-4 pt-2">Subjects</th>
                    <th className="pb-4 pt-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-soft">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-surface-soft/50 cursor-pointer transition" onClick={() => openEditor(item)}>
                      <td className="py-4 font-semibold text-primary">{item.name}</td>
                      <td className="py-4 text-muted">{item.role_type === "student" ? "Student" : "Parent"}</td>
                      <td className="py-4 text-muted">{item.rating}/5</td>
                      <td className="py-4 text-muted">
                        {item.selected_subjects.join(", ")}
                      </td>
                      <td className="py-4">
                        <StatusPill
                          label={item.featured ? "Featured" : "Standard"}
                          tone={item.featured ? "accent" : "neutral"}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={Boolean(selected)} onOpenChange={(open) => !open && setSelected(null)}>
        <DialogContent className="max-w-3xl flex flex-col max-h-[90vh] p-0 overflow-hidden">
          <div className="px-6 pt-6 pb-2 border-b border-transparent shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] z-20 bg-white">
            <DialogHeader>
              <DialogTitle>Edit Feedback</DialogTitle>
              <DialogDescription>
                Update the feedback content, subjects, rating, and type.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 relative bg-slate-50/30">
            <div className="grid gap-5">
            <div className="space-y-2">
              <Label htmlFor="feedback-edit-name">Name</Label>
              <Input
                id="feedback-edit-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback-edit-role">Type</Label>
              <Select
                id="feedback-edit-role"
                value={selectedRole}
                onChange={(event) =>
                  setSelectedRole(event.target.value as FeedbackItem["role_type"])
                }
              >
                <option value="student">Student says</option>
                <option value="parent">Parent says</option>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Subjects</Label>
              <SubjectMultiPicker
                value={selectedSubjects}
                onChange={setSelectedSubjects}
              />
            </div>

            <div className="space-y-2">
              <Label>Rating</Label>
              <div className="rounded-[1.5rem] bg-surface-soft p-4">
                <RatingStars rating={selectedRating} onRate={setSelectedRating} />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="feedback-edit-description">Description</Label>
              <Textarea
                id="feedback-edit-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>
          </div>
          </div>

          <div className="mt-auto px-6 py-4 border-t border-slate-100 bg-slate-50/90 backdrop-blur-md rounded-b-[2rem] flex-shrink-0 z-10 w-full shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
            <div className="flex justify-end">
              <Button variant="accent" onClick={saveFeedback} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
