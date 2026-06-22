"use client";

import dynamic from "next/dynamic";
import { Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

// Dynamically import the real toggle only on the client side
export const ThemeToggleClient = dynamic(
  () => import("./theme-client").then((mod) => mod.ThemeToggle),
  {
    ssr: false,
    loading: () => (
      <Button size="icon" variant="outline" aria-label="Loading theme">
        <Sun className="h-4 w-4 opacity-0" />
      </Button>
    ),
  }
);