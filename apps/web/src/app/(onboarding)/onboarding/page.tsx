"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { CreateWorkspaceForm } from "@/features/workspaces/forms";
import { useWorkspaces } from "@/features/workspaces/hooks";
import { layout, typography } from "@/design-system";

export default function OnboardingPage() {
  const router = useRouter();

  const { data, isLoading, isError } = useWorkspaces();

  const workspaces = data?.items;

  useEffect(() => {
    if (isLoading || isError) {
      return;
    }

    if (workspaces?.length) {
      router.replace(`/workspaces/${workspaces[0].id}`);
    }
  }, [workspaces, isLoading, isError, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (workspaces?.length) {
    return null;
  }

  return (
    <div
      className="mx-auto flex min-h-screen flex-col justify-center py-12 px-4 md:px-6"
      style={{ maxWidth: layout.content.reading }}
    >
      <div className="mb-8 text-center space-y-3">
        <h1 className={`${typography.h1} tracking-tight font-bold`}>
          Welcome to LearnStack
        </h1>
        <p
          className={`${typography.bodyLg} text-muted-foreground max-w-md mx-auto`}
        >
          Let&apos;s build your initial setup. A workspace acts as your primary
          hub for organizing documentation, notes, and technical knowledge
          guides.
        </p>
      </div>
      <CreateWorkspaceForm />
    </div>
  );
}
