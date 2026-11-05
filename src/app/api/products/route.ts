import { catalogCategories, catalogProducts, searchProducts } from "@/lib/catalog";
import { ensureSeeded } from "@/lib/db-data";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  await ensureSeeded();
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  let items = q ? searchProducts(q) : catalogProducts;
  if (category) items = items.filter((p) => p.categorySlug === category);
  return Response.json({ categories: catalogCategories, products: items });
}
