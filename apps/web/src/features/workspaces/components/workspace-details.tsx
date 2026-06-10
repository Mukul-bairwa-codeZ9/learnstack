"use client";

import { useParams } from "next/navigation";

import { useWorkspace } from "@/features/workspaces/hooks";
import { PageHeader } from "@/components/shared/page-header";

import {
  CreateDocumentDialog,
  DocumentList,
} from "@/features/documents/components";

import { useDocuments } from "@/features/documents/hooks";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { LoadingState } from "@/components/shared/loading-state";

export function WorkspaceDetails() {
  const params = useParams();

  const workspaceId = params.workspaceId as string;

  const { data: workspace, isLoading: isWorkspaceLoading } =
    useWorkspace(workspaceId);

  const { data: documents = [], isLoading: isDocumentsLoading } =
    useDocuments(workspaceId);

  if (isWorkspaceLoading || isDocumentsLoading) {
    return <LoadingState message="Loading workspace..." />;
  }

  if (!workspace) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        Workspace not found.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <PageHeader
        title={workspace.name}
        description={workspace.description || "No description available."}
        actions={<CreateDocumentDialog workspaceId={workspaceId} />}
      />
      <Separator />

      <div className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">
          Workspace Documents
        </h2>
        <DocumentList documents={documents} />
      </div>
    </div>
  );
}
