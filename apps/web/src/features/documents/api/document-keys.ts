export const documentQueryKeys = {
  all: ['documents'] as const,

  lists: () =>
    [...documentQueryKeys.all, 'list'] as const,

  list: (workspaceId?: string) =>
    [
      ...documentQueryKeys.lists(),
      workspaceId,
    ] as const,

  details: () =>
    [...documentQueryKeys.all, 'detail'] as const,

  detail: (documentId: string) =>
    [
      ...documentQueryKeys.details(),
      documentId,
    ] as const,
};