import { shop } from "@/lib/shop";

export const metadata = {
  title: "Our Story",
  description: "The story of Agarwal Sweets, a traditional mithai shop in Mangolpuri, Delhi.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="bg-maroon px-6 py-20 text-center text-ivory">
        <p className="text-[11px] uppercase tracking-[0.32em] text-gold">Our story</p>
        <h1 className="font-display mt-3 text-5xl">Sweets, the old way</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-ivory/80">
          Agarwal Sweets is a neighbourhood mithaiwala in Mangolpuri — known for desi ghee ladoos,
          kaju mithai and the kind of gulab jamun you eat standing at the counter.
        </p>
      </section>
      <section className="mx-auto grid max-w-6xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center">
        <div className="overflow-hidden rounded-3xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/shop-counter.jpg" alt="Shop interior" className="w-full object-cover" />
        </div>
        <div>
          <h2 className="font-display text-3xl text-maroon">A Mangolpuri favourite</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Tucked right by the Mangolpuri Police Station, we keep a full traditional counter:
            milk mithai, Bengali sweets, hot jalebi, namkeen by the kilo, fresh samosas, bakery
            cakes, lassi, dry fruits and pooja essentials.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-muted">
            Nothing on our trays is meant to sit. Ladoos are bound in ghee, rasgullas are soaked
            the same morning, and kaju katli is cut when you ask for it. If you need a wedding
            box or a corporate hamper, tell us the date — we pack it before evening.
          </p>
          <p className="mt-6 text-sm text-ink">
            {shop.fullAddress}
            <br />
            {shop.hoursWeekday} · {shop.phoneDisplay}
          </p>
        </div>
      </section>
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 sm:grid-cols-3 sm:px-6">
          {[
            { t: "Desi ghee", d: "The same ghee that goes into our mithai is sold by the kilo at the dairy counter." },
            { t: "Sold by weight", d: "Most mithai and namkeen is weighed in front of you — 250 g, 500 g or a full kilo." },
            { t: "Same-day packing", d: "Evening chai boxes, festival hampers and baraat favours packed the day you ask." },
          ].map((item) => (
            <div key={item.t} className="rounded-2xl border border-sand p-6">
              <h3 className="font-display text-2xl text-maroon">{item.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{item.d}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
