import Link from "next/link";

import { FOOTER_LINKS } from "@/constants";

import { typography } from "@/design-system";

import { PublicContainer } from "../layout";

export function PublicFooter() {
  return (
    <footer className="border-t">
      <PublicContainer
        className="
    flex flex-col gap-8 py-12
    md:flex-row md:items-start md:justify-between
  "
      >
        <div className="space-y-2">
          <h3 className="font-bold tracking-tight">LearnStack</h3>

          <p className={typography.muted}>Developer learning platform.</p>
        </div>

        <div className="flex flex-col gap-3">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${typography.small} text-muted-foreground transition-colors hover:text-foreground`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </PublicContainer>
    </footer>
  );
}
