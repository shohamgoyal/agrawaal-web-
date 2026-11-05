import {
  catalogCategories,
  catalogProducts,
  searchProducts,
  type CatalogProduct,
} from "@/lib/catalog";
import { formatPrice, shop } from "@/lib/shop";

export type ChatProductCard = {
  slug: string;
  name: string;
  price: string;
  unit: string;
  image: string;
};

export type ChatReply = {
  text: string;
  products?: ChatProductCard[];
};

function cards(items: CatalogProduct[], limit = 4): ChatProductCard[] {
  return items.slice(0, limit).map((item) => ({
    slug: item.slug,
    name: item.name,
    price: formatPrice(item.priceMin, item.priceMax),
    unit: item.unit,
    image: item.image,
  }));
}

function normalize(input: string) {
  return input
    .toLowerCase()
    .replace(/[₹,]/g, " ")
    .replace(/[^a-z0-9\u0900-\u097f\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function mentions(q: string, words: string[]) {
  return words.some((w) => q.includes(w));
}

function findProducts(q: string) {
  const direct = searchProducts(q);
  if (direct.length && q.length > 2) return direct;

  const scored = catalogProducts
    .map((item) => {
      const name = item.name.toLowerCase();
      const tokens = q.split(" ").filter((t) => t.length > 2);
      let score = 0;
      for (const t of tokens) {
        if (name.includes(t)) score += 5;
        if (item.tags.includes(t)) score += 2;
        if (item.categorySlug.includes(t)) score += 2;
        if (item.description.toLowerCase().includes(t)) score += 1;
      }
      return { item, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.item);

  return scored;
}

function categoryFromQuery(q: string) {
  const map: Record<string, string[]> = {
    mithai: ["mithai", "sweet", "sweets", "barfi", "burfi", "ladoo", "laddu", "peda", "katli", "halwa", "मिठाई", "लड्डू", "बर्फी"],
    bengali: ["bengali", "rasgulla", "rasmalai", "sandesh", "rajbhog", "mishti", "रसगुल्ला"],
    "hot-sweets": ["jalebi", "jamun", "gulab", "gajar", "seasonal", "hot sweet", "इमरती", "जलेबी", "गुलाब"],
    namkeen: ["namkeen", "bhujia", "sev", "mixture", "mathri", "नमकीन", "भुजिया"],
    snacks: ["samosa", "kachori", "pakora", "snack", "chaat", "bhature", "pav", "समोसा", "कचौड़ी"],
    bakery: ["cake", "pastry", "cookie", "bakery", "nankhatai", "केक"],
    dairy: ["lassi", "chaas", "milk", "ghee", "paneer", "लस्सी", "घी"],
    gifts: ["gift", "box", "hamper", "wedding", "corporate", "pack", "गिफ्ट", "बॉक्स"],
    "dry-fruits": ["dry fruit", "almond", "cashew", "pista", "anjeer", "walnut", "बादाम", "काजू"],
    essentials: ["pooja", "prasad", "mishri", "batasha", "chutney", "पूजा"],
  };
  for (const [slug, keys] of Object.entries(map)) {
    if (keys.some((k) => q.includes(k))) {
      return catalogCategories.find((c) => c.slug === slug);
    }
  }
  return undefined;
}

export function replyToChat(raw: string): ChatReply {
  const q = normalize(raw);
  if (!q) {
    return {
      text: `Namaste! I am Mithai Mitra from ${shop.name}. Ask me for prices, gift boxes, today’s hot sweets, or our address in Mangolpuri.`,
    };
  }

  if (mentions(q, ["hello", "hi", "hey", "namaste", "namaskar", "good morning", "good evening", "नमस्ते", "हैलो"])) {
    return {
      text: `Namaste from ${shop.name}, ${shop.city}. We make fresh mithai daily in desi ghee and sell by the kilo. I can share prices, suggest a box, or tell you how to order.`,
      products: cards(catalogProducts.filter((p) => p.featured), 4),
    };
  }

  if (mentions(q, ["hour", "timing", "open", "close", "time", "kab", "kitne baje", "टाइमिंग", "खुल", "बंद"])) {
    return {
      text: `We are open all days, ${shop.hoursWeekday}. Monday to Saturday and Sunday — same hours. Walk in to I-220, Mangolpuri, or call ${shop.phoneDisplay} to reserve a box.`,
    };
  }

  if (mentions(q, ["where", "address", "location", "map", "direction", "kahan", "kahaa", "mangolpuri", "पता", "कहाँ", "लोकेशन"])) {
    return {
      text: `${shop.name} is at ${shop.fullAddress}. Look for us right by the Mangolpuri Police Station. Parking is street-side; most neighbours walk in for a kilo and chai-time snacks.`,
    };
  }

  if (mentions(q, ["phone", "call", "whatsapp", "contact", "number", "mobile", "नंबर", "व्हाट्सएप"])) {
    return {
      text: `Call or WhatsApp us on ${shop.phoneDisplay}. For wedding or corporate hampers, a quick message with the date and budget helps us pack the same day.`,
    };
  }

  if (mentions(q, ["order", "delivery", "home delivery", "online", "ऑर्डर", "डिलीवरी"])) {
    return {
      text: `You can add items to the cart on this website and place a pickup or local-delivery request. We also take orders on WhatsApp ${shop.phoneDisplay} and at the counter. Same-day packing is usual if you call before evening. ${shop.priceDisclaimer}`,
    };
  }

  if (mentions(q, ["ghee", "pure", "quality", "ingredient", "desi"])) {
    return {
      text: `Our signature mithai is made the traditional way — real desi ghee, no shortcuts, weighed fresh for every customer. Kaju sweets, ladoos and pedas are packed the same day you ask for them.`,
      products: cards(
        catalogProducts.filter((p) => p.tags.includes("ghee") || p.tags.includes("signature")),
        4,
      ),
    };
  }

  if (mentions(q, ["wedding", "shaadi", "baraat", "reception", "शादी"])) {
    const picks = catalogProducts.filter((p) =>
      ["wedding-sweet-box", "kaju-katli", "kaju-pista-roll", "premium-kaju-box", "family-mithai-box"].includes(p.slug),
    );
    return {
      text: `For weddings we recommend a kaju-forward mix plus a family mithai box. The Wedding Sweet Box starts at ${formatPrice(700, null)} per kilo pack, and the Corporate / premium hampers go up to ${formatPrice(1499, null)}. Tell us the date and we will pack the same day.`,
      products: cards(picks, 4),
    };
  }

  if (mentions(q, ["diwali", "festival", "holi", "rakhi", "janmashtami", "navratri", "gift", "hamper", "box", "दिवाली", "गिफ्ट"])) {
    const gifts = catalogProducts.filter((p) => p.categorySlug === "gifts");
    return {
      text: `Festival and gift packing is ready at the counter. Small boxes start at ${formatPrice(150, null)} (250 g). The Festival Hamper is ${formatPrice(999, null)} and the Corporate Gift Hamper is ${formatPrice(1499, null)}. Final price depends on the mithai you choose inside.`,
      products: cards(gifts, 4),
    };
  }

  if (mentions(q, ["recommend", "suggest", "best", "popular", "signature", "special", "kya lena", "bestseller", "प्रसिद्ध"])) {
    return {
      text: `Our six signatures: Kaju Katli, Motichoor Ladoo, Gulab Jamun, Rasgulla, Kalakand and Kaju Pista Roll. For a first visit, take 250 g katli and a few hot gulab jamuns. For gifting, the Premium Kaju Box or Festival Hamper.`,
      products: cards(catalogProducts.filter((p) => p.featured || p.tags.includes("signature")), 6),
    };
  }

  if (mentions(q, ["cheap", "budget", "sasta", "under 50", "under 100", "सस्ता"])) {
    const budget = catalogProducts.filter((p) => p.priceMin <= 50).slice(0, 6);
    return {
      text: `Plenty of counter bites under ₹50: rasgulla, gulab jamun, samosa, kachori, lassi and prasad ladoo. Come hungry — snacks are fried through the day.`,
      products: cards(budget, 6),
    };
  }

  if (mentions(q, ["premium", "expensive", "luxury", "royal", "mehnga"])) {
    const premium = [...catalogProducts].sort((a, b) => b.priceMin - a.priceMin).slice(0, 6);
    return {
      text: `The premium shelf is kaju, badam, pista and packed hampers. Kaju Pista Roll is ${formatPrice(1050, null)} / kg; the Corporate Gift Hamper is ${formatPrice(1499, null)}.`,
      products: cards(premium, 4),
    };
  }

  if (mentions(q, ["menu", "catalogue", "catalog", "list", "items", "what do you sell", "मेनू"])) {
    const names = catalogCategories.map((c) => c.name.split("(")[0].trim()).join(" · ");
    return {
      text: `The full counter: ${names}. Search any name — Kaju Katli, Samosa, Lassi — and I will quote the sample price. Or open the Menu page for the complete catalogue.`,
    };
  }

  if (mentions(q, ["disclaimer", "price note", "real price", "actual price"])) {
    return { text: shop.priceDisclaimer };
  }

  const cat = categoryFromQuery(q);
  const found = findProducts(q);
  const wantsPrice = mentions(q, ["price", "cost", "rate", "kitna", "kitne", "how much", "rs", "rupee", "₹", "दाम", "कीमत", "रेट"]);

  if (found.length === 1) {
    const item = found[0];
    return {
      text: `${item.name} is ${formatPrice(item.priceMin, item.priceMax)} per ${item.unit}. ${item.description} ${shop.priceDisclaimer}`,
      products: cards([item], 1),
    };
  }

  if (found.length > 1 && (wantsPrice || found.length <= 8)) {
    const lines = found
      .slice(0, 6)
      .map((item) => `${item.name} — ${formatPrice(item.priceMin, item.priceMax)} / ${item.unit}`)
      .join("\n");
    return {
      text: `Here is what I found:\n${lines}\n\n${shop.priceDisclaimer}`,
      products: cards(found, 6),
    };
  }

  if (cat) {
    const items = catalogProducts.filter((p) => p.categorySlug === cat.slug);
    return {
      text: `${cat.name}: ${cat.tagline} We carry ${items.length} items in this section, from ${formatPrice(Math.min(...items.map((i) => i.priceMin)), null)} upwards.`,
      products: cards(items.filter((i) => i.featured).concat(items), 6),
    };
  }

  if (mentions(q, ["thank", "thanks", "shukriya", "dhanyavad", "धन्यवाद"])) {
    return { text: "Ji, anytime. Come by I-220 for something warm from the kadhai. Mithai mubarak!" };
  }

  return {
    text: `I can help with prices, gift boxes, shop hours and what to take home from ${shop.name}. Try “Kaju Katli price”, “gift hamper”, “samosa”, or “where are you?”.`,
    products: cards(catalogProducts.filter((p) => p.featured), 3),
  };
}

export function catalogContextForLlm() {
  const menu = catalogProducts
    .map((p) => `${p.name} | ${formatPrice(p.priceMin, p.priceMax)} / ${p.unit} | ${p.categorySlug}`)
    .join("\n");
  return `You are Mithai Mitra, the in-shop assistant for ${shop.name}, ${shop.fullAddress}. Phone ${shop.phoneDisplay}. Hours ${shop.hoursWeekday} all days. Prices below are indicative sample prices. Answer in warm, concise English (or Hindi if the user writes Hindi). Never invent items that are not on the list. Offer to call or WhatsApp for bulk orders.\n\nMENU:\n${menu}`;
}
