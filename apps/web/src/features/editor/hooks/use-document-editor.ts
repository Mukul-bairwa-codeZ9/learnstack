import { useRef, useState } from "react";

import {
  DEFAULT_EDITOR_CONTENT,
} from "../constants";

import type {
  EditorContent,
} from "../types";

export function useDocumentEditor(
  initialContent?: EditorContent,
) {

  // Use a ref to store the actual content so typing NEVER triggers a re-render
  const contentRef = useRef<EditorContent>(initialContent ?? DEFAULT_EDITOR_CONTENT);

  const [isDirty, setIsDirty] =
    useState(false);

 function handleChange(value: EditorContent) {
    contentRef.current = value;
    // Only trigger a state change if we weren't already dirty (saves massive re-renders)
    if (!isDirty) {
      setIsDirty(true);
    }
  }

  function setContent(value: EditorContent) {
    contentRef.current = value;
  }
  return {
    // Expose a function or the ref directly to read the latest data on Save
    getContent: () => contentRef.current,
    setContent,
    handleChange,
    isDirty,
    setIsDirty,
  };
}