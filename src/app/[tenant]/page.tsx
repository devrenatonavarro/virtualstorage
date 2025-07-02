import { Metadata } from "next"
import ClothingStore from "@/components/page/tenant/clothing-store"

interface Props {
  params: Promise<{
    tenant: string
  }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tenant } = await params
  return {
    title: `Tenant | ${tenant}`,
    description: `Tenant: ${tenant}`,
  }
}

export default async function page({ params }: Props) {
  const { tenant } = await params
  return <ClothingStore title={tenant} />
}
