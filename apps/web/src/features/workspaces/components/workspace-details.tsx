"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";

import { Loader2, Plus } from "lucide-react";

import {
  DocumentList,
  useDocuments,
  DocumentStatus,
  CreateDocumentForm,
} from "@/features/documents";

import { useDebounce, useDialog } from "@/hooks";

import { PageHeader } from "@/components/data-display/headers/page-header";
import { DataToolbar, AppDialog } from "@/components/data-display";
import { LoadingState } from "@/components/feedback/loading-state";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { typography } from "@/design-system";

import { useWorkspace } from "../hooks";
import { WorkspaceOverviewCard } from "./workspace-overview-card";

export function WorkspaceDetails() {
  const [search, setSearch] = useState("");

  const debouncedSearch = useDebounce(search, 400);

  const params = useParams();
  const createDocumentDialog = useDialog();

  const workspaceId = params.workspaceId as string;

  const { data: workspace, isLoading: isWorkspaceLoading } =
    useWorkspace(workspaceId);

  const {
    data: documents = [],
    isLoading: isDocumentsLoading,
    isFetching: isDocumentsFetching,
  } = useDocuments({
    workspaceId,
    search: debouncedSearch.trim() || undefined,
  });

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

  if (isWorkspaceLoading) {
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
            <div className="relative max-w-md">
              <Input
                placeholder="Search documents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pr-10"
              />

              {isDocumentsFetching && (
                <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
              )}
            </div>
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
          description="Create a new document inside this workspace."
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
