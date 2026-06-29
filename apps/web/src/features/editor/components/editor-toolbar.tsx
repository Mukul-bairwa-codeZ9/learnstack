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
  LinkIcon,
  Palette,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EDITOR_COLORS } from "../constants";
import { useState } from "react";

interface EditorToolbarProps {
  editor: Editor | null;
}

interface ToolbarState {
  isBold: boolean;
  isItalic: boolean;
  isUnderline: boolean;
  isStrike: boolean;
  isParagraph: boolean;
  isH1: boolean;
  isH2: boolean;
  isH3: boolean;
  isBulletList: boolean;
  isOrderedList: boolean;
  isTaskList: boolean;
  isCodeBlock: boolean;
  isBlockquote: boolean;
  isLink: boolean;
  currentColor: string;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const toolbarState = useEditorState<ToolbarState>({
    editor: editor as Editor, // Safely handle null editor during initial hook setup
    selector: ({ editor: currentEditor }) :ToolbarState=> {
      if (!currentEditor) {
        return {
          isBold: false,
          isItalic: false,
          isUnderline: false,
          isStrike: false,
          isParagraph: false,
          isH1: false,
          isH2: false,
          isH3: false,
          isBulletList: false,
          isOrderedList: false,
          isTaskList: false,
          isCodeBlock: false,
          isBlockquote: false,
          isLink: false,
          currentColor: "",
        };
      }
      return {
        isBold: currentEditor.isActive("bold"),
        isItalic: currentEditor.isActive("italic"),
        isUnderline: currentEditor.isActive("underline"),
        isStrike: currentEditor.isActive("strike"),
        isParagraph: currentEditor.isActive("paragraph"),
        isH1: currentEditor.isActive("heading", { level: 1 }),
        isH2: currentEditor.isActive("heading", { level: 2 }),
        isH3: currentEditor.isActive("heading", { level: 3 }),
        isBulletList: currentEditor.isActive("bulletList"),
        isOrderedList: currentEditor.isActive("orderedList"),
        isTaskList: currentEditor.isActive("taskList"),
        isCodeBlock: currentEditor.isActive("codeBlock"),
        isBlockquote: currentEditor.isActive("blockquote"),
        isLink: currentEditor.isActive("link"),
        currentColor: currentEditor.getAttributes("textStyle")?.color ?? "",
      };
    },
  });

  if (!editor) {
    return null;
  }

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

      <Separator orientation="vertical" className="h-6" />
      <div className="flex items-center gap-1">
        <Button
          type="button"
          variant={toolbarState.isLink ? "secondary" : "ghost"}
          onClick={() => {
            const previousUrl = editor?.getAttributes("link").href;

            const url = window.prompt("Enter URL", previousUrl ?? "");

            if (url === null) {
              return;
            }

            if (url === "") {
              editor?.chain().focus().unsetLink().run();

              return;
            }

            editor
              ?.chain()
              .focus()
              .setLink({
                href: url,
              })
              .run();
          }}
        >
          <LinkIcon className="size-4" />
        </Button>
      </div>
      <Separator orientation="vertical" className="h-6" />
      <div className="flex items-center gap-1">
        <DropdownMenu open={isColorMenuOpen} onOpenChange={setIsColorMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              className="h-9 w-9"
              variant="outline"
              aria-label="Text Color"
            >
              <Palette
                className="h-4 w-4"
                style={{ color: toolbarState.currentColor || "currentColor" }}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            sideOffset={4}
            avoidCollisions
            className="min-w-[120px]"
          >
            {EDITOR_COLORS.map((color) => (
              <DropdownMenuItem
                key={color.label}
                className="flex items-center gap-2 cursor-pointer"
                onSelect={() => {
                  requestAnimationFrame(() => {
                    if (!color.value) {
                      editor.chain().focus().unsetColor().run();
                    } else {
                      editor.chain().focus().setColor(color.value).run();
                    }
                  });
                }}
              >
                <span
                  className="h-3 w-3 rounded-full border border-muted"
                  style={{ backgroundColor: color.value || "transparent" }}
                />
                <span style={{ color: color.value || "inherit" }}>
                  {color.label}
                </span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
