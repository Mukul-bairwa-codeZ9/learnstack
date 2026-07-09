import api from "@/services/api";

import {
  CreateWorkspaceDto,
  UpdateWorkspaceDto,
  Workspace,
} from "@/features/workspaces";
import { PaginatedResponse } from "@/types";

export const workspaceApi = {
  async getWorkspaces(): Promise<PaginatedResponse<Workspace>> {
    return api.get<never, PaginatedResponse<Workspace>>("/workspaces");
  },

  async getWorkspace(id: string): Promise<Workspace> {
    return api.get<never, Workspace>(`/workspaces/${id}`);
  },

  async createWorkspace(payload: CreateWorkspaceDto): Promise<Workspace> {
    return api.post<never, Workspace>("/workspaces", payload);
  },

  async updateWorkspace(
    id: string,
    payload: UpdateWorkspaceDto,
  ): Promise<Workspace> {
    return api.patch<never, Workspace>(`/workspaces/${id}`, payload);
  },

  async deleteWorkspace(id: string): Promise<{ deleted: boolean }> {
    return api.delete<never, { deleted: boolean }>(`/workspaces/${id}`);
  },
};
