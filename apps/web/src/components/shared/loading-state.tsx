import { Skeleton } from "../ui/skeleton";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({
  message,
}: LoadingStateProps) {
  return (
     <div className="space-y-4 py-8">
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-24 w-full" />

      {message && (
        <p className="text-sm text-muted-foreground">
          {message}
        </p>
      )}
    </div>
  );
}