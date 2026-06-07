"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAccess } from "../hooks/use-access";
import { AccessHelper } from "../helpers/access.helper";
import { Permission } from "../types/permissions";
import { Role } from "../types/role";

interface RouteGuardProps {
  children: ReactNode;
  role?: Role;
  roles?: Role[];
  permission?: Permission;
  permissions?: Permission[];
  redirectTo?: string;
}

export function RouteGuard({
  children,
  role,
  roles,
  permission,
  permissions,
  redirectTo = "/sign-in",
}: RouteGuardProps) {
  const router = useRouter();
  const { user, isHydrated } = useAccess();

  useEffect(() => {
    // 1. Unauthenticated fallback
    if (!isHydrated) {
      return;
    }

    if (!user) {
      router.replace(redirectTo);
      return;
    }

    // 2. Single role validation
    if (role && user.role !== role) {
      router.replace("/unauthorized");
      return;
    }

    // 3. Multi-role validation
    if (roles && !roles.includes(user.role)) {
      router.replace("/unauthorized");
      return;
    }

    // 4. Single permission validation
    if (permission && !AccessHelper.hasPermission(user.role, permission)) {
      router.replace("/unauthorized");
      return;
    }

    // 5. Multi-permission validation
    if (
      permissions &&
      !AccessHelper.hasAllPermissions(user.role, permissions)
    ) {
      router.replace("/unauthorized");
      return; // FIXED: Added missing return statement here
    }
  }, [user, role, roles, permission, permissions, router, redirectTo]);

  if (!isHydrated) {
    return (
    <div className="flex min-h-screen items-center justify-center">
      Loading...
    </div>
  );
  }

  // Prevent UI flashing/rendering while unauthorized redirect handles background processing
  if (!user) {
      return (
    <div className="flex min-h-screen items-center justify-center">
      Redirecting...
    </div>
  );
  }

  // Double check authorization constraints before painting children onto layout
  if (role && user.role !== role) return null;
  if (roles && !roles.includes(user.role)) return null;
  if (permission && !AccessHelper.hasPermission(user.role, permission))
    return null;
  if (permissions && !AccessHelper.hasAllPermissions(user.role, permissions))
    return null;

  return <>{children}</>;
}
