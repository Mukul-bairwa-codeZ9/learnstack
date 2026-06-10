"use client";

import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";

import { EmptyState } from "@/components/shared/empty-state";

import { Document } from "../types";

import { DocumentCard } from "./document-card";

interface DocumentListProps {
  documents: Document[];
}

export function DocumentList({ documents }: DocumentListProps) {
  const router = useRouter();

  if (!documents.length) {
    return (
      <EmptyState
        icon={FileText}
        title="No documents yet"
        description="Create your first document to start writing."
      />
    );
  }

  return (
    <div className="grid gap-4">
      {documents.map((document) => (
        <DocumentCard
          key={document._id}
          document={document}
          onSelect={(doc) =>
            router.push(`/workspaces/${doc.workspaceId}/documents/${doc._id}`)
          }
        />
      ))}
    </div>
  );
}
