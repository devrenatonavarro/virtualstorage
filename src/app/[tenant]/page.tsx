import { Metadata } from "next";
import ClothingStore from "@/components/page/tenant/clothing-store";
import { redirect } from "next/navigation";

interface Props {
  params: {
    tenant: string;
  };
}

// Metadata para el <head>
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tenant } = params;

  return {
    title: `Tenant | ${tenant}`,
    description: `Tenant: ${tenant}`,
  };
}

// Obtener productos desde el backend
async function getProducts(tenant: string) {
  if (!tenant) {
    throw new Error("Tenant is required");
  }

  if (!process.env.NEXT_PUBLIC_API_URL) {
    throw new Error("Missing NEXT_PUBLIC_API_URL environment variable");
  }

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
    headers: {
      "X-Tenant-ID": tenant,
    },
  }).catch(() => {
    // Redireccionar al home
    redirect("/");
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch products: ${res.status}`);
  }

  const products = await res.json();

  return { products };
}

// Página principal del tenant
export default async function Page({ params }: Props) {
  const { tenant } = params;

  const { products } = await getProducts(tenant);

  console.log("Tenant:", tenant);
  console.log("Products:", products); // puedes eliminar esto si no lo necesitas

  return <ClothingStore title={tenant} />;
}
