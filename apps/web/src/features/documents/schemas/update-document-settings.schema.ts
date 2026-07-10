import { z } from "zod";

export const updateDocumentSettingsSchema = z.object({
  title: z.string().min(1).max(255),

  category: z.string().max(100).optional().or(z.literal("")),

  excerpt: z.string().max(300).optional().or(z.literal("")),
});

export type UpdateDocumentSettingsFormValues = z.infer<
  typeof updateDocumentSettingsSchema
>;
