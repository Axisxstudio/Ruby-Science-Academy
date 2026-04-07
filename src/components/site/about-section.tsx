import { Award, Users, GraduationCap } from "lucide-react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Academic Excellence",
    description: "Consistent practice focused on helping students achieve top grades and build strong foundations.",
    icon: Award,
    stats: <><AnimatedCounter end={95} suffix="%" /> Pass Rate</>
  },
  {
    title: "Expert Teachers",
    description: "Experienced Teachers who understand Tamil medium science stream requirements and exam patterns.",
    icon: GraduationCap,
    stats: <><AnimatedCounter end={7} suffix="+" /> Years Experience</>
  },
  {
    title: "Personalized Guidance",
    description: "Individual attention and mentoring to help every student reach their full potential.",
    icon: Users,
    stats: <>1:<AnimatedCounter end={15} /> Teacher Ratio</>
  },
];

export function AboutSection() {
  return (
    <section className="pt-24 pb-8 lg:pt-32 lg:pb-12 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-cyan-200/20 rounded-full blur-3xl animate-float-delayed" />
      </div>
      
      <div className="section-shell relative z-10">
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <span className="inline-block px-4 py-2 rounded-full-pro text-xs-pro font-bold uppercase tracking-widest bg-blue-100 text-blue-700 border border-blue-200 shadow-sm-pro animate-fade-in">
                About RUBY Science Academy
              </span>
              <h2 className="text-3xl-pro sm:text-5xl-pro lg:text-6xl-pro font-black text-slate-900 leading-tight font-display animate-fade-in-up delay-100">
                Excellence in <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">A/L Science</span> Education
              </h2>
              <p className="text-base-pro leading-relaxed text-slate-600 max-w-lg animate-fade-in-up delay-200">
                RUBY Science Academy stands as Colombo's premier Tamil medium A/L science tuition center, 
                delivering exceptional results through systematic teaching, disciplined learning, and comprehensive student support.
              </p>
            </div>
            
            <div className="grid grid-cols-3 gap-6 py-6 border-y border-slate-200 animate-fade-in-up delay-300">
              <div className="text-center group transition-transform hover-lift">
                <div className="text-3xl-pro font-black text-blue-600 font-display"><AnimatedCounter end={100} suffix="+" /></div>
                <div className="text-sm-pro font-medium text-slate-500 mt-1">Students</div>
              </div>
              <div className="text-center group transition-transform hover-lift">
                <div className="text-3xl-pro font-black text-blue-600 font-display"><AnimatedCounter end={95} suffix="%" /></div>
                <div className="text-sm-pro font-medium text-slate-500 mt-1">Success Rate</div>
              </div>
              <div className="text-center group transition-transform hover-lift">
                <div className="text-3xl-pro font-black text-blue-600 font-display"><AnimatedCounter end={7} suffix="+" /></div>
                <div className="text-sm-pro font-medium text-slate-500 mt-1">Years</div>
              </div>
            </div>
            
            <div className="space-y-4 animate-fade-in-up delay-500">
              <p className="text-base-pro leading-relaxed text-slate-600">
                Our structured approach combines experienced teachers, comprehensive study materials, and regular exams 
                to ensure every student achieves their academic goals and builds confidence for higher education.
              </p>
              <p className="text-base-pro leading-relaxed text-slate-600">
                We pride ourselves on creating an environment where parents can trust the quality of education 
                and students can thrive with personalized attention and clear guidance.
              </p>
            </div>
          </div>

          <div className="space-y-6 animate-fade-in-up delay-700">
            <div className="grid gap-6 sm:grid-cols-1">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={cn(
                    "bg-white rounded-3xl-pro p-6 shadow-md-pro border border-slate-100 transition-all-smooth hover-lift group cursor-default",
                    index === 1 ? "sm:translate-y-4" : ""
                  )}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex size-14 items-center justify-center rounded-2xl-pro bg-blue-50 text-blue-600 transition-all-smooth group-hover:scale-110 group-hover:bg-blue-100">
                      <feature.icon className="size-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg-pro font-bold text-slate-900 font-display">{feature.title}</h3>
                      <p className="text-sm-pro leading-relaxed text-slate-600 mt-2">
                        {feature.description}
                      </p>
                      {feature.stats && (
                        <div className="mt-3 inline-flex items-center px-3 py-1 rounded-full-pro bg-blue-50 text-blue-700 text-xs-pro font-semibold">
                          {feature.stats}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="bg-gradient-to-br from-blue-600 to-cyan-500 rounded-3xl-pro p-8 text-white shadow-lg-pro">
              <div className="space-y-4">
                <div className="inline-flex items-center px-3 py-1 rounded-full-pro bg-white/20 backdrop-blur-sm">
                  <span className="text-xs-pro font-bold uppercase tracking-wider">Why Families Choose RUBY</span>
                </div>
                <h3 className="text-2xl-pro font-bold font-display leading-tight">
                  Clear Teaching. Strong Discipline. Results That Build Trust.
                </h3>
                <p className="text-sm-pro leading-relaxed text-white/90">
                  Join hundreds of successful students who have achieved their dreams through our proven methodology.
                </p>
                <div className="pt-2">
                  <button className="inline-flex items-center gap-2 px-6 py-3 rounded-xl-pro bg-white text-blue-600 font-bold text-sm-pro transition-all-smooth hover:bg-white/90 hover-lift">
                    Learn More About Our Approach
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
