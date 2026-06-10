import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";

import {
  EDITOR_PLACEHOLDER,
} from "../constants";

export const editorExtensions = [
  StarterKit,
  Placeholder.configure({
    placeholder:
      EDITOR_PLACEHOLDER,
  }),
];