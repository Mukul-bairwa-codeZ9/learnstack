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
    <div
      className=" 
      rounded-lg
    border
    bg-background
    p-6"
    >
      <EditorContent
        editor={editor}
        className="min-h-[300px] 
          p-6
          prose
          prose-neutral
        dark:prose-invert
          max-w-none
          min-h-[500px]
          focus:outline-none"
      />
    </div>
  );
}
