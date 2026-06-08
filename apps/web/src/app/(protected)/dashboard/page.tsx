"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useWorkspaces } from "@/features/workspaces/hooks";

export default function DashboardPage() {
  const router = useRouter();

  const {
    data: workspaces,
    isLoading,
    isError,
  } = useWorkspaces();

  useEffect(() => {
    if (isLoading) {
      return;
    }

    if (isError) {
      return;
    }

    if (!workspaces?.length) {
      router.replace("/onboarding");
      return;
    }

    router.replace(
      `/workspaces/${workspaces[0]._id}`,
    );
  }, [
    workspaces,
    isLoading,
    isError,
    router,
  ]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      Loading workspace...
    </div>
  );
}