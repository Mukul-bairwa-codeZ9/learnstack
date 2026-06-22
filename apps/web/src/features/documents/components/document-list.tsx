"use client";

import { useRouter } from "next/navigation";
import { FileText } from "lucide-react";

import { EmptyState } from "@/components/feedback/empty-state";

import { Document } from "../types";
import { DocumentCard } from "./document-card";
import { CreateDocumentDialog } from "./create-document-dialog";

interface DocumentListProps {
  documents: Document[];
  workspaceId: string;
}

export function DocumentList({ documents, workspaceId }: DocumentListProps) {
  const router = useRouter();

  if (!documents.length) {
    return (
      <EmptyState
        icon={FileText}
        title="No documents found"
        description="Create your first document and start building your knowledge base."
        action={<CreateDocumentDialog workspaceId={workspaceId} />}
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
            router.push(`/workspaces/${doc.workspaceId}/documents/${doc._id}`)
          }
        />
      ))}
    </div>
  );
}
