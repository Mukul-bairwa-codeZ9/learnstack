export enum Permission {
  WORKSPACE_CREATE = 'workspace:create',
  WORKSPACE_VIEW = 'workspace:view',
  WORKSPACE_UPDATE = 'workspace:update',
  WORKSPACE_DELETE = 'workspace:delete',
  WORKSPACE_MANAGE_MEMBERS = 'workspace:manage_members',

  DOCUMENT_CREATE = 'document:create',
  DOCUMENT_VIEW = 'document:view',
  DOCUMENT_UPDATE = 'document:update',
  DOCUMENT_DELETE = 'document:delete',
  DOCUMENT_PUBLISH = 'document:publish',

  USER_MANAGE = 'user:manage',
  CONTENT_MODERATE = 'content:moderate',
  SYSTEM_MANAGE = 'system:manage',
}