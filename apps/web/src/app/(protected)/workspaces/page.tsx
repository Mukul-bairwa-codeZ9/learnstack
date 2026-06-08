"use client";

import {
  WorkspaceEmptyState,
  WorkspaceList,
} from "@/features/workspaces/components";

import {
  useWorkspaces,
} from "@/features/workspaces/hooks";


export default function WorkspacesPage() {
  const { data, isLoading } =
    useWorkspaces();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data?.length) {
    return <WorkspaceEmptyState />;
  }

  return (
    <WorkspaceList
      workspaces={data}
    />
  );
}