export type Car = {
  id: string;
  brand: string;
  model: string;
  year: number;
  engine: string;
  plate?: string;
};

export type Part = {
  id: string;
  name: string;
  category: PartCategory;
  oem: string;
  brand: string;
  isOriginal: boolean;
  price: number;
  oldPrice?: number;
  inStock: number;
  deliveryDays: number;
  rating: number;
  reviews: number;
  image: string;
  description: string;
  fitsCarIds: string[];
};

export type PartCategory =
  | "engine"
  | "brakes"
  | "suspension"
  | "filters"
  | "oils"
  | "electrical"
  | "body";

export const CATEGORIES: { id: PartCategory; label: string; icon: string }[] = [
  { id: "filters", label: "Фильтры", icon: "🧽" },
  { id: "oils", label: "Масла и жидкости", icon: "🛢️" },
  { id: "brakes", label: "Тормоза", icon: "🛑" },
  { id: "engine", label: "Двигатель", icon: "⚙️" },
  { id: "suspension", label: "Подвеска", icon: "🔩" },
  { id: "electrical", label: "Электрика", icon: "🔋" },
  { id: "body", label: "Кузов", icon: "🚙" },
];

export const MOCK_CARS: Car[] = [
  { id: "car-1", brand: "Toyota", model: "Camry", year: 2018, engine: "2.5L", plate: "А123БВ77" },
  { id: "car-2", brand: "Toyota", model: "Corolla", year: 2020, engine: "1.6L" },
  { id: "car-3", brand: "Volkswagen", model: "Polo", year: 2019, engine: "1.6L" },
  { id: "car-4", brand: "Kia", model: "Rio", year: 2021, engine: "1.6L" },
  { id: "car-5", brand: "Hyundai", model: "Solaris", year: 2017, engine: "1.4L" },
];

export const MOCK_PARTS: Part[] = [
  {
    id: "p1",
    name: "Масляный фильтр",
    category: "filters",
    oem: "90915-YZZE1",
    brand: "Toyota (Оригинал)",
    isOriginal: true,
    price: 890,
    oldPrice: 1190,
    inStock: 24,
    deliveryDays: 1,
    rating: 4.8,
    reviews: 312,
    image: "🧽",
    description: "Оригинальный масляный фильтр. Меняется вместе с маслом каждые 10 000 км.",
    fitsCarIds: ["car-1", "car-2"],
  },
  {
    id: "p2",
    name: "Масляный фильтр (аналог)",
    category: "filters",
    oem: "MANN W 68/3",
    brand: "MANN-FILTER",
    isOriginal: false,
    price: 420,
    inStock: 58,
    deliveryDays: 1,
    rating: 4.6,
    reviews: 128,
    image: "🧽",
    description: "Качественный аналог немецкого производства. Подходит как замена оригиналу.",
    fitsCarIds: ["car-1", "car-2"],
  },
  {
    id: "p3",
    name: "Моторное масло 5W-30, 4л",
    category: "oils",
    oem: "08880-83322",
    brand: "Toyota",
    isOriginal: true,
    price: 4290,
    inStock: 12,
    deliveryDays: 1,
    rating: 4.9,
    reviews: 540,
    image: "🛢️",
    description: "Синтетическое моторное масло. Замена раз в 10 000 км или раз в год.",
    fitsCarIds: ["car-1", "car-2", "car-3", "car-4", "car-5"],
  },
  {
    id: "p4",
    name: "Передние тормозные колодки",
    category: "brakes",
    oem: "04465-33450",
    brand: "Toyota",
    isOriginal: true,
    price: 5890,
    inStock: 7,
    deliveryDays: 2,
    rating: 4.7,
    reviews: 96,
    image: "🛑",
    description: "Передние тормозные колодки. Меняются обычно каждые 30–50 тыс. км.",
    fitsCarIds: ["car-1"],
  },
  {
    id: "p5",
    name: "Воздушный фильтр",
    category: "filters",
    oem: "17801-0H050",
    brand: "Toyota",
    isOriginal: true,
    price: 1290,
    inStock: 31,
    deliveryDays: 1,
    rating: 4.8,
    reviews: 201,
    image: "🌬️",
    description: "Фильтр салона и впуска. Меняется раз в 20 000 км.",
    fitsCarIds: ["car-1", "car-2"],
  },
  {
    id: "p6",
    name: "Аккумулятор 60 А·ч",
    category: "electrical",
    oem: "VARTA-E11",
    brand: "Varta",
    isOriginal: false,
    price: 7890,
    oldPrice: 8490,
    inStock: 5,
    deliveryDays: 2,
    rating: 4.7,
    reviews: 412,
    image: "🔋",
    description: "Свинцово-кислотный аккумулятор. Срок службы 4–6 лет.",
    fitsCarIds: ["car-1", "car-2", "car-3", "car-4", "car-5"],
  },
  {
    id: "p7",
    name: "Щётки стеклоочистителя, комплект",
    category: "body",
    oem: "BOSCH-AR653S",
    brand: "Bosch",
    isOriginal: false,
    price: 1690,
    inStock: 44,
    deliveryDays: 1,
    rating: 4.5,
    reviews: 287,
    image: "🌧️",
    description: "Дворники. Рекомендуется менять раз в год — перед осенью.",
    fitsCarIds: ["car-1", "car-2", "car-3", "car-4", "car-5"],
  },
  {
    id: "p8",
    name: "Свечи зажигания, комплект 4 шт.",
    category: "engine",
    oem: "DENSO-IK20",
    brand: "Denso",
    isOriginal: false,
    price: 2890,
    inStock: 18,
    deliveryDays: 1,
    rating: 4.8,
    reviews: 175,
    image: "⚡",
    description: "Иридиевые свечи. Срок службы — 60 000 км.",
    fitsCarIds: ["car-1", "car-2", "car-3"],
  },
  {
    id: "p9",
    name: "Стойка стабилизатора передняя",
    category: "suspension",
    oem: "48820-33050",
    brand: "Toyota",
    isOriginal: true,
    price: 3490,
    inStock: 9,
    deliveryDays: 2,
    rating: 4.6,
    reviews: 64,
    image: "🔩",
    description: "Линка стабилизатора поперечной устойчивости.",
    fitsCarIds: ["car-1"],
  },
];

export function findPart(id: string) {
  return MOCK_PARTS.find((p) => p.id === id);
}

export function searchParts(query: string, carId?: string, category?: PartCategory) {
  const q = query.trim().toLowerCase();
  return MOCK_PARTS.filter((p) => {
    if (carId && !p.fitsCarIds.includes(carId)) return false;
    if (category && p.category !== category) return false;
    if (!q) return true;
    return (
      p.name.toLowerCase().includes(q) ||
      p.oem.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q)
    );
  });
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    maximumFractionDigits: 0,
  }).format(value);
}
