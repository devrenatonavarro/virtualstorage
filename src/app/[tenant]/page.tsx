import { Metadata } from "next"
import ClothingStore from "@/components/page/tenant/clothing-store"

interface Props {
  params: {
    tenant: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: `Tenant | ${params.tenant}`,
    description: `Tenant: ${params.tenant}`,
  }
}

export default function page({ params }: Props) {
  return <ClothingStore title={params.tenant} />
}
