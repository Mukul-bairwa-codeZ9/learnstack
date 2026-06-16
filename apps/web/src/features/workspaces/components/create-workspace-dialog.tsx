"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { CreateWorkspaceForm } from "../forms";
import { useState } from "react";
import { Plus } from "lucide-react";


export function CreateWorkspaceDialog() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="default">
          <Plus className="h-4 w-4" />
          New Workspace
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Workspace</DialogTitle>
        </DialogHeader>

        <CreateWorkspaceForm
        />
      </DialogContent>
    </Dialog>
  );
}
