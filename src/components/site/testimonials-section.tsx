"use client";

import { useDeferredValue, useState, useRef } from "react";
import { Autoplay, FreeMode } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import { Search, GripVertical, Star, Quote } from "lucide-react";
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
  const [hoveredReview, setHoveredReview] = useState<string | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
  const [isReordering, setIsReordering] = useState(false);
  const [order, setOrder] = useState<string[]>([]);
  const deferredSearch = useDeferredValue(search);
  const dragItem = useRef<string | null>(null);
  const dragOverItem = useRef<string | null>(null);

  const featuredFeedbacks =
    feedbacks.filter((item) => item.featured).length > 0
      ? feedbacks.filter((item) => item.featured)
      : feedbacks.slice(0, 6);

  // Initialize order if not set
  if (order.length === 0 && featuredFeedbacks.length > 0) {
    setOrder(featuredFeedbacks.map(item => item.id));
  }

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

  // Get ordered feedbacks for display
  const orderedFeedbacks = order
    .map(id => featuredFeedbacks.find(item => item.id === id))
    .filter(Boolean) as FeedbackItem[];

  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    if (!isReordering) return;
    dragItem.current = itemId;
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnter = (e: React.DragEvent, itemId: string) => {
    if (!isReordering) return;
    dragOverItem.current = itemId;
  };

  const handleDragEnd = () => {
    if (!isReordering || !dragItem.current || !dragOverItem.current) return;

    const dragItemContent = orderedFeedbacks.find(item => item.id === dragItem.current);
    const dragOverItemContent = orderedFeedbacks.find(item => item.id === dragOverItem.current);

    if (dragItemContent && dragOverItemContent && dragItem.current !== dragOverItem.current) {
      const newOrder = [...order];
      const dragIndex = newOrder.indexOf(dragItem.current);
      const dragOverIndex = newOrder.indexOf(dragOverItem.current);
      
      // Swap items
      newOrder[dragIndex] = dragOverItem.current;
      newOrder[dragOverIndex] = dragItem.current;
      
      setOrder(newOrder);
    }

    dragItem.current = null;
    dragOverItem.current = null;
  };

  const resetOrder = () => {
    setOrder(featuredFeedbacks.map(item => item.id));
    setIsReordering(false);
  };

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
        
        {/* Reorder Controls */}
        <div className="flex gap-2">
          <Button
            variant={isReordering ? "default" : "outline"}
            size="sm"
            onClick={() => setIsReordering(!isReordering)}
          >
            <GripVertical className="w-4 h-4 mr-2" />
            {isReordering ? "Reordering..." : "Reorder"}
          </Button>
          {isReordering && (
            <Button variant="outline" size="sm" onClick={resetOrder}>
              Reset Order
            </Button>
          )}
        </div>
      </div>

      {/* Hover popup — rendered outside Swiper so it's never clipped by overflow:hidden */}
      {hoveredReview && (() => {
        const item = orderedFeedbacks.find(f => f.id === hoveredReview);
        if (!item) return null;
        return (
          <div
            className="fixed z-[9999] pointer-events-none hidden lg:block"
            style={hoverPos ? { left: hoverPos.x, top: hoverPos.y - 16, transform: 'translate(-50%, -100%)' } : { display: 'none' }}
          >
            <div className="w-80 p-4 bg-white border border-primary/20 rounded-2xl shadow-2xl animate-fade-in-up">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-cyan flex items-center justify-center">
                    <span className="text-white font-bold text-sm">{item.name.charAt(0)}</span>
                  </div>
                  <div>
                    <p className="font-bold text-primary">{item.name}</p>
                    <p className="text-xs text-muted">{item.role_type === 'student' ? 'Student' : 'Parent'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  ))}
                  <span className="ml-2 text-sm font-semibold text-primary">{item.rating}/5</span>
                </div>
                <p className="text-sm text-muted leading-relaxed">{item.description}</p>
                <div className="flex flex-wrap gap-1">
                  {item.selected_subjects.flatMap((s) =>
                    s === 'All' ? ['Chemistry', 'Physics', 'Maths'] as const : [s]
                  ).map((selectedSubject, idx) => (
                    <span key={`${item.id}-${selectedSubject}-${idx}`} className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {selectedSubject}
                    </span>
                  ))}
                </div>
              </div>
              {/* Arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-px">
                <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-white" />
              </div>
            </div>
          </div>
        );
      })()}

      {/* Horizontal Running Reviews */}
      <div className="relative -mx-4 sm:-mx-6 lg:-mx-12 px-4 sm:px-6 lg:px-12 py-10">
        <Swiper
          modules={[Autoplay]}
          slidesPerView="auto"
          spaceBetween={24}
          loop={!isReordering}
          speed={1000}
          grabCursor={!isReordering}
          autoplay={!isReordering ? {
            delay: 3500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
            reverseDirection: true,
          } : false}
          className="py-4"
        >
          {orderedFeedbacks.map((item) => (
            <SwiperSlide
              key={item.id}
              className={`!h-auto max-w-[320px] ${isReordering ? 'cursor-move' : 'cursor-grab'}`}
              draggable={isReordering}
              onDragStart={(e) => handleDragStart(e, item.id)}
              onDragEnter={(e) => handleDragEnter(e, item.id)}
              onDragEnd={handleDragEnd}
            >
              <Card
                className={`h-full border-slate-100/60 shadow-sm transition-all duration-300 ${
                  hoveredReview === item.id ? 'scale-105 shadow-xl border-primary/30' : ''
                } ${isReordering ? 'ring-2 ring-primary/50' : ''}`}
                onMouseEnter={(e) => {
                  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                  setHoverPos({ x: rect.left + rect.width / 2, y: rect.top });
                  setHoveredReview(item.id);
                }}
                onMouseLeave={() => { setHoveredReview(null); setHoverPos(null); }}
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
                      {isReordering && <GripVertical className="w-4 h-4 text-muted cursor-move" />}
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

        {isReordering && (
          <div className="absolute top-0 left-0 right-0 bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
            <p className="text-sm text-amber-800 font-medium">
              🔄 Drag and drop reviews to reorder them. Click "Reset Order" to restore original sequence.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
