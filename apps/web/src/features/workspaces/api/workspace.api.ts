import api from "@/services/api";

import { CreateWorkspaceDto, UpdateWorkspaceDto, Workspace } from "../types";

export const workspaceApi = {
  async getWorkspaces(): Promise<Workspace[]> {
    const { data } = await api.get("/workspaces");

    return data;
  },

  async getWorkspace( id: string): Promise<Workspace> {
    const { data } = await api.get(`/workspaces/${id}`);

    return data;
  },

  async createWorkspace(
    payload: CreateWorkspaceDto,
  ): Promise<Workspace> {
    const { data } = await api.post("/workspaces", payload);

    return data;
  },

  async updateWorkspace(
    id:string,
    payload: UpdateWorkspaceDto,
  ): Promise<Workspace> {
    const { data } = await api.patch(`/workspaces/${id}`, payload);

    return data;
  },

  async deleteWorkspace(id: string) {
    const { data } = await api.delete(`/workspaces/${id}`);

    return data;
  },
};
