"use client";

import { useMemo } from "react";
import { useParams } from "next/navigation";

import {
  CreateDocumentDialog,
  DocumentList,
  useDocuments,DocumentStatus
} from "@/features/documents";

import { PageHeader } from "@/components/shared/page-header";
import { DataToolbar } from "@/components/shared";
import { LoadingState } from "@/components/shared/loading-state";


import { Input } from "@/components/ui/input";

import { typography } from "@/design-system";

import { useWorkspace } from "../hooks";
import { WorkspaceOverviewCard } from "./workspace-overview-card";

export function WorkspaceDetails() {
  const params = useParams();

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
          actions={<CreateDocumentDialog workspaceId={workspace._id} />}
        />
        <DocumentList documents={documents} workspaceId={workspaceId} />
      </section>
    </div>
  );
}
