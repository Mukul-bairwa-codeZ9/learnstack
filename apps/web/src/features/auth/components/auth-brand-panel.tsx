"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const features = [
  "Create learning workspaces",
  "Write and organize documents",
  "Publish public learning resources",
  "Share technical knowledge",
];

export default function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex flex-col gap-16 bg-muted/40 p-12">
      <div>
        <h1 className="text-3xl font-bold">LearnStack</h1>

        <p className="mt-3 text-muted-foreground">
          Developer learning platform
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-5xl font-bold leading-tight">
          Learn, document, and share technical knowledge.
        </h2>

        <p className="mt-6 text-muted-foreground">
          Organize notes, resources and documentation in one place.
        </p>
      </motion.div>

      <div className="space-y-4">
        {features.map((feature) => (
          <div
            key={feature}
            className="flex items-center gap-3 text-sm text-muted-foreground"
          >
            <CheckCircle2 className="h-4 w-4 text-primary" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
