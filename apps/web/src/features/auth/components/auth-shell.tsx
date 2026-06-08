"use client";

import { useAccess } from "../../access/hooks/use-access";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

import AuthBrandPanel from "./auth-brand-panel";

interface AuthShellProps {
  children: React.ReactNode;
}

export default function AuthShell({
  children,
}: AuthShellProps) {


    const router = useRouter();

  const { user, isHydrated } = useAccess();

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    if (user) {
      router.replace("/dashboard");
    }
  }, [
    user,
    isHydrated,
    router,
  ]);

  if (!isHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Redirecting...
      </div>
    );
  }


  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <AuthBrandPanel />

      <div className="flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
}