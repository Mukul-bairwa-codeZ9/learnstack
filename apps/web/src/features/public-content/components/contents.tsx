import { ContentCard } from "./content-card";
import { TableOfContents } from "lucide-react";

import { PublicDocumentsResponse } from "../types/public-document.types";
import { EmptyState } from "@/components/shared/empty-state";
import { AppPagination, PageHeader } from "@/components/shared";
import { ContentsToolbar } from "./contents-page-toolbar";
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
        title="No published content found"
        description=" Try a different search term or come back later."
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
    <div className="space-y-8">
      <PageHeader
        title="Learn"
        description="Explore published content from LearnStack."
      />
      <ContentsToolbar search={search as string} sort={sort} />
      <p className={typography.muted}>
        {documents.meta.total} result
        {documents.meta.total !== 1 ? "s" : ""}
      </p>

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
