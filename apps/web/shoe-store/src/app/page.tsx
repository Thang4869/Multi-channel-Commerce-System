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
          <span className="brand-chip">Season Drop</span>
          <h1 className="text-5xl font-heading md:text-6xl">
            Run the city. Own the pace.
          </h1>
          <p className="text-lg text-muted">{brand.tagline}</p>
          <div className="flex flex-wrap gap-3">
            <Link className="btn-primary" href="/products">
              Shop shoes
            </Link>
            <Link className="btn-secondary" href="/dashboard">
              View dashboard
            </Link>
          </div>
          <div className="flex flex-wrap gap-8 text-sm text-muted">
            <div>
              <p className="text-2xl font-semibold text-ink">48h</p>
              <p>New drops</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-ink">120+</p>
              <p>Fits in stock</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-ink">4.8</p>
              <p>Avg rating</p>
            </div>
          </div>
        </div>
        <div className="card space-y-4 p-6 animate-rise-delayed">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">Fit Finder</p>
          <h2 className="text-3xl font-heading">Dial in your ride feel</h2>
          <p className="text-sm text-muted">
            Match cushioning, drop, and terrain in under two minutes.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl bg-white/70 p-4">
              <p className="text-sm text-muted">Road</p>
              <p className="text-lg font-semibold">Cush + Energy</p>
            </div>
            <div className="rounded-2xl bg-white/70 p-4">
              <p className="text-sm text-muted">Trail</p>
              <p className="text-lg font-semibold">Grip + Shield</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="section-title">Featured pairs</h2>
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
