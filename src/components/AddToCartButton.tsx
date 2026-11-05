"use client";

import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import type { CatalogProduct } from "@/lib/catalog";

export function AddToCartButton({ product }: { product: CatalogProduct }) {
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-3">
      <div className="flex h-12 items-center rounded-md border border-sand bg-white">
        <button type="button" className="w-10 text-lg" onClick={() => setQty((q) => Math.max(1, q - 1))}>
          −
        </button>
        <span className="w-8 text-center text-sm">{qty}</span>
        <button type="button" className="w-10 text-lg" onClick={() => setQty((q) => q + 1)}>
          +
        </button>
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
            qty,
          );
          setAdded(true);
          setTimeout(() => setAdded(false), 1600);
        }}
        className="h-12 rounded-md bg-maroon px-6 text-sm font-semibold text-ivory hover:bg-maroon-soft"
      >
        {added ? "Added to cart" : "Add to cart"}
      </button>
    </div>
  );
}
