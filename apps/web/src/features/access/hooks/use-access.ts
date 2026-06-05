"use client";

import { useSelector } from "react-redux";

import { RootState } from "@/store/store";

import { AccessHelper } from "../helpers/access.helper";
import { Role } from "../types/role";

export function useAccess() {
  // Pull the unified auth state slice
  const { user, isHydrated } = useSelector((state: RootState) => state.auth);

  const role = user?.role;

  return {
    user,
    role,

    // Core structural state visibility
    isHydrated,
    isAuthenticated: !!user,

    // Semantics-based Role indicators
    isSuperAdmin: role === Role.SUPER_ADMIN,
    isAdmin: role === Role.ADMIN,
    isViewer: role === Role.VIEWER,

    // Centralized abstraction capabilities mapping
    canCreateWorkspace: role ? AccessHelper.canCreateWorkspace(role) : false,
    canPublishDocument: role ? AccessHelper.canPublishDocument(role) : false,
    canManageUsers: role ? AccessHelper.canManageUsers(role) : false,
  };
}
