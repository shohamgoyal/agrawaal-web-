"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import { formatPrice } from "@/lib/shop";
import type { CatalogProduct } from "@/lib/catalog";

export function ProductCard({ product }: { product: CatalogProduct }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <article className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border border-sand bg-white shadow-[0_8px_24px_rgba(44,24,16,0.06)]">
      <Link href={`/menu/${product.slug}`} className="relative block aspect-square overflow-hidden bg-sand">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
        {product.tags.includes("bestseller") ? (
          <span className="absolute left-3 top-3 rounded-full bg-maroon px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-gold">
            Bestseller
          </span>
        ) : product.tags.includes("premium") ? (
          <span className="absolute left-3 top-3 rounded-full bg-gold px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-maroon-deep">
            Premium
          </span>
        ) : null}
        <span className="absolute right-3 top-3 grid h-5 w-5 place-items-center rounded-full border border-green-700 bg-white">
          <span className="h-2 w-2 rounded-full bg-green-700" />
        </span>
      </Link>
      <div className="flex flex-1 flex-col p-4">
        <Link href={`/menu/${product.slug}`}>
          <h3 className="font-display text-lg leading-snug text-maroon">{product.name}</h3>
        </Link>
        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">{product.description}</p>
        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <p className="text-base font-semibold text-ink">{formatPrice(product.priceMin, product.priceMax)}</p>
            <p className="text-[11px] uppercase tracking-wider text-muted">{product.unit}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              add(
                {
                  slug: product.slug,
                  name: product.name,
                  price: product.priceMin,
                  unit: product.unit,
                  image: product.image,
                },
                1,
              );
              setAdded(true);
              setTimeout(() => setAdded(false), 1400);
            }}
            className="rounded-md bg-maroon px-3 py-2 text-xs font-semibold text-ivory hover:bg-maroon-soft"
          >
            {added ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </article>
  );
}
