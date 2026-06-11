"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  usePublishDocument,
  useUnpublishDocument,
  useArchiveDocument,
} from "../hooks";

import { DocumentStatus } from "../types";

import { PublishDocumentDialog } from "./publish-document-dialog";

interface DocumentPublishActionsProps {
  documentId: string;
  status: DocumentStatus;
}

export function DocumentPublishActions({
  documentId,
  status,
}: DocumentPublishActionsProps) {
  const [open, setOpen] = useState(false);

  const publishMutation = usePublishDocument();

  const unpublishMutation = useUnpublishDocument();

  const archiveMutation = useArchiveDocument();

  const handlePublish = async () => {
    await publishMutation.mutateAsync(documentId);

    setOpen(false);
  };

  if (status === DocumentStatus.DRAFT) {
    return (
      <>
        <Button onClick={() => setOpen(true)}>Publish</Button>

        <PublishDocumentDialog
          open={open}
          onOpenChange={setOpen}
          onConfirm={handlePublish}
          isLoading={publishMutation.isPending}
        />
      </>
    );
  }

  if (status === DocumentStatus.PUBLISHED) {
    return (
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => unpublishMutation.mutate(documentId)}
        >
          Unpublish
        </Button>

        <Button
          variant="destructive"
          onClick={() => archiveMutation.mutate(documentId)}
        >
          Archive
        </Button>
      </div>
    );
  }

  if (status === DocumentStatus.ARCHIVED) {
    return (
      <Button onClick={() => publishMutation.mutate(documentId)}>
        Republish
      </Button>
    );
  }

  return null;
}
