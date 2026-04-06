import { ShieldCheck, Wrench } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface MaintenanceScreenProps {
  reason?: string | null;
}

export function MaintenanceScreen({ reason }: MaintenanceScreenProps) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(0,194,255,0.14),_transparent_25%),linear-gradient(135deg,_#0b3558_0%,_#0f4c81_55%,_#1e88e5_100%)] px-4 py-12">
      <Card className="w-full max-w-2xl border-white/10 bg-white/95">
        <CardContent className="p-8 sm:p-10">
          <div className="mb-6 inline-flex rounded-full bg-primary/10 p-3 text-primary">
            <Wrench className="size-7" />
          </div>
          <h1 className="text-balance font-display text-4xl font-extrabold text-primary sm:text-5xl">
            RUBY Science Academy is temporarily paused
          </h1>
          <p className="mt-5 text-lg leading-8 text-muted">
            We&apos;re making a few updates for students and parents. Public access will
            be back shortly.
          </p>
          <div className="mt-8 rounded-[1.5rem] bg-surface-soft p-5">
            <div className="mb-3 flex items-center gap-3 text-primary">
              <ShieldCheck className="size-5" />
              <p className="font-semibold">Message from the admin team</p>
            </div>
            <p className="leading-7 text-muted">
              {reason?.trim() || "The website is currently under maintenance. Please check back soon."}
            </p>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
