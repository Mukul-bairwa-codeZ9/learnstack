export interface TiptapNode {
  type: string;
  text?: string;
  content?: TiptapNode[];
}

const ATOMIC_NODE_TYPES = new Set([
  'image',
  'video',
  'horizontalRule',
  'table',
  'codeBlock',
  'blockquote',
]);

function nodeHasContent(
  node: TiptapNode | Record<string, any> | null | undefined,
): boolean {
  if (!node) return false;

  // Cast internally so TypeScript allows property access
  const _node = node as TiptapNode;

  if (_node.type === 'text' && _node.text && _node.text.trim().length > 0) {
    return true;
  }
  if (ATOMIC_NODE_TYPES.has(_node.type)) return true;
  if (Array.isArray(_node.content)) {
    return _node.content.some(nodeHasContent);
  }
  return false;
}

// Update the parameter type here to accept the Record coming from Mongoose
export function isTiptapDocEmpty(
  doc?: TiptapNode | Record<string, any> | null,
): boolean {
  if (!doc) return true;

  const _doc = doc as TiptapNode;

  if (!Array.isArray(_doc.content) || _doc.content.length === 0) {
    return true;
  }
  return !_doc.content.some(nodeHasContent);
}
