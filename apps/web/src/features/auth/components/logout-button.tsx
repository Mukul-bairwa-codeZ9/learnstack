"use client";

import { useLogout } from "../hooks";

import { Button } from "@/components/ui/button";

export function LogoutButton() {
  const logout = useLogout();

  return (
    <Button
      variant="outline"
      onClick={logout}
    >
      Logout
    </Button>
  );
}