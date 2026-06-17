import Link from "next/link";

import { layout, typography } from "@/design-system";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    title: "Workspaces",
    description:
      "Organize learning resources and technical knowledge into focused workspaces.",
  },
  {
    title: "Documents",
    description:
      "Create, edit, and structure technical documentation with ease.",
  },
  {
    title: "Publishing",
    description:
      "Publish content and make it available through the public Learn platform.",
  },
  {
    title: "Learning Hub",
    description:
      "Explore published content and discover developer-focused learning resources.",
  },
  {
    title: "SEO Metadata",
    description:
      "Improve discoverability with built-in metadata and publishing support.",
  },
  {
    title: "Developer Focused",
    description:
      "Built specifically for developers to learn, document, and share knowledge.",
  },
];

const workflow = [
  "Create Workspace",
  "Write Documentation",
  "Publish Content",
  "Share Knowledge",
];

export default function MarketingHomePage() {
  return (
    <div className="px-6">
      <div
        className="mx-auto py-24"
        style={{
          maxWidth: layout.content.marketing,
        }}
      >
        <section className="text-center">
          <h1 className={typography.display}>
            Learn, document, and share technical knowledge.
          </h1>

          <p
            className={`${typography.bodyLg} mx-auto mt-6 max-w-3xl text-muted-foreground`}
          >
            Create workspaces, organize documentation, publish learning
            resources, and build a knowledge base that grows with you.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/sign-in">Get Started</Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href="/learn">Explore Learn</Link>
            </Button>
          </div>
        </section>

        <section className="mt-32">
          <div className="text-center">
            <h2 className={typography.h2}>
              Everything you need to build and share knowledge
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="p-6">
                  <h3 className={typography.h4}>{feature.title}</h3>

                  <p className={`${typography.body} mt-3 text-muted-foreground`}>
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-32">
          <div className="text-center">
            <h2 className={typography.h2}>How LearnStack Works</h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            {workflow.map((step, index) => (
              <Card key={step}>
                <CardContent className="p-6">
                  <div className="text-sm font-medium text-primary">
                    Step {index + 1}
                  </div>

                  <h3 className={`${typography.h4} mt-2`}>
                    {step}
                  </h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-32 rounded-2xl border p-10 text-center">
          <h2 className={typography.h2}>
            Explore published learning resources
          </h2>

          <p
            className={`${typography.bodyLg} mt-4 text-muted-foreground`}
          >
            Browse technical content, documentation, and developer-focused
            learning materials.
          </p>

          <Button asChild className="mt-8">
            <Link href="/learn">
              Browse Learn
            </Link>
          </Button>
        </section>

        <section className="mt-32 text-center">
          <h2 className={typography.h2}>
            Start building your knowledge base today.
          </h2>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/sign-in">Get Started</Link>
            </Button>

            <Button asChild variant="outline" size="lg">
              <Link href="/learn">Explore Learn</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}