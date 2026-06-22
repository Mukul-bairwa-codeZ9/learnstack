import { BookOpen, FolderKanban } from "lucide-react";

export const NAVIGATION_LINKS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Learn", href: "/learn" },
  { label: "About", href: "/#about" },
];

export const SIDEBAR_LINKS = [
  // { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Workspaces", href: "/workspaces", icon: FolderKanban },
  { label: "Learn", href: "/learn", icon: BookOpen },
];

export const FOOTER_LINKS = [
  {
    label: "Features",
    href: "/features",
  },
  {
    label: "Learn",
    href: "/learn",
  },
  {
    label: "About",
    href: "/about",
  },
  {
    label: "Sign In",
    href: "/sign-in",
  },
];
