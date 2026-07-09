import { DocumentSettings } from "@/features/documents";

export default async function Page({
  params,
}: {
  params: Promise<{
    workspaceId: string;
    documentId: string;
  }>;
}) {
  const { workspaceId,documentId } = await params;

  return <DocumentSettings  workspaceId={workspaceId} documentId={documentId} />;
}
