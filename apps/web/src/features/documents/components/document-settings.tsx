"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Settings, Rocket, Globe, AlertTriangle, Loader2 } from "lucide-react";

import { typography } from "@/design-system";

import { ConfirmDialog } from "@/components/data-display/dialogs";
import { LoadingState } from "@/components/feedback";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

import {
  useDocument,
  usePublishDocument,
  useUnpublishDocument,
  useArchiveDocument,
  useDeleteDocument,
} from "../hooks";

import { DialogAction, SettingsTab } from "../types";
import { DocumentSettingsForm } from "../forms";

interface Props {
  documentId: string;
}

const SETTINGS_SECTIONS: {
  id: SettingsTab;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    id: "general",
    label: "General",
    description: "Title, category and description",
    icon: Settings,
  },
  {
    id: "publishing",
    label: "Publishing",
    description: "Visibility and status options",
    icon: Rocket,
  },
  {
    id: "seo",
    label: "SEO",
    description: "Search engine metadata",
    icon: Globe,
  },
  {
    id: "danger",
    label: "Danger Zone",
    description: "Archive or delete document",
    icon: AlertTriangle,
  },
];

export function DocumentSettings({ documentId }: Props) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState<SettingsTab>("general");

  // Single dynamic dialog state
  const [dialogAction, setDialogAction] = useState<DialogAction>(null);

  const [isPublishingTransition, startPublishTransition] = useTransition();

  // API Hooks
  const { data, isLoading } = useDocument(documentId);
  const publishMutation = usePublishDocument();
  const unpublishMutation = useUnpublishDocument();
  const archiveMutation = useArchiveDocument();
  const deleteMutation = useDeleteDocument();

  if (isLoading) {
    return <LoadingState message="Loading document settings..." />;
  }

  if (!data) {
    return (
      <div className="py-12 text-center text-sm text-muted-foreground">
        Document settings not found.
      </div>
    );
  }

  const handlePublishToggle = (checked: boolean) => {
    startPublishTransition(async () => {
      try {
        if (checked) {
          await publishMutation.mutateAsync(data._id);
          toast.success("Document published successfully");
        } else {
          await unpublishMutation.mutateAsync(data._id);
          toast.success("Document unpublished successfully");
        }
      } catch {
        toast.error(`Failed to ${checked ? "publish" : "unpublish"} document`);
      }
    });
  };

  const handleArchive = async () => {
    try {
      await archiveMutation.mutateAsync(data._id);
      setDialogAction(null); // Close dialog on success
      toast.success("Document moved to archives");
    } catch {
      toast.error("Failed to archive document");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteMutation.mutateAsync(data._id);
      toast.success("Document permanently deleted");
      router.push(`/workspaces/${data.workspaceId}`);
    } catch {
      toast.error("Failed to delete document");
    }
  };

  const isPublishPending =
    publishMutation.isPending ||
    unpublishMutation.isPending ||
    isPublishingTransition;
  const isPublished = data.status === "PUBLISHED";

  // Dynamically configure dialog properties based on state
  const dialogConfig = {
    archive: {
      title: "Archive Document?",
      description:
        "This will remove the document from active lists, but you can unarchive it at any time.",
      confirmLabel: "Archive",
      isLoading: archiveMutation.isPending,
      onConfirm: handleArchive,
    },
    delete: {
      title: "Permanently Delete Document?",
      description:
        "Are you absolutely sure? This action is permanent, destroys all history, and cannot be undone.",
      confirmLabel: "Delete",
      isLoading: deleteMutation.isPending,
      onConfirm: handleDelete,
    },
  };

  const activeDialogProps = dialogAction ? dialogConfig[dialogAction] : null;

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Sidebar Navigation */}
      <aside className="h-fit rounded-xl border bg-card p-3">
        <nav className="space-y-1">
          {SETTINGS_SECTIONS.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <Button
                key={section.id}
                variant={isActive ? "secondary" : "ghost"}
                onClick={() => setActiveSection(section.id)}
                className={`w-full h-auto flex-col items-start justify-start gap-1 px-3 py-3 ${
                  !isActive ? "text-muted-foreground" : ""
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon
                    className={`h-4 w-4 ${section.id === "danger" && !isActive ? "text-destructive" : ""}`}
                  />
                  <span className="font-medium">{section.label}</span>
                </div>
                <p
                  className={`text-xs text-left font-normal ${
                    isActive
                      ? "text-secondary-foreground/70"
                      : "text-muted-foreground"
                  }`}
                >
                  {section.description}
                </p>
              </Button>
            );
          })}
        </nav>
      </aside>

      {/* Settings Content Panels */}
      <section className="space-y-6">
        {activeSection === "general" && (
          <>
            <div>
              <h2 className={typography.h3}>General Settings</h2>
              <p className={typography.muted}>
                Manage basic document information and descriptive tags.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6">
              <DocumentSettingsForm document={data} />
            </div>
          </>
        )}

        {activeSection === "publishing" && (
          <>
            <div>
              <h2 className={typography.h3}>Publishing</h2>
              <p className={typography.muted}>
                Control who can access and view this document.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
                <div>
                  <Label
                    htmlFor="publish-toggle"
                    className="text-base font-medium"
                  >
                    Public Visibility
                  </Label>
                  <p className={typography.muted}>
                    {isPublished
                      ? "Anyone with the link can view this document."
                      : "Only workspace members can view this document."}
                  </p>
                  {/* Changed nested <p> to a <div> to avoid HTML hydration errors */}
                  {!data.content && (
                    <div className="text-destructive text-sm font-medium mt-1">
                      Please write some content before publishing
                    </div>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {isPublishPending && (
                    <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  )}
                  <Switch
                    id="publish-toggle"
                    checked={isPublished}
                    onCheckedChange={handlePublishToggle}
                    disabled={isPublishPending || !data.content}
                  />
                </div>
              </div>
            </div>
          </>
        )}

        {activeSection === "seo" && (
          <>
            <div>
              <h2 className={typography.h3}>
                SEO (Search Engine Optimization)
              </h2>
              <p className={typography.muted}>
                Optimize how this page appears on Google search results.
              </p>
            </div>
            <div className="rounded-xl border bg-card p-6 space-y-6">
              <div className="space-y-2">
                <Label htmlFor="seo-title">SEO Title</Label>
                <Input id="seo-title" placeholder={data.title} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="seo-description">SEO Description</Label>
                <Textarea
                  id="seo-description"
                  rows={4}
                  placeholder="A short description summarizing the contents..."
                  disabled
                />
              </div>
            </div>
          </>
        )}

        {activeSection === "danger" && (
          <>
            <div>
              <h2 className={`${typography.h3} text-destructive`}>
                Danger Zone
              </h2>
              <p className={typography.muted}>
                Irreversible administrative actions for this document.
              </p>
            </div>
            <div className="rounded-xl border border-destructive/20 bg-card p-6 space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b pb-4">
                <div>
                  <h3 className="font-medium text-foreground">
                    Archive Document
                  </h3>
                  <p className={typography.muted}>
                    Hide this document from your active workspace list. It can
                    be restored later.
                  </p>
                  {data.status === "DRAFT" && (
                    <p className="text-destructive text-sm mt-1">
                      Draft documents cannot be archived
                    </p>
                  )}
                </div>
                <Button
                  variant="outline"
                  disabled={data.status === "DRAFT"}
                  onClick={() => setDialogAction("archive")}
                >
                  Archive
                </Button>
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pt-2">
                <div>
                  <h3 className="font-medium text-destructive">
                    Delete Document
                  </h3>
                  <p className={typography.muted}>
                    Permanently destroy this document and all its containing
                    revisions. This cannot be undone.
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => setDialogAction("delete")}
                >
                  Delete Document
                </Button>
              </div>
            </div>
          </>
        )}
      </section>

      {activeDialogProps && (
        <ConfirmDialog
          open={!!dialogAction}
          onOpenChange={(open) => !open && setDialogAction(null)}
          title={activeDialogProps.title}
          description={activeDialogProps.description}
          confirmLabel={activeDialogProps.confirmLabel}
          isLoading={activeDialogProps.isLoading}
          onConfirm={activeDialogProps.onConfirm}
        />
      )}
    </div>
  );
}
