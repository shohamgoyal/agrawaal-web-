"use client";

import Link from "next/link";
import { useState } from "react";
import { shop, telLink, whatsappLink } from "@/lib/shop";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/gifts", label: "Gifts" },
  { href: "/about", label: "Our Story" },
  { href: "/contact", label: "Visit" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-maroon-deep text-gold-soft">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-[11px] tracking-[0.18em] uppercase sm:px-6">
          <p className="truncate">{shop.kicker}</p>
          <p className="hidden sm:block">{shop.hoursNote} · {shop.hoursWeekday}</p>
        </div>
      </div>
      <div className="border-b border-gold/70 bg-maroon text-ivory shadow-[0_8px_30px_rgba(58,7,16,0.25)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3.5 sm:px-6">
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-full border border-gold bg-gold/15 text-lg">
              ◆
            </span>
            <span className="leading-tight">
              <span className="font-display block text-[1.35rem] font-semibold tracking-tight text-white">
                {shop.name}
              </span>
              <span className="block text-[10px] uppercase tracking-[0.22em] text-gold-soft">
                {shop.city}
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 text-sm font-medium text-ivory/90 lg:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="transition hover:text-gold">
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={whatsappLink("Namaste, I would like to enquire about your sweets and snacks.")}
              target="_blank"
              rel="noreferrer"
              className="rounded-md bg-gold px-4 py-2 text-sm font-semibold text-maroon-deep shadow-sm hover:bg-gold-bright"
            >
              WhatsApp Us
            </a>
            <a
              href={telLink()}
              className="hidden rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-ivory hover:border-gold hover:text-gold sm:inline-flex"
            >
              Call
            </a>
            <button
              type="button"
              className="grid h-10 w-10 place-items-center rounded-md border border-white/15 text-ivory lg:hidden"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
            >
              {open ? "✕" : "☰"}
            </button>
          </div>
        </div>
        {open ? (
          <nav className="border-t border-white/10 px-4 py-3 lg:hidden">
            <div className="flex flex-col gap-3 pb-2 text-ivory">
              {links.map((l) => (
                <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-1">
                  {l.label}
                </Link>
              ))}
              <a href={telLink()} className="py-1 text-gold">
                Call {shop.phoneDisplay}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noreferrer"
                className="py-1 text-gold"
              >
                WhatsApp us
              </a>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
