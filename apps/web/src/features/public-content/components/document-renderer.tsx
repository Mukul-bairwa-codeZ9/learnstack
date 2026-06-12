"use client";

import { useEditor } from "@tiptap/react";

import { Editor } from "@/features/editor/components/editor";

import { editorExtensions } from "@/features/editor/extensions";

import type { EditorContent } from "@/features/editor/types";

interface DocumentRendererProps {
  content: EditorContent;
}

export function DocumentRenderer({
  content,
}: DocumentRendererProps) {
  const editor = useEditor({
    extensions: editorExtensions,

    content,

    editable: false,
  });

  if (!editor) {
    return null;
  }

  return <Editor editor={editor} />;
}