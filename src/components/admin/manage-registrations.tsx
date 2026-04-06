"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Edit2, Eye, LayoutGrid, List, MoreVertical, Search, Trash2 } from "lucide-react";
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
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";
import { registrationStatuses } from "@/lib/constants";
import { formatPhoneNumber } from "@/lib/utils";
import type { RegistrationItem, RegistrationStatus } from "@/lib/types";

interface ManageRegistrationsProps {
  initialRegistrations: RegistrationItem[];
  live: boolean;
}

export function ManageRegistrations({
  initialRegistrations,
  live,
}: ManageRegistrationsProps) {
  const [registrations, setRegistrations] = useState(initialRegistrations);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState<RegistrationItem | null>(null);
  const [status, setStatus] = useState<RegistrationStatus>("new");
  const [notes, setNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [viewMode, setViewMode] = useState<"card" | "row">("row");

  const filtered = registrations.filter((item) => {
    const searchValue = search.trim().toLowerCase();
    const matchesSearch =
      !searchValue ||
      item.full_name.toLowerCase().includes(searchValue) ||
      item.phone_number.includes(searchValue) ||
      item.selected_subjects.join(" ").toLowerCase().includes(searchValue);
    const matchesStatus = statusFilter === "all" || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const openEditor = (item: RegistrationItem) => {
    setSelected(item);
    setStatus(item.status);
    setNotes(item.notes ?? "");
  };

  const saveRegistration = async () => {
    if (!selected) {
      return;
    }

    setIsSaving(true);
    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase
      .from("registrations")
      .update({ status, notes })
      .eq("id", selected.id);

    setIsSaving(false);

    if (error) {
      toast.error("Unable to update registration", {
        description: error.message,
      });
      return;
    }

    setRegistrations((current) =>
      current.map((item) =>
        item.id === selected.id ? { ...item, status, notes } : item,
      ),
    );
    toast.success("Registration updated");
    setSelected(null);
  };

  const deleteRegistration = async (id: string) => {
    if (!confirm("Are you sure you want to delete this registration?")) {
      return;
    }

    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.from("registrations").delete().eq("id", id);

    if (error) {
      toast.error("Unable to delete registration", {
        description: error.message,
      });
      return;
    }

    setRegistrations((current) => current.filter((item) => item.id !== id));
    toast.success("Registration removed");
  };

  return (
    <>
      <LiveDataNotice live={live} />

      <Card>
        <CardContent className="p-6">
          <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <Input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, phone, or subject"
                className="pl-11"
              />
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              <div className="w-full sm:w-48">
                <Select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)}>
                  <option value="all">All statuses</option>
                  {registrationStatuses.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </div>

              <div className="flex bg-slate-100/80 p-1 rounded-2xl border border-slate-200/50">
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-9 px-4 rounded-xl border-0 shadow-none transition-all-smooth ${viewMode === 'card' ? 'bg-white text-primary shadow-sm font-bold' : 'text-muted/60 hover:text-primary'}`}
                  onClick={() => setViewMode('card')}
                >
                  <LayoutGrid className="size-4 mr-2" />
                  Cards
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className={`h-9 px-4 rounded-xl border-0 shadow-none transition-all-smooth ${viewMode === 'row' ? 'bg-white text-primary shadow-sm font-bold' : 'text-muted/60 hover:text-primary'}`}
                  onClick={() => setViewMode('row')}
                >
                  <List className="size-4 mr-2" />
                  Rows
                </Button>
              </div>
            </div>
          </div>

          {filtered.length === 0 ? (
            <EmptyState
              title="No registrations found"
              description="Try changing the search term or status filter."
            />
          ) : viewMode === "card" ? (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {filtered.map((item) => (
                <div 
                  key={item.id}
                  className="group relative rounded-3xl border border-border-soft bg-white/50 p-5 cursor-pointer hover:border-cyan/40 hover:bg-white hover:shadow-lg-pro transition-all-smooth"
                  onClick={() => openEditor(item)}
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-display text-lg font-black text-primary leading-tight">{item.full_name}</p>
                      <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-muted/60">{item.batch_type} • {item.year}</p>
                    </div>
                    <StatusPill
                      label={item.status}
                      tone={item.status === "enrolled" ? "success" : "warning"}
                    />
                  </div>
                  <div className="space-y-2 text-sm text-muted/80">
                    <p className="flex items-center gap-2"><span className="size-1.5 rounded-full bg-cyan/40" /> {formatPhoneNumber(item.phone_number)}</p>
                    <p className="flex items-center gap-2 bit-truncate"><span className="size-1.5 rounded-full bg-maths/40" /> {item.selected_subjects.join(", ")}</p>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="size-8 rounded-full bg-white text-muted hover:text-primary" onClick={(e) => { e.stopPropagation(); openEditor(item); }}>
                      <Edit2 className="size-3.5" />
                    </Button>
                    <Button variant="ghost" size="icon" className="size-8 rounded-full bg-white text-muted hover:text-chemistry" onClick={(e) => { e.stopPropagation(); deleteRegistration(item.id); }}>
                      <Trash2 className="size-3.5" />
                    </Button>
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
                    <th className="pb-4 pt-2">Phone</th>
                    <th className="pb-4 pt-2">Batch</th>
                    <th className="pb-4 pt-2">Year</th>
                    <th className="pb-4 pt-2">Subjects</th>
                    <th className="pb-4 pt-2">Status</th>
                    <th className="pb-4 pt-2 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-soft">
                  {filtered.map((item) => (
                    <tr key={item.id} className="hover:bg-surface-soft/50 cursor-pointer transition" onClick={() => openEditor(item)}>
                      <td className="py-4 font-semibold text-primary">{item.full_name}</td>
                      <td className="py-4 text-muted">
                        {formatPhoneNumber(item.phone_number)}
                      </td>
                      <td className="py-4 text-muted">{item.batch_type}</td>
                      <td className="py-4 text-muted">{item.year}</td>
                      <td className="py-4 text-muted">
                        {item.selected_subjects.join(", ")}
                      </td>
                      <td className="py-4">
                        <StatusPill
                          label={item.status}
                          tone={item.status === "enrolled" ? "success" : "warning"}
                        />
                      </td>
                      <td className="py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="ghost" size="icon" className="size-9 rounded-full text-muted hover:bg-white hover:text-primary" onClick={(e) => { e.stopPropagation(); openEditor(item); }}>
                            <Edit2 className="size-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="size-9 rounded-full text-muted hover:bg-white hover:text-chemistry" onClick={(e) => { e.stopPropagation(); deleteRegistration(item.id); }}>
                            <Trash2 className="size-4" />
                          </Button>
                        </div>
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{selected?.full_name ?? "Registration"}</DialogTitle>
            <DialogDescription>
              Update lead status and keep internal notes for the admissions workflow.
            </DialogDescription>
          </DialogHeader>

          {selected ? (
            <div className="grid gap-5">
              <div className="rounded-[1.5rem] bg-surface-soft p-5">
                <p className="text-sm text-muted">
                  <span className="font-semibold text-primary">Phone:</span>{" "}
                  {formatPhoneNumber(selected.phone_number)}
                </p>
                <p className="mt-2 text-sm text-muted">
                  <span className="font-semibold text-primary">Batch:</span>{" "}
                  {selected.batch_type} • {selected.year}
                </p>
                <p className="mt-2 text-sm text-muted">
                  <span className="font-semibold text-primary">Subjects:</span>{" "}
                  {selected.selected_subjects.join(", ")}
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="registration-status">Status</Label>
                  <Select
                    id="registration-status"
                    value={status}
                    onChange={(event) => setStatus(event.target.value as RegistrationStatus)}
                  >
                    {registrationStatuses.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="registration-notes">Internal Notes</Label>
                <Textarea
                  id="registration-notes"
                  value={notes}
                  onChange={(event) => setNotes(event.target.value)}
                  placeholder="Add notes for follow-up, parent preference, or call status"
                />
              </div>

              <div className="flex justify-end">
                <Button variant="accent" onClick={saveRegistration} disabled={isSaving}>
                  {isSaving ? "Saving..." : "Save changes"}
                </Button>
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  );
}
