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
* Publishing Workflows
* Collaboration
* Search
* AI Features
* Document Analytics
