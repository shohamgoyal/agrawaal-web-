"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { useCart } from "@/components/CartProvider";
import { formatInr, shop } from "@/lib/shop";

export default function CheckoutPage() {
  const { items, subtotal, clear } = useCart();
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!items.length) return;
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          items: items.map((i) => ({
            slug: i.slug,
            name: i.name,
            unitPrice: i.price,
            quantity: i.qty,
          })),
          subtotal,
        }),
      });
      const json = (await res.json()) as { orderCode?: string };
      if (!res.ok || !json.orderCode) throw new Error("fail");
      clear();
      router.push(`/order-success?code=${encodeURIComponent(json.orderCode)}`);
    } catch {
      setStatus("error");
    }
  }

  if (!items.length) {
    return (
      <main className="mx-auto max-w-xl px-4 py-20 text-center">
        <h1 className="font-display text-3xl text-maroon">Nothing to pack</h1>
        <p className="mt-3 text-sm text-muted">Add items from the menu first.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto grid max-w-5xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
      <form onSubmit={onSubmit} className="rounded-3xl border border-sand bg-white p-8">
        <h1 className="font-display text-3xl text-maroon">Place your order</h1>
        <p className="mt-2 text-sm text-muted">
          We will confirm on the phone. Pickup at I-220, Mangolpuri, or local delivery if we can
          send a rider.
        </p>
        <div className="mt-6 space-y-4">
          <label className="block text-sm">
            Full name
            <input required name="customerName" className="mt-1 h-11 w-full rounded-lg border border-sand px-3 outline-none focus:border-gold" />
          </label>
          <label className="block text-sm">
            Phone
            <input required name="phone" className="mt-1 h-11 w-full rounded-lg border border-sand px-3 outline-none focus:border-gold" />
          </label>
          <label className="block text-sm">
            Fulfilment
            <select name="fulfillment" className="mt-1 h-11 w-full rounded-lg border border-sand px-3 outline-none focus:border-gold">
              <option value="pickup">Pickup at the shop</option>
              <option value="delivery">Local delivery (we will confirm)</option>
            </select>
          </label>
          <label className="block text-sm">
            Address (for delivery)
            <textarea name="address" rows={3} className="mt-1 w-full rounded-lg border border-sand px-3 py-2 outline-none focus:border-gold" />
          </label>
          <label className="block text-sm">
            Notes
            <textarea name="notes" rows={3} placeholder="Gift wrap, less sugar, wedding date…" className="mt-1 w-full rounded-lg border border-sand px-3 py-2 outline-none focus:border-gold" />
          </label>
        </div>
        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-6 h-12 rounded-md bg-maroon px-6 text-sm font-semibold text-ivory disabled:opacity-60"
        >
          {status === "sending" ? "Placing…" : "Confirm order"}
        </button>
        {status === "error" ? (
          <p className="mt-3 text-xs text-maroon">Could not place the order. Call {shop.phoneDisplay}.</p>
        ) : null}
      </form>
      <aside className="rounded-3xl border border-sand bg-white p-8">
        <h2 className="font-display text-2xl text-maroon">In the box</h2>
        <ul className="mt-4 space-y-3 text-sm">
          {items.map((i) => (
            <li key={i.slug} className="flex justify-between gap-3">
              <span>
                {i.name} × {i.qty}
              </span>
              <span>{formatInr(i.price * i.qty)}</span>
            </li>
          ))}
        </ul>
        <p className="mt-6 flex justify-between border-t border-sand pt-4 font-semibold">
          <span>Subtotal</span>
          <span>{formatInr(subtotal)}</span>
        </p>
        <p className="mt-3 text-xs text-muted">{shop.priceDisclaimer}</p>
      </aside>
    </main>
  );
}
