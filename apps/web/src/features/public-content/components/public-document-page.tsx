import { layout, typography } from "@/design-system";
import { formatDate } from "@/lib/utils";
import { DocumentRenderer } from "./document-renderer";
import { PublicDocument } from "../types";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft } from "lucide-react";

interface Props {
  document: PublicDocument;
}

export function PublicDocumentPage({ document }: Props) {
  const formattedDate = formatDate(document.publishedAt);

  return (
    <article
      className="mx-auto max-w-4xl py-16 lg:py-24"
      style={{
        maxWidth: layout.content.reading,
      }}
    >
      <Link
        href="/learn"
        className="
inline-flex items-center gap-2
text-sm font-medium
text-muted-foreground
hover:text-foreground
transition-colors 
"
      >
        <ArrowLeft className="h-4 w-4" /> Back to Learn
      </Link>
      <header className="max-w-3xl space-y-8">
        <p className="text-sm font-medium text-primary">LearnStack Learn</p>

        <h1 className={typography.display}>{document.title}</h1>

        {document.seo?.description && (
          <p className={`${typography.bodyLg} max-w-2xl text-muted-foreground`}>
            {document.seo.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Published {formattedDate}</span>
        </div>
        <Separator />
      </header>

      <DocumentRenderer content={document.content} />
    </article>
  );
}
