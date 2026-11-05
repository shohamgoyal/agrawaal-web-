import { ProductCard } from "@/components/ProductCard";
import { productsByCategory } from "@/lib/catalog";
import { shop } from "@/lib/shop";

export const metadata = {
  title: "Gift Boxes",
  description: "Mithai boxes, festival hampers and wedding packing from Agarwal Sweets, Mangolpuri.",
};

export default function GiftsPage() {
  const gifts = productsByCategory("gifts");
  return (
    <main>
      <section className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/gift-hamper.jpg" alt="Gift hamper" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-maroon-deep/75" />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center text-ivory">
          <p className="text-[11px] uppercase tracking-[0.32em] text-gold">Packed with care</p>
          <h1 className="font-display mt-3 text-5xl">Gift Boxes & Hampers</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ivory/80">
            Suggested assortments for chai, family gatherings, weddings and corporate gifting. Final
            price depends on the mithai and dry fruit you choose inside.
          </p>
        </div>
      </section>
      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {gifts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <p className="mt-10 text-center text-xs text-muted">{shop.priceDisclaimer}</p>
      </section>
    </main>
  );
}
