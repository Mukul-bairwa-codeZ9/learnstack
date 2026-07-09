import { useQuery } from "@tanstack/react-query";

import { getPublicDocument, getPublicDocuments } from "../api";
import { PublicDocumentsQuery } from "../types";

export const PUBLIC_DOCUMENT_QUERY_KEY = "public-document";

export const PUBLIC_DOCUMENTS_QUERY_KEY = "public-documents";

export const usePublicDocument = (slug:string) => {
  return useQuery({
    queryKey: [PUBLIC_DOCUMENT_QUERY_KEY, slug],
    queryFn: () => getPublicDocument(slug),
    enabled: !!slug,
  });
};


export const usePublicDocuments = (
  query: PublicDocumentsQuery = {},
) => {
  return useQuery({
    queryKey: [PUBLIC_DOCUMENTS_QUERY_KEY, query],
    queryFn: () => getPublicDocuments(query),
  });
};