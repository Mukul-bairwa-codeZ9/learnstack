import { PublicContainer } from "@/components/public";
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

  const publicDocuments  = await getPublicDocuments({
    page: Number(params.page ?? 1),
    search: params.search ?? "",
    sort: (params.sort || "newest") as PublicDocumentsQuery["sort"],
  });

  return (
    <PublicContainer className="py-12">
      <Contents
        documents={publicDocuments }
        search={params.search ?? ""}
        sort={params.sort ?? ""}
      />
    </PublicContainer>
  );
}
