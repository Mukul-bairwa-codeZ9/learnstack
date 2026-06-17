"use client";

import { useParams } from "next/navigation";

import { useWorkspace } from "@/features/workspaces/hooks";
import { PageHeader } from "@/components/shared/page-header";

import {
  CreateDocumentDialog,
  DocumentList,
} from "@/features/documents/components";

import { useDocuments } from "@/features/documents/hooks";
import { LoadingState } from "@/components/shared/loading-state";
import { typography } from "@/design-system";
import { AppSelect, DataToolbar } from "@/components/shared";
import { Input } from "@/components/ui/input";
import { DOCUMENT_SORT_OPTIONS } from "@/constants";

import { Card, CardContent } from "@/components/ui/card";
import { DocumentStatus } from "@/features/documents/types";
import { useMemo } from "react";
import { WorkspaceCard } from "./workspace-card";
import { WorkspaceOverviewCard } from "./workspace-overview-card";

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

const documentStats = useMemo(() => {
  const published = documents.filter(
    (document) =>
      document.status ===
      DocumentStatus.PUBLISHED,
  ).length;

  const drafts = documents.filter(
    (document) =>
      document.status ===
      DocumentStatus.DRAFT,
  ).length;

  return {
    total: documents.length,
    published,
    drafts,
  };
}, [documents]);

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
          // controls={
          //   <AppSelect
          //     options={DOCUMENT_SORT_OPTIONS}
          //     placeholder="Sort"
          //     className="w-[220px]"
          //   />
          // }
          actions={<CreateDocumentDialog workspaceId={workspace._id} />}
        />
        <DocumentList documents={documents} workspaceId={workspaceId} />
      </section>
    </div>
  );
}
