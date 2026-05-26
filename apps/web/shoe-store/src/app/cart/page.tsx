'use client';

import Link from 'next/link';
import AppShell from '@/components/AppShell';
import { useCartStore } from '@/store';

export default function CartPage() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-heading">Your cart</h1>
        {items.length === 0 ? (
          <div className="card p-6">
            <p className="text-muted">Your cart is empty.</p>
            <Link className="btn-primary mt-4 inline-flex" href="/products">
              Browse shoes
            </Link>
          </div>
        ) : (
          <div className="card p-6">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-lg font-semibold">{item.name}</p>
                    <p className="text-sm text-muted">${item.price.toFixed(0)}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(event) =>
                        setQuantity(item.id, Number(event.target.value))
                      }
                      className="w-16 rounded-full border border-white/70 bg-white/80 px-3 py-1 text-center text-sm"
                    />
                    <button
                      className="btn-secondary"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-between border-t border-white/70 pt-4">
              <span className="text-lg font-semibold">Total</span>
              <span className="text-2xl font-semibold">${total.toFixed(0)}</span>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
