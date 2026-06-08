import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

import { workspaceApi } from "../api";
import { workspaceKeys } from "../utils";
import { CreateWorkspaceDto, UpdateWorkspaceDto } from "../types";
import { RootState } from "@/store/store";

const selectAuthToken = (state: RootState) => state.auth.accessToken;

export const useWorkspaces = () => {
  const token = useSelector(selectAuthToken);
  return useQuery({
    queryKey: workspaceKeys.lists(),
    queryFn: () => workspaceApi.getWorkspaces(token as string),

    enabled: !!token,
  });
};

export const useWorkspace = (workspaceId: string) => {
  const token = useSelector(selectAuthToken);
  return useQuery({
    queryKey: workspaceKeys.detail(workspaceId),
    queryFn: () => workspaceApi.getWorkspace(token as string, workspaceId),
    enabled: !!workspaceId && !!token,
  });
};

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  const token = useSelector(selectAuthToken);
  return useMutation({
    mutationFn: (payload: CreateWorkspaceDto) => {
      if (!token) {
        throw new Error("Authentication required");
      }

      return workspaceApi.createWorkspace(token, payload);
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
