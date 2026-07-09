"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  createWorkspaceSchema,
  type CreateWorkspaceFormValues,
} from "../schemas";
import { useCreateWorkspace } from "../hooks";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function CreateWorkspaceForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateWorkspaceFormValues>({
    resolver: zodResolver(createWorkspaceSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const createWorkspaceMutation = useCreateWorkspace();
  const router = useRouter();

  async function onSubmit(data: CreateWorkspaceFormValues) {
    try {
      if (createWorkspaceMutation.isPending) {
        return;
      }
      // Use mutateAsync so we can await the result and get the new workspace _id
      const workspace = await createWorkspaceMutation.mutateAsync(data);

      toast.success("Workspace created successfully");

      // Redirect straight to the new workspace home
      router.push(`/workspaces/${workspace.id}`);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to create workspace";

      toast.error(message);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Workspace Name Field */}
      <div>
        <Input placeholder="e.g. React Learning Path" {...register("name")} />
        {errors.name && (
          <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      {/* Workspace Description Field */}
      <div>
        <Textarea
          placeholder="What will you use this workspace for?"
          {...register("description")}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">
            {errors.description.message}
          </p>
        )}
      </div>

      {/* Submit Button with Loading State */}
      <Button
        type="submit"
        className="w-full"
        disabled={createWorkspaceMutation.isPending}
      >
        {createWorkspaceMutation.isPending
          ? "Creating Workspace..."
          : "Get Started"}
      </Button>
    </form>
  );
}
