import Link from "next/link";

import { PublicDocumentSummary } from "../types/public-document.types";
import { formatDate } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ContentCardProps {
  document: PublicDocumentSummary;
}

export function ContentCard({ document }: ContentCardProps) {
  return (
   <Link href={`/learn/${document.slug}`} className="group block h-full">
      <Card className="h-full transition-all duration-200 group-hover:shadow-md group-hover:border-primary/30">
        <CardHeader className="space-y-3">
          {document.category && (
            <Badge
              variant="secondary"
              className="w-fit"
            >
              {document.category}
            </Badge>
          )}

          <CardTitle className="line-clamp-2 text-xl">
            {document.title}
          </CardTitle>
        </CardHeader>

        <CardContent>
          {document.excerpt ? (
            <p className="line-clamp-3 text-sm text-muted-foreground">
              {document.excerpt}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              No description available.
            </p>
          )}
        </CardContent>

        <CardFooter className="flex items-center justify-between text-xs text-muted-foreground">
          <span>
            {document.publishedAt
              ? formatDate(document.publishedAt)
              : "Draft"}
          </span>

          <span className="transition-transform group-hover:translate-x-1">
            Read More →
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
