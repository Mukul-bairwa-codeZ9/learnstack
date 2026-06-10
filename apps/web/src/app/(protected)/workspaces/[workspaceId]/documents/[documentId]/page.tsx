"use client";

import { use, useEffect } from "react";
import { useDocument, useUpdateDocument } from "@/features/documents/hooks";
import { PageHeader } from "@/components/shared/page-header";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingState } from "@/components/shared/loading-state";
import { formatDate } from "@/lib/utils";
import { useDocumentEditor } from "@/features/editor/hooks";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Editor } from "@/features/editor/components";

interface DocumentPageProps {
  params: Promise<{
    workspaceId: string;
    documentId: string;
  }>;
}

export default function DocumentPage({ params }: DocumentPageProps) {
  const { documentId } = use(params);

  const { data: document, isLoading } = useDocument(documentId);

  const { content, handleChange, isDirty, setContent, setIsDirty } =
    useDocumentEditor();

  const updateDocumentMutation = useUpdateDocument();

  useEffect(() => {
    if (!document) {
      return;
    }

    setContent(document.content);

    setIsDirty(false);
  }, [document]);

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

  const formattedDate = formatDate(document.createdAt);

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
      {/* 3. Reusable PageHeader with metadata status badge */}
      <PageHeader
        title={document.title}
        description={`Slug: ${document.slug}`}
        actions={
          <Badge
            variant={document.status === "PUBLISHED" ? "default" : "secondary"}
          >
            {document.status}
          </Badge>
        }
      />

      <Separator />

      {/* 4. Document Canvas / Content Area placeholder */}
      <Card className="min-h-[400px]">
        <CardContent className="py-6">
          <div className="space-y-4">
            <div className="flex justify-end">
              <Button
                onClick={handleSave}
                disabled={!isDirty || updateDocumentMutation.isPending}
              >
                {updateDocumentMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>

            <Editor content={content} onChange={handleChange} />
          </div>
        </CardContent>
        <CardContent className="py-4">
          <div className="flex gap-6 text-sm text-muted-foreground">
            <span>Created: {formattedDate}</span>

            <span>Status: {document.status}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
