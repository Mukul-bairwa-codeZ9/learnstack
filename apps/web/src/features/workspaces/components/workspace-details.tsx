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
import { typography } from "@/design-system";
import { AppSelect, DataToolbar } from "@/components/shared";
import { Input } from "@/components/ui/input";
import { DOCUMENT_SORT_OPTIONS } from "@/constants";

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
      />
      <section className="space-y-4">
        <div>
          <h2 className={`${typography.h3} tracking-tight`}>
            Workspace Documents
          </h2>
          <p className={typography.psmall}>
            {documents.length} document{documents.length !== 1 ? "s" : ""}
          </p>
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
        <DocumentList documents={documents} />
      </section>
    </div>
  );
}
