import Link from "next/link";
import { shop } from "@/lib/shop";

export const metadata = { title: "Order received" };

export default async function OrderSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string }>;
}) {
  const { code } = await searchParams;
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.32em] text-gold">Mithai mubarak</p>
      <h1 className="font-display mt-3 text-4xl text-maroon">Order received</h1>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        We have your request{code ? ` as ${code}` : ""}. The Mangolpuri counter will call to
        confirm weights, packing and pickup time.
      </p>
      <p className="mt-2 text-sm text-ink">
        {shop.phoneDisplay} · {shop.hoursWeekday}
      </p>
      <Link href="/menu" className="mt-8 inline-flex rounded-md bg-maroon px-6 py-3 text-sm font-semibold text-ivory">
        Back to the menu
      </Link>
    </main>
  );
}
