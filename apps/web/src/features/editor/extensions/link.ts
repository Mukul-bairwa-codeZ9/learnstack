import Link from "@tiptap/extension-link";

export const linkExtension = Link.configure({
  openOnClick: false,
  autolink: true,
  defaultProtocol: "https",
  HTMLAttributes: {
    rel: "noopener noreferrer",
    target: "_blank",
  },
});