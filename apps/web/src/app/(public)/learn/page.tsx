import { layout } from "@/design-system";
import { getPublicDocuments } from "@/features/public-content/api/public-content.api";
import { Contents } from "@/features/public-content/components";
import { PublicDocumentsQuery } from "@/features/public-content/types";
import type { Metadata } from "next";

interface LearnHomePageProps {
  searchParams: Promise<{
    page?: string;
    search?: string;
    sort?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Learn",
  description:
    "Explore published content and learning resources on LearnStack.",
};

export default async function LearnHomepage({
  searchParams,
}: LearnHomePageProps) {
  const params = await searchParams;

  const documents = await getPublicDocuments({
    page: Number(params.page ?? 1),
    search: params.search ?? "",
    sort: (params.sort || "newest") as PublicDocumentsQuery["sort"],
  });

  return (
    <div className={layout.content.marketing}>
      <Contents
        documents={documents}
        search={params.search ?? ""}
        sort={params.sort ?? ""}
      />
    </div>
  );
}
