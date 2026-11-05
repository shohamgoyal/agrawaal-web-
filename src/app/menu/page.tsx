import { MenuBrowser } from "@/components/MenuBrowser";
import { catalogCategories, catalogProducts } from "@/lib/catalog";
import { ensureSeeded } from "@/lib/db-data";
import { shop } from "@/lib/shop";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Menu",
  description: "Full product catalogue of Agarwal Sweets — mithai, namkeen, snacks, bakery, gifts and more.",
};

export default async function MenuPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  await ensureSeeded();
  const params = await searchParams;
  const initial = params.category && catalogCategories.some((c) => c.slug === params.category)
    ? params.category
    : "all";

  return (
    <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
      <p className="text-[11px] uppercase tracking-[0.32em] text-gold">Fresh mithai · namkeen · snacks</p>
      <h1 className="font-display mt-2 text-4xl text-maroon sm:text-5xl">The Catalogue</h1>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
        A suggested product catalogue for a traditional Indian sweet shop. Search by name or filter
        a collection — prices are sold by the piece, plate or kilo.
      </p>
      <div className="mt-6 rounded-xl border border-gold/40 bg-gold-soft/40 px-4 py-3 text-xs leading-relaxed text-ink">
        {shop.priceDisclaimer}
      </div>
      <div className="mt-8">
        <MenuBrowser categories={catalogCategories} products={catalogProducts} initialCategory={initial} />
      </div>
    </main>
  );
}
