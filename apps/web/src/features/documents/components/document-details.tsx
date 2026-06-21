"use client";

import { use, useEffect } from "react";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";


import { useDocumentEditor } from "@/features/editor";
import { EditorShell, EditorStatus } from "@/features/editor";
import { DEFAULT_EDITOR_CONTENT } from "@/features/editor";

import { DocumentStatusBadge } from "./document-status-badge";
import { DocumentPublishActions } from "./document-publish-actions";
import { useDocument, useUpdateDocument } from "../hooks";

import { PageHeader } from "@/components/shared/page-header";
import { LoadingState } from "@/components/shared/loading-state";
import { Button } from "@/components/ui/button";

interface DocumentPageProps {
  params: Promise<{
    workspaceId: string;
    documentId: string;
  }>;
}

export function DocumentDetails({ params }: DocumentPageProps) {
  const { documentId } = use(params);

  const { data: document, isLoading } = useDocument(documentId);

  const { content, handleChange, isDirty, setContent, setIsDirty } =
    useDocumentEditor();

  const updateDocumentMutation = useUpdateDocument();

  useEffect(() => {
    if (!document) {
      return;
    }

    setContent(document.content ?? DEFAULT_EDITOR_CONTENT);

    setIsDirty(false);
  }, [document, setIsDirty, setContent]);

  if (isLoading) {
    return <LoadingState message="Loading Document..." />;
  }

  if (!document) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        Document not found.
      </div>
    );
  }

  async function handleSave() {
    if (!document) {
      return;
    }

    try {
      await updateDocumentMutation.mutateAsync({
        id: document._id,
        payload: {
          content,
        },
      });

      setIsDirty(false);

      toast.success("Document saved");
    } catch {
      toast.error("Failed to save document");
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title={document.title}
        description={`Published URL slug: ${document.slug}`}
      />

      <div className="flex flex-col gap-4 rounded-xl border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <DocumentStatusBadge status={document.status} />

          <EditorStatus
            isDirty={isDirty}
            isSaving={updateDocumentMutation.isPending}
          />

          <span className="text-sm text-muted-foreground">
            Updated {formatDate(document.updatedAt)}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <DocumentPublishActions
            documentId={document._id}
            status={document.status}
          />

          <Button
            onClick={handleSave}
            disabled={!isDirty || updateDocumentMutation.isPending}
          >
            {updateDocumentMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </div>
      </div>

      <EditorShell content={content} onChange={handleChange} />
    </div>
  );
}
