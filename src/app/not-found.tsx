import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-[11px] uppercase tracking-[0.32em] text-gold">Empty tray</p>
      <h1 className="font-display mt-3 text-4xl text-maroon">This mithai has sold out of the page</h1>
      <p className="mt-3 text-sm text-muted">Try the full catalogue — everything else is still on the counter.</p>
      <Link href="/menu" className="mt-8 inline-flex rounded-md bg-maroon px-6 py-3 text-sm font-semibold text-ivory">
        Back to menu
      </Link>
    </main>
  );
}
