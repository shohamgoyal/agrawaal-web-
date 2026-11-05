"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartLine = {
  slug: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  qty: number;
};

type CartContextValue = {
  items: CartLine[];
  add: (item: Omit<CartLine, "qty">, qty?: number) => void;
  remove: (slug: string) => void;
  setQty: (slug: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "agarwal-sweets-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartLine[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartLine[]);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const value = useMemo<CartContextValue>(() => {
    const add: CartContextValue["add"] = (item, qty = 1) => {
      setItems((prev) => {
        const found = prev.find((p) => p.slug === item.slug);
        if (found) {
          return prev.map((p) => (p.slug === item.slug ? { ...p, qty: p.qty + qty } : p));
        }
        return [...prev, { ...item, qty }];
      });
    };
    const remove = (slug: string) => setItems((prev) => prev.filter((p) => p.slug !== slug));
    const setQty = (slug: string, qty: number) => {
      if (qty <= 0) return remove(slug);
      setItems((prev) => prev.map((p) => (p.slug === slug ? { ...p, qty } : p)));
    };
    const clear = () => setItems([]);
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.qty * i.price, 0);
    return { items, add, remove, setQty, clear, count, subtotal };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
