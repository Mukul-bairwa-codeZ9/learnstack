"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  createDocumentSchema,
  type CreateDocumentFormValues,
} from "../schemas";

import { useCreateDocument } from "../hooks";

interface CreateDocumentFormProps {
  workspaceId: string;
  onSuccess?: () => void;
}

export function CreateDocumentForm({
  workspaceId,
  onSuccess,
}: CreateDocumentFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateDocumentFormValues>({
    resolver: zodResolver(createDocumentSchema),
    defaultValues: {
      title: "",
      category: "",
      excerpt: "",
    },
  });

  const createDocumentMutation = useCreateDocument();

  const router = useRouter();

  async function onSubmit(data: CreateDocumentFormValues) {
    try {
      if (createDocumentMutation.isPending) {
        return;
      }

      const payload = {
        ...data,
        workspaceId,
        title: data.title.trim(),
        category: data.category?.trim(),
        excerpt: data.excerpt?.trim(),
      };

      const document = await createDocumentMutation.mutateAsync(payload);

      toast.success("Document created successfully");
      reset();
      onSuccess?.();
      router.push(`/workspaces/${workspaceId}/documents/${document._id}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create document";

      toast.error(message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-5">
        <div className="space-y-2">
          <Input placeholder="Document Title" {...register("title")} />

          {errors.title && (
            <p className="mt-1 text-sm text-destructive">
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Input placeholder="Category (optional)" {...register("category")} />

          {errors.category && (
            <p className="text-sm text-destructive">
              {errors.category.message}
            </p>
          )}
        </div>
        <div className="space-y-2">
          <Textarea
            rows={4}
            placeholder="Short description (optional)"
            {...register("excerpt")}
          />

          {errors.excerpt && (
            <p className="text-sm text-destructive">{errors.excerpt.message}</p>
          )}
        </div>
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled={createDocumentMutation.isPending}
      >
        {createDocumentMutation.isPending ? "Creating..." : "Create Document"}
      </Button>
    </form>
  );
}
