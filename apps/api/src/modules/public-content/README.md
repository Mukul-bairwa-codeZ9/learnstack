# Public Content Module

## Purpose

The Public Content Module exposes published LearnStack content to public users.

This module powers the public learning experience and discoverability features.

---

## Features

### Published Document Access

Retrieve published documents by slug.

Route:

```http
GET /public-content/:slug
```

---

### Public Content Listing

Retrieve published documents with pagination, search, sorting, and category filtering.

Route:

```http
GET /public-content
```

---

## Query Parameters

| Parameter | Type                      | Description                   |
| --------- | ------------------------- | ----------------------------- |
| page      | number                    | Current page number           |
| limit     | number                    | Number of items per page      |
| search    | string                    | Search title and SEO metadata |
| category  | string                    | Filter by category            |
| sort      | newest | oldest | updated | Sorting strategy              |

---

## Response Structure

```json
{
  "items": [],
  "meta": {
    "page": 1,
    "limit": 12,
    "total": 0,
    "totalPages": 0
  }
}
```

---

## Search Strategy

Search currently supports:

* Document title
* SEO title
* SEO description

MongoDB regex matching is used for v0.9.0.

Future releases may introduce:

* Text indexes
* Relevance scoring
* Full-text search

---

## Category Foundation

Published content supports optional categorization.

Example:

```json
{
  "category": "NestJS"
}
```

This enables future category browsing and filtering experiences.

---

## Dependencies

* Documents Module
* Documents Repository

---

## Version History

### v0.8.0

* Public document retrieval
* SEO metadata support

### v0.9.0

* Public content listing
* Search
* Pagination
* Sorting
* Category foundation
