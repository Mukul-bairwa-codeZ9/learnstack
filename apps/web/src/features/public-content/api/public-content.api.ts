import api from "@/services/api";
import {
  PublicDocument,
  PublicDocumentsQuery,
  PublicDocumentsResponse,
} from "../types/public-document.types";

export const getPublicDocument = async (
  slug: string,
): Promise<PublicDocument> => {
  return api.get(`/public-content/${slug}`);
};

export const getPublicDocuments = async (
  query: PublicDocumentsQuery = {},
): Promise<PublicDocumentsResponse> => {
  return api.get("/public-content", {
    params: query,
  });
};
