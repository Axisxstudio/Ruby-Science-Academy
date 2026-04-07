"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createBrowserSupabaseClient } from "@/lib/supabase/browser";

export function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);

    const supabase = createBrowserSupabaseClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsSubmitting(false);

    if (error) {
      toast.error("Unable to sign in", {
        description: error.message,
      });
      return;
    }

    toast.success("Welcome back");
    router.replace("/admin");
    router.refresh();
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <div className="mb-3 inline-flex size-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <LockKeyhole className="size-5" />
        </div>
        <CardTitle>Admin Login</CardTitle>
        <CardDescription>
          Sign in with your authorized admin account to manage site content securely.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="admin-email">Email</Label>
            <Input
              id="admin-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="admin-password">Password</Label>
            <Input
              id="admin-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <Button type="submit" variant="accent" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-primary-deep"
          >
            <ArrowLeft className="size-4" />
            Back to website
          </Link>
        </form>
      </CardContent>
    </Card>
  );
}
