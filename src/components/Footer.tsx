import Link from "next/link";
import { shop, telLink, whatsappLink } from "@/lib/shop";

export function Footer() {
  return (
    <footer className="bg-maroon-deep text-ivory">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="text-[11px] uppercase tracking-[0.28em] text-gold">Since the neighbourhood first asked</p>
          <h2 className="font-display mt-2 text-3xl text-white">{shop.name}</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ivory/75">
            Fresh mithai made the old way — real desi ghee, no shortcuts, weighed for every customer.
            A Mangolpuri favourite for evening chai boxes and wedding orders alike.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gold">Visit</p>
          <p className="mt-3 text-sm leading-relaxed text-ivory/80">
            {shop.addressLine}
            <br />
            {shop.landmark}
            <br />
            {shop.cityLine}
          </p>
          <p className="mt-3 text-sm text-ivory/80">
            {shop.hoursNote}
            <br />
            {shop.hoursWeekday}
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-gold">Order</p>
          <div className="mt-3 flex flex-col gap-2 text-sm">
            <a href={telLink()} className="hover:text-gold">
              {shop.phoneDisplay}
            </a>
            <a href={whatsappLink("Namaste, I would like to place an order.")} className="hover:text-gold">
              WhatsApp us
            </a>
            <Link href="/menu" className="hover:text-gold">
              Full menu
            </Link>
            <Link href="/contact" className="hover:text-gold">
              Write to the counter
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-center text-xs text-ivory/55 sm:px-6">
          <p>
            {shop.name} · {shop.fullAddress} · {shop.phoneDisplay}
          </p>
          <p>Sample catalogue — confirm shop details and prices before sale.</p>
        </div>
      </div>
    </footer>
  );
}
