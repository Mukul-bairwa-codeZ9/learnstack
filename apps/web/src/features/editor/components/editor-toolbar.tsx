"use client";

import type { Editor } from "@tiptap/react";

import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  Heading2,
  List,
  ListOrdered,
  Code2,
  Quote,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

interface EditorToolbarProps {
  editor: Editor | null;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  if (!editor) {
    return null;
  }

  return (
    <div className="flex flex-wrap gap-2  rounded-lg border-b p-2">
     <Button
  size="icon"
  variant={
    editor.isActive("bold")
      ? "default"
      : "outline"
  }
  onClick={() =>
    editor.chain().focus().toggleBold().run()
  }
>
  <Bold className="h-4 w-4" />
</Button>

    <Button
        size="icon"
        variant={
          editor.isActive("italic")
            ? "default"
            : "outline"
        }
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleItalic()
            .run()
        }
      >
        <Italic className="h-4 w-4" />
      </Button>


      <Separator
        orientation="vertical"
        className="h-6"
      />


      <Button
        size="icon"
        variant={
          editor.isActive("heading", {
            level: 2,
          })
            ? "default"
            : "outline"
        }
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHeading({
              level: 2,
            })
            .run()
        }
      >
        <Heading2 className="h-4 w-4" />
      </Button>

      <Separator
        orientation="vertical"
        className="h-6"
      />

      <Button
        size="icon"
        variant={
          editor.isActive("bulletList")
            ? "default"
            : "outline"
        }
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleBulletList()
            .run()
        }
      >
        <List className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant={
          editor.isActive("orderedList")
            ? "default"
            : "outline"
        }
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleOrderedList()
            .run()
        }
      >
        <ListOrdered className="h-4 w-4" />
      </Button>

      <Separator
        orientation="vertical"
        className="h-6"
      />

      <Button
        size="icon"
        variant={
          editor.isActive("codeBlock")
            ? "default"
            : "outline"
        }
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleCodeBlock()
            .run()
        }
      >
        <Code2 className="h-4 w-4" />
      </Button>

      <Button
        size="icon"
        variant={
          editor.isActive("blockquote")
            ? "default"
            : "outline"
        }
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleBlockquote()
            .run()
        }
      >
        <Quote className="h-4 w-4" />
      </Button>
    </div>
  );
}
