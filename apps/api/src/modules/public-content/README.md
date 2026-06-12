# Public Content Module

## Purpose

The Public Content Module exposes published LearnStack documents to unauthenticated visitors.

This module acts as the public-facing content delivery layer between the Publishing domain and the Learn Platform.

It is intentionally separated from the Documents module to ensure content management concerns remain isolated from content consumption concerns.

---

## Responsibilities

### Public Content Retrieval

Retrieve published documents by slug.

### Content Delivery

Expose published content through public API endpoints.

### SEO Metadata Delivery

Provide SEO metadata for frontend metadata generation.

### Public Response Mapping

Transform internal document entities into public-safe response models.

---

## Non-Responsibilities

The Public Content Module does not:

* Create documents
* Update documents
* Delete documents
* Manage workspaces
* Manage permissions
* Handle publishing workflows

Those responsibilities belong to their respective domains.

---

## API Endpoints

### Get Published Document

```http
GET /public-content/:slug
```

Example:

```http
GET /public-content/getting-started
```

---

## Response Model

```json
{
  "id": "document-id",
  "title": "Getting Started",
  "slug": "getting-started",
  "content": {},
  "publishedAt": "2026-06-12T10:00:00.000Z",
  "seo": {
    "title": "",
    "description": "",
    "keywords": []
  }
}
```

---

## Validation Rules

A document is accessible only when:

* Document exists
* Status = PUBLISHED

Otherwise:

```http
404 Not Found
```

---

## Architecture

```text
Documents
    ↓
Publishing
    ↓
Public Content
    ↓
Learn Platform
```

---

## Future Enhancements

Planned support:

* Sitemap generation
* Search indexing
* Categories
* Tags
* Learning paths
* Related content
* RSS feeds
* OpenGraph images

---

## Release

Introduced in:

```text
v0.8.0 Public Content Foundation
```
