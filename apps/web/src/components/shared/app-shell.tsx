import { AppHeader } from "@/components/shared";
import { AppSidebar } from "@/components/shared";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({
  children,
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen overflow-hidden">
        <AppSidebar />

        <div className="flex flex-1 flex-col overflow-hidden">
          <AppHeader />

          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}