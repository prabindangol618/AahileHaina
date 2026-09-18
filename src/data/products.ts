export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  image: string;
  badge?: string;
  description: string;
  deliveryNote: string;
  specs: { label: string; value: string }[];
}

export interface Category {
  id: string;
  label: string;
  icon: string;
}

export const CATEGORIES: Category[] = [
  { id: "all", label: "All Products", icon: "🛍️" },
  { id: "electronics", label: "Electronics", icon: "📱" },
  { id: "kitchen", label: "KItchen", icon: "🍳" },
  { id: "fashion", label: "Fashion", icon: "👗" },
  { id: "home", label: "Home & Living", icon: "🏠" },
  { id: "beauty", label: "Beauty", icon: "💄" },
  { id: "sports", label: "Sports", icon: "⚽" },
];

export const PRODUCTS: Product[] = [
  {
    id: "buddha-was-born-in-nepal",
    name: "Buddha was Born in Nepal",
    category: "electronics",
    price: 999,
    originalPrice: 9999,
    rating: 4.7,
    reviews: 312,
    image: "/images/buddha.webp",
    badge: "BESTSELLER",
    description:
      "Never drink cold chiya again. This precision thermometer connects to your phone and alerts you when your tea hits optimal drinking temperature. Includes a 'Don't touch it yet' alarm.",
    deliveryNote: "Estimated delivery: Bholi (Tomorrow™)",
    specs: [
      { label: "Accuracy", value: "±0.1°C" },
      { label: "Battery", value: "1 year" },
      { label: "Connectivity", value: "Bluetooth 5.0" },
      { label: "App", value: "ChiyaTracker™" },
    ],
  },
  {
    id: "mahabir-pun-ko-jhola",
    name: "Mahabir Pun ko Jhola",
    category: "home",
    price: 1499,
    originalPrice: 2999,
    rating: 4.5,
    reviews: 189,
    image: "/images/jhola.webp",
    badge: "HOT",
    description:
      "Traditional doko design meets modern insulation. Keeps your momo hot, your beer cold, and your dignity intact while commuting.",
    deliveryNote: "Estimated delivery: Parsi (Day after tomorrow™)",
    specs: [
      { label: "Volume", value: "20L" },
      { label: "Insulation", value: "6 hours" },
      { label: "Material", value: "Recycled Bamboo" },
      { label: "Weight", value: "400g" },
    ],
  },
  {
    id: "balen-ko-chasma",
    name: "Balen ko chasma",
    category: "kitchen",
    price: 2499,
    originalPrice: 4999,
    rating: 4.9,
    reviews: 521,
    image: "/images/balen.webp",
    badge: "TOP RATED",
    description:
      "Steam 50 momos simultaneously. The professional grade steamer used by Kathmandu's top momo-wallahs. Includes free recipe for buff momo.",
    deliveryNote: "Estimated delivery: Bholi (Tomorrow™)",
    specs: [
      { label: "Capacity", value: "50 momos" },
      { label: "Power", value: "1200W" },
      { label: "Layers", value: "3-tier" },
      { label: "Timer", value: "60 min" },
    ],
  },
  {
    id: "kpoli-ko-besar",
    name: "KP OLI KO BESAR",
    category: "electronics",
    price: 3499,
    originalPrice: 6999,
    rating: 4.3,
    reviews: 97,
    image: "📡",
    badge: "NEW",
    description:
      "Boost your WiFi signal from Pokhara all the way to your rooftop. Works even during load-shedding... allegedly.",
    deliveryNote: "Estimated delivery: Sometime this week™",
    specs: [
      { label: "Range", value: "500m" },
      { label: "Speed", value: "300 Mbps" },
      { label: "Bands", value: "Dual" },
      { label: "Ports", value: "2x LAN" },
    ],
  },
  {
    id: "harkey-ko-kodalo",
    name: "Harkey ko Kodalo",
    category: "fashion",
    price: 799,
    originalPrice: 1299,
    rating: 4.6,
    reviews: 404,
    image: "🎩",
    badge: "FLASH DEAL",
    description:
      "Traditional dhaka topi with built-in SPF 50 fabric treatment. Protect your head from the Terai sun while looking authentically Nepali.",
    deliveryNote: "Estimated delivery: Bholi (Tomorrow™)",
    specs: [
      { label: "SPF", value: "50+" },
      { label: "Material", value: "Dhaka Fabric" },
      { label: "Sizes", value: "S / M / L / XL" },
      { label: "Care", value: "Hand wash" },
    ],
  },
  {
    id: "kulman-ko-batti",
    name: "Kulman ko Bulb",
    category: "home",
    price: 1199,
    originalPrice: 2499,
    rating: 4.8,
    reviews: 876,
    image: "💡",
    badge: "ESSENTIAL",
    description:
      "18-hour battery backup LED lamp. Auto-activates when power cuts. The essential Nepali household item — now with a disco mode for when power comes back.",
    deliveryNote: "Estimated delivery: Bholi (Tomorrow™)",
    specs: [
      { label: "Battery", value: "18 hours" },
      { label: "Brightness", value: "800 lumens" },
      { label: "Charge", value: "USB-C" },
      { label: "Modes", value: "4 (incl. disco)" },
    ],
  },
  {
    id: "hanuman-kattu",
    name: "Hanuman Kattu",
    category: "home",
    price: 4999,
    originalPrice: 8999,
    rating: 4.9,
    reviews: 203,
    image: "🦙",
    badge: "LUXURY",
    description:
      "Sourced from the highlands of Mustang. Warmer than your mamako's love. Softer than butter. Perfect for Kathmandu winters.",
    deliveryNote: "Estimated delivery: Parsi (Day after tomorrow™)",
    specs: [
      { label: "Material", value: "100% Yak Wool" },
      { label: "Size", value: "150x200cm" },
      { label: "Weight", value: "1.2kg" },
      { label: "Origin", value: "Mustang, Nepal" },
    ],
  },
  {
    id: "jyoti-ko-fariya",
    name: "Jyoti Magar ko Fariya",
    category: "kitchen",
    price: 3999,
    originalPrice: 7999,
    rating: 4.7,
    reviews: 145,
    image: "🔥",
    badge: "FLASH DEAL",
    description:
      "Authentic clay-based sekuwa grill with smokeless technology. Grill your buff or chicken sekuwa indoors without alerting the neighbors.",
    deliveryNote: "Estimated delivery: Sometime this week™",
    specs: [
      { label: "Type", value: "Charcoal + Electric" },
      { label: "Capacity", value: "20 skewers" },
      { label: "Smoke filter", value: "99% less smoke" },
      { label: "Material", value: "Clay + Stainless" },
    ],
  },
  {
    id: "rajesh-dai-ko-wig",
    name: "Rajesh dai ko Wig",
    category: "electronics",
    price: 1899,
    originalPrice: 3499,
    rating: 4.6,
    reviews: 238,
    image: "\u{1F50B}",
    badge: "NEW",
    description:
      "20000mAh power bank that charges your phone, laptop, and your neighbor's hopes. Comes with a torch bright enough to find the fuse box during load-shedding.",
    deliveryNote: "Estimated delivery: Bholi (Tomorrow\u2122)",
    specs: [
      { label: "Capacity", value: "20000mAh" },
      { label: "Output", value: "65W USB-C" },
      { label: "Ports", value: "3" },
      { label: "Torch", value: "Included" },
    ],
  },
  {
    id: "ravi-ko-ghanti",
    name: "Ravi dai ko Ghanti",
    category: "kitchen",
    price: 3299,
    originalPrice: 5999,
    rating: 4.8,
    reviews: 412,
    image: "\u{1F372}",
    badge: "BESTSELLER",
    description:
      "Cook dal, bhat, and tarkari in one heroic pot. Whistles exactly six times, no more, no less \u2014 as tradition demands.",
    deliveryNote: "Estimated delivery: Bholi (Tomorrow\u2122)",
    specs: [
      { label: "Capacity", value: "5 litres" },
      { label: "Material", value: "Stainless Steel" },
      { label: "Safety", value: "3-valve" },
      { label: "Whistles", value: "6 (regulated)" },
    ],
  },
  {
    id: "panijahaj",
    name: "KP ko Submarine",
    category: "fashion",
    price: 2599,
    originalPrice: 4999,
    rating: 4.9,
    reviews: 176,
    image: "\u{1F9E3}",
    badge: "LUXURY",
    description:
      "Handwoven pashmina from the Kathmandu valley. Keeps you warm through winter, load-shedding, and awkward family gatherings.",
    deliveryNote: "Estimated delivery: Parsi (Day after tomorrow\u2122)",
    specs: [
      { label: "Material", value: "70% Pashmina" },
      { label: "Size", value: "200x70cm" },
      { label: "Weight", value: "180g" },
      { label: "Origin", value: "Kathmandu, Nepal" },
    ],
  },
  {
    id: "hattichap-chappal",
    name: "Hattichaap Chappal",
    category: "home",
    price: 3999,
    originalPrice: 6999,
    rating: 4.4,
    reviews: 88,
    image: "\u{1F6CF}\u{FE0F}",
    badge: "HOT",
    description:
      "The classic Nepali charpai, now foldable for storing during monsoon. Perfect for the rooftop, the garden, and escaping your household chores.",
    deliveryNote: "Estimated delivery: Sometime this week\u2122",
    specs: [
      { label: "Material", value: "Wood + Rope" },
      { label: "Size", value: "190x90cm" },
      { label: "Weight", value: "9kg" },
      { label: "Foldable", value: "Yes" },
    ],
  },
  {
    id: "bijay-memory",
    name: "Bijay Shahi ko Memory Book",
    category: "beauty",
    price: 699,
    originalPrice: 1399,
    rating: 4.7,
    reviews: 291,
    image: "\u{1F9D6}",
    badge: "NEW",
    description:
      "Glow like the Everest sunrise. Made with neem, tulsi, and Himalayan clay. Results may arrive later than your delivery.",
    deliveryNote: "Estimated delivery: Bholi (Tomorrow\u2122)",
    specs: [
      { label: "Volume", value: "150g" },
      { label: "Ingredients", value: "Neem + Tulsi" },
      { label: "Skin type", value: "All" },
      { label: "Origin", value: "Himalayas" },
    ],
  },
  {
    id: "everest-trekking-poles",
    name: "Everest Trekking Poles",
    category: "sports",
    price: 2199,
    originalPrice: 3999,
    rating: 4.8,
    reviews: 134,
    image: "\u{1F97E}",
    badge: "TOP RATED",
    description:
      "Lightweight carbon trekking poles for Annapurna, Everest, and the stairs to your apartment. Your knees will thank you, eventually.",
    deliveryNote: "Estimated delivery: Parsi (Day after tomorrow\u2122)",
    specs: [
      { label: "Material", value: "Carbon Fiber" },
      { label: "Weight", value: "220g each" },
      { label: "Length", value: "65-135cm" },
      { label: "Grip", value: "Cork" },
    ],
  },
  {
    id: "Nirjalaaaa",
    name: "Nirjala",
    category: "fashion",
    price: 2199,
    originalPrice: 3999,
    rating: 4.8,
    reviews: 134,
    image: "/images/momo.jpg",
    badge: "TOP RATED",
    description:
      "Lightweight carbon trekking poles for Annapurna, Everest, and the stairs to your apartment. Your knees will thank you, eventually.",
    deliveryNote: "Estimated delivery: Parsi (Day after tomorrow\u2122)",
    specs: [
      { label: "Material", value: "Carbon Fiber" },
      { label: "Weight", value: "220g each" },
      { label: "Length", value: "65-135cm" },
      { label: "Grip", value: "Cork" },
    ],
  },
];

export function formatNPR(amount: number): string {
  return `₨${amount.toLocaleString("en-NP")}`;
}

export function getDiscount(price: number, originalPrice: number): number {
  return Math.round(((originalPrice - price) / originalPrice) * 100);
}
