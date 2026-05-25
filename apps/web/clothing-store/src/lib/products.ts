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
    id: 'linen-field-jacket',
    name: 'Linen Field Jacket',
    tagline: 'Lightweight layers for crisp mornings',
    category: 'Outerwear',
    price: 168,
    rating: 4.7,
    stock: 14,
    gradient: 'linear-gradient(135deg, #e6dada, #274046)',
  },
  {
    id: 'softline-tee',
    name: 'Softline Tee',
    tagline: 'Breathable cotton, refined drape',
    category: 'Essentials',
    price: 52,
    rating: 4.6,
    stock: 36,
    gradient: 'linear-gradient(135deg, #fdfbfb, #ebedee)',
  },
  {
    id: 'studio-trouser',
    name: 'Studio Trouser',
    tagline: 'Tailored ease with stretch',
    category: 'Tailored',
    price: 124,
    rating: 4.5,
    stock: 20,
    gradient: 'linear-gradient(135deg, #c9d6ff, #e2e2e2)',
  },
  {
    id: 'silk-wrap',
    name: 'Silk Wrap Blouse',
    tagline: 'Soft sheen for evening edits',
    category: 'Formal',
    price: 148,
    rating: 4.8,
    stock: 12,
    gradient: 'linear-gradient(135deg, #fdf1d2, #f9a8d4)',
  },
  {
    id: 'ribbed-knit',
    name: 'Ribbed Knit',
    tagline: 'Warm texture, clean lines',
    category: 'Essentials',
    price: 64,
    rating: 4.4,
    stock: 28,
    gradient: 'linear-gradient(135deg, #d3cce3, #e9e4f0)',
  },
  {
    id: 'drift-overshirt',
    name: 'Drift Overshirt',
    tagline: 'Structured and easy to layer',
    category: 'Outerwear',
    price: 110,
    rating: 4.5,
    stock: 18,
    gradient: 'linear-gradient(135deg, #e0c3fc, #8ec5fc)',
  },
  {
    id: 'garden-maxi',
    name: 'Garden Maxi',
    tagline: 'Flowing silhouette, soft pleats',
    category: 'Formal',
    price: 138,
    rating: 4.7,
    stock: 10,
    gradient: 'linear-gradient(135deg, #fbc8d4, #9796f0)',
  },
  {
    id: 'city-pleat',
    name: 'City Pleat Skirt',
    tagline: 'Movement-forward tailoring',
    category: 'Tailored',
    price: 118,
    rating: 4.6,
    stock: 16,
    gradient: 'linear-gradient(135deg, #f5f7fa, #c3cfe2)',
  },
];

export const categories = Array.from(
  new Set(products.map((product) => product.category))
);

export const findProduct = (id: string) =>
  products.find((product) => product.id === id);
