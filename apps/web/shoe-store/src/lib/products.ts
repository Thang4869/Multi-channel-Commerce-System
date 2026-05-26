export type Product = {
  id: string;
  name: string;
  tagline: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  gradient: string;
};

export const products: Product[] = [
  {
    id: 'runner-pulse',
    name: 'Runner Pulse',
    tagline: 'Featherlight road trainer',
    category: 'Road',
    price: 129,
    rating: 4.7,
    stock: 24,
    gradient: 'linear-gradient(135deg, #ffb347, #ff5f6d)',
  },
  {
    id: 'trail-crest',
    name: 'Trail Crest',
    tagline: 'Grip-first trail control',
    category: 'Trail',
    price: 148,
    rating: 4.8,
    stock: 18,
    gradient: 'linear-gradient(135deg, #6a9c89, #c4fcef)',
  },
  {
    id: 'city-knit',
    name: 'City Knit',
    tagline: 'Soft stride, all-day knit',
    category: 'Lifestyle',
    price: 112,
    rating: 4.5,
    stock: 34,
    gradient: 'linear-gradient(135deg, #ffc3a0, #ffafbd)',
  },
  {
    id: 'retro-court',
    name: 'Retro Court',
    tagline: 'Classic court balance',
    category: 'Lifestyle',
    price: 118,
    rating: 4.6,
    stock: 20,
    gradient: 'linear-gradient(135deg, #fbc2eb, #a6c1ee)',
  },
  {
    id: 'aero-dash',
    name: 'Aero Dash',
    tagline: 'Speed-ready propulsion',
    category: 'Road',
    price: 164,
    rating: 4.9,
    stock: 12,
    gradient: 'linear-gradient(135deg, #f857a6, #ff5858)',
  },
  {
    id: 'night-shift',
    name: 'Night Shift',
    tagline: 'Reflective city runner',
    category: 'Road',
    price: 136,
    rating: 4.4,
    stock: 16,
    gradient: 'linear-gradient(135deg, #5f72be, #9b23ea)',
  },
  {
    id: 'summit-roam',
    name: 'Summit Roam',
    tagline: 'All-weather trail shell',
    category: 'Trail',
    price: 172,
    rating: 4.8,
    stock: 10,
    gradient: 'linear-gradient(135deg, #11998e, #38ef7d)',
  },
  {
    id: 'studio-slip',
    name: 'Studio Slip',
    tagline: 'Low profile daily wear',
    category: 'Lifestyle',
    price: 98,
    rating: 4.3,
    stock: 28,
    gradient: 'linear-gradient(135deg, #fceabb, #f8b500)',
  },
];

export const categories = Array.from(
  new Set(products.map((product) => product.category))
);

export const findProduct = (id: string) =>
  products.find((product) => product.id === id);
