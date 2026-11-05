import { ContactForm } from "@/components/ContactForm";
import { shop, telLink, whatsappLink } from "@/lib/shop";

export const metadata = {
  title: "Visit & Contact",
  description: "Find Agarwal Sweets at I-220, Mangolpuri, Delhi. Hours, phone and WhatsApp.",
};

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <p className="text-[11px] uppercase tracking-[0.32em] text-gold">Visit the counter</p>
      <h1 className="font-display mt-2 text-4xl text-maroon sm:text-5xl">Mangolpuri, Delhi</h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div className="rounded-3xl border border-sand bg-white p-8">
          <p className="text-sm font-semibold text-maroon">Address</p>
          <p className="mt-2 font-display text-2xl">{shop.addressLine}</p>
          <p className="text-muted">
            {shop.landmark}
            <br />
            {shop.cityLine}
          </p>
          <p className="mt-6 text-sm font-semibold text-maroon">Hours</p>
          <p className="mt-1 text-sm text-ink">
            Open all days · {shop.hoursWeekday}
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={telLink()} className="rounded-md bg-gold px-5 py-2.5 text-sm font-semibold text-maroon-deep">
              Call {shop.phoneDisplay}
            </a>
            <a href={whatsappLink()} className="rounded-md border border-maroon/20 px-5 py-2.5 text-sm font-semibold text-maroon">
              WhatsApp
            </a>
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-sand">
            <iframe title="Map" src={shop.mapEmbed} className="h-64 w-full border-0" loading="lazy" />
          </div>
        </div>
        <div className="rounded-3xl border border-sand bg-white p-8">
          <h2 className="font-display text-2xl text-maroon">Write to the counter</h2>
          <p className="mt-2 text-sm text-muted">
            Bulk orders, wedding boxes and corporate hampers — leave a note and we will call you back.
          </p>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}
