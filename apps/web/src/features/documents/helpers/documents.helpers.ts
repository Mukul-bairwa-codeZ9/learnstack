// Update the type to allow optional type for loose records
type TiptapNode = { 
  type?: string; 
  text?: string; 
  content?: TiptapNode[]; 
};

const ATOMIC_NODE_TYPES = new Set([
  "image",
  "video",
  "horizontalRule",
  "table",
  "codeBlock",
  "blockquote",
]);

function nodeHasContent(node: TiptapNode | Record<string, unknown> | null | undefined): boolean {
  if (!node) return false;
  
  // Cast safely for internal checks
  const _node = node as TiptapNode;

  if (_node.type === "text" && _node.text && _node.text.trim().length > 0) {
    return true;
  }
  
  if (_node.type && ATOMIC_NODE_TYPES.has(_node.type)) return true;
  
  if (Array.isArray(_node.content)) {
    return _node.content.some(nodeHasContent);
  }
  
  return false;
}

export function isDocumentEmpty(doc?: TiptapNode | Record<string, unknown> | null): boolean {
  if (!doc) return true;
  
  const _doc = doc as TiptapNode;
  
  if (!Array.isArray(_doc.content) || _doc.content.length === 0) {
    return true;
  }
  
  return !_doc.content.some(nodeHasContent);
}