"use client";

import { useParams } from "next/navigation";

import { useWorkspace } from "@/features/workspaces/hooks";

export default function WorkspacePage() {
  const params = useParams();

  const workspaceId =
    params.workspaceId as string;

  const {
    data: workspace,
    isLoading,
  } = useWorkspace(workspaceId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        Loading workspace...
      </div>
    );
  }

  if (!workspace) {
    return (
      <div className="py-12">
        Workspace not found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">
        {workspace.name}
      </h1>

      <p className="text-muted-foreground">
        {workspace.description ||
          "No description available."}
      </p>
    </div>
  );
}