# Public Content Feature

## Purpose

The Public Content Feature provides the public learning experience for LearnStack.

Users can discover, browse, search, and read published content.

---

## Routes

### Content Listing

```text
/learn
```

Features:

* Content listing
* Search
* Sorting
* Pagination
* Empty states

---

### Content Detail

```text
/learn/[slug]
```

Features:

* Read-only TipTap rendering
* SEO metadata
* Public access

---

## Components

```text
components
├── content-card.tsx
├── contents.tsx
├── contents-page-toolbar.tsx
├── public-document-page.tsx
├── search-content.tsx
├── document-renderer.tsx
```

---

## Shared Dependencies

```text
components/shared
├── app-pagination.tsx
├── app-select.tsx
```

---

## API Integration

### List Content

```http
GET /public-content
```

### Get Content

```http
GET /public-content/:slug
```

---

## Discoverability Features

### Search

Searches:

* Title
* SEO title
* SEO description

### Sorting

Supported values:

* newest
* oldest
* updated

### Pagination

Server-side pagination with URL state.

Example:

```text
/learn?page=2
```

---

## Version History

### v0.8.0

* Public document page
* SEO metadata
* Read-only rendering

### v0.9.0

* Discoverability foundation
* Content listing
* Search
* Pagination
* Sorting
* Category support
