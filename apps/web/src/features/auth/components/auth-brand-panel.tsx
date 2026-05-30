"use client";

import { motion } from "framer-motion";

export default function AuthBrandPanel() {
  return (
    <div className="hidden lg:flex flex-col justify-between bg-muted/40 p-12">
      <div>
        <h1 className="text-3xl font-bold">
          DevDocs
        </h1>

        <p className="mt-3 text-muted-foreground">
          Developer documentation platform
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="text-5xl font-bold leading-tight">
          Build your
          <br />
          coding knowledge base.
        </h2>

        <p className="mt-6 text-muted-foreground">
          Organize notes, resources and
          documentation in one place.
        </p>
      </motion.div>
    </div>
  );
}