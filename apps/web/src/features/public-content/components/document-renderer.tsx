"use client";

import { useEditor } from "@tiptap/react";
import { editorExtensions } from "@/features/editor/extensions";
import { Editor } from "@/features/editor/components/editor";
import type { EditorContent as Content } from "@/features/editor/types";

interface DocumentRendererProps {
  content: Content;
}

export function DocumentRenderer({ content }: DocumentRendererProps) {
  const editor = useEditor({
    extensions: editorExtensions,
    content,
    editable: false,
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <div
      className="
    prose
    prose-neutral
    dark:prose-invert
    max-w-none

    prose-headings:scroll-mt-24
    prose-headings:font-semibold

    prose-p:text-base
    prose-p:leading-7

    prose-ul:leading-7
    prose-ol:leading-7

    prose-li:my-1

    prose-pre:rounded-lg
    prose-pre:border

    prose-table:text-sm

    prose-blockquote:text-muted-foreground
  "
    >
      {" "}
      <Editor
        editor={editor}
        className="border-0 bg-transparent p-0 shadow-none"
      />
    </div>
  );
}
