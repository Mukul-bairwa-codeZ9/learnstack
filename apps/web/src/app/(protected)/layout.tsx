import { AppShell } from "@/components/shared";
import { RouteGuard } from "@/features/access";
import { LogoutButton } from "@/features/auth/components/logout-button";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard>
      <AppShell>{children}</AppShell>
    </RouteGuard>
  );
}
