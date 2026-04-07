"use client";

import { useDeferredValue, useState, useEffect, useCallback } from "react";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { Search, Star, Quote, ChevronLeft, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { RatingStars } from "@/components/site/rating-stars";
import { SubjectChip } from "@/components/site/subject-chip";
import { FeedbackForm } from "@/components/site/feedback-form";
import { getRatingLabel } from "@/lib/utils";
import type { FeedbackItem } from "@/lib/types";

interface TestimonialsSectionProps {
  feedbacks: FeedbackItem[];
}

export function TestimonialsSection({ feedbacks }: TestimonialsSectionProps) {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("all");
  const [role, setRole] = useState("all");
  const [rating, setRating] = useState("all");
  const [selectedFeedbackId, setSelectedFeedbackId] = useState<string | null>(null);
  const deferredSearch = useDeferredValue(search);

  const featuredFeedbacks =
    feedbacks.filter((item) => item.featured).length > 0
      ? feedbacks.filter((item) => item.featured)
      : feedbacks.slice(0, 6);

  const filteredFeedbacks = feedbacks.filter((item) => {
    const searchValue = deferredSearch.trim().toLowerCase();
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

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!selectedFeedbackId) return;

    const currentIndex = featuredFeedbacks.findIndex(f => f.id === selectedFeedbackId);
    if (currentIndex === -1) return;

    if (e.key === "ArrowLeft") {
      const prev = (currentIndex - 1 + featuredFeedbacks.length) % featuredFeedbacks.length;
      setSelectedFeedbackId(featuredFeedbacks[prev].id);
    } else if (e.key === "ArrowRight") {
      const next = (currentIndex + 1) % featuredFeedbacks.length;
      setSelectedFeedbackId(featuredFeedbacks[next].id);
    } else if (e.key === "Escape") {
      setSelectedFeedbackId(null);
    }
  }, [selectedFeedbackId, featuredFeedbacks]);

  useEffect(() => {
    if (selectedFeedbackId) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedFeedbackId, handleKeyDown]);



  return (
    <section id="feedback" className="section-shell py-20 lg:py-28">
      <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-2 rounded-full-pro text-xs-pro font-bold uppercase tracking-[0.2em] bg-blue-100 text-blue-700 border border-blue-200 shadow-sm-pro mb-4">
            Testimonials
          </span>
          <h2 className="text-balance mt-4 font-display text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
            Real experiences and perspectives from the RUBY Science Academy community.
          </h2>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Share Your Feedback</Button>
            </DialogTrigger>
            <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto border-0 p-5">
              <FeedbackForm />
            </DialogContent>
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary">View All Feedback</Button>
            </DialogTrigger>
            <DialogContent className="max-w-6xl border-0 p-5">
              <DialogHeader>
                <DialogTitle>All Feedback</DialogTitle>
              </DialogHeader>

              <div className="mt-4 grid gap-4 lg:grid-cols-4">
                <div className="relative lg:col-span-2">
                  <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
                  <Input
                    placeholder="Search by name or keyword"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
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
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
                  <Select value={role} onChange={(event) => setRole(event.target.value)}>
                    <option value="all">All types</option>
                    <option value="student">Student says</option>
                    <option value="parent">Parent says</option>
                  </Select>
                  <Select value={rating} onChange={(event) => setRating(event.target.value)}>
                    <option value="all">All ratings</option>
                    <option value="5">5 - Excellent</option>
                    <option value="4">4 - Good</option>
                    <option value="3">3 - Average</option>
                    <option value="2">2 - Poor</option>
                    <option value="1">1 - Very Poor</option>
                  </Select>
                </div>
              </div>

              <div className="mt-6 max-h-[60vh] overflow-y-auto pr-2">
                {filteredFeedbacks.length === 0 ? (
                  <EmptyState
                    title="No feedback matches those filters"
                    description="Try broadening the subject, role, or rating filters to see more approved testimonials."
                  />
                ) : (
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {filteredFeedbacks.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <p className="font-display text-xl font-bold text-primary">
                                {item.name}
                              </p>
                              <p className="mt-1 text-sm uppercase tracking-[0.2em] text-muted">
                                {item.role_type === "student" ? "Student says" : "Parent says"}
                              </p>
                            </div>
                            <RatingStars rating={item.rating} />
                          </div>
                          <div className="mt-4 flex flex-wrap gap-2">
                            {item.selected_subjects.flatMap((s) =>
                              s === "All" ? ["Chemistry", "Physics", "Maths"] as const : [s]
                            ).map((selectedSubject, idx) => (
                              <SubjectChip
                                key={`${item.id}-${selectedSubject}-${idx}`}
                                subject={selectedSubject}
                              />
                            ))}
                          </div>
                          <p className="mt-4 leading-7 text-muted">{item.description}</p>
                          <p className="mt-4 text-sm font-semibold text-primary">
                            {item.rating_text ?? getRatingLabel(item.rating)}
                          </p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Horizontal Running Reviews */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-12 py-10">
        <Swiper

          slidesPerView="auto"
          spaceBetween={24}
          loop={true}
          speed={8000}
          grabCursor={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: false,
          }}
          freeMode={true}
          modules={[Autoplay, FreeMode]}
          className="py-4 marquee-swiper"
        >
          {[...featuredFeedbacks, ...featuredFeedbacks, ...featuredFeedbacks].map((item, idx) => (
            <SwiperSlide
              key={`${item.id}-${idx}`}
              className="!h-auto max-w-[320px]"
            >
              <Card
                className="h-full border-slate-100/60 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-xl hover:border-primary/30 cursor-pointer"
                onClick={() => setSelectedFeedbackId(item.id)}
              >
                <CardContent className="flex h-full flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="font-display text-lg font-bold text-primary leading-none">{item.name}</p>
                      <p className="mt-1 text-[10px] font-black uppercase tracking-[0.25em] text-muted/60">
                        {item.role_type === 'student' ? 'Student says' : 'Parent says'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <RatingStars rating={item.rating} />
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {item.selected_subjects.flatMap((s) =>
                      s === 'All' ? ['Chemistry', 'Physics', 'Maths'] as const : [s]
                    ).map((selectedSubject, idx) => (
                      <SubjectChip key={`${item.id}-${selectedSubject}-${idx}`} subject={selectedSubject} size="sm" />
                    ))}
                  </div>
                  <div className="mt-3 relative">
                    <Quote className="absolute -top-1 -left-1 w-3 h-3 text-primary/20" />
                    <p className="text-sm leading-relaxed text-muted/90 pl-3 line-clamp-3">{item.description}</p>
                  </div>
                  <div className="mt-auto pt-3">
                    <p className="text-xs font-semibold text-primary">
                      {item.rating_text ?? getRatingLabel(item.rating)}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>

      </div>

      {/* Lightbox Modal */}
      {selectedFeedbackId && (() => {
        const currentIndex = featuredFeedbacks.findIndex(f => f.id === selectedFeedbackId);
        const item = featuredFeedbacks[currentIndex];
        if (!item) return null;

        const next = (currentIndex + 1) % featuredFeedbacks.length;
        const prev = (currentIndex - 1 + featuredFeedbacks.length) % featuredFeedbacks.length;

        return (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-200">
            {/* Close */}
            <button
              onClick={() => setSelectedFeedbackId(null)}
              className="absolute top-6 right-6 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Prev */}
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedFeedbackId(featuredFeedbacks[prev].id); }}
              className="absolute left-4 lg:left-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors hidden sm:block z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            {/* Content */}
            <div
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 lg:p-12 animate-in zoom-in-95 duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-primary/5" />
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-2xl">{item.name.charAt(0)}</span>
                </div>
                <div>
                  <h3 className="font-display font-bold text-2xl text-primary">{item.name}</h3>
                  <p className="text-sm uppercase tracking-widest text-muted/80 font-bold mt-1">
                    {item.role_type === 'student' ? 'Student' : 'Parent'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-6 h-6 ${i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                ))}
                <span className="ml-3 font-bold text-lg text-primary">{item.rating}/5</span>
              </div>

              <p className="text-lg lg:text-xl text-slate-700 leading-relaxed font-medium mb-8">
                "{item.description}"
              </p>

              <div className="flex flex-wrap gap-2 pt-6 border-t border-slate-100">
                {item.selected_subjects.flatMap((s) =>
                  s === 'All' ? ['Chemistry', 'Physics', 'Maths'] as const : [s]
                ).map((selectedSubject, idx) => (
                  <SubjectChip key={`${item.id}-${selectedSubject}-${idx}`} subject={selectedSubject} />
                ))}
              </div>

              {/* Mobile controls */}
              <div className="flex justify-between mt-8 sm:hidden">
                <Button variant="outline" size="icon" className="rounded-full" onClick={(e) => { e.stopPropagation(); setSelectedFeedbackId(featuredFeedbacks[prev].id); }}>
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="rounded-full" onClick={(e) => { e.stopPropagation(); setSelectedFeedbackId(featuredFeedbacks[next].id); }}>
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Next */}
            <button
              onClick={(e) => { e.stopPropagation(); setSelectedFeedbackId(featuredFeedbacks[next].id); }}
              className="absolute right-4 lg:right-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors hidden sm:block z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Click outside wrapper */}
            <div className="absolute inset-0 z-0 cursor-pointer" onClick={() => setSelectedFeedbackId(null)} />
          </div>
        );
      })()}
    </section>
  );
}
