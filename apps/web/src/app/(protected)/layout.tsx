import {
  Button,
} from "@/components/ui/button";

import {
  useLogout,
} from "@/features/auth/hooks/use-logout";

function LogoutButton() {
  "use client";

  const logout =
    useLogout();

  return (
    <Button
      variant="outline"
      onClick={logout}
    >
      Logout
    </Button>
  );
}

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <h1 className="font-semibold">
            DevDocs
          </h1>

          <LogoutButton />
        </div>
      </header>

      <main className="container mx-auto p-6">
        {children}
      </main>
    </div>
  );
}