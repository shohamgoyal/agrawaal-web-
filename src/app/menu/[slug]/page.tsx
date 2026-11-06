import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { catalogCategories, catalogProducts, getProduct } from "@/lib/catalog";
import { formatPrice, shop, whatsappLink } from "@/lib/shop";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Product" };
  return { title: product.name, description: product.description };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = catalogCategories.find((c) => c.slug === product.categorySlug);
  const related = catalogProducts
    .filter((p) => p.categorySlug === product.categorySlug && p.slug !== product.slug)
    .slice(0, 4);

  return (
    <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="text-xs text-muted">
        <Link href="/menu" className="hover:text-maroon">
          Menu
        </Link>
        {category ? (
          <>
            {" / "}
            <Link href={`/menu?category=${category.slug}`} className="hover:text-maroon">
              {category.name.split("(")[0].trim()}
            </Link>
          </>
        ) : null}
        {" / "}
        {product.name}
      </p>
      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <div className="overflow-hidden rounded-3xl border border-sand bg-sand">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt={product.name} className="aspect-square w-full object-cover" />
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">
            {category?.name.split("(")[0].trim()}
          </p>
          <h1 className="font-display mt-2 text-4xl text-maroon">{product.name}</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted">{product.description}</p>
          <div className="mt-6 flex items-end gap-3">
            <p className="font-display text-4xl text-ink">{formatPrice(product.priceMin, product.priceMax)}</p>
            <p className="pb-1 text-sm uppercase tracking-wider text-muted">/ {product.unit}</p>
          </div>
          <p className="mt-2 text-xs text-muted">{shop.priceDisclaimer}</p>
          <a
            href={whatsappLink(`Namaste, I would like to enquire about ${product.name}. Please share availability and the current price.`)}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex h-12 items-center rounded-md bg-maroon px-6 text-sm font-semibold text-ivory hover:bg-maroon-soft"
          >
            Enquire on WhatsApp
          </a>
          <p className="mt-3 text-xs text-muted">
            This opens a WhatsApp chat with the shop. Your enquiry is not an order until the shop confirms it.
          </p>
          <ul className="mt-8 space-y-2 text-sm text-muted">
            <li>Vegetarian · made fresh at the Mangolpuri counter</li>
            <li>Sold by {product.unit.toLowerCase()} · packed the same day</li>
            <li>Call {shop.phoneDisplay} for bulk or festive enquiries</li>
          </ul>
        </div>
      </div>
      {related.length ? (
        <section className="mt-16">
          <h2 className="font-display text-2xl text-maroon">More from this tray</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
