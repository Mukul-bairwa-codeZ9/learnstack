"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { typography } from "@/design-system";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared";

import { PublicMobileNav } from "./public-mobile-nav";
import { PublicContainer } from "./public-container";
import { useAccess } from "@/features/access/hooks/use-access";
import { PublicUserMenu } from "./public-user-menu";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/#features" },
  { label: "Learn", href: "/learn" },
  { label: "About", href: "/#about" },
];

export function PublicHeader() {
  const pathname = usePathname();

  const { user, isHydrated } = useAccess();

  console.log(user);

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <PublicContainer className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-3">
          <PublicMobileNav />

          <Link href="/" className="text-lg font-bold tracking-tight">
            LearnStack
          </Link>
        </div>
        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${typography.small} ${!active ? "text-muted-foreground" : "text-primary"} transition-colors hover:text-foreground`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />

          {isHydrated ? (
            user ? (
              <PublicUserMenu />
            ) : (
              <Button asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            )
          ) : (
            <div className="h-8 w-8 rounded-full bg-muted animate-pulse" />
          )}
        </div>
      </PublicContainer>
    </header>
  );
}
