import api from "@/services/api";
import { PublicDocument, PublicDocumentsQuery, PublicDocumentsResponse } from "../types/public-document.types";

export const getPublicDocument = async (slug: string) : Promise<PublicDocument> => {
  const response = await api.get(`/public-content/${slug}`);

  return response.data;
};


export const getPublicDocuments = async (
  query: PublicDocumentsQuery = {},
): Promise<PublicDocumentsResponse> => {
  const response = await api.get("/public-content", {
    params: query,
  });

  return response.data;
};