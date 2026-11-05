export type CatalogCategory = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  sortOrder: number;
};

export type CatalogProduct = {
  slug: string;
  name: string;
  description: string;
  categorySlug: string;
  priceMin: number;
  priceMax: number | null;
  unit: string;
  image: string;
  featured: boolean;
  isVeg: boolean;
  tags: string;
};

export const catalogCategories: CatalogCategory[] = [
  {
    slug: "mithai",
    name: "Traditional Indian Sweets (Mithai)",
    tagline: "Classic milk, ghee, nut and flour-based mithai.",
    image: "/images/kaju-katli.jpg",
    sortOrder: 1,
  },
  {
    slug: "bengali",
    name: "Bengali Sweets",
    tagline: "Chhena-based sweets and syrup desserts.",
    image: "/images/rasgulla.jpg",
    sortOrder: 2,
  },
  {
    slug: "hot-sweets",
    name: "Hot Sweets & Seasonal Specials",
    tagline: "Serve fresh where available; seasonal stock may vary.",
    image: "/images/jalebi.jpg",
    sortOrder: 3,
  },
  {
    slug: "namkeen",
    name: "Namkeen & Savoury Snacks",
    tagline: "Packaged or loose namkeen sold by weight.",
    image: "/images/namkeen.jpg",
    sortOrder: 4,
  },
  {
    slug: "snacks",
    name: "Fresh Snacks & Fast Food",
    tagline: "Made-to-order or freshly prepared savoury items.",
    image: "/images/samosa.jpg",
    sortOrder: 5,
  },
  {
    slug: "bakery",
    name: "Bakery & Confectionery",
    tagline: "Cakes, pastries, cookies and baked treats.",
    image: "/images/chocolate-cake.jpg",
    sortOrder: 6,
  },
  {
    slug: "dairy",
    name: "Dairy Products & Beverages",
    tagline: "Chilled drinks and dairy-counter essentials.",
    image: "/images/lassi.jpg",
    sortOrder: 7,
  },
  {
    slug: "gifts",
    name: "Gift Boxes & Special Packaging",
    tagline: "Suggested assortments; final price depends on contents and packaging.",
    image: "/images/gift-hamper.jpg",
    sortOrder: 8,
  },
  {
    slug: "dry-fruits",
    name: "Dry Fruits & Premium Products",
    tagline: "Loose or gift-packed dry fruits.",
    image: "/images/dry-fruits.jpg",
    sortOrder: 9,
  },
  {
    slug: "essentials",
    name: "Pooja Items, Dairy & Shop Essentials",
    tagline: "Additional counter products a sweet shop may choose to stock.",
    image: "/images/ladoo-box.jpg",
    sortOrder: 10,
  },
];

function p(
  name: string,
  categorySlug: string,
  priceMin: number,
  unit: string,
  description: string,
  extra?: Partial<CatalogProduct>,
): CatalogProduct {
  const slug = name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return {
    slug,
    name,
    description,
    categorySlug,
    priceMin,
    priceMax: extra?.priceMax ?? null,
    unit,
    image: extra?.image ?? imageFor(name, categorySlug),
    featured: extra?.featured ?? false,
    isVeg: extra?.isVeg ?? true,
    tags: extra?.tags ?? "",
  };
}

