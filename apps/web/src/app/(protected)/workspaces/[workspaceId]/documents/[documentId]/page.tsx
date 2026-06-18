import {DocumentDetails} from "@/features/documents/components";

interface Props {
  params:Promise<{
    workspaceId:string;
    documentId:string;
  }>
}


export default function page(props:Props) {
  return (
    <DocumentDetails {...props} />
  )
}
