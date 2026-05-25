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
          <span className="brand-chip">Studio Edit</span>
          <h1 className="text-5xl font-heading md:text-6xl">
            Quiet luxury, everyday ease.
          </h1>
          <p className="text-lg text-muted">{brand.tagline}</p>
          <div className="flex flex-wrap gap-3">
            <Link className="btn-primary" href="/products">
              Shop apparel
            </Link>
            <Link className="btn-secondary" href="/dashboard">
              View dashboard
            </Link>
          </div>
          <div className="flex flex-wrap gap-8 text-sm text-muted">
            <div>
              <p className="text-2xl font-semibold text-ink">320</p>
              <p>Pieces curated</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-ink">24</p>
              <p>Limited runs</p>
            </div>
            <div>
              <p className="text-2xl font-semibold text-ink">4.9</p>
              <p>Average rating</p>
            </div>
          </div>
        </div>
        <div className="card space-y-4 p-6 animate-rise-delayed">
          <p className="text-sm uppercase tracking-[0.3em] text-muted">Style Map</p>
          <h2 className="text-3xl font-heading">Build your capsule</h2>
          <p className="text-sm text-muted">
            Curate a wardrobe in three steps with guided pairings.
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl bg-white/70 p-4">
              <p className="text-sm text-muted">Essentials</p>
              <p className="text-lg font-semibold">Soft structure</p>
            </div>
            <div className="rounded-2xl bg-white/70 p-4">
              <p className="text-sm text-muted">Formal</p>
              <p className="text-lg font-semibold">Refined lines</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="section-title">Featured looks</h2>
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
