# Documents Module

## Purpose

The Documents Module manages document content within LearnStack.

Documents are the primary business entity of the platform and belong to Workspaces.

Future platform capabilities such as publishing, collaboration, versioning, AI assistance, and rich text editing will build upon the Documents domain.

---

## Architecture

```text
documents
├── dto
├── repositories
├── schemas
├── types
├── enums
├── constants
├── documents.controller.ts
├── documents.service.ts
├── documents.module.ts
└── README.md
```

---

## Document Lifecycle

Supported document statuses:

```text
DRAFT
PUBLISHED
ARCHIVED
```

### DRAFT

Default state for newly created documents.

### PUBLISHED

Visible and available for publishing workflows.

### ARCHIVED

Retained for history but excluded from active content workflows.

---

## Publishing Workflow

Documents now support a controlled publishing lifecycle.

Publishing operations:

* Publish Document
* Unpublish Document
* Archive Document
* Public Document Retrieval

---

### Lifecycle Diagram

```text
                ┌─────────────┐
                │    DRAFT    │
                └──────┬──────┘
                       │
                    Publish
                       │
                       ▼
               ┌──────────────┐
               │  PUBLISHED   │
               └──────┬───┬───┘
                      │   │
             Unpublish│   │Archive
                      │   │
                      ▼   ▼
                ┌─────────────┐
                │    DRAFT    │
                └─────────────┘

                ┌─────────────┐
                │  ARCHIVED   │
                └──────┬──────┘
                       │
                    Restore
                       │
                       ▼
                ┌─────────────┐
                │    DRAFT    │
                └─────────────┘
```

---

### Publish Rules

A document can be published only when:

* Document exists
* Workspace ownership is verified
* Title exists
* Content exists

Successful publish actions:

* Status becomes `PUBLISHED`
* `publishedAt` is populated

---

### Unpublish Rules

A published document may be reverted to draft.

Successful unpublish actions:

* Status becomes `DRAFT`
* Public access is removed

---

### Archive Rules

Only published documents can be archived.

Successful archive actions:

* Status becomes `ARCHIVED`
* `archivedAt` is populated
* Public access is removed

---

### Public Access

Published documents can be accessed through:

```http
GET /documents/public/:slug
```

Only documents with:

```text
status = PUBLISHED
```

are accessible through public routes.

---

## Document Ownership

Documents belong to:

```text
Workspace
    ↓
Document
```

A document is always associated with:

* workspaceId
* createdBy

Access is validated through workspace ownership.

---

## Schema Overview

Core fields:

```text
title
slug
content
status
workspaceId
createdBy
publishedAt
archivedAt
createdAt
updatedAt
```

---

## Slug Strategy

Documents automatically generate a slug from the title.

Example:

```text
Getting Started Guide
↓
getting-started-guide
```

Uniqueness is enforced within the workspace.

---

## API Endpoints

### Create Document

```http
POST /documents
```

### Get Documents

```http
GET /documents
```

Supports filtering by workspace.

### Get Document

```http
GET /documents/:id
```

### Update Document

```http
PATCH /documents/:id
```

### Delete Document

```http
DELETE /documents/:id
```

### Publish Document

```http
POST /documents/:id/publish
```

### Unpublish Document

```http
POST /documents/:id/unpublish
```

### Archive Document

```http
POST /documents/:id/archive
```

### Public Document

```http
GET /documents/public/:slug
```

---

## Security

Integrated with:

* JWT Authentication
* Current User Decorator
* RBAC Authorization
* Workspace Ownership Validation

Unauthorized users cannot access documents belonging to another workspace.

---

## Future Enhancements

Planned in future releases:

* Rich Text Editor
* Autosave
* Version History
* Collaboration
* Search
* AI Features
* Document Analytics