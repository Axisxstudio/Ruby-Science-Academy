'use client';
import { useState, useEffect } from 'react';
import { CalendarDays, Clock3, MapPin, Users, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SubjectChip } from "@/components/site/subject-chip";
import { formatScheduleRange } from "@/lib/utils";
import type { ScheduleItem } from "@/lib/types";

interface ScheduleSectionProps {
  schedules: ScheduleItem[];
}

export function ScheduleSection({ schedules }: ScheduleSectionProps) {
  const [activeDay, setActiveDay] = useState('Saturday');
  const [todayName, setTodayName] = useState<string>("");

  useEffect(() => {
    setTodayName(new Date().toLocaleDateString('en-US', { weekday: 'long' }));
  }, []);

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Get current day and automatically select it if it has classes
  useEffect(() => {
    const getCurrentDay = () => {
      const today = new Date();
      const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      const currentDayName = dayNames[today.getDay()];

      // Check if current day has classes, if not, find next available day
      if (schedules.some(item => item.day === currentDayName)) {
        return currentDayName;
      } else {
        // Find next day with classes
        const todayIndex = today.getDay();
        for (let i = 1; i <= 7; i++) {
          const nextDayIndex = (todayIndex + i) % 7;
          const nextDayName = dayNames[nextDayIndex];
          if (schedules.some(item => item.day === nextDayName)) {
            return nextDayName;
          }
        }
        return 'Saturday'; // fallback
      }
    };

    const dayToSelect = getCurrentDay();
    setActiveDay(dayToSelect);
  }, [schedules]);

  const getDaySchedules = (day: string) => {
    return schedules.filter((item) => item.day === day);
  };

  const getStats = () => {
    const totalClasses = schedules.length;
    const uniqueSubjects = [...new Set(schedules.map(item => item.subject))].length;
    const uniqueTeachers = [...new Set(schedules.map(item => item.teacher?.name).filter(Boolean))].length;

    return { totalClasses, uniqueSubjects, uniqueTeachers };
  };

  const stats = getStats();

  return (
    <section id="schedule" className="pt-8 pb-24 lg:pt-12 lg:pb-32 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="section-shell relative z-10">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          {/* Left Side - Info and Stats */}
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="space-y-4">
                <span className="inline-block px-4 py-2 rounded-full-pro text-xs-pro font-bold uppercase tracking-widest bg-blue-100 text-blue-700 border border-blue-200 shadow-sm-pro animate-fade-in">
                  Class Schedule
                </span>
                <h2 className="text-3xl-pro font-black text-slate-900 sm:text-5xl-pro lg:text-6xl-pro leading-tight font-display animate-fade-in-up delay-100">
                  Weekly <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">Timetable</span>
                </h2>
                <p className="text-base-pro leading-relaxed text-slate-600 max-w-lg animate-fade-in-up delay-200">
                  Plan your week with our comprehensive schedule. Classes available Monday through Sunday with expert teachers for all subjects.
                </p>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-3 gap-4 animate-fade-in-up delay-300">
                <div className="bg-white rounded-2xl-pro p-4 shadow-md-pro border border-slate-100 text-center transition-transform hover-lift">
                  <div className="text-2xl-pro font-black text-blue-600 font-display">{stats.totalClasses}</div>
                  <div className="text-xs-pro font-medium text-slate-500 mt-1">Total Classes</div>
                </div>
                <div className="bg-white rounded-2xl-pro p-4 shadow-md-pro border border-slate-100 text-center transition-transform hover-lift">
                  <div className="text-2xl-pro font-black text-blue-600 font-display">{stats.uniqueSubjects}</div>
                  <div className="text-xs-pro font-medium text-slate-500 mt-1">Subjects</div>
                </div>
                <div className="bg-white rounded-2xl-pro p-4 shadow-md-pro border border-slate-100 text-center transition-transform hover-lift">
                  <div className="text-2xl-pro font-black text-blue-600 font-display">{stats.uniqueTeachers}</div>
                  <div className="text-xs-pro font-medium text-slate-500 mt-1">Teachers</div>
                </div>
              </div>
            </div>

            <div className="space-y-4 animate-fade-in-up delay-500">
              <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl-pro p-6 text-white shadow-lg-pro transition-transform hover-lift">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <MapPin className="size-5" />
                    <div>
                      <h4 className="font-bold text-lg">Location</h4>
                      <p className="text-sm text-white/90">Kotahena Campus, Colombo 13</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarDays className="size-5" />
                    <div>
                      <h4 className="font-bold text-lg">Duration</h4>
                      <p className="text-sm text-white/90">Full Week Coverage</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="size-5" />
                    <div>
                      <h4 className="font-bold text-lg">Class Size</h4>
                      <p className="text-sm text-white/90">Optimized for Learning</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Day Selector and Schedule */}
          <div className="space-y-6">
            {/* Day Selector */}
            <Card className="shadow-lg-pro border border-slate-100 animate-fade-in-up delay-700">
              <CardContent className="p-6">
                <h3 className="font-display text-xl font-bold text-slate-900 mb-4">Select Day</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                  {days.map((day) => {
                    const daySchedules = getDaySchedules(day);
                    const hasClasses = daySchedules.length > 0;
                    const isActive = activeDay === day;

                    return (
                      <button
                        key={day}
                        suppressHydrationWarning
                        onClick={() => hasClasses && setActiveDay(day)}
                        disabled={!hasClasses}
                        className={`
                          relative px-3 py-2.5 rounded-xl-pro font-semibold text-sm-pro transition-all-smooth hover-lift
                          ${isActive
                            ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md-pro'
                            : hasClasses
                              ? 'bg-white text-slate-700 border border-slate-200 hover:border-blue-300 hover:bg-blue-50'
                              : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                          }
                          ${todayName === day && hasClasses ? 'ring-2 ring-blue-400 ring-offset-2' : ''}
                        `}
                      >
                        <span className="relative z-10">{day.slice(0, 3)}</span>
                        {hasClasses && (
                          <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full-pro bg-red-500 text-white text-xs-pro font-bold flex items-center justify-center shadow-sm-pro">
                            {daySchedules.length}
                          </span>
                        )}
                        {todayName === day && hasClasses && (
                          <span className="absolute -top-1 -left-1 w-2 h-2 rounded-full-pro bg-green-500 border border-white"></span>
                        )}
                      </button>
                    );
                  })}
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs-pro text-slate-500">
                  <div className="w-2 h-2 rounded-full-pro bg-green-500"></div>
                  <span>Today</span>
                  <div className="w-2 h-2 rounded-full-pro bg-blue-500"></div>
                  <span>Selected</span>
                </div>
              </CardContent>
            </Card>

            {/* Schedule Display */}
            <Card className="shadow-lg-pro border border-slate-100 animate-fade-in-up delay-1000">
              <CardContent className="p-6">
                <div className="flex items-center justify-between gap-4 mb-6">
                  <h3 className="font-display text-2xl font-bold text-slate-900">
                    {activeDay} Schedule
                  </h3>
                  <span className="rounded-full-pro bg-blue-100 text-blue-700 px-3 py-1 text-xs-pro font-semibold">
                    {getDaySchedules(activeDay).length} classes
                  </span>
                </div>

                <div className="space-y-3">
                  {getDaySchedules(activeDay).length > 0 ? (
                    getDaySchedules(activeDay).map((item, index) => (
                      <div
                        key={item.id}
                        className="group rounded-2xl-pro border border-slate-200 bg-white p-4 transition-all-smooth hover-lift hover:shadow-md-pro hover:border-blue-300"
                        style={{ animationDelay: `${index * 100}ms` }}
                      >
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <SubjectChip subject={item.subject} />
                              <span className="text-xs-pro font-semibold text-slate-500 uppercase tracking-wider">
                                {item.batch_type} Batch
                              </span>
                            </div>
                            <div>
                              <h4 className="font-display text-lg font-bold text-slate-900">
                                {item.batch_details}
                              </h4>
                              <p className="text-sm-pro text-slate-600 flex items-center gap-2">
                                <BookOpen className="size-4" />
                                {item.teacher?.name ?? "Teacher will be announced"}
                              </p>
                            </div>
                          </div>
                          <div className="flex flex-col items-end gap-2 sm:gap-3">
                            <div className="rounded-xl-pro bg-slate-100 px-3 py-2 text-center">
                              <Clock3 className="size-4 text-slate-600 mx-auto mb-1" />
                              <p className="font-bold text-slate-900 text-sm-pro">
                                {formatScheduleRange(item.start_time, item.end_time)}
                              </p>
                              <p className="text-xs-pro text-slate-500 mt-1">{item.year}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full-pro bg-slate-100 flex items-center justify-center mx-auto mb-4">
                        <CalendarDays className="size-6 text-slate-400" />
                      </div>
                      <h4 className="font-display text-xl font-bold text-slate-900 mb-2">No Classes</h4>
                      <p className="text-slate-600 text-sm-pro">No classes scheduled for {activeDay}</p>
                      <p className="text-slate-500 text-xs-pro mt-2">Try selecting another day to view available classes</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
