"use client";

import { useEffect } from "react";

import {
  EditorContent,
  useEditor,
} from "@tiptap/react";

import { editorExtensions } from "../extensions";
import {
  DEFAULT_EDITOR_CONTENT,
} from "../constants";

import type {
  EditorContent as EditorContentType,
} from "../types";

interface EditorProps {
  content?: EditorContentType;
  onChange: (
    content: EditorContentType,
  ) => void;
  editable?: boolean;
}

export function Editor({
  content,
  onChange,
  editable = true,
}: EditorProps) {
  const editor = useEditor({
    extensions:
      editorExtensions,

    content:
      content ??
      DEFAULT_EDITOR_CONTENT,

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

    editor.commands.setContent(
      content,
      {
        emitUpdate: false,
      },
    );
  }, [editor, content]);

  if (!editor) {
    return null;
  }

  return (
    <div className="rounded-md border">
      <EditorContent
        editor={editor}
        className="min-h-[300px] p-4"
      />
    </div>
  );
}