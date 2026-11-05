export const shop = {
  name: "Agarwal Sweets",
  tagline: "Fresh Mithai, Made Daily",
  kicker: "Fresh Mithai · Namkeen · Snacks",
  city: "Mangolpuri, Delhi",
  addressLine: "I-220, Mangolpuri",
  landmark: "Near Mangolpuri Police Station",
  cityLine: "Delhi — 110083",
  fullAddress: "I-220, Mangolpuri, Delhi 110083 · Near Mangolpuri Police Station",
  phone: "9205387069",
  phoneDisplay: "92053 87069",
  whatsapp: "919205387069",
  hoursWeekday: "8:00 AM – 9:30 PM",
  hoursSunday: "8:00 AM – 9:30 PM",
  hoursNote: "Open all days",
  mapQuery: "I-220 Mangolpuri Delhi 110083",
  mapEmbed:
    "https://maps.google.com/maps?q=Mangolpuri%20Police%20Station%20Delhi%20110083&z=16&output=embed",
  priceDisclaimer:
    "Prices are indicative sample rates for this catalogue. Please confirm products, weights and prices at the counter before placing a bulk or festive order.",
};

export function formatInr(value: number) {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function formatPrice(min: number, max: number | null | undefined) {
  if (max && max !== min) return `${formatInr(min)}–${formatInr(max)}`;
  return formatInr(min);
}

export function whatsappLink(text?: string) {
  const base = `https://wa.me/${shop.whatsapp}`;
  if (!text) return base;
  return `${base}?text=${encodeURIComponent(text)}`;
}

export function telLink() {
  return `tel:+91${shop.phone}`;
}
