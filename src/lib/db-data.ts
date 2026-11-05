import { db } from "@/db";
import { categories, products } from "@/db/schema";
import { catalogCategories, catalogProducts, type CatalogProduct } from "@/lib/catalog";

let seeded = false;

export async function ensureSeeded() {
  if (seeded) return;
  try {
    const existing = await db.select({ id: categories.id }).from(categories).limit(1);
    if (existing.length === 0) {
      await db.insert(categories).values(catalogCategories);
      await db.insert(products).values(catalogProducts);
    }
    seeded = true;
  } catch {
    seeded = false;
  }
}

export async function listProducts(): Promise<(CatalogProduct & { id?: number })[]> {
  try {
    await ensureSeeded();
    const rows = await db.select().from(products);
    if (rows.length) return rows;
  } catch {
    /* fall through to static catalogue */
  }
  return catalogProducts;
}
