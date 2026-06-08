import Link from "next/link";

import type { Workspace } from "../types";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { formatDate } from "@/lib/utils";

interface WorkspaceCardProps {
  workspace: Workspace;
}

export function WorkspaceCard({
  workspace,
}: WorkspaceCardProps) {

  const formattedDate = formatDate(workspace.createdAt);


  return (
    <Link
      href={`/workspaces/${workspace._id}`}
    >
      <Card className="cursor-pointer transition hover:shadow-md">
        <CardHeader>
          <CardTitle>
            {workspace.name}
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            {workspace.description ||
              "No description"}
          </p>
          {formattedDate && (
            <span className="text-xs text-muted-foreground/70">
              Created on {formattedDate}
            </span>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}