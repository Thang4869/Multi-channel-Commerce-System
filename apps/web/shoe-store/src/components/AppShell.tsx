'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore, useCartStore } from '@/store';
import { brand } from '@/lib/brand';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Cart', href: '/cart' },
  { label: 'Checkout', href: '/checkout' },
  { label: 'Dashboard', href: '/dashboard' },
];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const token = useAuthStore((state) => state.token);
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const items = useCartStore((state) => state.items);
  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-white/60 bg-white/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Link href="/" className="font-heading text-3xl tracking-[0.2em]">
            {brand.name}
          </Link>
          <nav className="hidden items-center gap-5 text-sm md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`transition ${
                  isActive(item.href) ? 'text-brand' : 'text-muted'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-3 text-sm">
            <Link href="/cart" className="text-muted">
              Cart ({cartCount})
            </Link>
            {token ? (
              <button className="btn-secondary" onClick={clearAuth}>
                Logout
              </button>
            ) : (
              <Link className="btn-primary" href="/login">
                Sign in
              </Link>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">{children}</main>

      <footer className="mx-auto max-w-6xl px-6 pb-10 text-sm text-muted">
        <div className="flex flex-col gap-2 border-t border-white/60 pt-6 md:flex-row md:items-center md:justify-between">
          <span>{brand.description}</span>
          <span>Support: team@shoestore.demo</span>
        </div>
      </footer>
    </div>
  );
}
