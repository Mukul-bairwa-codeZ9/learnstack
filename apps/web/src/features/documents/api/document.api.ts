import api from "@/services/api";

import {
  CreateDocumentDto,
  Document,
  DocumentStatusResponse,
  PublishDocumentResponse,
  UpdateDocumentDto,
} from "../types";

export const documentsApi = {
  async getDocuments(workspaceId?: string): Promise<Document[]> {
    const { data } = await api.get("/documents", {
      params: workspaceId ? { workspaceId } : undefined,
    });

    return data;
  },

  async getDocument(id: string): Promise<Document> {
    const { data } = await api.get(`/documents/${id}`);

    return data;
  },

  async createDocument(payload: CreateDocumentDto): Promise<Document> {
    const { data } = await api.post("/documents", payload);

    return data;
  },

  async updateDocument(
    id: string,
    payload: UpdateDocumentDto,
  ): Promise<Document> {
    const { data } = await api.patch(`/documents/${id}`, payload);

    return data;
  },

  async deleteDocument(id: string) {
    const { data } = await api.delete(`/documents/${id}`);

    return data;
  },

  async publishDocument(id: string): Promise<PublishDocumentResponse> {
    const { data } = await api.post(`/documents/${id}/publish`);

    return data;
  },

  async unpublishDocument(id: string): Promise<DocumentStatusResponse> {
    const { data } = await api.post(`/documents/${id}/unpublish`);

    return data;
  },

  async archiveDocument(id: string): Promise<DocumentStatusResponse> {
    const { data } = await api.post(`/documents/${id}/archive`);

    return data;
  },
};
