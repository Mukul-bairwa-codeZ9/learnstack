// import { Badge } from "@/components/ui/badge";

// import { DocumentStatus } from "../types";

// interface DocumentStatusBadgeProps {
//   status: DocumentStatus;
// }

// export function DocumentStatusBadge({ status }: DocumentStatusBadgeProps) {
//   switch (status) {
//     case DocumentStatus.PUBLISHED:
//       return (
//         <Badge className="text-[10px] font-medium uppercase tracking-wide border-green-200 bg-green-100 text-green-700 dark:border-green-900 dark:bg-green-950/50 dark:text-green-400">
//           Published
//         </Badge>
//       );

//     case DocumentStatus.ARCHIVED:
//       return <Badge className="border-amber-200 bg-amber-100 text-amber-700 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-400">Archived</Badge>;

//     case DocumentStatus.DRAFT:
//     default:
//       return (
//         <Badge className="border-amber-200 bg-amber-100 text-amber-700 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-400">
//           Draft
//         </Badge>
//       );
//   }
// }





















import { Badge } from "@/components/ui/badge";

import { DocumentStatus } from "../types";

interface DocumentStatusBadgeProps {
  status: DocumentStatus;
}

export function DocumentStatusBadge({ status }: DocumentStatusBadgeProps) {
  switch (status) {
    case DocumentStatus.PUBLISHED:
      return (
        <Badge className="text-[10px] font-medium uppercase tracking-wide border-green-200 bg-green-100 text-green-700 dark:border-green-900 dark:bg-green-950/50 dark:text-green-400">
          Published
        </Badge>
      );

    case DocumentStatus.ARCHIVED:
      return (
        <Badge className="text-[10px] font-medium uppercase tracking-wide border-slate-200 bg-slate-100 text-slate-700 dark:border-slate-800 dark:bg-slate-900/50 dark:text-slate-400">
          Archived
        </Badge>
      );

    case DocumentStatus.DRAFT:
    default:
      return (
        <Badge className="text-[10px] font-medium uppercase tracking-wide border-amber-200 bg-amber-100 text-amber-700 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-400">
          Draft
        </Badge>
      );
  }
}