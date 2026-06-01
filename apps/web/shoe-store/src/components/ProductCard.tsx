'use client';

import Link from 'next/link';
import { useCartStore } from '@/store';
import { Product } from '@/lib/products';

export default function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((state) => state.addItem);

  return (
    <div className="card flex h-full flex-col gap-4 p-5">
      <div className={`h-32 rounded-xl ${product.gradientClass}`} />
      <div className="flex-1 space-y-2">
        <p className="text-xs uppercase tracking-[0.2em] text-muted">
          {product.category}
        </p>
        <Link
          href={`/products/${product.id}`}
          className="block text-lg font-semibold"
        >
          {product.name}
        </Link>
        <p className="text-sm text-muted">{product.tagline}</p>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold">${product.price.toFixed(0)}</span>
        <button
          className="btn-primary"
          onClick={() =>
            addItem({
              id: product.id,
              name: product.name,
              price: product.price,
              quantity: 1,
            })
          }
        >
          Add
        </button>
      </div>
    </div>
  );
}
