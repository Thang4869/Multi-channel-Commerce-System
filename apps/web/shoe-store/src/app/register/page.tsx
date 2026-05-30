'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppShell from '@/components/AppShell';
import { authApi } from '@/lib/api';
import { RegisterRequest, UserRole } from '@commerce/types';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState<RegisterRequest & { password: string }>({
    fullName: '',
    email: '',
    password: '',
    phone: '',
    role: UserRole.CUSTOMER,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (key: keyof (RegisterRequest & { password: string }), value: string) => {
    setForm((prev) => ({ ...prev, [key]: key === 'role' ? (value as UserRole) : value }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      await authApi.register({
        email: form.email,
        password: form.password,
        fullName: form.fullName,
        phone: form.phone,
        role: form.role,
      });
      setSuccess('Account created. You can sign in now.');
      setTimeout(() => router.push('/login'), 800);
    } catch (err: any) {
      setError('Registration failed');
    }
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-md">
        <div className="card p-6">
          <h1 className="text-3xl font-heading">Create account</h1>
          <p className="mt-2 text-sm text-muted">Set up access for team or customer roles.</p>
          {error && (
            <div className="mt-4 rounded-xl bg-white/80 p-3 text-sm text-red-600">
              {error}
            </div>
          )}
          {success && (
            <div className="mt-4 rounded-xl bg-white/80 p-3 text-sm text-green-700">
              {success}
            </div>
          )}
          <form className="mt-6 space-y-4" onSubmit={(e) => void handleSubmit(e)}>
            <input
              required
              placeholder="Full name"
              value={form.fullName}
              onChange={(event) => handleChange('fullName', event.target.value)}
              className="w-full rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm"
            />
            <input
              required
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(event) => handleChange('email', event.target.value)}
              className="w-full rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm"
            />
            <input
              required
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(event) => handleChange('password', event.target.value)}
              className="w-full rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm"
            />
            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(event) => handleChange('phone', event.target.value)}
              className="w-full rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm"
            />
            <label htmlFor="role" className="sr-only">Role</label>
            <select
              id="role"
              aria-label="Role"
              value={form.role}
              onChange={(event) => handleChange('role', event.target.value)}
              className="w-full rounded-full border border-white/70 bg-white/80 px-4 py-2 text-sm"
            >
              <option value="CUSTOMER">Customer</option>
              <option value="STORE_MANAGER">Store manager</option>
              <option value="ADMIN">Admin</option>
            </select>
            <button className="btn-primary w-full" type="submit">
              Create account
            </button>
          </form>
        </div>
      </div>
    </AppShell>
  );
}
