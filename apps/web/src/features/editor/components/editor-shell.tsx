"use client";

import { useEditor } from "@tiptap/react";

import { Editor } from "./editor";
import { EditorToolbar } from "./editor-toolbar";

import { editorExtensions } from "../extensions";
import { DEFAULT_EDITOR_CONTENT } from "../constants";

import type { EditorContent } from "../types";
import { useEffect } from "react";

interface EditorShellProps {
  content?: EditorContent;
  onChange: (content: EditorContent) => void;
  editable?: boolean;
}

export function EditorShell({
  content,
  onChange,
  editable = true,
}: EditorShellProps) {
  const editor = useEditor({
    extensions: editorExtensions,

    content: content ?? DEFAULT_EDITOR_CONTENT,

    editable,

    onUpdate: ({ editor }) => {
      onChange(editor.getJSON());
    },
  });

  useEffect(() => {
    if (!editor) {
      return;
    }

    if (!content) {
      return;
    }

    editor.commands.setContent(content, {emitUpdate:false});
  }, [editor, content]);

  return (
    <div className="space-y-4">
      <EditorToolbar editor={editor} />

      <Editor editor={editor} />
    </div>
  );
}
