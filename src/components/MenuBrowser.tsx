"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import type { CatalogCategory, CatalogProduct } from "@/lib/catalog";

export function MenuBrowser({
  categories,
  products,
  initialCategory = "all",
}: {
  categories: CatalogCategory[];
  products: CatalogProduct[];
  initialCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const inCat = category === "all" || p.categorySlug === category;
      if (!inCat) return false;
      if (!q) return true;
      return `${p.name} ${p.description} ${p.tags}`.toLowerCase().includes(q);
    });
  }, [products, query, category]);

  return (
    <div>
      <div className="flex flex-col gap-3 md:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search products (e.g. Kaju Katli, Samosa)…"
          className="h-12 flex-1 rounded-xl border border-sand bg-white px-4 text-sm outline-none focus:border-gold"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="h-12 rounded-xl border border-sand bg-white px-4 text-sm outline-none focus:border-gold md:w-72"
        >
          <option value="all">All categories</option>
          {categories.map((c) => (
            <option key={c.slug} value={c.slug}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto no-scrollbar pb-2">
        <button
          type="button"
          onClick={() => setCategory("all")}
          className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium ${
            category === "all" ? "bg-maroon text-gold" : "border border-sand bg-white text-muted"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            type="button"
            onClick={() => setCategory(c.slug)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-xs font-medium ${
              category === c.slug ? "bg-maroon text-gold" : "border border-sand bg-white text-muted"
            }`}
          >
            {c.name.split("(")[0].trim()}
          </button>
        ))}
      </div>

      <p className="mt-6 text-sm text-muted">{filtered.length} items</p>
      <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
      {filtered.length === 0 ? (
        <p className="py-16 text-center text-muted">No matching mithai or snacks. Try another name.</p>
      ) : null}
    </div>
  );
}
