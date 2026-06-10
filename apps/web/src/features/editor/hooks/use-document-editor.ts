import { useState } from "react";

import {
  DEFAULT_EDITOR_CONTENT,
} from "../constants";

import type {
  EditorContent,
} from "../types";

export function useDocumentEditor(
  initialContent?: EditorContent,
) {
  const [content, setContent] =
    useState<EditorContent>(
      initialContent ??
        DEFAULT_EDITOR_CONTENT,
    );

  const [isDirty, setIsDirty] =
    useState(false);

  function handleChange(
    value: EditorContent,
  ) {
    setContent(value);
    setIsDirty(true);
  }

  return {
    content,
    setContent,
    handleChange,
    isDirty,
    setIsDirty,
  };
}