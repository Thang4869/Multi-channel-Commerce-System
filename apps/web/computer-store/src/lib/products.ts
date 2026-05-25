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
    id: 'atlas-14',
    name: 'Atlas 14',
    tagline: 'Ultra mobile creator laptop',
    category: 'Laptops',
    price: 1299,
    rating: 4.7,
    stock: 12,
    gradient: 'linear-gradient(135deg, #1d2b64, #f8cdda)',
  },
  {
    id: 'nimbus-tower',
    name: 'Nimbus Tower',
    tagline: 'Performance desktop for teams',
    category: 'Laptops',
    price: 1599,
    rating: 4.8,
    stock: 8,
    gradient: 'linear-gradient(135deg, #4b79a1, #283e51)',
  },
  {
    id: 'aether-gpu',
    name: 'Aether GPU',
    tagline: 'Ray tracing ready graphics',
    category: 'Components',
    price: 799,
    rating: 4.9,
    stock: 6,
    gradient: 'linear-gradient(135deg, #00c6ff, #0072ff)',
  },
  {
    id: 'pulse-ssd',
    name: 'Pulse SSD',
    tagline: '2TB PCIe Gen4 speed',
    category: 'Components',
    price: 199,
    rating: 4.6,
    stock: 28,
    gradient: 'linear-gradient(135deg, #43cea2, #185a9d)',
  },
  {
    id: 'halo-monitor',
    name: 'Halo Monitor',
    tagline: '34" ultra wide display',
    category: 'Accessories',
    price: 299,
    rating: 4.5,
    stock: 14,
    gradient: 'linear-gradient(135deg, #56ccf2, #2f80ed)',
  },
  {
    id: 'signal-keyboard',
    name: 'Signal Keyboard',
    tagline: 'Low profile mechanical keys',
    category: 'Accessories',
    price: 129,
    rating: 4.4,
    stock: 22,
    gradient: 'linear-gradient(135deg, #2193b0, #6dd5ed)',
  },
  {
    id: 'vector-cpu',
    name: 'Vector CPU',
    tagline: '16-core workstation engine',
    category: 'Components',
    price: 499,
    rating: 4.7,
    stock: 10,
    gradient: 'linear-gradient(135deg, #3a7bd5, #3a6073)',
  },
  {
    id: 'orbit-dock',
    name: 'Orbit Dock',
    tagline: 'Thunderbolt hub for teams',
    category: 'Accessories',
    price: 149,
    rating: 4.3,
    stock: 30,
    gradient: 'linear-gradient(135deg, #00d2ff, #3a7bd5)',
  },
];

export const categories = Array.from(
  new Set(products.map((product) => product.category))
);

export const findProduct = (id: string) =>
  products.find((product) => product.id === id);
