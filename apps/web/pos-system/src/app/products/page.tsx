'use client';

import { useMemo, useState } from 'react';
import AppShell from '@/components/AppShell';
import ProductCard from '@/components/ProductCard';
import { categories, products } from '@/lib/products';

export default function ProductsPage() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');

  const filtered = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = category === 'All' || product.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="card p-6">
          <h1 className="text-3xl font-heading">Shop POS essentials</h1>
          <p className="mt-2 text-sm text-muted">
            Filter by hardware, supplies, or bundles.
          </p>
          <div className="mt-4 flex flex-col gap-4 md:flex-row md:items-center">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search equipment"
              className="w-full rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm"
            />
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm"
            >
              <option value="All">All categories</option>
              {categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}
