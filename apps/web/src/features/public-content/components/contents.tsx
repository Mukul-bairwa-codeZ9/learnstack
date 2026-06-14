import { ContentCard } from "./content-card";

import { PublicDocumentsResponse } from "../types/public-document.types";
import { EmptyState } from "@/components/shared/empty-state";
import { TableOfContents } from "lucide-react";
import { SearchBar } from "./search-content";
import { AppPagination } from "@/components/shared";
import { ContentsToolbar } from "./contents-page-toolbar";

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
      <div>
        <h1 className="text-4xl font-bold">Learn</h1>

        <p className="mt-2 text-muted-foreground">
          Explore published content from LearnStack.
        </p>
      </div>
      <ContentsToolbar search={search as string} sort={sort} />
      <p className="text-sm text-muted-foreground">
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
