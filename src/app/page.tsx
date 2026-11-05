import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { catalogCategories, featuredProducts } from "@/lib/catalog";
import { ensureSeeded } from "@/lib/db-data";
import { shop, telLink, whatsappLink } from "@/lib/shop";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  await ensureSeeded();
  const featured = featuredProducts();

  return (
    <main>
      <section className="relative min-h-[88vh] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero.jpg"
          alt="Assorted Agarwal Sweets mithai"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-4xl flex-col items-center justify-center px-6 py-24 text-center text-ivory">
          <p className="text-[11px] uppercase tracking-[0.42em] text-gold">Fresh mithai, made daily</p>
          <h1 className="font-display mt-5 text-5xl leading-[0.95] sm:text-7xl">
            Agarwal
            <br />
            Sweets
          </h1>
          <p className="font-display mt-5 text-2xl text-gold-soft">{shop.city}</p>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/85">
            Rasgulla, gulab jamun, desi ghee ladoo and more — made the traditional way, sold by the
            kilo, straight from our counter to your table.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/menu"
              className="rounded-md bg-gold px-6 py-3 text-sm font-semibold text-maroon-deep hover:bg-gold-bright"
            >
              View Full Menu
            </Link>
            <a
              href={whatsappLink("Namaste, I would like to place an order at Agarwal Sweets.")}
              className="rounded-md border border-gold/70 px-6 py-3 text-sm font-semibold text-ivory hover:bg-white/10"
            >
              WhatsApp Us
            </a>
          </div>
          <p className="mt-8 text-xs tracking-wide text-ivory/70">{shop.fullAddress}</p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-gold">The neighbourhood mithaiwala</p>
            <h2 className="font-display mt-3 text-4xl text-maroon">A Mangolpuri Favourite</h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted">
              Tucked right by the Mangolpuri Police Station, our shop has been serving the
              neighbourhood with sweets made the old way — real desi ghee, no shortcuts, weighed
              fresh for every customer.
            </p>
            <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-muted">
              Whether it is a small box for evening chai or a bulk order for a wedding, we make it
              the same day you ask for it.
            </p>
            <div className="mt-10 grid grid-cols-3 gap-6">
              <div>
                <p className="font-display text-4xl text-maroon">6</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">Signature sweets</p>
              </div>
              <div>
                <p className="font-display text-4xl text-maroon">100%</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">Desi ghee</p>
              </div>
              <div>
                <p className="font-display text-4xl text-maroon">₹/kg</p>
                <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-muted">Sold by weight</p>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-sand shadow-[0_20px_50px_rgba(44,24,16,0.12)]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/shop-counter.jpg" alt="Agarwal Sweets counter" className="h-full w-full object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-maroon py-16 text-ivory">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <p className="text-center text-[11px] uppercase tracking-[0.32em] text-gold">Shop by collection</p>
          <h2 className="font-display mt-2 text-center text-4xl">From the Counter</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {catalogCategories.slice(0, 10).map((c) => (
              <Link
                key={c.slug}
                href={`/menu?category=${c.slug}`}
                className="group relative min-h-44 overflow-hidden rounded-2xl"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.image} alt={c.name} className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-deep/90 via-maroon/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <p className="font-display text-lg leading-tight">{c.name.split("(")[0].trim()}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-gold">House signatures</p>
            <h2 className="font-display mt-2 text-4xl text-maroon">Made Fresh Today</h2>
          </div>
          <Link href="/menu" className="text-sm font-semibold text-maroon hover:text-gold">
            Browse full catalogue →
          </Link>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-muted">{shop.priceDisclaimer}</p>
      </section>

      <section className="relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/festival.jpg" alt="Festival mithai" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-maroon-deep/80" />
        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center text-ivory">
          <p className="text-[11px] uppercase tracking-[0.32em] text-gold">Gifting & celebrations</p>
          <h2 className="font-display mt-3 text-4xl">Boxes, Hampers & Wedding Mithai</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ivory/80">
            From a 250 g chai box to corporate hampers and baraat favours — packed the same day,
            tied in maroon and gold.
          </p>
          <Link
            href="/gifts"
            className="mt-8 inline-flex rounded-md bg-gold px-6 py-3 text-sm font-semibold text-maroon-deep"
          >
            Explore Gift Boxes
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <p className="text-center text-[11px] uppercase tracking-[0.32em] text-gold">Visit the counter</p>
        <h2 className="font-display mt-2 text-center text-4xl text-maroon">Find Us in Mangolpuri</h2>
        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-sand bg-white p-8 shadow-[0_16px_40px_rgba(44,24,16,0.06)]">
            <p className="text-sm font-semibold text-maroon">Address</p>
            <p className="mt-2 font-display text-2xl text-ink">{shop.addressLine}</p>
            <p className="text-muted">
              {shop.landmark}
              <br />
              {shop.cityLine}
            </p>
            <p className="mt-6 text-sm font-semibold text-maroon">Hours</p>
            <div className="mt-2 space-y-2 text-sm text-ink">
              <div className="flex justify-between border-b border-sand py-2">
                <span>Mon – Sat</span>
                <span>{shop.hoursWeekday}</span>
              </div>
              <div className="flex justify-between py-2">
                <span>Sunday</span>
                <span>{shop.hoursSunday}</span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={telLink()} className="rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-maroon-deep">
                {shop.phoneDisplay}
              </a>
              <a
                href={whatsappLink()}
                className="rounded-md border border-maroon/20 px-5 py-2.5 text-sm font-semibold text-maroon"
              >
                WhatsApp
              </a>
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border border-sand bg-sand min-h-80">
            <iframe
              title="Agarwal Sweets map"
              src={shop.mapEmbed}
              className="h-full min-h-80 w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </main>
  );
}
