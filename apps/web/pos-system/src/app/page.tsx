import Link from 'next/link';
import AppShell from '@/components/AppShell';
import ProductCard from '@/components/ProductCard';
import { brand } from '@/lib/brand';
import { products } from '@/lib/products';

const featured = products.slice(0, 3);

export default function HomePage() {
  return (
    <AppShell>
      <section className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6 animate-rise">
          <span className="brand-chip">Front Counter</span>
          <h1 className="text-5xl font-heading md:text-6xl">
            Checkout lanes that never slow down.
          </h1>
          <p className="text-lg text-muted">{brand.tagline}</p>
          <div className="flex flex-wrap gap-3">
            <Link className="btn-primary" href="/products">
              Shop POS gear
            </Link>
            <Link className="btn-secondary" href="/dashboard">
              View dashboard
            </Link>
          </div>
          <div className="flex flex-wrap gap-8 text-sm text-muted">
            <div>
              <p className="text-2xl font-semibold text-ink">0.8s</p>
              <p>Avg scan time</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-ink">16</p>
              <p>Active lanes</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-ink">4.6</p>
              <p>Cashier rating</p>
            </div>
          </div>
        </div>
        <div className="card space-y-4 p-6 animate-rise-delayed">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">Lane Setup</p>
          <h2 className="text-3xl font-heading">Build the perfect counter</h2>
          <p className="text-sm text-muted">
            Combine hardware, supplies, and training for every location.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl bg-white/70 p-4">
              <p className="text-sm text-muted">Hardware</p>
              <p className="text-lg font-semibold">Fast scan</p>
            </div>
            <div className="rounded-2xl bg-white/70 p-4">
              <p className="text-sm text-muted">Supplies</p>
              <p className="text-lg font-semibold">Always stocked</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="section-title">Featured bundles</h2>
          <Link className="text-sm text-muted" href="/products">
            Browse all
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </AppShell>
  );
}
