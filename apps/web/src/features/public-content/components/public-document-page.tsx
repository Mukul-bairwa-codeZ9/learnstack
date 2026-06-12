"use client";
import { DocumentRenderer } from "./document-renderer";

import type { PublicDocument } from "../types/public-document.types";
import { formatDate } from "@/lib/utils";

interface PublicDocumentPageProps {
  document: PublicDocument;
}

export function PublicDocumentPage({ document }: PublicDocumentPageProps) {
  const formattedDate = formatDate(document.publishedAt);
  return (
    <article className="mx-auto max-w-4xl py-12">
      <header className="mb-10">
        <h1 className="text-4xl font-bold">{document.title}</h1>

        {document.publishedAt && (
          <p className="mt-3 text-sm text-muted-foreground">
            Published {formattedDate}
          </p>
        )}
      </header>

      <DocumentRenderer content={document.content} />
    </article>
  );
}
