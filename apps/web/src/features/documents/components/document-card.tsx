import Link from "next/link";

import { Card } from "@/components/ui/card";

import { Document } from "../types";

interface DocumentCardProps {
  document: Document;
  onSelect?: (document: Document) => void;
}

export function DocumentCard({ document, onSelect }: DocumentCardProps) {
  return (
    <Card
      className="cursor-pointer p-4 transition hover:shadow-md"
     onClick={() => onSelect?.(document)}
    >
      <h3 className="font-medium">{document.title}</h3>

      <p className="mt-2 text-sm text-muted-foreground">{document.status}</p>
    </Card>
  );
}
