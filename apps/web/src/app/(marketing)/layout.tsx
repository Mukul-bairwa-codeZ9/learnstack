import { PublicShell } from "@/components/public";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PublicShell>
      {children}
    </PublicShell>
  );
}