"use client";

import {
  useAuthHydration,
} from "@/features/auth";

interface Props {
  children: React.ReactNode;
}

export function AuthProvider({
  children,
}: Props) {
  useAuthHydration();

  return <>{children}</>;
}