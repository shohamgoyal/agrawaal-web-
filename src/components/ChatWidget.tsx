"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { shop } from "@/lib/shop";

type ProductCard = {
  slug: string;
  name: string;
  price: string;
  unit: string;
  image: string;
};

type Message = {
  role: "user" | "assistant";
  text: string;
  products?: ProductCard[];
};

const starters = ["Kaju Katli price", "Gift boxes", "Shop hours", "Best mithai"];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      text: "Namaste! I am Mithai Mitra. Ask me for prices, gift hampers, today’s hot jalebi, or how to find us in Mangolpuri.",
    },
  ]);
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const existing = sessionStorage.getItem("as-chat-session");
    if (existing) {
      setSessionId(existing);
    } else {
      const id = `as-${Math.random().toString(36).slice(2, 10)}`;
      sessionStorage.setItem("as-chat-session", id);
      setSessionId(id);
    }
  }, []);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight, behavior: "smooth" });
  }, [messages, open]);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", text: trimmed }]);
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: trimmed,
          sessionId,
          history: messages.slice(-8),
        }),
      });
      const data = (await res.json()) as { text?: string; products?: ProductCard[] };
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          text: data.text || `Let me connect you with the counter — call ${shop.phoneDisplay}.`,
          products: data.products,
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", text: `The line is busy. Please call ${shop.phoneDisplay} or try again.` },
      ]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 right-5 z-50 flex h-14 items-center gap-2 rounded-full bg-maroon px-5 text-sm font-semibold text-gold shadow-[0_12px_30px_rgba(58,7,16,0.35)] hover:bg-maroon-soft"
        aria-label="Open shop assistant"
      >
        <span className="grid h-8 w-8 place-items-center rounded-full bg-gold text-maroon-deep">✦</span>
        {open ? "Close" : "Ask Mithai Mitra"}
      </button>

      {open ? (
        <div className="fixed bottom-24 right-5 z-50 flex h-[min(560px,70vh)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-gold/40 bg-ivory shadow-[0_24px_60px_rgba(44,24,16,0.28)]">
          <div className="bg-maroon px-4 py-3 text-ivory">
            <p className="font-display text-lg">Mithai Mitra</p>
            <p className="text-xs text-gold-soft">Agarwal Sweets · Mangolpuri counter assistant</p>
          </div>
          <div ref={scroller} className="flex-1 space-y-3 overflow-y-auto px-3 py-3">
            {messages.map((m, i) => (
              <div key={`${m.role}-${i}`} className={m.role === "user" ? "ml-8" : "mr-4"}>
                <div
                  className={`whitespace-pre-wrap rounded-2xl px-3 py-2 text-sm leading-relaxed ${
                    m.role === "user" ? "bg-maroon text-ivory" : "border border-sand bg-white text-ink"
                  }`}
                >
                  {m.text}
                </div>
                {m.products?.length ? (
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {m.products.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/menu/${p.slug}`}
                        className="overflow-hidden rounded-xl border border-sand bg-white"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p.image} alt={p.name} className="h-16 w-full object-cover" />
                        <div className="p-2">
                          <p className="truncate text-xs font-semibold text-maroon">{p.name}</p>
                          <p className="text-[11px] text-muted">
                            {p.price} · {p.unit}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            {busy ? <p className="text-xs text-muted">Mithai Mitra is checking the counter…</p> : null}
          </div>
          <div className="flex flex-wrap gap-1.5 border-t border-sand px-3 py-2">
            {starters.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => send(s)}
                className="rounded-full border border-gold/50 px-2.5 py-1 text-[11px] text-maroon hover:bg-gold/20"
              >
                {s}
              </button>
            ))}
          </div>
          <form
            className="flex gap-2 border-t border-sand p-3"
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for a sweet, price or gift box…"
              className="h-10 flex-1 rounded-lg border border-sand bg-white px-3 text-sm outline-none focus:border-gold"
            />
            <button
              type="submit"
              disabled={busy}
              className="h-10 rounded-lg bg-gold px-3 text-sm font-semibold text-maroon-deep disabled:opacity-60"
            >
              Send
            </button>
          </form>
        </div>
      ) : null}
    </>
  );
}
