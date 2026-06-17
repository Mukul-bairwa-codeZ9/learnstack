import { layout, typography } from "@/design-system";
import { formatDate } from "@/lib/utils";
import { DocumentRenderer } from "./document-renderer";
import { PublicDocument } from "../types";

interface Props {
  document: PublicDocument;
}

export function PublicDocumentPage({ document }: Props) {
  const formattedDate = formatDate(document.publishedAt);

  return (
    <article
      className="mx-auto max-w-4xl py-12"
      style={{
        maxWidth: layout.content.reading,
      }}
    >
      <header className="space-y-6">
        <p className="text-sm font-medium text-muted-foreground">
          LearnStack Learn
        </p>

        <h1 className={typography.display}>{document.title}</h1>

        {document.seo?.description && (
          <p className={`${typography.bodyLg} max-w-2xl text-muted-foreground`}>
            {document.seo.description}
          </p>
        )}

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Published {formattedDate}</span>
        </div>
      </header>

      <div className="mt-12 lg:mt-16">
        <DocumentRenderer content={document.content} />
      </div>
    </article>
  );
}
