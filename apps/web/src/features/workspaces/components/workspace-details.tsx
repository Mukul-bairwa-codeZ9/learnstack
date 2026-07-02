"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";

import { Plus } from "lucide-react";

import {
  DocumentList,
  useDocuments,
  DocumentStatus,
  CreateDocumentForm,
} from "@/features/documents";

import { useDialog } from "@/hooks";

import { PageHeader } from "@/components/data-display/headers/page-header";
import { DataToolbar, AppDialog } from "@/components/data-display";
import { LoadingState } from "@/components/feedback/loading-state";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { typography } from "@/design-system";

import { useWorkspace } from "../hooks";
import { WorkspaceOverviewCard } from "./workspace-overview-card";

export function WorkspaceDetails() {
  const params = useParams();
  const createDocumentDialog = useDialog();

  const workspaceId = params.workspaceId as string;

  const { data: workspace, isLoading: isWorkspaceLoading } =
    useWorkspace(workspaceId);

  const { data: documents = [], isLoading: isDocumentsLoading } =
    useDocuments(workspaceId);

  const documentStats = useMemo(() => {
    const published = documents.filter(
      (document) => document.status === DocumentStatus.PUBLISHED,
    ).length;

    const drafts = documents.filter(
      (document) => document.status === DocumentStatus.DRAFT,
    ).length;

    return {
      total: documents.length,
      published,
      drafts,
    };
  }, [documents]);

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
    <div className="space-y-8">
      <PageHeader
        title={workspace.name}
        description={
          workspace.description ||
          "Organize documentation, notes, and learning resources."
        }
      />

      <WorkspaceOverviewCard
        total={documentStats.total}
        published={documentStats.published}
        drafts={documentStats.drafts}
      />
      <section className="space-y-6">
        <div className="flex items-end justify-between">
          <div>
            <h2 className={typography.h3}>Knowledge Base</h2>

            <p className={typography.muted}>
              {documentStats.total} document
              {documentStats.total !== 1 ? "s" : ""} stored in this workspace
            </p>
          </div>
        </div>

        <DataToolbar
          search={
            <Input placeholder="Search documents..." className="max-w-md" />
          }
          actions={
            <Button onClick={createDocumentDialog.openDialog}>
              <Plus /> New Document
            </Button>
          }
        />
        <AppDialog
          open={createDocumentDialog.open}
          onOpenChange={createDocumentDialog.onOpenChange}
          title="Create Document"
          description="Create a new document in this workspace."
        >
          <CreateDocumentForm workspaceId={workspace._id} />
        </AppDialog>
        <DocumentList
          documents={documents}
          workspaceId={workspaceId}
          onCreateDocument={createDocumentDialog.openDialog}
        />
      </section>
    </div>
  );
}
