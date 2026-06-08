import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Workspace name is required")
    .max(100),

  description: z
    .string()
    .trim()
    .max(500)
    .optional(),
});

export type CreateWorkspaceFormValues =
  z.infer<typeof createWorkspaceSchema>;