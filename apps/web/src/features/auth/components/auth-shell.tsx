import AuthBrandPanel from "./auth-brand-panel";

interface AuthShellProps {
  children: React.ReactNode;
}

export default function AuthShell({
  children,
}: AuthShellProps) {
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