// app-header.tsx
import { MobileSidebar } from "./app-mobile-nav";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-10 border-b bg-background/95 backdrop-blur">
      <div className="flex h-16 items-center gap-3 px-6">
        <MobileSidebar />
        <span className="text-sm text-muted-foreground">Workspace</span>
      </div>
    </header>
  );
}