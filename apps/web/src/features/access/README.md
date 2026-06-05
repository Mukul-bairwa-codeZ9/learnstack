# Frontend Access Layer

## Purpose

Provides centralized authorization utilities for LearnStack frontend applications.

This layer converts backend RBAC rules into reusable React capabilities.

---

## Components

### PermissionGate

Conditionally renders UI based on permissions.

Example:

<PermissionGate permission={Permission.DOCUMENT_PUBLISH}>
  <PublishButton />
</PermissionGate>

---

### RouteGuard

Protects routes based on:

* Authentication
* Roles
* Permissions

Example:

<RouteGuard role={Role.SUPER_ADMIN}>
  <AdminPage />
</RouteGuard>

---

## Hooks

### useAccess

Provides:

* user
* role
* isAuthenticated
* isHydrated

Capability helpers:

* canCreateWorkspace
* canPublishDocument
* canManageUsers

---

## AccessHelper

Core permission evaluation utilities.

Functions:

* hasPermission()
* hasAnyPermission()
* hasAllPermissions()

Business helpers:

* canCreateWorkspace()
* canPublishDocument()
* canManageUsers()

---

## Authorization Principles

Never:

* Hardcode role checks in UI
* Compare role strings directly

Avoid:

user.role === "ADMIN"

Prefer:

AccessHelper.canCreateWorkspace(role)

or

PermissionGate

---

## Future Direction

This layer will support:

* Workspace permissions
* Team permissions
* Content ownership
* Collaboration permissions
* Advanced access policies
