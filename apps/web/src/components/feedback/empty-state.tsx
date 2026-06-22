import { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <Card className="flex flex-col items-center justify-center rounded-2xl border-dashed p-16 text-center">
      <div className="mb-6 rounded-full border bg-muted/50 p-4">
        <Icon className="h-14 w-14 text-muted-foreground" />
      </div>

      <h3 className="text-xl font-semibold tracking-tight">{title}</h3>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>

      {action && <div className="mt-8">{action}</div>}
    </Card>
  );
}
