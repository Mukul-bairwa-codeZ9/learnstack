"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  createDocumentSchema,
  type CreateDocumentFormValues,
} from "../schemas";

import { useCreateDocument } from "../hooks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CreateDocumentFormProps {
  workspaceId: string;
  onSuccess?: () => void;
}

export function CreateDocumentForm({
  workspaceId,
}: CreateDocumentFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateDocumentFormValues>({
    resolver: zodResolver(
      createDocumentSchema,
    ),
    defaultValues: {
      title: "",
    },
  });

  const createDocumentMutation =
    useCreateDocument();

  const router = useRouter();

  async function onSubmit(
    data: CreateDocumentFormValues,
  ) {
    try {
      if (
        createDocumentMutation.isPending
      ) {
        return;
      }

      const document =
        await createDocumentMutation.mutateAsync(
          {
            ...data,
            workspaceId,
          },
        );

      toast.success(
        "Document created successfully",
      );

      router.push(
        `/workspaces/${workspaceId}/documents/${document._id}`,
      );
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Failed to create document";

      toast.error(message);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Create Document
        </CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(
            onSubmit,
          )}
          className="space-y-4"
        >
          <div>
            <Input
              placeholder="Document Title"
              {...register("title")}
            />

            {errors.title && (
              <p className="mt-1 text-sm text-red-500">
                {errors.title.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={
              createDocumentMutation.isPending
            }
          >
            {createDocumentMutation.isPending
              ? "Creating..."
              : "Create Document"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}