import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { EDITOR_PLACEHOLDER } from "../constants";
import { underlineExtension } from "./underline";

export const editorExtensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),

  underlineExtension,

  Placeholder.configure({
    placeholder: EDITOR_PLACEHOLDER,
  }),
];