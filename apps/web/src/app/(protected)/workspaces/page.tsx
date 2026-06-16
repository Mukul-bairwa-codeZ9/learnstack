"use client";

import { FolderKanban } from "lucide-react";

import { PageHeader, EmptyState, LoadingState } from "@/components/shared";
import { WorkspaceList } from "@/features/workspaces/components";
import { CreateWorkspaceDialog } from "@/features/workspaces/components/create-workspace-dialog"; // Adjust import path if needed
import { useWorkspaces } from "@/features/workspaces/hooks";
import { typography } from "@/design-system";

export default function WorkspacesPage() {
  const { data: workspaces = [], isLoading } = useWorkspaces();

  if (isLoading) {
    return <LoadingState message="Loading workspaces..." />;
  }

  if (!workspaces.length) {
    return (
      <div className="space-y-8">
        <PageHeader
          title="Workspaces"
          description="Manage your projects, teams, and knowledge-base documentation panels."
        />
        <EmptyState
          icon={FolderKanban}
          title="No workspaces yet"
          description="Create your first workspace to start organizing documents and collaborating."
          action={<CreateWorkspaceDialog />}
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Workspaces"
        description="Manage your projects, teams, and knowledge-base documentation panels."
        actions={<CreateWorkspaceDialog />}
      />

      <div className="space-y-6">
        <div>
          <h2 className={`${typography.h3} tracking-tight`}>Your Collections</h2>
          <p className={typography.muted}>
            You have access to {workspaces.length} workspace{workspaces.length !== 1 ? "s" : ""}
          </p>
        </div>
        <WorkspaceList workspaces={workspaces} />
      </div>
    </div>
  );
}