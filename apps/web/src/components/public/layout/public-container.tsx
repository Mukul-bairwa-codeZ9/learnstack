import { layout } from "@/design-system";

interface PublicContainerProps {
  children: React.ReactNode;
  className?: string;
}

export function PublicContainer({
  children,
  className,
}: PublicContainerProps) {
  return (
    <div
      className={`mx-auto w-full px-6 ${className ?? ""}`}
      style={{
        maxWidth: layout.content.marketing,
      }}
    >
      {children}
    </div>
  );
}