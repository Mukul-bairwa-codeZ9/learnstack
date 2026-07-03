import { z } from "zod";

export const createDocumentSchema = z.object({
  title: z.string().min(1, "Title is required").max(200, "Title is too long"),

  category: z.string().max(100).optional(),

  excerpt: z.string().max(300).optional(),
});

export type CreateDocumentFormValues = z.infer<typeof createDocumentSchema>;
