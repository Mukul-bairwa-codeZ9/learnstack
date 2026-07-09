import Link from "next/link";

import { formatDate } from "@/lib/utils";

import { PublicDocumentSummary } from "../types";

import { typography } from "@/design-system";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ContentCardProps {
  document: PublicDocumentSummary;
}

export function ContentCard({document }: ContentCardProps) {
  return (
    <Link href={`/learn/${document.slug}`} className="group block h-full">
      <Card className=" flex flex-col h-full transition-all duration-200 group-hover:shadow-md group-hover:border-primary/30 group-hover:-translate-y-1">
        <CardHeader className="space-y-3">
          {document.category && (
            <Badge variant="secondary" className="w-fit">
              {document.category}
            </Badge>
          )}

          <CardTitle className={`line-clamp-2 ${typography.h4}`}>
            {document.title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1">
          {document.excerpt ? (
            <p className={`line-clamp-3 ${typography.muted}`}>
              {document.excerpt}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              No description available.
            </p>
          )}
        </CardContent>

        <CardFooter className={`flex items-center justify-between`}>
          <>
            <span className={typography.caption}>
              {document.publishedAt
                ? formatDate(document.publishedAt)
                : "Draft"}
            </span>

            <span
              className="
      text-sm font-medium text-primary
      opacity-0 transition-opacity
      group-hover:opacity-100
    "
            >
              Read Article →
            </span>
          </>
        </CardFooter>
      </Card>
    </Link>
  );
}
