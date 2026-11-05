import { db } from "@/db";
import { inquiries } from "@/db/schema";
import { ensureSeeded } from "@/lib/db-data";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  await ensureSeeded();
  const body = (await request.json()) as { name?: string; phone?: string; message?: string };
  const name = (body.name || "").trim();
  const phone = (body.phone || "").trim();
  const message = (body.message || "").trim();
  if (!name || !phone || !message) {
    return Response.json({ error: "Missing fields" }, { status: 400 });
  }
  try {
    await db.insert(inquiries).values({ name, phone, message });
  } catch {
    /* still acknowledge so the guest is not blocked */
  }
  return Response.json({ ok: true });
}
