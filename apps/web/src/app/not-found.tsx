import Link from "next/link";

import { layout, typography } from "@/design-system";

import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div
      className="mx-auto flex min-h-[70vh] flex-col items-center justify-center px-6 text-center"
      style={{
        maxWidth: layout.content.marketing,
      }}
    >
      <p className="text-sm font-medium text-primary">404</p>

      <h1 className={`${typography.h1} mt-4`}>Page not found</h1>

      <p
        className={`${typography.bodyLg} mt-4 max-w-2xl text-muted-foreground`}
      >
        The page you are looking for does not exist or may have been moved.
      </p>

      <div className="mt-8 flex flex-col gap-4 sm:flex-row">
        <Button asChild>
          <Link href="/">Back Home</Link>
        </Button>

        <Button asChild variant="outline">
          <Link href="/learn">Explore Learn</Link>
        </Button>
      </div>
    </div>
  );
}
