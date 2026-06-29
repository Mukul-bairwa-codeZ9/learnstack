"use client";

import { useEditorState, type Editor } from "@tiptap/react";

import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Heading2,
  List,
  ListOrdered,
  Code2,
  Quote,
  Underline,
  Strikethrough,
  Heading1,
  Heading3,
  ListTodo,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface EditorToolbarProps {
  editor: Editor | null;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) {
    return null;
  }

  const toolbarState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      // Inline Formatting Group
      isBold: editor.isActive("bold"),
      isItalic: editor.isActive("italic"),
      isUnderline: editor.isActive("underline"),
      isStrike: editor.isActive("strike"),

      // Headings + Paragraph Group
      isParagraph: editor.isActive("paragraph"),
      isH1: editor.isActive("heading", { level: 1 }),
      isH2: editor.isActive("heading", { level: 2 }),
      isH3: editor.isActive("heading", { level: 3 }),

      // Lists Group
      isBulletList: editor.isActive("bulletList"),
      isOrderedList: editor.isActive("orderedList"),
      isTaskList: editor.isActive("taskList"),

      // Blocks Group
      isCodeBlock: editor.isActive("codeBlock"),
      isBlockquote: editor.isActive("blockquote"),
    }),
  });
  return (
    <div
      className="
    sticky
    top-16
    z-20
    flex
    flex-wrap
    gap-2
    border-b
    bg-card
    p-3
    backdrop-blur
  "
    >
      {/* Inline Formatting Group */}
      <div className="flex items-center gap-1">
        <Button
          size="sm"
          className="h-9 w-9"
          variant={toolbarState.isBold ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBold().run()}
          aria-label="Bold"
          aria-pressed={toolbarState.isBold}
        >
          <Bold className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          className="h-9 w-9"
          variant={toolbarState.isItalic ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleItalic().run()}
          aria-label="Italic"
          aria-pressed={toolbarState.isItalic}
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          className="h-9 w-9"
          variant={toolbarState.isUnderline ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          aria-label="Underline"
          aria-pressed={toolbarState.isUnderline}
        >
          <Underline className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          className="h-9 w-9"
          variant={toolbarState.isStrike ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleStrike().run()}
          aria-label="Strikethrough"
          aria-pressed={toolbarState.isStrike}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />
      {/* Headings  Group + paragraph (Restricted to H1, H2, H3) */}
      <div className="flex items-center gap-1">
        <Button
          size="sm"
          className="h-9 w-9 "
          variant={toolbarState.isParagraph ? "default" : "outline"}
          onClick={() => editor.chain().focus().setParagraph().run()}
          aria-label="Paragraph"
          aria-pressed={toolbarState.isParagraph}
        >
          P
        </Button>
        <Button
          size="sm"
          className="h-9 w-9"
          variant={toolbarState.isH1 ? "default" : "outline"}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          aria-label="Heading 1"
          aria-pressed={toolbarState.isH1}
        >
          <Heading1 className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          className="h-9 w-9"
          variant={toolbarState.isH2 ? "default" : "outline"}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          aria-label="Heading 2"
          aria-pressed={toolbarState.isH2}
        >
          <Heading2 className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          className="h-9 w-9"
          variant={toolbarState.isH3 ? "default" : "outline"}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          aria-label="Heading 3"
          aria-pressed={toolbarState.isH3}
        >
          <Heading3 className="h-4 w-4" />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Lists Group */}
      <div className="flex items-center gap-1">
        <Button
          size="sm"
          className="h-9 w-9"
          variant={toolbarState.isBulletList ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          aria-label="Bullet List"
          aria-pressed={toolbarState.isBulletList}
        >
          <List className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          className="h-9 w-9"
          variant={toolbarState.isOrderedList ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          aria-label="Ordered List"
          aria-pressed={toolbarState.isOrderedList}
        >
          <ListOrdered className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          className="h-9 w-9"
          variant={toolbarState.isTaskList ? "default" : "outline"}
          onClick={() => editor?.chain().focus().toggleTaskList().run()}
          aria-label="Tak List"
          aria-pressed={toolbarState.isTaskList}
        >
          <ListTodo />
        </Button>
      </div>

      <Separator orientation="vertical" className="h-6" />

      {/* Blocks Group */}

      <div className="flex items-center gap-1">
        <Button
          size="sm"
          className="h-9 w-9"
          variant={toolbarState.isCodeBlock ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          aria-label="Code Block"
          aria-pressed={toolbarState.isCodeBlock}
        >
          <Code2 className="h-4 w-4" />
        </Button>

        <Button
          size="sm"
          className="h-9 w-9"
          variant={toolbarState.isBlockquote ? "default" : "outline"}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          aria-label="Blockquote"
          aria-pressed={toolbarState.isBlockquote}
        >
          <Quote className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
