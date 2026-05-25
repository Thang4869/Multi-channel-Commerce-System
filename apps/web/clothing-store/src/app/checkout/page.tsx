'use client';

import { useState } from 'react';
import Link from 'next/link';
import AppShell from '@/components/AppShell';
import { useCartStore } from '@/store';

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);
  const [isPlaced, setIsPlaced] = useState(false);

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsPlaced(true);
    clearCart();
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <h1 className="text-3xl font-heading">Checkout</h1>

        {items.length === 0 ? (
          <div className="card p-6">
            <p className="text-muted">Your cart is empty.</p>
            <Link className="btn-primary mt-4 inline-flex" href="/products">
              Browse apparel
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <form className="card space-y-4 p-6" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  required
                  placeholder="Full name"
                  className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm"
                />
                <input
                  required
                  type="email"
                  placeholder="Email"
                  className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm"
                />
              </div>
              <input
                required
                placeholder="Street address"
                className="w-full rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm"
              />
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  required
                  placeholder="City"
                  className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm"
                />
                <input
                  required
                  placeholder="Postal code"
                  className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm"
                />
              </div>
              <button className="btn-primary" type="submit">
                Place order
              </button>
              {isPlaced && (
                <p className="text-sm text-muted">
                  Order placed. A confirmation email is on the way.
                </p>
              )}
            </form>
            <div className="card p-6">
              <h2 className="text-xl font-semibold">Order summary</h2>
              <div className="mt-4 space-y-2 text-sm text-muted">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex justify-between border-t border-white/70 pt-4 text-lg font-semibold">
                <span>Total</span>
                <span>${total.toFixed(0)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
