# Documents Feature

## Purpose

The Documents Feature provides the frontend implementation for document management within LearnStack.

Documents are the core content entity of the platform.

Users create, view, and manage documents inside Workspaces.

---

## Feature Structure

```text
documents
├── api
├── components
├── forms
├── hooks
├── schemas
├── types
├── utils
└── README.md
```

---

## Components

### DocumentCard

Displays a document summary.

### DocumentList

Displays workspace documents.

### CreateDocumentDialog

Provides document creation workflow.

### DocumentStatusBadge

Displays the current publishing state of a document.

Supported states:

* Draft
* Published
* Archived

### DocumentPublishActions

Provides publishing controls.

Supported actions:

* Publish
* Unpublish
* Archive
* Republish

### PublishDocumentDialog

Confirmation dialog shown before publishing a document.

---

## Forms

### CreateDocumentForm

Used to create a new document.

Features:

* React Hook Form
* Zod Validation
* React Query Mutations
* Toast Notifications

---

## Hooks

### useDocuments

Fetch workspace documents.

### useDocument

Fetch a single document.

### useCreateDocument

Create document mutation.

### useUpdateDocument

Update document mutation.

### useDeleteDocument

Delete document mutation.

### usePublishDocument

Publish document mutation.

### useUnpublishDocument

Unpublish document mutation.

### useArchiveDocument

Archive document mutation.

---

## API Layer

Centralized API communication using the platform API client.

Endpoints:

```text
GET    /documents
GET    /documents/:id

POST   /documents
PATCH  /documents/:id
DELETE /documents/:id

POST   /documents/:id/publish
POST   /documents/:id/unpublish
POST   /documents/:id/archive

GET    /documents/public/:slug
```

---

## User Flow

```text
Workspace
    ↓
Documents List
    ↓
Create Document
    ↓
Document Detail
    ↓
Publish Document
```

---

## Shared Components Used

The Documents feature leverages platform shared components:

```text
EmptyState
LoadingState
PageHeader
```

These components promote consistency across the application.

---

## Publishing Workflow

Documents support a publishing lifecycle.

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
                    Republish
                       │
                       ▼
                ┌─────────────┐
                │    DRAFT    │
                └─────────────┘
```

### UI Integration

Publishing controls are available from the document editor page.

Users can:

* Publish documents
* Unpublish documents
* Archive documents
* View current document status

Published documents are prepared for future public content delivery workflows.

---

## Future Enhancements

Planned additions:

* Public Content Pages
* SEO Metadata
* Read-only Published View
* Collaboration
* Version History
* AI Assistance
* Search
* Analytics