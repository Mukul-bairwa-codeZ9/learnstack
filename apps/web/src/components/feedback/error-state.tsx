import { AlertTriangle } from "lucide-react";

import { Card } from "@/components/ui/card";

interface ErrorStateProps {
  title?: string;
  description?: string;
}

export function ErrorState({
  title = "Something went wrong",
  description = "Please try again later.",
}: ErrorStateProps) {
  return (
    <Card className="flex flex-col items-center justify-center px-6 py-12 text-center">
      <AlertTriangle className="mb-4 h-8 w-8 text-destructive" />

      <h3 className="font-semibold">{title}</h3>

      <p className="mt-2 text-muted-foreground">{description}</p>
    </Card>
  );
}
