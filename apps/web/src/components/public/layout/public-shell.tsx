import { PublicFooter } from "../footer";
import { PublicHeader } from "../navigation";

interface PublicShellProps {
  children: React.ReactNode;
}

export function PublicShell({ children }: PublicShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <PublicHeader />

      <main className="flex-1">{children}</main>

      <PublicFooter />
    </div>
  );
}
