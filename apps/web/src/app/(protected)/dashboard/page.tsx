"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useWorkspaces } from "@/features/workspaces/hooks";

export default function DashboardPage() {
  const router = useRouter();

  const {
    data,
    isLoading,
    isError,
  } = useWorkspaces();

  useEffect(() => {
   if (isLoading || isError) {
      return;
    }
  const workspaces = data?.items;

    if (!workspaces?.length) {
      router.replace("/onboarding");
      return;
    }

    router.replace(
      `/workspaces/${workspaces[0].id}`,
    );
  }, [
    data?.items,
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