
import { RouteGuard } from "@/features/access";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RouteGuard>
      {children}
    </RouteGuard>
  );
}
