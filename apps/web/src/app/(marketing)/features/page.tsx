import { layout, typography } from "@/design-system";

export default function FeaturesPage() {
  return (
    <div
      className="mx-auto px-6 py-24"
      style={{
        maxWidth: layout.content.marketing,
      }}
    >
      <h1 className={typography.h1}>Features</h1>

      <p className={`${typography.bodyLg} mt-4 text-muted-foreground`}>
        LearnStack helps developers create, organize, publish, and share
        technical knowledge through workspaces and documentation.
      </p>
    </div>
  );
}