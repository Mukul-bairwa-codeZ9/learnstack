"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { SIDEBAR_LINKS } from "@/constants";

import { ThemeToggle } from "../../theme";
import { LogoutButton } from "@/features/auth/components/logout-button";

export function SidebarContent() {
  const pathname = usePathname();

  return (
    <>
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link
          href="/dashboard"
          className="font-bold tracking-tight text-lg text-foreground transition-opacity hover:opacity-90"
        >
          LearnStack
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto">
        <nav className="p-4 space-y-1">
          {SIDEBAR_LINKS.map((item) => {
            const Icon = item.icon;
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-150 outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto border-t border-border p-4">
        <div className="flex items-center gap-2 justify-between px-2 py-1">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Interface Theme
          </span>
          <ThemeToggle />
        </div>
        <LogoutButton />
      </div>
    </>
  );
}

export function AppSidebar() {
  return (
    <aside className="hidden lg:flex h-full w-64 shrink-0 flex-col border-r border-border bg-card">
      <SidebarContent />
    </aside>
  );
}
