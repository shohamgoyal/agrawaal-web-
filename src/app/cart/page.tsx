"use client";

import Link from "next/link";
import { useCart } from "@/components/CartProvider";
import { formatInr } from "@/lib/shop";

export default function CartPage() {
  const { items, setQty, remove, subtotal } = useCart();

  return (
    <main className="mx-auto max-w-4xl px-4 py-14 sm:px-6">
      <h1 className="font-display text-4xl text-maroon">Your box</h1>
      {items.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-sand bg-white p-10 text-center">
          <p className="text-muted">The box is empty. Add a ladoo or two from the menu.</p>
          <Link href="/menu" className="mt-4 inline-flex text-sm font-semibold text-maroon">
            Browse menu →
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-8 divide-y divide-sand rounded-2xl border border-sand bg-white">
            {items.map((item) => (
              <li key={item.slug} className="flex items-center gap-4 p-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={item.image} alt={item.name} className="h-16 w-16 rounded-lg object-cover" />
                <div className="flex-1">
                  <Link href={`/menu/${item.slug}`} className="font-medium text-maroon">
                    {item.name}
                  </Link>
                  <p className="text-xs text-muted">
                    {formatInr(item.price)} / {item.unit}
                  </p>
                </div>
                <div className="flex items-center rounded-md border border-sand">
                  <button type="button" className="w-8 py-1" onClick={() => setQty(item.slug, item.qty - 1)}>
                    −
                  </button>
                  <span className="w-6 text-center text-sm">{item.qty}</span>
                  <button type="button" className="w-8 py-1" onClick={() => setQty(item.slug, item.qty + 1)}>
                    +
                  </button>
                </div>
                <p className="w-20 text-right text-sm font-semibold">{formatInr(item.price * item.qty)}</p>
                <button type="button" className="text-xs text-muted" onClick={() => remove(item.slug)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
            <p className="text-lg">
              Subtotal <span className="font-semibold">{formatInr(subtotal)}</span>
            </p>
            <Link
              href="/checkout"
              className="rounded-md bg-maroon px-6 py-3 text-sm font-semibold text-ivory"
            >
              Continue to checkout
            </Link>
          </div>
        </>
      )}
    </main>
  );
}
