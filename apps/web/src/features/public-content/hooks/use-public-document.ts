import { useQuery } from "@tanstack/react-query";

import { getPublicDocument } from "../api/public-content.api";

export const PUBLIC_DOCUMENT_QUERY_KEY = "public-document";

export const usePublicDocument = (slug:string) => {
  return useQuery({
    queryKey: [PUBLIC_DOCUMENT_QUERY_KEY, slug],
    queryFn: () => getPublicDocument(slug),
    enabled: !!slug,
  });
};