function imageFor(name: string, categorySlug: string) {
  const n = name.toLowerCase();
  if (n.includes("kaju")) return "/images/kaju-katli.jpg";
  if (n.includes("gulab") || n.includes("jamun")) return "/images/gulab-jamun.jpg";
  if (n.includes("rasgulla") || n.includes("rasmalai") || n.includes("sandesh") || n.includes("rajbhog") || n.includes("cham cham") || n.includes("chena") || n.includes("rabri") || n.includes("mishti"))
    return "/images/rasgulla.jpg";
  if (n.includes("ladoo") || n.includes("laddu") || n.includes("panjiri") || n.includes("prasad"))
    return "/images/motichoor-ladoo.jpg";
  if (n.includes("jalebi") || n.includes("imarti") || n.includes("halwa") || n.includes("ghewar"))
    return "/images/jalebi.jpg";
  if (n.includes("samosa") || n.includes("kachori") || n.includes("pakora") || n.includes("tikki") || n.includes("pav") || n.includes("chole") || n.includes("puri") || n.includes("cutlet") || n.includes("spring") || n.includes("dhokla") || n.includes("khandvi"))
    return "/images/samosa.jpg";
  if (n.includes("bhujia") || n.includes("sev") || n.includes("namkeen") || n.includes("mixture") || n.includes("mathri") || n.includes("para") || n.includes("makhana") || n.includes("papdi") || n.includes("peanut") || n.includes("chana") || n.includes("khatta"))
    return "/images/namkeen.jpg";
  if (n.includes("box") || n.includes("hamper") || n.includes("wedding") || n.includes("gift"))
    return "/images/gift-hamper.jpg";
  if (n.includes("almond") || n.includes("cashew") || n.includes("pista") || n.includes("walnut") || n.includes("raisin") || n.includes("date") || n.includes("anjeer") || n.includes("dry fruit") || n.includes("mixed dry"))
    return "/images/dry-fruits.jpg";
  if (n.includes("lassi") || n.includes("milk") || n.includes("chaas") || n.includes("coffee") || n.includes("curd") || n.includes("shrikhand") || n.includes("ghee") || n.includes("paneer"))
    return "/images/lassi.jpg";
  if (n.includes("cake") || n.includes("pastry") || n.includes("cookie") || n.includes("cupcake") || n.includes("rusk") || n.includes("nankhatai"))
    return "/images/chocolate-cake.jpg";
  if (n.includes("kalakand") || n.includes("peda") || n.includes("barfi") || n.includes("milk cake"))
    return "/images/kalakand.jpg";
  if (n.includes("soan") || n.includes("mysore") || n.includes("balushahi") || n.includes("tukda") || n.includes("moti pak") || n.includes("chikki"))
    return "/images/mixed-mithai.jpg";
  if (categorySlug === "mithai") return "/images/mithai-bowls.jpg";
  if (categorySlug === "gifts") return "/images/gift-hamper.jpg";
  if (categorySlug === "essentials") return "/images/ladoo-box.jpg";
  return "/images/mixed-mithai.jpg";
}

