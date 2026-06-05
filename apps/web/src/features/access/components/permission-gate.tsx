"use client";

import { ReactNode } from "react";

import { useSelector } from "react-redux";

import { RootState } from "@/store/store";

import { AccessHelper } from "../helpers/access.helper";
import { Permission } from "../types/permissions";
import { Role } from "../types/role";

interface PermissionGateProps {
  children: ReactNode;

  permission?: Permission;

  permissions?: Permission[];

  role?: Role;

  roles?: Role[];

  fallback?: ReactNode;
}

export function PermissionGate({
  children,
  permission,
  permissions,
  role,
  roles,
  fallback = null,
}: PermissionGateProps) {
  const user = useSelector(
    (state: RootState) => state.auth.user,
  );

  if (!user) {
    return <>{fallback}</>;
  }

  /*
   * Role checks
   */
  if (role && user.role !== role) {
    return <>{fallback}</>;
  }

  if (
    roles?.length &&
    !roles.includes(user.role)
  ) {
    return <>{fallback}</>;
  }

  /*
   * Permission checks
   */
  if (
    permission &&
    !AccessHelper.hasPermission(
      user.role,
      permission,
    )
  ) {
    return <>{fallback}</>;
  }

  if (
    permissions?.length &&
    !permissions.every(permission =>
      AccessHelper.hasPermission(
        user.role,
        permission,
      ),
    )
  ) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}