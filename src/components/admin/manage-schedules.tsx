"use client";

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
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { formatScheduleRange } from "@/lib/utils";
import type { BatchType, ScheduleDay, ScheduleItem, SubjectName, Teacher } from "@/lib/types";

interface ManageSchedulesProps {
  initialSchedules: ScheduleItem[];
  teachers: Teacher[];
  live: boolean;
}

const blankSchedule = {
  subject: "Chemistry" as SubjectName,
  batch_type: "Normal" as BatchType,
  year: 2028,
  day: "Saturday" as ScheduleDay,
  start_time: "08:00:00",
  end_time: "10:00:00",
  teacher_id: "",
  batch_details: "",
  venue: "",
  active_status: true,
  display_order: 1,
};

export function ManageSchedules({
  initialSchedules,
  teachers,
  live,
}: ManageSchedulesProps) {
  const [schedules, setSchedules] = useState(initialSchedules);
  const [search, setSearch] = useState("");
  const [filterDay, setFilterDay] = useState("All");
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<ScheduleItem | null>(null);
  const [form, setForm] = useState(blankSchedule);
  const [isSaving, setIsSaving] = useState(false);

  const filtered = schedules.filter((schedule) => {
    const searchValue = search.trim().toLowerCase();
    const matchesDay = filterDay === "All" || schedule.day === filterDay;
    
    return (
      matchesDay &&
      (!searchValue ||
        schedule.subject.toLowerCase().includes(searchValue) ||
        schedule.batch_details.toLowerCase().includes(searchValue) ||
        (schedule.teacher?.name ?? "").toLowerCase().includes(searchValue))
    );
  });

  const openCreate = () => {
    setEditing(null);
    setForm(blankSchedule);
    setOpen(true);
  };

  const openEdit = (schedule: ScheduleItem) => {
    setEditing(schedule);
    setForm({
      subject: schedule.subject,
      batch_type: schedule.batch_type,
      year: schedule.year,
      day: schedule.day,
      start_time: schedule.start_time,
      end_time: schedule.end_time,
      teacher_id: schedule.teacher_id ?? "",
      batch_details: schedule.batch_details,
      venue: schedule.venue ?? "",
      active_status: schedule.active_status,
      display_order: schedule.display_order,
    });
    setOpen(true);
  };

  const saveSchedule = async () => {
    setIsSaving(true);
    const supabase = createBrowserSupabaseClient();
    const payload = {
      ...form,
      teacher_id: form.teacher_id || null,
      venue: form.venue || null,
    };

    try {
      if (editing) {
        const { error } = await supabase.from("schedules").update(payload).eq("id", editing.id);

        if (error) {
          throw error;
        }

        const teacher = teachers.find((item) => item.id === payload.teacher_id) ?? null;

        setSchedules((current) =>
          current.map((item) =>
            item.id === editing.id
              ? { ...item, ...payload, teacher: teacher ? { id: teacher.id, name: teacher.name, subject: teacher.subject } : null }
              : item,
          ),
        );
      } else {
        const { data, error } = await supabase
          .from("schedules")
          .insert(payload)
          .select("*, teacher:teachers!schedules_teacher_id_fkey(id, name, subject)")
          .single();

        if (error) {
          throw error;
        }

        setSchedules((current) =>
          [...current, data as ScheduleItem].sort((a, b) => a.display_order - b.display_order),
        );
      }

      toast.success(`Schedule ${editing ? "updated" : "created"}`);
      setOpen(false);
    } catch (error) {
      toast.error("Unable to save schedule", {
        description: error instanceof Error ? error.message : "Unknown error",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const deleteSchedule = async (schedule: ScheduleItem) => {
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.from("schedules").delete().eq("id", schedule.id);

    if (error) {
      toast.error("Unable to delete schedule", {
        description: error.message,
      });
      return;
    }

    setSchedules((current) => current.filter((item) => item.id !== schedule.id));
    toast.success("Schedule deleted");
  };

  return (
    <>
      <LiveDataNotice live={live} />

      <Card>
        <CardContent className="p-6">
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-col gap-4 sm:flex-row w-full max-w-2xl">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search schedules"
                  className="pl-11"
                />
              </div>
              <div className="w-full sm:w-48">
                <Select
                  value={filterDay}
                  onChange={(e) => setFilterDay(e.target.value)}
                >
                  <option value="All">All Days</option>
                  <option value="Monday">Monday</option>
                  <option value="Tuesday">Tuesday</option>
                  <option value="Wednesday">Wednesday</option>
                  <option value="Thursday">Thursday</option>
                  <option value="Friday">Friday</option>
                  <option value="Saturday">Saturday</option>
                  <option value="Sunday">Sunday</option>
                </Select>
              </div>
            </div>
            <Button variant="accent" onClick={openCreate}>
              <Plus className="size-4" />
              Add Schedule
            </Button>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title="No schedules found"
              description="Add a new schedule entry or widen your search."
            />
          ) : (
            <div className="grid gap-4 xl:grid-cols-2">
              {filtered.map((schedule) => (
                <div 
                  key={schedule.id}
                  className="rounded-3xl border border-border-soft bg-white/50 hover:shadow-lg-pro transition-all-smooth overflow-hidden"
                >
                  <CardContent className="p-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <SubjectChip subject={schedule.subject} />
                      <StatusPill
                        label={schedule.active_status ? "Active" : "Inactive"}
                        tone={schedule.active_status ? "success" : "warning"}
                      />
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-extrabold text-primary">
                      {schedule.batch_details}
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      {schedule.day} • {formatScheduleRange(schedule.start_time, schedule.end_time)}
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      {schedule.batch_type} Batch • {schedule.year}
                    </p>
                    <p className="mt-2 text-sm text-muted">
                      {schedule.teacher?.name ?? "Teacher unassigned"} • {schedule.venue ?? "Venue TBA"}
                    </p>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
                      <p className="text-xs font-bold text-muted/60 uppercase tracking-widest">Order: {schedule.display_order}</p>
                      <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="size-9 rounded-full text-muted hover:bg-surface-soft hover:text-primary transition-all-smooth" onClick={() => openEdit(schedule)}>
                          <Edit2 className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-9 rounded-full text-muted hover:bg-chemistry/10 hover:text-chemistry transition-all-smooth"
                          onClick={() => deleteSchedule(schedule)}
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
              <DialogTitle>{editing ? "Edit Schedule" : "Add Schedule"}</DialogTitle>
              <DialogDescription>
                Manage weekend batches and public timetable visibility.
              </DialogDescription>
            </DialogHeader>
          </div>

          <div className="flex-1 overflow-y-auto px-6 py-4 relative bg-slate-50/30">
            <div className="grid gap-5 sm:grid-cols-2">
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
            <div className="space-y-2">
              <Label>Batch Type</Label>
              <Select
                value={form.batch_type}
                onChange={(event) =>
                  setForm((current) => ({ ...current, batch_type: event.target.value as BatchType }))
                }
              >
                <option value="Normal">Normal</option>
                <option value="Repeat">Repeat</option>
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
            <div className="space-y-2">
              <Label>Day</Label>
              <Select
                value={form.day}
                onChange={(event) =>
                  setForm((current) => ({ ...current, day: event.target.value as ScheduleDay }))
                }
              >
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Start Time</Label>
              <Input
                type="time"
                value={form.start_time.slice(0, 5)}
                onChange={(event) =>
                  setForm((current) => ({ ...current, start_time: `${event.target.value}:00` }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>End Time</Label>
              <Input
                type="time"
                value={form.end_time.slice(0, 5)}
                onChange={(event) =>
                  setForm((current) => ({ ...current, end_time: `${event.target.value}:00` }))
                }
              />
            </div>
            <div className="space-y-2 sm:col-span-2">
              <Label>Batch Details</Label>
              <Input
                value={form.batch_details}
                onChange={(event) =>
                  setForm((current) => ({ ...current, batch_details: event.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Teacher</Label>
              <Select
                value={form.teacher_id}
                onChange={(event) =>
                  setForm((current) => ({ ...current, teacher_id: event.target.value }))
                }
              >
                <option value="">No teacher selected</option>
                {teachers.map((teacher) => (
                  <option key={teacher.id} value={teacher.id}>
                    {teacher.name}
                  </option>
                ))}
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Venue</Label>
              <Input
                value={form.venue}
                onChange={(event) =>
                  setForm((current) => ({ ...current, venue: event.target.value }))
                }
              />
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
                <p className="text-sm text-muted">Show schedule on the public website</p>
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
              <Button variant="accent" onClick={saveSchedule} disabled={isSaving}>
                {isSaving ? "Saving..." : "Save schedule"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
