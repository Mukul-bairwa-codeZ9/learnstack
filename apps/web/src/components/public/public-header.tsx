import Link from "next/link";

import { layout, typography } from "@/design-system";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/shared";

import { PublicMobileNav } from "./public-mobile-nav";

const navigation = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Learn", href: "/learn" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function PublicHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur">
      <div
        className="mx-auto flex h-16 w-full items-center justify-between px-6"
        style={{
          maxWidth: layout.content.marketing,
        }}
      >
        <div className="flex items-center gap-3">
          <PublicMobileNav />

          <Link
            href="/"
            className="text-lg font-bold tracking-tight"
          >
            LearnStack
          </Link>
        </div>

        <nav className="hidden items-center gap-8 lg:flex">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${typography.small} text-muted-foreground transition-colors hover:text-foreground`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />

          <Button asChild>
            <Link href="/sign-in">
              Sign In
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}