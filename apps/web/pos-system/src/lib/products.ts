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
    id: 'touch-stand',
    name: 'Touch POS Stand',
    tagline: 'Secure, adjustable checkout stand',
    category: 'Hardware',
    price: 499,
    rating: 4.7,
    stock: 10,
    gradient: 'linear-gradient(135deg, #43cea2, #185a9d)',
  },
  {
    id: 'receipt-paper',
    name: 'Receipt Paper Pack',
    tagline: 'Thermal rolls, case of 50',
    category: 'Supplies',
    price: 24,
    rating: 4.5,
    stock: 60,
    gradient: 'linear-gradient(135deg, #f7f7f7, #e0e0e0)',
  },
  {
    id: 'scan-pro',
    name: 'Scan Pro',
    tagline: 'High-speed barcode scanner',
    category: 'Hardware',
    price: 159,
    rating: 4.6,
    stock: 18,
    gradient: 'linear-gradient(135deg, #56ccf2, #2f80ed)',
  },
  {
    id: 'cash-drawer',
    name: 'Cash Drawer',
    tagline: 'Secure till with smart lock',
    category: 'Hardware',
    price: 189,
    rating: 4.4,
    stock: 14,
    gradient: 'linear-gradient(135deg, #1f4037, #99f2c8)',
  },
  {
    id: 'starter-bundle',
    name: 'Starter Bundle',
    tagline: 'POS + scanner + drawer pack',
    category: 'Bundles',
    price: 799,
    rating: 4.8,
    stock: 6,
    gradient: 'linear-gradient(135deg, #f7971e, #ffd200)',
  },
  {
    id: 'label-pack',
    name: 'Label Pack',
    tagline: 'Inventory labels, 500 units',
    category: 'Supplies',
    price: 32,
    rating: 4.3,
    stock: 42,
    gradient: 'linear-gradient(135deg, #fdfbfb, #ebedee)',
  },
  {
    id: 'mobile-tap',
    name: 'Mobile Tap',
    tagline: 'Contactless reader for line busting',
    category: 'Hardware',
    price: 219,
    rating: 4.5,
    stock: 16,
    gradient: 'linear-gradient(135deg, #00c6ff, #0072ff)',
  },
  {
    id: 'counter-mat',
    name: 'Counter Mat',
    tagline: 'Non-slip checkout surface',
    category: 'Supplies',
    price: 28,
    rating: 4.2,
    stock: 38,
    gradient: 'linear-gradient(135deg, #e0c3fc, #8ec5fc)',
  },
];

export const categories = Array.from(
  new Set(products.map((product) => product.category))
);

export const findProduct = (id: string) =>
  products.find((product) => product.id === id);
