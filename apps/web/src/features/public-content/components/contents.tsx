import { TableOfContents } from "lucide-react";

import { EmptyState } from "@/components/feedback";
import { AppPagination } from "@/components/data-display";

import { ContentCard } from "./content-card";
import { ContentsToolbar } from "./contents-page-toolbar";

import { PublicDocumentsResponse } from "../types";

import { typography } from "@/design-system";

interface LearnPageProps {
  documents: PublicDocumentsResponse;
  search?: string;
  sort: string;
}

export function Contents({ documents, search, sort }: LearnPageProps) {
  if (!documents.items.length) {
    return (
      <EmptyState
        icon={TableOfContents}
        title="No learning content found"
        description="Try adjusting your search or check back for newly published guides and documentation."
      />
    );
  }

  const createPageUrl = (pageNumber: number): string => {
    const params = new URLSearchParams();

    if (search) params.set("search", search);
    if (sort) params.set("sort", sort);

    params.set("page", pageNumber.toString());
    return `/learn?${params.toString()}`;
  };

  return (
    <div className="space-y-10">
      <div className="space-y-6 border-b pb-10">
        <div className="space-y-4">
          <p className="text-sm font-medium text-primary">LearnStack Learn</p>

          <h1 className={`${typography.display} max-w-4xl`}>
            Developer guides, documentation, and tutorials.
          </h1>

          <p className={`${typography.bodyLg} max-w-3xl text-muted-foreground`}>
            Explore published learning resources, engineering knowledge, and
            technical documentation from LearnStack.
          </p>
        </div>

        <ContentsToolbar search={search as string} sort={sort} />

        <p className={typography.muted}>
          {documents.meta.total} result
          {documents.meta.total !== 1 ? "s" : ""}
        </p>
      </div>

      <div className="space-y-1">
        <h2 className={typography.h3}>Browse Resources</h2>

        <p className={typography.muted}>
          Latest published content from LearnStack.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {documents.items.map((document) => (
          <ContentCard key={document.id} document={document} />
        ))}
      </div>
      <AppPagination
        currentPage={documents.meta.page}
        totalPages={documents.meta.totalPages}
        buildHref={createPageUrl}
      />
    </div>
  );
}
