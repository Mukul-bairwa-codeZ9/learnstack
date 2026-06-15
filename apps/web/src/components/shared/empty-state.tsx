import { LucideIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { typography } from "@/design-system";

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
    <Card className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <Icon className="mb-4  rounded-full bg-muted p-4" />

      <h3 className={typography.h4}>
        {title}
      </h3>

      <p className="mt-2 max-w-md text-muted-foreground">
        {description}
      </p>

      {action && (
        <div className="mt-6">
          {action}
        </div>
      )}
    </Card>
  );
}