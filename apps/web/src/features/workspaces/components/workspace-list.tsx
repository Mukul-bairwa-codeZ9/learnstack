import { WorkspaceCard } from "./workspace-card";

import type { Workspace } from "../types";

interface WorkspaceListProps {
  workspaces: Workspace[];
}

export function WorkspaceList({
  workspaces,
}: WorkspaceListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {workspaces.map((workspace) => (
        <WorkspaceCard
          key={workspace._id}
          workspace={workspace}
        />
      ))}
      
    </div>
  );
}