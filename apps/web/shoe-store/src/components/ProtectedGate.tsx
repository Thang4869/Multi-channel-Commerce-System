'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';

export default function ProtectedGate({
  children,
  requiredRoles = [],
}: {
  children: React.ReactNode;
  requiredRoles?: string[];
}) {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (!token) {
      router.replace('/login');
    }
  }, [token, router]);

  if (!token) {
    return (
      <div className="card p-6 text-center">
        <p className="text-muted">Redirecting to login...</p>
      </div>
    );
  }

  if (requiredRoles.length && !requiredRoles.some((role) => user?.roles?.includes(role))) {
    return (
      <div className="card p-6 text-center">
        <p className="text-lg font-semibold">Access restricted</p>
        <p className="text-muted">Your role does not grant access to this dashboard.</p>
      </div>
    );
  }

  return <>{children}</>;
}
