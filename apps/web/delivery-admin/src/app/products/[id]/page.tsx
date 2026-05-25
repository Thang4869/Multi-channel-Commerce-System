'use client';

import { useParams } from 'next/navigation';
import AppShell from '@/components/AppShell';
import { findProduct } from '@/lib/products';
import { useCartStore } from '@/store';

export default function ProductDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const product = findProduct(id ?? '');
  const addItem = useCartStore((state) => state.addItem);

  if (!product) {
    return (
      <AppShell>
        <div className="card p-6">
          <p className="text-lg font-semibold">Product not found</p>
          <p className="text-muted">Return to the catalog to explore more.</p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="card p-6">
          <div className="h-72 rounded-2xl" style={{ background: product.gradient }} />
          <div className="mt-6 flex items-center justify-between text-sm text-muted">
            <span>{product.rating.toFixed(1)} rating</span>
            <span>{product.stock} units available</span>
          </div>
        </div>
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.2em] text-muted">
            {product.category}
          </p>
          <h1 className="text-4xl font-heading">{product.name}</h1>
          <p className="text-lg text-muted">{product.tagline}</p>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-semibold">${product.price.toFixed(0)}</span>
            <span className="rounded-full bg-white/80 px-3 py-1 text-xs text-muted">
              Dispatch ready
            </span>
          </div>
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
            Add to cart
          </button>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-white/80 p-4">
              <p className="text-sm text-muted">Compliance</p>
              <p className="text-lg font-semibold">Safety rated</p>
            </div>
            <div className="rounded-2xl bg-white/80 p-4">
              <p className="text-sm text-muted">Support</p>
              <p className="text-lg font-semibold">Ops ready</p>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
