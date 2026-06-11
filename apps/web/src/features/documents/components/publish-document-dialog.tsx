"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

interface PublishDocumentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  onConfirm: () => void;

  isLoading?: boolean;
}

export function PublishDocumentDialog({
  open,
  onOpenChange,
  onConfirm,
  isLoading = false,
}: PublishDocumentDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Publish Document</DialogTitle>

          <DialogDescription>
            This document will become publicly available and accessible through
            its published URL.
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>

          <Button disabled={isLoading} onClick={onConfirm}>
            Publish
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
