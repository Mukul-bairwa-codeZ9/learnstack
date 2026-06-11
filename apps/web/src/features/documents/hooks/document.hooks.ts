import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { documentsApi } from '../api';
import { documentQueryKeys } from '../utils';

import {
  CreateDocumentDto,
  UpdateDocumentDto,
} from '../types';

export function useDocuments(
  workspaceId?: string,
) {
  return useQuery({
    queryKey:
      documentQueryKeys.list(
        workspaceId,
      ),

    queryFn: () =>
      documentsApi.getDocuments(
        workspaceId,
      ),
  });
}

export function useDocument(
  documentId: string,
) {
  return useQuery({
    queryKey:
      documentQueryKeys.detail(
        documentId,
      ),

    queryFn: () =>
      documentsApi.getDocument(
        documentId,
      ),

    enabled: !!documentId,
  });
}

export function useCreateDocument() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (
      payload: CreateDocumentDto,
    ) =>
      documentsApi.createDocument(
        payload,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          documentQueryKeys.all,
      });
    },
  });
}

export function useUpdateDocument() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateDocumentDto;
    }) =>
      documentsApi.updateDocument(
        id,
        payload,
      ),

    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey:
          documentQueryKeys.detail(
            variables.id,
          ),
      });

      queryClient.invalidateQueries({
        queryKey:
          documentQueryKeys.all,
      });
    },
  });
}

export function useDeleteDocument() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      documentsApi.deleteDocument(
        id,
      ),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey:
          documentQueryKeys.all,
      });
    },
  });
}


export function usePublishDocument() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      documentsApi.publishDocument(id),

    onSuccess: (_, documentId) => {
      queryClient.invalidateQueries({
        queryKey:
          documentQueryKeys.detail(
            documentId,
          ),
      });

      queryClient.invalidateQueries({
        queryKey:
          documentQueryKeys.all,
      });
    },
  });
}

export function useUnpublishDocument() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      documentsApi.unpublishDocument(id),

    onSuccess: (_, documentId) => {
      queryClient.invalidateQueries({
        queryKey:
          documentQueryKeys.detail(
            documentId,
          ),
      });

      queryClient.invalidateQueries({
        queryKey:
          documentQueryKeys.all,
      });
    },
  });
}


export function useArchiveDocument() {
  const queryClient =
    useQueryClient();

  return useMutation({
    mutationFn: (id: string) =>
      documentsApi.archiveDocument(id),

    onSuccess: (_, documentId) => {
      queryClient.invalidateQueries({
        queryKey:
          documentQueryKeys.detail(
            documentId,
          ),
      });

      queryClient.invalidateQueries({
        queryKey:
          documentQueryKeys.all,
      });
    },
  });
}