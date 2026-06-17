import { layout, typography } from "@/design-system";

export default function ContactPage() {
  return (
    <div
      className="mx-auto px-6 py-24"
      style={{
        maxWidth: layout.content.marketing,
      }}
    >
      <h1 className={typography.h1}>Contact</h1>

      <p className={`${typography.bodyLg} mt-4 text-muted-foreground`}>
        Get in touch to learn more about LearnStack and future platform updates.
      </p>
    </div>
  );
}