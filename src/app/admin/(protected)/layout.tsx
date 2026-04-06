import { AdminShell } from "@/components/admin/admin-shell";
import { requireAdminUser } from "@/lib/auth";

export default async function ProtectedAdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await requireAdminUser();

  return <AdminShell userEmail={user.email ?? "Admin"}>{children}</AdminShell>;
}
