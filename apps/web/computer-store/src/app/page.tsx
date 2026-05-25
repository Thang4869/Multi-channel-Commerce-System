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
          <span className="brand-chip">Build Lab</span>
          <h1 className="text-5xl font-heading md:text-6xl">
            Hardware that ships as fast as you do.
          </h1>
          <p className="text-lg text-muted">{brand.tagline}</p>
          <div className="flex flex-wrap gap-3">
            <Link className="btn-primary" href="/products">
              Shop hardware
            </Link>
            <Link className="btn-secondary" href="/dashboard">
              View dashboard
            </Link>
          </div>
          <div className="flex flex-wrap gap-8 text-sm text-muted">
            <div>
              <p className="text-2xl font-semibold text-ink">72h</p>
              <p>Build turnaround</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-ink">300+</p>
              <p>Configs in stock</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-ink">4.8</p>
              <p>Benchmark rating</p>
            </div>
          </div>
        </div>
        <div className="card space-y-4 p-6 animate-rise-delayed">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">System Builder</p>
          <h2 className="text-3xl font-heading">Tune your stack</h2>
          <p className="text-sm text-muted">
            Balance compute, GPU, and storage for every workload.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl bg-white/70 p-4">
              <p className="text-sm text-muted">Creator</p>
              <p className="text-lg font-semibold">GPU focused</p>
            </div>
            <div className="rounded-2xl bg-white/70 p-4">
              <p className="text-sm text-muted">Ops</p>
              <p className="text-lg font-semibold">Reliable cores</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="section-title">Featured rigs</h2>
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
