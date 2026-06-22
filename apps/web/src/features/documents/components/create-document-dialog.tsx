"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { CreateDocumentForm } from "../forms";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface CreateDocumentDialogProps {
  workspaceId: string;
}

export function CreateDocumentDialog({
  workspaceId,
}: CreateDocumentDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="default">
          <Plus className="h-4 w-4" />
          New Document
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Document</DialogTitle>
        </DialogHeader>

        <CreateDocumentForm
          workspaceId={workspaceId}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
