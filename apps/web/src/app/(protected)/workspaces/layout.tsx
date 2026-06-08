import { LogoutButton } from "@/features/auth/components/logout-button";

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen">
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <h1 className="font-semibold">
            Workspaces
          </h1>
        </div>
      </header>

      <main className="container mx-auto p-6">
        {children}
      </main>
    </div>
  );
}