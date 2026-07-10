"use client";

import { useEditor } from "@tiptap/react";

import { Editor } from "./editor";
import { EditorToolbar } from "./editor-toolbar";

import { editorExtensions } from "../extensions";
import { DEFAULT_EDITOR_CONTENT } from "../constants";

import type { EditorContent } from "../types";

interface EditorShellProps {
  initialContent?: EditorContent;
  onChange: (content: EditorContent) => void;
  editable?: boolean;
}

export function EditorShell({
  initialContent,
  onChange,
  editable = true,
}: EditorShellProps) {
  const editor = useEditor({
    extensions: editorExtensions,
    content: initialContent ?? DEFAULT_EDITOR_CONTENT,
    editable,
    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  return (
    <div className="flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm">
      {editable && <EditorToolbar editor={editor} />}

      <Editor editor={editor} />
    </div>
  );
}