import { CalendarDays, ArrowRight } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { Document } from "../types";
import { cn, formatDate } from "@/lib/utils";
import { DocumentStatusBadge } from "./document-status-badge";

interface DocumentCardProps {
  document: Document;
  onSelect?: (document: Document) => void;
}

export function DocumentCard({ document, onSelect }: DocumentCardProps) {


  const formatedDate = formatDate(document.createdAt);

  return (
    <Card
      className="
        group
        cursor-pointer
        rounded-2xl
        p-5
        transition-all
        duration-200
        hover:-translate-y-0.5
        hover:border-primary/30
        hover:shadow-lg
      "
      onClick={() => onSelect?.(document)}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-lg font-semibold tracking-tight">
            {document.title}
          </h3>

          <div className="mt-3 flex items-center gap-2">
          <DocumentStatusBadge status={document.status} />
          </div>

          <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4" />

            <span>Created {formatedDate}</span>
          </div>
        </div>

        <ArrowRight
          className="
            h-4
            w-4
            text-muted-foreground
            transition-transform
            group-hover:translate-x-1
          "
        />
      </div>
    </Card>
  );
}
