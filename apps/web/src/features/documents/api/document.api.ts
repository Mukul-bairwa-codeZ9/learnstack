import api from "@/services/api";

import {
  CreateDocumentDto,
  Document,
  DocumentFilters,
  DocumentStatusResponse,
  DocumentSummary,
  PublishDocumentResponse,
  UpdateDocumentDto,
} from "../types";
import { PaginatedResponse } from "@/types";

export const documentsApi = {
  async getDocuments(
    filters?: DocumentFilters,
  ): Promise<PaginatedResponse<DocumentSummary>> {
    return api.get<never, PaginatedResponse<DocumentSummary>>("/documents", {
      params: filters,
    });
  },

  async getDocument(id: string): Promise<Document> {
    return api.get<never, Document>(`/documents/${id}`);
  },

  async createDocument(payload: CreateDocumentDto): Promise<Document> {
    return api.post<never, Document>("/documents", payload);
  },

  async updateDocument(
    id: string,
    payload: UpdateDocumentDto,
  ): Promise<Document> {
    return api.patch<never, Document>(`/documents/${id}`, payload);
  },

  async deleteDocument(id: string): Promise<{ deleted: boolean }> {
    return api.delete<never, { deleted: boolean }>(`/documents/${id}`);
  },

  async publishDocument(id: string): Promise<PublishDocumentResponse> {
    return api.post<never, PublishDocumentResponse>(`/documents/${id}/publish`);
  },

  async unpublishDocument(id: string): Promise<DocumentStatusResponse> {
    return api.post<never, DocumentStatusResponse>(
      `/documents/${id}/unpublish`,
    );
  },

  async archiveDocument(id: string): Promise<DocumentStatusResponse> {
    return api.post<never, DocumentStatusResponse>(`/documents/${id}/archive`);
  },
};
