import Link from "next/link";

import { Button } from "@/components/ui/button";

export function WorkspaceEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <h2 className="text-2xl font-semibold">
        No workspaces found
      </h2>

      <p className="mt-2 text-muted-foreground">
        Create your first workspace to get started.
      </p>

      <Button asChild className="mt-6">
        <Link href="/onboarding">
          Create Workspace
        </Link>
      </Button>
    </div>
  );
}