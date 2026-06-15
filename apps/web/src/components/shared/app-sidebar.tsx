"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, BookOpen, FolderKanban } from "lucide-react";

import { cn } from "@/lib/utils";

import { ThemeToggle } from "./theme-toggle";

const navigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Workspaces",
    href: "/workspaces",
    icon: FolderKanban,
  },
  {
    label: "Learn",
    href: "/learn",
    icon: BookOpen,
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-72 border-r border-border bg-card h-screen sticky top-0">
      {/* Brand Header */}
      <div className="h-16 flex items-center px-6 border-b border-border">
        <Link
          href="/dashboard"
          className="font-bold tracking-tight text-lg text-foreground transition-opacity hover:opacity-90"
        >
          LearnStack
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navigation.map((item) => {
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

      {/* Profile & Settings Footer Area */}
      <div className="p-4 border-t border-border flex flex-col gap-2 bg-card/50">
        <div className="flex items-center gap-2 justify-between px-2 py-1">
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Interface Theme
          </span>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
}
