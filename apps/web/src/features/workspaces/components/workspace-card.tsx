import Link from "next/link";

import type { Workspace } from "../types";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface WorkspaceCardProps {
  workspace: Workspace;
}

export function WorkspaceCard({ workspace }: WorkspaceCardProps) {
  const createdon = formatDate(workspace.createdAt);
  const updatedon = formatDate(workspace.updatedAt);

  return (
    <Link href={`/workspaces/${workspace._id}`} className="group">
      <Card className="h-full transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
        <CardHeader className="space-y-2">
          <CardTitle className="flex items-center justify-between">
            <span className="truncate">{workspace.name}</span>

            <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {workspace.description || "No description provided."}
          </p>

          <div className="text-xs text-muted-foreground">
            Updated {updatedon}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
