# Access Module

## Purpose

The Access Module is responsible for authorization across the LearnStack platform.

Authentication verifies identity.

Authorization determines what authenticated users can do.

---

## Roles

### SUPER_ADMIN

Platform owner role.

Capabilities:

* Manage users
* Manage workspaces
* Manage content
* Access administrative features

### ADMIN

Workspace owner role.

Capabilities:

* Create workspaces
* Manage owned workspaces
* Create documents
* Publish content

### VIEWER

Read-only role.

Capabilities:

* View shared content
* View published content

---

## Permissions

Workspace

* WORKSPACE_CREATE
* WORKSPACE_VIEW
* WORKSPACE_UPDATE
* WORKSPACE_DELETE
* WORKSPACE_MANAGE_MEMBERS

Documents

* DOCUMENT_CREATE
* DOCUMENT_VIEW
* DOCUMENT_UPDATE
* DOCUMENT_DELETE
* DOCUMENT_PUBLISH

Users

* USER_MANAGE

---

## Authorization Flow

JWT Authentication
↓
User Identity
↓
Role Resolution
↓
Permission Resolution
↓
Guard Validation
↓
Controller Execution

---

## Decorators

### Roles

@Roles(Role.ADMIN)

### Permissions

@Permissions(Permission.DOCUMENT_PUBLISH)

### Current User

@CurrentUser()

Returns authenticated user information.

---

## Future Direction

Current Version:

RBAC

Future:

* Workspace-scoped permissions
* PBAC
* ABAC
* Team collaboration permissions
* Content ownership permissions
