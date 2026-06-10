"use client";

import { use } from "react";
import { useDocument } from "@/features/documents/hooks";
import { PageHeader } from "@/components/shared/page-header";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { LoadingState } from "@/components/shared/loading-state";
import { formatDate } from "@/lib/utils";

interface DocumentPageProps {
  params: Promise<{
    workspaceId: string;
    documentId: string;
  }>;
}

export default function DocumentPage({ params }: DocumentPageProps) {
  const { documentId } = use(params);

  const { data: document, isLoading } = useDocument(documentId);

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
          {document.content ? (
            <pre className="whitespace-pre-wrap text-sm text-muted-foreground">
              {JSON.stringify(document.content, null, 2)}
            </pre>
          ) : (
            <p className="text-sm italic text-muted-foreground">
              This document has no content yet. Start editing to add
              information.
            </p>
          )}
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
