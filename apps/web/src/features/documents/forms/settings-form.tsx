"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import {
  updateDocumentSettingsSchema,
  type UpdateDocumentSettingsFormValues,
} from "../schemas";

import { useUpdateDocument } from "../hooks";
import { Document } from "../types";


interface DocumentSettingsFormProps {
  document: Document;
}

export function DocumentSettingsForm({ document }: DocumentSettingsFormProps) {
  const updateMutation = useUpdateDocument();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<UpdateDocumentSettingsFormValues>({
    resolver: zodResolver(updateDocumentSettingsSchema),
    defaultValues: {
      title: document.title,
      category: document.category ?? "",
      excerpt: document.excerpt ?? "",
    },
  });

  async function onSubmit(data: UpdateDocumentSettingsFormValues) {
    try {
      const updatedDoc = await updateMutation.mutateAsync({
        id: document._id,
        payload: {
          title: data.title.trim(),
          category: data.category?.trim() || undefined,
          excerpt: data.excerpt?.trim() || undefined,
        },
      });

      // Reset to updated values to recalculate isDirty state
      reset({
        title: updatedDoc.title,
        category: updatedDoc.category ?? "",
        excerpt: updatedDoc.excerpt ?? "",
      });

      toast.success("Document settings updated successfully");
    } catch {
      toast.error("Failed to update document settings");
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Title Field */}
      <div className="space-y-2">
        <Label htmlFor="title" className="text-sm font-medium">
          Document Title <span className="text-destructive">*</span>
        </Label>
        <Input
          id="title"
          placeholder="e.g., Project Roadmap"
          className={errors.title ? "border-destructive focus-visible:ring-destructive" : ""}
          {...register("title")}
        />
        {errors.title && (
          <p className="text-xs font-medium text-destructive mt-1">
            {errors.title.message}
          </p>
        )}
      </div>

      {/* Category Field */}
      <div className="space-y-2">
        <Label htmlFor="category" className="text-sm font-medium">
          Category
        </Label>
        <Input
          id="category"
          placeholder="e.g., Engineering, Marketing, Guides"
          className={errors.category ? "border-destructive focus-visible:ring-destructive" : ""}
          {...register("category")}
        />
        {errors.category && (
          <p className="text-xs font-medium text-destructive mt-1">
            {errors.category.message}
          </p>
        )}
      </div>

      {/* Excerpt / Description Field */}
      <div className="space-y-2">
        <Label htmlFor="excerpt" className="text-sm font-medium">
          Short Description
        </Label>
        <Textarea
          id="excerpt"
          rows={4}
          placeholder="A brief overview or summary of this document..."
          className={`resize-none ${errors.excerpt ? "border-destructive focus-visible:ring-destructive" : ""}`}
          {...register("excerpt")}
        />
        {errors.excerpt && (
          <p className="text-xs font-medium text-destructive mt-1">
            {errors.excerpt.message}
          </p>
        )}
      </div>

      {/* Form Action Controls */}
      <div className="flex items-center gap-3 pt-2">
        <Button
          type="submit"
          disabled={!isDirty || updateMutation.isPending}
          className="min-w-[120px]"
        >
          {updateMutation.isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            "Save Changes"
          )}
        </Button>
      </div>
    </form>
  );
}