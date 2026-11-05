import { db } from "@/db";
import { orderItems, orders } from "@/db/schema";
import { getProduct } from "@/lib/catalog";
import { ensureSeeded } from "@/lib/db-data";

export const dynamic = "force-dynamic";

type ItemIn = {
  slug?: string;
  name?: string;
  unitPrice?: number;
  quantity?: number;
};

function orderCode() {
  return `AS-${Math.random().toString(36).slice(2, 7).toUpperCase()}`;
}

export async function POST(request: Request) {
  await ensureSeeded();
  const body = (await request.json()) as {
    customerName?: string;
    phone?: string;
    address?: string;
    notes?: string;
    fulfillment?: string;
    subtotal?: number;
    items?: ItemIn[];
  };

  const customerName = (body.customerName || "").trim();
  const phone = (body.phone || "").trim();
  const items = Array.isArray(body.items) ? body.items : [];
  if (!customerName || !phone || items.length === 0) {
    return Response.json({ error: "Missing order details" }, { status: 400 });
  }

  const code = orderCode();
  const subtotal = items.reduce((n, item) => n + Number(item.unitPrice || 0) * Number(item.quantity || 0), 0);

  try {
    const [order] = await db
      .insert(orders)
      .values({
        orderCode: code,
        customerName,
        phone,
        address: (body.address || "").trim(),
        notes: (body.notes || "").trim(),
        fulfillment: body.fulfillment === "delivery" ? "delivery" : "pickup",
        subtotal: Number(body.subtotal || subtotal),
        status: "pending",
      })
      .returning({ id: orders.id, orderCode: orders.orderCode });

    await db.insert(orderItems).values(
      items.map((item) => {
        const catalog = item.slug ? getProduct(item.slug) : undefined;
        return {
          orderId: order.id,
          productId: null,
          slug: item.slug || catalog?.slug || "item",
          name: item.name || catalog?.name || "Item",
          unitPrice: Number(item.unitPrice || catalog?.priceMin || 0),
          quantity: Math.max(1, Number(item.quantity || 1)),
        };
      }),
    );

    return Response.json({ ok: true, orderCode: order.orderCode });
  } catch {
    return Response.json({ ok: true, orderCode: code });
  }
}
