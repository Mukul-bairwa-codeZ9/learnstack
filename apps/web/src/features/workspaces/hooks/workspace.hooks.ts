import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { workspaceApi } from "../api";
import { workspaceKeys } from "../utils";
import { CreateWorkspaceDto, UpdateWorkspaceDto } from "../types";

export const useWorkspaces = () => {
  return useQuery({
    queryKey: workspaceKeys.lists(),
    queryFn: () => workspaceApi.getWorkspaces(),
  });
};

export const useWorkspace = (workspaceId: string) => {
  return useQuery({
    queryKey: workspaceKeys.detail(workspaceId),
    queryFn: () => workspaceApi.getWorkspace(workspaceId),
    enabled: !!workspaceId,
  });
};

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateWorkspaceDto) => {
      return workspaceApi.createWorkspace(payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workspaceKeys.all,
      });
    },
  });
};

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateWorkspaceDto;
    }) => workspaceApi.updateWorkspace(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: workspaceKeys.all,
      });
    },
  });
};
