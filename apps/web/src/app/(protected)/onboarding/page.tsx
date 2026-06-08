"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { CreateWorkspaceForm } from "@/features/workspaces/forms";
import { useWorkspaces } from "@/features/workspaces/hooks";

export default function OnboardingPage() {
  const router = useRouter();

  const {
    data: workspaces,
    isLoading,
  } = useWorkspaces();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (workspaces?.length) {
      router.replace(
        `/workspaces/${workspaces[0]._id}`,
      );
    }
  }, [
    workspaces,
    isLoading,
    router,
  ]);

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
    <div className="mx-auto max-w-2xl py-12">
      <CreateWorkspaceForm />
    </div>
  );
}