import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { EDITOR_PLACEHOLDER } from "../constants";
import { underlineExtension } from "./underline";
import { taskListExtensions } from "./task-list";
import { linkExtension } from "./link";

export const editorExtensions = [
  StarterKit.configure({
    heading: {
      levels: [1, 2, 3],
    },
  }),

  underlineExtension,
  linkExtension,
  ...taskListExtensions,

  Placeholder.configure({
    placeholder: EDITOR_PLACEHOLDER,
  }),
];