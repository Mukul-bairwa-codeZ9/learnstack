"use client";

import { useRouter } from "next/navigation";
import { FileText, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import { EmptyState } from "@/components/feedback/empty-state";

import { Document } from "../types";
import { DocumentCard } from "./document-card";

interface DocumentListProps {
  documents: Document[];
  workspaceId: string;
  onCreateDocument: () => void;
}
export function DocumentList({
  documents,
  workspaceId,
  onCreateDocument,
}: DocumentListProps) {
  const router = useRouter();

  if (!documents.length) {
    return (
      <EmptyState
        icon={FileText}
        title="No documents found"
        description="Create your first document and start building your knowledge base."
        action={
          <Button onClick={onCreateDocument}>
            <Plus /> Create Document
          </Button>
        }
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {documents.map((document) => (
        <DocumentCard
          key={document._id}
          document={document}
          onSelect={(doc) =>
            router.push(`/workspaces/${workspaceId}/documents/${doc._id}`)
          }
        />
      ))}
    </div>
  );
}
