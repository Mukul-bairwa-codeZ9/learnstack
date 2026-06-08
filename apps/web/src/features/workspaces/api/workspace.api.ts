import api from "@/services/api";

import { CreateWorkspaceDto, UpdateWorkspaceDto, Workspace } from "../types";

export const workspaceApi = {
  async getWorkspaces(token: string): Promise<Workspace[]> {
    const { data } = await api.get("/workspaces", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },

  async getWorkspace(token: string, id: string): Promise<Workspace> {
    const { data } = await api.get(`/workspaces/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return data;
  },

  async createWorkspace(
    token: string,
    payload: CreateWorkspaceDto,
  ): Promise<Workspace> {
    const { data } = await api.post("/workspaces", payload, {
      headers: {
        Authorization: `Bearer ${token}`, // 👈 Attach it safely
      },
    });

    return data;
  },

  async updateWorkspace(
    id: string,
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
