# Public Content Feature

## Purpose

The Public Content Feature provides the frontend experience for viewing published LearnStack content.

It powers the public learning platform and allows visitors to consume published documentation without authentication.

---

## Feature Structure

```text
public-content
├── api
├── hooks
├── types
├── components
└── README.md
```

---

## Responsibilities

### Public Document Retrieval

Fetch published documents from the Public Content API.

### Read-Only Rendering

Render TipTap content without editing capabilities.

### SEO Support

Provide metadata generation for public pages.

### Public Content Experience

Display published content in a clean reading experience.

---

## Components

### DocumentRenderer

Responsible for:

* Rendering TipTap content
* Read-only mode
* Reusing editor extensions

### PublicDocumentPage

Responsible for:

* Page layout
* Metadata display
* Published date display
* Content presentation

---

## API Layer

### getPublicDocument

```http
GET /public-content/:slug
```

Returns:

```json
{
  "id": "",
  "title": "",
  "slug": "",
  "content": {},
  "publishedAt": "",
  "seo": {}
}
```

---

## Route Integration

Public documents are available through:

```text
/learn/[slug]
```

Examples:

```text
/learn/getting-started
/learn/react-query-guide
/learn/nestjs-authentication
```

---

## SEO

Supports:

* Page title
* Description
* Keywords
* OpenGraph metadata
* Twitter metadata

SEO values fall back to document content when explicit SEO metadata is not available.

---

## Future Enhancements

Planned support:

* Table of contents
* Reading time
* Share actions
* Related content
* Search integration
* Category navigation
* Learning paths

---

## Release

Introduced in:

```text
v0.8.0 Public Content Foundation
```
