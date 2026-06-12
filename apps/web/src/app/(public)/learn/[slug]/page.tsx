import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { getPublicDocument } from "@/features/public-content/api/public-content.api";

import { PublicDocumentPage } from "@/features/public-content/components/public-document-page";

interface LearnPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: LearnPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const document = await getPublicDocument(slug);

    const title = document.seo?.title?.trim() || document.title;

    const description =
      document.seo?.description?.trim() ||
      `Read "${document.title}" on LearnStack.`;

    return {
      title,
      description,

      keywords: document.seo?.keywords ?? [],

      openGraph: {
        title,
        description,
        type: "article",
      },

      twitter: {
        card: "summary_large_image",
        title,
        description,
      },
    };
  } catch {
    return {
      title: "LearnStack",
      description: "Developer learning and documentation platform.",
    };
  }
}

export default async function LearnPage({ params }: LearnPageProps) {
  const { slug } = await params;

  try {
    const document = await getPublicDocument(slug);

    return <PublicDocumentPage document={document} />;
  } catch {
    notFound();
  }
}
