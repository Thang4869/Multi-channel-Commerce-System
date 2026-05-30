'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/AppShell';
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/store';

export default function LoginPage() {
  const router = useRouter();
  const setAuth = useAuthStore((state) => state.setAuth);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await authApi.login(email, password);
      const accessToken = result?.data?.accessToken;
      const user = result?.data?.user;
      if (accessToken && user) {
        setAuth(accessToken, {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          roles: user.roles || [],
        });
        router.push('/dashboard');
      } else {
        setError('Invalid login response');
      }
    } catch (err: any) {
      setError('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-md">
        <div className="card p-6">
          <h1 className="text-3xl font-heading">Sign in</h1>
          <p className="mt-2 text-sm text-muted">Access staff dashboards and inventory tools.</p>
          {error && (
            <div className="mt-4 rounded-xl bg-white/80 p-3 text-sm text-red-600">
              {error}
            </div>
          )}
          <form className="mt-6 space-y-4" onSubmit={(e) => void handleSubmit(e)}>
            <input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm"
            />
            <input
              required
              type="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm"
            />
            <button className="btn-primary w-full" type="submit" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
