"use client";

import { EditorContent, type Editor as TipTapEditor } from "@tiptap/react";

interface EditorProps {
  editor: TipTapEditor | null;
}

export function Editor({ editor }: EditorProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="bg-background">
      <div className="mx-auto max-w-4xl px-6 py-8">
        <EditorContent
          editor={editor}
          className="
          prose
          prose-neutral
          dark:prose-invert
          prose-headings:font-semibold
          prose-p:text-base
          prose-p:leading-7
          max-w-none
          min-h-[70vh]
          focus:outline-none
        "
        />
      </div>
    </div>
  );
}
