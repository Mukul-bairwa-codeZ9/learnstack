"use client";

import { cn } from "@/lib/utils";
import { EditorContent, type Editor as TipTapEditor } from "@tiptap/react";

interface EditorProps {
  editor: TipTapEditor | null;
  className?: string;
}

export function Editor({ editor, className }: EditorProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className={cn("rounded-lg border bg-background p-6", className)}>
      <EditorContent
        editor={editor}
        className="
       prose
          prose-neutral
          dark:prose-invert
          max-w-none
          min-h-[70vh]
          focus:outline-none
          prose-headings:font-semibold
          prose-p:text-base
          prose-p:leading-7
        "
      />
    </div>
  );
}
