import api from "@/services/api";
import { PublicDocument } from "../types/public-document.types";

export const getPublicDocument = async (slug: string) : Promise<PublicDocument> => {
  const response = await api.get(`/public-content/${slug}`);

  return response.data;
};
