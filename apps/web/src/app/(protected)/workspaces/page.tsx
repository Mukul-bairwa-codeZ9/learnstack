"use client";

import { FolderKanban, Plus } from "lucide-react";

import { WorkspaceList } from "@/features/workspaces/components";
import {
  CreateWorkspaceForm,
} from "@/features/workspaces";

import { useDialog } from "@/hooks";

import { AppDialog, PageHeader } from "@/components/data-display";
import { EmptyState, LoadingState } from "@/components/feedback";

import { useWorkspaces } from "@/features/workspaces/hooks";

import { typography } from "@/design-system";
import { Button } from "@/components/ui/button";

export default function WorkspacesPage() {
  const createWorkspaceDialog = useDialog();
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
          action={
            <Button onClick={createWorkspaceDialog.openDialog}>
              <Plus /> New Workspace
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Workspaces"
        description="Manage your projects, teams, and knowledge-base documentation panels."
        actions={
          <Button onClick={createWorkspaceDialog.openDialog}>
            <Plus /> New Workspace
          </Button>
        }
      />

      <div className="space-y-6">
        <div>
          <h2 className={`${typography.h3} tracking-tight`}>
            Your Collections
          </h2>
          <p className={typography.muted}>
            You have access to {workspaces.length} workspace
            {workspaces.length !== 1 ? "s" : ""}
          </p>
        </div>
        <WorkspaceList workspaces={workspaces} />
      </div>
      <AppDialog
        open={createWorkspaceDialog.open}
        onOpenChange={createWorkspaceDialog.onOpenChange}
        title="Create Workspace"
        description="Create a new workspace to organize your documents."
      >
        <CreateWorkspaceForm />
      </AppDialog>
    </div>
  );
}
