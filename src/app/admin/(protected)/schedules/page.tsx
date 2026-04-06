import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { ManageSchedules } from "@/components/admin/manage-schedules";
import { getSchedulesData, getTeachersData } from "@/lib/data/admin";

export default async function AdminSchedulesPage() {
  const [{ data: schedules, live }, { data: teachers }] = await Promise.all([
    getSchedulesData(),
    getTeachersData(),
  ]);

  return (
    <div>
      <AdminPageHeader
        eyebrow="Timetable"
        title="Manage Schedules"
        description="Maintain weekend class timings, teacher assignments, batch labels, and public timetable visibility."
      />
      <ManageSchedules initialSchedules={schedules} teachers={teachers} live={live} />
    </div>
  );
}