export const catalogProducts: CatalogProduct[] = [
  p("Motichoor Ladoo", "mithai", 400, "1 kg", "Tiny golden boondi pearls bound with pure ghee — our festive favourite.", { featured: true, tags: "bestseller,signature,ghee", image: "/images/motichoor-ladoo.jpg" }),
  p("Besan Ladoo", "mithai", 380, "1 kg", "Slow-roasted gram flour, ghee and cardamom, rolled into melt-in-mouth ladoos.", { tags: "ghee" }),
  p("Boondi Ladoo", "mithai", 320, "1 kg", "Classic celebration ladoo made from crisp boondi soaked in sugar syrup."),
  p("Desi Ghee Atta Ladoo", "mithai", 480, "1 kg", "Whole-wheat ladoos roasted in desi ghee — wholesome, fragrant and filling.", { tags: "ghee,winter" }),
  p("Moti Pak", "mithai", 440, "1 kg", "Rich gram-flour sweet with a dense, fudgy bite and ghee aroma."),
  p("Kaju Katli", "mithai", 900, "1 kg", "Diamond-cut cashew fudge finished with silver varq. The house premium mithai.", { featured: true, tags: "bestseller,signature,premium,kaju", image: "/images/kaju-katli.jpg" }),
  p("Kaju Roll", "mithai", 950, "1 kg", "Soft cashew rolls with a delicate nutty sweetness — made for gifting.", { tags: "premium,kaju" }),
  p("Kaju Pista Roll", "mithai", 1050, "1 kg", "Cashew rolls filled with pistachio — our most luxurious mithai roll.", { featured: true, tags: "premium,signature,kaju", image: "/images/pista-sweets.jpg" }),
  p("Badam Katli", "mithai", 1000, "1 kg", "Silky almond katli with a clean, roasted-badam finish.", { tags: "premium" }),
  p("Milk Cake", "mithai", 440, "1 kg", "Caramelised milk cake with the classic grainy, milky crumb.", { image: "/images/kalakand.jpg" }),
  p("Kalakand", "mithai", 480, "1 kg", "Soft, moist milk-solid squares, lightly sweetened and garnished.", { featured: true, image: "/images/kalakand.jpg", tags: "signature" }),
  p("Plain Barfi", "mithai", 400, "1 kg", "Traditional milk barfi — simple, clean and made fresh."),
  p("Chocolate Barfi", "mithai", 480, "1 kg", "Milk barfi with a cocoa fold for children and chocolate lovers."),
  p("Coconut Barfi", "mithai", 380, "1 kg", "Fresh coconut barfi with a chewy bite and cardamom."),
  p("Pista Barfi", "mithai", 650, "1 kg", "Pistachio-rich barfi, naturally green and festive.", { tags: "premium", image: "/images/pista-sweets.jpg" }),
  p("Malai Peda", "mithai", 480, "1 kg", "Soft malai peda with a creamy centre — a Mathura-style classic."),
  p("Kesar Peda", "mithai", 600, "1 kg", "Saffron-laced peda, fragrant and royal.", { tags: "premium" }),
  p("Dharwad Peda", "mithai", 500, "1 kg", "Dark, caramelised Dharwad-style peda with a lingering milk flavour."),
  p("Soan Papdi", "mithai", 320, "1 kg", "Flaky, melt-away soan papdi — light, festive and shareable."),
  p("Mysore Pak", "mithai", 500, "1 kg", "Ghee-rich Mysore pak with a porous, luxurious crumb.", { tags: "ghee" }),
  p("Karachi Halwa", "mithai", 400, "1 kg", "Translucent cornflour halwa studded with dry fruits."),
  p("Ghewar", "mithai", 120, "1 piece", "Honeycomb Rajasthani disc, soaked in syrup. Price varies by size.", { priceMax: 250, tags: "seasonal,festival" }),
  p("Balushahi", "mithai", 360, "1 kg", "Flaky, ghee-fried balushahi with a sugar glaze."),
  p("Shahi Tukda", "mithai", 60, "1 piece", "Fried bread in rabri, finished with nuts and saffron."),
  p("Imarti", "mithai", 300, "1 kg", "Flower-shaped urad-dal swirls, crisp outside and syrupy within."),

  p("Rasgulla", "bengali", 20, "1 piece", "Cloud-soft spongy rasgulla in light sugar syrup.", { featured: true, tags: "bestseller,signature", image: "/images/rasgulla.jpg" }),
  p("Rajbhog", "bengali", 35, "1 piece", "Saffron-hued stuffed rasgulla — larger, richer, festive."),
  p("Rasmalai", "bengali", 40, "1 piece", "Chhena discs steeped in chilled saffron milk.", { tags: "bestseller", image: "/images/rasgulla.jpg" }),
  p("Cham Cham", "bengali", 25, "1 piece", "Oval chhena sweet, often rolled in coconut or stuffed with mawa."),
  p("Malai Roll", "bengali", 35, "1 piece", "Soft chhena roll wrapped in malai."),
  p("Sandesh", "bengali", 25, "1 piece", "Delicate fresh-chhena sandesh, lightly sweetened."),
  p("Kesar Sandesh", "bengali", 35, "1 piece", "Saffron sandesh with a floral, milky finish."),
  p("Angoori Rasgulla", "bengali", 300, "1 kg", "Bite-size grape rasgullas, perfect for boxes and prasad."),
  p("Chena Toast", "bengali", 35, "1 piece", "Golden pan-toasted chhena with a caramel edge."),
  p("Mishti Doi", "bengali", 50, "200 g", "Caramelised sweet yoghurt, set and served chilled."),
  p("Rabri", "bengali", 100, "250 g", "Slow-reduced milk with layers of malai and nuts."),

  p("Gulab Jamun", "hot-sweets", 20, "1 piece", "Soft khoya jamuns, fried and soaked in rose-cardamom syrup.", { featured: true, tags: "bestseller,signature,hot", image: "/images/gulab-jamun.jpg" }),
  p("Kala Jamun", "hot-sweets", 25, "1 piece", "Darker, slightly caramelised jamun with a richer bite."),
  p("Hot Jalebi", "hot-sweets", 70, "250 g", "Crisp spirals fried to order and dunked in saffron syrup.", { featured: true, tags: "hot,bestseller", image: "/images/jalebi.jpg" }),
  p("Moong Dal Halwa", "hot-sweets", 120, "250 g", "Winter special — slow-cooked moong dal in desi ghee.", { tags: "seasonal,ghee,hot" }),
  p("Gajar Ka Halwa", "hot-sweets", 100, "250 g", "Grated carrot halwa with khoya, ghee and nuts. Seasonal.", { tags: "seasonal,hot" }),
  p("Suji Halwa", "hot-sweets", 60, "250 g", "Comforting roasted-semolina halwa, served warm."),
  p("Badam Halwa", "hot-sweets", 160, "250 g", "Dense almond halwa — rich enough for a royal thali.", { tags: "premium" }),
  p("Gond Ladoo", "hot-sweets", 600, "1 kg", "Edible-gum ladoos for winters, packed with nuts and ghee.", { tags: "winter,ghee" }),
  p("Panjiri", "hot-sweets", 500, "1 kg", "Whole-wheat panjiri mix with gond, nuts and ghee."),
  p("Til Ladoo", "hot-sweets", 300, "1 kg", "Sesame and jaggery ladoos — a Sankranti staple.", { tags: "festival" }),
  p("Peanut Chikki", "hot-sweets", 80, "250 g", "Crunchy peanut-jaggery brittle, cut into slabs."),

  p("Aloo Bhujia", "namkeen", 280, "1 kg", "Fine potato bhujia, light and snackable."),
  p("Bikaneri Bhujia", "namkeen", 320, "1 kg", "The classic moth-dal bhujia — crisp, peppery, addictive.", { tags: "bestseller" }),
  p("Plain Sev", "namkeen", 260, "1 kg", "Thin gram-flour sev for chaat, namkeen mixes and snacking."),
  p("Ratlami Sev", "namkeen", 300, "1 kg", "Spicy Ratlami-style sev with clove and pepper heat."),
  p("Khatta Meetha", "namkeen", 280, "1 kg", "Sweet-tangy mixture with sev, nuts and fried dal."),
  p("Navratan Mixture", "namkeen", 320, "1 kg", "Nine-gem mixture — a full, festive namkeen."),
  p("Moong Dal Namkeen", "namkeen", 300, "1 kg", "Crunchy salted moong dal, fried to a golden snap."),
  p("Chana Dal", "namkeen", 280, "1 kg", "Fried chana dal, lightly spiced."),
  p("Masala Peanuts", "namkeen", 320, "1 kg", "Spiced coated peanuts with a chilli-lime kick."),
  p("Masala Mathri", "namkeen", 300, "1 kg", "Flaky masala mathri — tea-time essential."),
  p("Plain Mathri", "namkeen", 280, "1 kg", "Ghee mathri, plain and crisp."),
  p("Namak Para", "namkeen", 260, "1 kg", "Diamond-cut salted fried pastry."),
  p("Shakkar Para", "namkeen", 280, "1 kg", "Sweet, crunchy shakkar para for tea and travel."),
  p("Roasted Makhana", "namkeen", 160, "250 g", "Fox nuts, roasted and lightly seasoned."),
  p("Papdi", "namkeen", 280, "1 kg", "Crisp papdi for chaat or snacking."),

  p("Aloo Samosa", "snacks", 15, "1 piece", "The everyday classic — spiced potato in a crisp pastry.", { featured: true, tags: "bestseller,fresh", image: "/images/samosa.jpg" }),
  p("Paneer Samosa", "snacks", 25, "1 piece", "Cottage-cheese filling in a golden samosa shell."),
  p("Pyaz Kachori", "snacks", 25, "1 piece", "Flaky kachori stuffed with spiced onion."),
  p("Dal Kachori", "snacks", 20, "1 piece", "Moong-dal kachori, best with chutney."),
  p("Bread Pakora", "snacks", 25, "1 piece", "Stuffed bread pakora, fried to order."),
  p("Paneer Pakora", "snacks", 60, "100 g", "Batter-fried paneer pakoras, served hot."),
  p("Aloo Tikki", "snacks", 40, "1 plate", "Crisp potato tikkis with chutneys."),
  p("Dhokla", "snacks", 60, "250 g", "Steamed, spongy Gujarati dhokla with mustard tadka."),
  p("Khandvi", "snacks", 80, "250 g", "Silky gram-flour rolls with coconut and sesame."),
  p("Veg Cutlet", "snacks", 25, "1 piece", "Mixed-vegetable cutlet, crisp outside."),
  p("Spring Roll", "snacks", 30, "1 piece", "Veg spring roll, fried fresh."),
  p("Chole Bhature", "snacks", 80, "1 plate", "Fluffy bhature with spiced chole — a Delhi plate."),
  p("Puri Sabzi", "snacks", 60, "1 plate", "Hot puris with the day’s sabzi."),
  p("Pav Bhaji", "snacks", 90, "1 plate", "Buttery pav bhaji, mashed and spiced on the tawa."),

  p("Black Forest Pastry", "bakery", 60, "1 piece", "Chocolate sponge, cream and cherries."),
  p("Chocolate Pastry", "bakery", 70, "1 piece", "Rich chocolate pastry for the cocoa crowd."),
  p("Pineapple Pastry", "bakery", 55, "1 piece", "Light pineapple cream pastry."),
  p("Red Velvet Pastry", "bakery", 80, "1 piece", "Red velvet with cream-cheese style frosting."),
  p("Chocolate Truffle Cake", "bakery", 450, "500 g", "Dense chocolate truffle cake, ideal for birthdays.", { image: "/images/chocolate-cake.jpg" }),
  p("Black Forest Cake", "bakery", 400, "500 g", "Classic black forest, cream and cherry."),
  p("Pineapple Cake", "bakery", 350, "500 g", "Pineapple cream cake — light and celebratory."),
  p("Vanilla Cake", "bakery", 300, "500 g", "Simple vanilla sponge, easily customised."),
  p("Choco Chip Cookies", "bakery", 100, "250 g", "Buttery cookies studded with chocolate chips."),
  p("Butter Cookies", "bakery", 120, "250 g", "Shortbread-style butter cookies."),
  p("Nankhatai", "bakery", 100, "250 g", "Desi ghee nankhatai that crumbles at a touch."),
  p("Cupcake", "bakery", 40, "1 piece", "Soft cupcake with frosting — colours vary."),
  p("Rusk", "bakery", 60, "250 g", "Twice-baked rusk for tea."),

  p("Plain Lassi", "dairy", 40, "300 ml", "Chilled whipped yoghurt lassi, unsweetened-leaning and fresh.", { image: "/images/lassi.jpg" }),
  p("Sweet Lassi", "dairy", 50, "300 ml", "Classic sweet lassi, thick and cooling."),
  p("Mango Lassi", "dairy", 60, "300 ml", "Mango pulp folded into chilled lassi.", { tags: "seasonal" }),
  p("Kesar Lassi", "dairy", 70, "300 ml", "Saffron lassi — fragrant and festive."),
  p("Badam Milk", "dairy", 50, "200 ml", "Almond milk, lightly sweetened."),
  p("Kesar Milk", "dairy", 50, "200 ml", "Warm or chilled saffron milk."),
  p("Cold Coffee", "dairy", 70, "300 ml", "Iced coffee, café-style, from the dairy counter."),
  p("Masala Chaas", "dairy", 30, "300 ml", "Spiced buttermilk with cumin and coriander."),
  p("Fresh Milk", "dairy", 35, "500 ml", "Fresh milk for home, sold by the half-litre."),
  p("Paneer", "dairy", 380, "1 kg", "Fresh chhena-set paneer, made in-house."),
  p("Desi Ghee", "dairy", 700, "1 kg", "Aromatic desi ghee — the same ghee that goes into our mithai.", { tags: "premium,ghee" }),

  p("Small Mithai Box", "gifts", 150, "250 g", "A 250 g assortment — perfect with evening chai.", { image: "/images/gift-hamper.jpg" }),
  p("Medium Mithai Box", "gifts", 300, "500 g", "Half-kilo mixed mithai in a presentation box."),
  p("Family Mithai Box", "gifts", 550, "1 kg", "A full kilo of mixed mithai for family gatherings.", { tags: "bestseller" }),
  p("Premium Kaju Box", "gifts", 500, "500 g", "Kaju katli and kaju rolls, gift-packed.", { tags: "premium,kaju" }),
  p("Dry Fruit Gift Box", "gifts", 650, "500 g", "Assorted dry fruits in a festive box.", { tags: "premium" }),
  p("Wedding Sweet Box", "gifts", 700, "1 kg", "Wedding favours — premium mix, packed for baraat and ghar.", { tags: "wedding,premium" }),
  p("Festival Hamper", "gifts", 999, "1 box", "A curated festive hamper of mithai, namkeen and dry fruit.", { featured: true, tags: "festival,bestseller", image: "/images/gift-hamper.jpg" }),
  p("Corporate Gift Hamper", "gifts", 1499, "1 box", "Premium corporate hamper for clients and teams.", { tags: "premium,corporate" }),

  p("Almonds", "dry-fruits", 220, "250 g", "California-style almonds, sold loose or packed."),
  p("Cashews", "dry-fruits", 250, "250 g", "Whole cashews, premium grade."),
  p("Pistachios", "dry-fruits", 300, "250 g", "Green pistachios for snacking and mithai garnish."),
  p("Raisins", "dry-fruits", 100, "250 g", "Sweet raisins, seedless."),
  p("Walnuts", "dry-fruits", 280, "250 g", "Walnut kernels, rich and earthy."),
  p("Dates", "dry-fruits", 120, "250 g", "Soft dates for the pooja thali and snacking."),
  p("Anjeer", "dry-fruits", 350, "250 g", "Dried figs — naturally sweet and premium."),
  p("Mixed Dry Fruits", "dry-fruits", 600, "500 g", "A balanced mix of almonds, cashews, raisins and more.", { tags: "bestseller" }),
  p("Dry Fruit Chikki", "dry-fruits", 150, "250 g", "Nut-studded chikki slabs."),

  p("Mishri", "essentials", 100, "1 kg", "Crystal mishri for paan, tea and prasad."),
  p("Batasha", "essentials", 120, "1 kg", "White sugar batasha for pooja."),
  p("Coconut", "essentials", 30, "1 piece", "Whole coconut for rituals and kitchen."),
  p("Prasad Ladoo", "essentials", 15, "1 piece", "Small prasad ladoo for mandir and home puja."),
  p("Green Chutney", "essentials", 30, "200 g", "Coriander-mint chutney for snacks."),
  p("Tamarind Chutney", "essentials", 40, "200 g", "Sweet-sour imli chutney."),
  p("Fresh Curd", "essentials", 60, "1 kg", "Set dahi, sold by the kilo."),
  p("Flavoured Shrikhand", "essentials", 100, "250 g", "Hung-curd shrikhand, kesar or elaichi."),
  p("Chips", "essentials", 10, "1 packet", "Packed chips from the counter."),
  p("Biscuits", "essentials", 10, "1 packet", "Assorted packed biscuits. Price varies by brand.", { priceMax: 40 }),
  p("Water Bottle", "essentials", 20, "1 litre", "Packaged drinking water."),
  p("Cold Drink", "essentials", 40, "per bottle", "Chilled bottled soft drinks.", { priceMax: 60 }),
  p("Disposable Plates", "essentials", 30, "1 pack", "Plates for parties and prasad."),
  p("Paper Cups", "essentials", 30, "1 pack", "Paper cups for lassi and chai service."),
];

export function getCategory(slug: string) {
  return catalogCategories.find((c) => c.slug === slug);
}

export function getProduct(slug: string) {
  return catalogProducts.find((p) => p.slug === slug);
}

export function productsByCategory(slug: string) {
  return catalogProducts.filter((p) => p.categorySlug === slug);
}

export function featuredProducts() {
  return catalogProducts.filter((p) => p.featured);
}

export function searchProducts(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return catalogProducts;
  return catalogProducts.filter((p) => {
    const hay = `${p.name} ${p.description} ${p.tags} ${p.categorySlug} ${p.unit}`.toLowerCase();
    return hay.includes(q) || q.split(/\s+/).every((w) => hay.includes(w));
  });
}
