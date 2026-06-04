"use client";

import {
  useAuthHydration,
} from "@/features/auth/hooks/use-auth-hydration";

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({
  children,
}: Props) {
  useAuthHydration();

  return <>{children}</>;
}