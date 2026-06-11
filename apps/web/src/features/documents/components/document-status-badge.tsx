import { Badge } from "@/components/ui/badge";

import { DocumentStatus } from "../types";

interface DocumentStatusBadgeProps {
  status: DocumentStatus;
}

export function DocumentStatusBadge({
  status,
}: DocumentStatusBadgeProps) {
  switch (status) {
    case DocumentStatus.PUBLISHED:
      return (
        <Badge>
          Published
        </Badge>
      );

    case DocumentStatus.ARCHIVED:
      return (
        <Badge variant="secondary">
          Archived
        </Badge>
      );

    case DocumentStatus.DRAFT:
    default:
      return (
        <Badge variant="outline">
          Draft
        </Badge>
      );
  }
}