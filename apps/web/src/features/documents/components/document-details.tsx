"use client";

import Link from "next/link";
import { use, useEffect } from "react";
import { toast } from "sonner";
import { formatDate } from "@/lib/utils";
import { Settings } from "lucide-react";

import { typography } from "@/design-system";

import { PageHeader } from "@/components/data-display/headers/page-header";
import { LoadingState } from "@/components/feedback/loading-state";
import { Button } from "@/components/ui/button";

import { useDocumentEditor } from "@/features/editor";
import { EditorShell, EditorStatus } from "@/features/editor";
import { DEFAULT_EDITOR_CONTENT } from "@/features/editor";

import { DocumentStatusBadge } from "./document-status-badge";
import { DocumentPublishActions } from "./document-publish-actions";
import { useDocument, useUpdateDocument } from "../hooks";
import { DocumentStatus } from "../types";
import { isDocumentEmpty } from "../helpers";

interface DocumentPageProps {
  params: Promise<{
    workspaceId: string;
    documentId: string;
  }>;
}

export function DocumentDetails({ params }: DocumentPageProps) {
  const { documentId ,workspaceId } = use(params);

  const { data: document, isLoading } = useDocument(documentId);

  const { getContent, handleChange, isDirty, setContent, setIsDirty } =
    useDocumentEditor();

  const updateDocumentMutation = useUpdateDocument();

  const contentToCheck = isDirty ? getContent() : document?.content;

  const showPublishedEmptyWarning =
    document?.status === DocumentStatus.PUBLISHED &&
    isDocumentEmpty(contentToCheck);

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
        id: document.id,
        payload: {
          content: getContent(),
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
        actions={
          <Button asChild>
            <Link
              href={`/workspaces/${workspaceId}/documents/${document.id}/settings`}
            >
              <Settings />
              Settings
            </Link>
          </Button>
        }
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
            documentId={document.id}
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

      {showPublishedEmptyWarning && (
        <div className="rounded-xl text-xs border border-yellow-500/30 bg-yellow-500/10 p-4">
          <div className="space-y-1">
            <p className="font-medium text-yellow-700 dark:text-yellow-400">
              Published document has no content
            </p>

            <p className={typography.muted}>
              This document is currently published but contains no visible
              content. Visitors will see a blank page until content is added or
              the document is unpublished.
            </p>
          </div>
        </div>
      )}

      <EditorShell
        initialContent={document.content ?? DEFAULT_EDITOR_CONTENT}
        onChange={handleChange}
      />
    </div>
  );
}
