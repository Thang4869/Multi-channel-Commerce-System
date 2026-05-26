'use client';

import AppShell from '@/components/AppShell';
import ProtectedGate from '@/components/ProtectedGate';
import { useAuthStore } from '@/store';
import { brand, dashboardRoles } from '@/lib/brand';

const stats = [
  { label: 'Orders today', value: '64' },
  { label: 'Returns', value: '3' },
  { label: 'Low stock', value: '8' },
  { label: 'Active promos', value: '2' },
];

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);

  return (
    <AppShell>
      <ProtectedGate requiredRoles={dashboardRoles}>
        <div className="space-y-8">
          <div className="card p-6">
            <p className="text-sm uppercase tracking-[0.2em] text-muted">
              {brand.name} operations
            </p>
            <h1 className="text-3xl font-heading">Welcome back, {user?.fullName || 'Team'}</h1>
            <p className="text-sm text-muted">Role: {user?.roles?.join(', ') || 'ADMIN'}</p>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="card p-5">
                <p className="text-sm text-muted">{stat.label}</p>
                <p className="text-2xl font-semibold">{stat.value}</p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="card p-6">
              <h2 className="text-xl font-semibold">Fulfillment focus</h2>
              <p className="mt-2 text-sm text-muted">
                Prioritize Road category replenishment in the next 48 hours.
              </p>
              <button className="btn-secondary mt-4">Open stock planner</button>
            </div>
            <div className="card p-6">
              <h2 className="text-xl font-semibold">Customer pulse</h2>
              <p className="mt-2 text-sm text-muted">
                Net promoter score is up 6 points week over week.
              </p>
              <button className="btn-secondary mt-4">View insights</button>
            </div>
          </div>
        </div>
      </ProtectedGate>
    </AppShell>
  );
}
