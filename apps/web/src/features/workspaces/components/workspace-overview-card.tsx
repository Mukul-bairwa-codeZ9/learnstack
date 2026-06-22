import {
  CheckCircle2,
  FileEdit,
  FileText,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";


interface WorkspaceOverviewCardsProps {
  total: number;
  published: number;
  drafts: number;
}

export function WorkspaceOverviewCard({
  total,
  published,
  drafts,
}: WorkspaceOverviewCardsProps) {
  const cardConfigs = [
    {
      label: "Documents",
      value: total,
      icon: FileText,
      className:
        "border-border/60 shadow-sm",
      iconClassName:
        "text-muted-foreground",
      valueClassName:
        "text-foreground",
    },
    {
      label: "Published",
      value: published,
      icon: CheckCircle2,
      className:
        "border-green-200/60 dark:border-green-900/40 bg-card shadow-md shadow-green-500/5 dark:shadow-green-500/[0.02]",
      iconClassName:
        "text-green-600 dark:text-green-400",
      valueClassName:
        "text-green-700 dark:text-green-400",
    },
    {
      label: "Drafts",
      value: drafts,
      icon: FileEdit,
      className:
        "border-amber-200/60 dark:border-amber-900/40 bg-card shadow-md shadow-amber-500/5 dark:shadow-amber-500/[0.02]",
      iconClassName:
        "text-amber-600 dark:text-amber-400",
      valueClassName:
        "text-amber-700 dark:text-amber-400",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {cardConfigs.map(
        ({
          label,
          value,
          icon: Icon,
          className,
          iconClassName,
          valueClassName,
        }) => (
          <Card
            key={label}
            className={`
              backdrop-blur-sm
              transition-all
              duration-200
              hover:-translate-y-0.5
              hover:shadow-md
              ${className}
            `}
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {label}
                </p>

                <Icon
                  className={`h-4 w-4 ${iconClassName}`}
                />
              </div>

              <p
                className={`mt-3 text-3xl font-bold tracking-tight tabular-nums ${valueClassName}`}
              >
                {value}
              </p>
            </CardContent>
          </Card>
        ),
      )}
    </div>
  );
}