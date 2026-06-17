"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { CreateDocumentForm } from "../forms";
import { useState } from "react";
import { Plus } from "lucide-react";

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
