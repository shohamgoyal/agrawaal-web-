"use client";

import { useState, type FormEvent } from "react";
import { shop } from "@/lib/shop";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("sending");
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("fail");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <p className="mt-8 rounded-xl bg-gold-soft/50 p-4 text-sm text-maroon">
        Received. We will call you shortly from the Mangolpuri counter.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-4">
      <label className="block text-sm">
        Name
        <input
          required
          name="name"
          className="mt-1 h-11 w-full rounded-lg border border-sand px-3 outline-none focus:border-gold"
        />
      </label>
      <label className="block text-sm">
        Phone
        <input
          required
          name="phone"
          className="mt-1 h-11 w-full rounded-lg border border-sand px-3 outline-none focus:border-gold"
        />
      </label>
      <label className="block text-sm">
        Message
        <textarea
          required
          name="message"
          rows={4}
          className="mt-1 w-full rounded-lg border border-sand px-3 py-2 outline-none focus:border-gold"
        />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="h-11 rounded-md bg-maroon px-6 text-sm font-semibold text-ivory disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send enquiry"}
      </button>
      {status === "error" ? (
        <p className="text-xs text-maroon">Could not send. Please call {shop.phoneDisplay}.</p>
      ) : null}
    </form>
  );
}
