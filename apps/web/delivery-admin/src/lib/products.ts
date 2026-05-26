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
    id: 'courier-jacket',
    name: 'Courier Jacket',
    tagline: 'Weather-ready dispatch layer',
    category: 'Safety',
    price: 89,
    rating: 4.6,
    stock: 24,
    gradient: 'linear-gradient(135deg, #ff7e5f, #feb47b)',
  },
  {
    id: 'rapid-helmet',
    name: 'Rapid Helmet',
    tagline: 'Lightweight impact protection',
    category: 'Safety',
    price: 64,
    rating: 4.5,
    stock: 32,
    gradient: 'linear-gradient(135deg, #f83600, #f9d423)',
  },
  {
    id: 'thermal-bag',
    name: 'Thermal Bag',
    tagline: 'Keep orders at temperature',
    category: 'Ops',
    price: 72,
    rating: 4.7,
    stock: 18,
    gradient: 'linear-gradient(135deg, #f857a6, #ff5858)',
  },
  {
    id: 'dispatch-tablet',
    name: 'Dispatch Tablet',
    tagline: 'Rugged screens for field ops',
    category: 'Fleet',
    price: 399,
    rating: 4.8,
    stock: 10,
    gradient: 'linear-gradient(135deg, #f09819, #ff512f)',
  },
  {
    id: 'signal-beacon',
    name: 'Signal Beacon',
    tagline: 'Trackable vehicle indicator',
    category: 'Fleet',
    price: 120,
    rating: 4.4,
    stock: 16,
    gradient: 'linear-gradient(135deg, #f7971e, #ffd200)',
  },
  {
    id: 'route-clipboard',
    name: 'Route Clipboard',
    tagline: 'Ops checklist essentials',
    category: 'Ops',
    price: 18,
    rating: 4.3,
    stock: 40,
    gradient: 'linear-gradient(135deg, #ffecd2, #fcb69f)',
  },
  {
    id: 'night-vest',
    name: 'Night Vest',
    tagline: 'High visibility reflective gear',
    category: 'Safety',
    price: 48,
    rating: 4.5,
    stock: 28,
    gradient: 'linear-gradient(135deg, #f6d365, #fda085)',
  },
  {
    id: 'fleet-comms',
    name: 'Fleet Comms',
    tagline: 'Hands-free radio kit',
    category: 'Fleet',
    price: 210,
    rating: 4.6,
    stock: 12,
    gradient: 'linear-gradient(135deg, #f5af19, #f12711)',
  },
];

export const categories = Array.from(
  new Set(products.map((product) => product.category))
);

export const findProduct = (id: string) =>
  products.find((product) => product.id === id);
