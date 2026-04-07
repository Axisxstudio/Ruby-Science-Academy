import { redirect } from "next/navigation";
import Image from "next/image";
import { AdminLoginForm } from "@/components/admin/login-form";
import { isAdminUser, getCurrentUser } from "@/lib/auth";

export default async function AdminLoginPage() {
  const user = await getCurrentUser();

  if (isAdminUser(user)) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(0,194,255,0.14),_transparent_25%),linear-gradient(135deg,_#0b3558_0%,_#0f4c81_55%,_#1e88e5_100%)] px-4 py-12">
      <div className="w-full max-w-5xl">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_420px]">
          <div className="text-white">
            <div className="mb-8 inline-flex size-16 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-0 shadow-2xl backdrop-blur-md">
              <Image
                src="/ruby-logo.jpeg"
                alt="Logo"
                width={64}
                height={64}
                className="h-full w-full object-cover opacity-90"
              />
            </div>
            <p className="text-xs font-black uppercase tracking-[0.3em] text-cyan">
              Institutional Gateway
            </p>
            <h1 className="mt-4 text-balance font-display text-4xl font-black tracking-tight sm:text-5xl uppercase leading-none">
              Restricted Administrative Access
            </h1>
            <p className="mt-6 max-w-lg text-base font-bold leading-relaxed text-white/50 tracking-wide uppercase">
              This environment is for authorized Ruby Science Academy personnel only.
              All sessions are monitored and logged for security and system integrity.
            </p>
            <div className="mt-8 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-cyan/60">
              <span className="flex items-center gap-1.5 pt-0.5">
                <div className="size-1 rounded-full bg-cyan shadow-[0_0_8px_rgba(6,182,212,1)]" />
                SSL Encrypted
              </span>
              <span className="flex items-center gap-1.5 pt-0.5">
                <div className="size-1 rounded-full bg-cyan shadow-[0_0_8px_rgba(6,182,212,1)]" />
                Role Based Access
              </span>
            </div>
          </div>

          <AdminLoginForm />
        </div>
      </div>
    </main>
  );
}
