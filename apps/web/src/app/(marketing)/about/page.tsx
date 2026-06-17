import { layout, typography } from "@/design-system";

export default function AboutPage() {
  return (
    <div
      className="mx-auto px-6 py-24"
      style={{
        maxWidth: layout.content.marketing,
      }}
    >
      <h1 className={typography.h1}>About LearnStack</h1>

      <p className={`${typography.bodyLg} mt-4 text-muted-foreground`}>
        LearnStack is a developer-focused platform designed to help individuals
        and teams learn, document, publish, and share technical knowledge.
      </p>
    </div>
  );
}