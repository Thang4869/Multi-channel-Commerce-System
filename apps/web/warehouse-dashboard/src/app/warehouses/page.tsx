'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface Warehouse {
  id: string;
  name: string;
  location: string;
  capacity: number;
  currentStock: number;
  createdAt: string;
}

export default function WarehousesPage() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    fetchWarehouses();
  }, [token, router]);

  const fetchWarehouses = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/warehouses', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error('Failed to fetch warehouses');

      const data = await response.json();
      setWarehouses(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Warehouses</h1>
            <p className="text-gray-600 mt-1">Manage your warehouse inventory</p>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading warehouses...</p>
          </div>
        ) : warehouses.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <p className="text-gray-600">No warehouses found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {warehouses.map((warehouse) => (
              <div
                key={warehouse.id}
                className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition cursor-pointer"
                onClick={() => router.push(`/warehouses/${warehouse.id}`)}
              >
                <h3 className="text-lg font-semibold text-gray-900">{warehouse.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{warehouse.location}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Capacity</span>
                    <span className="font-semibold">{warehouse.capacity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Current Stock</span>
                    <span className="font-semibold">{warehouse.currentStock}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(warehouse.currentStock / warehouse.capacity) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
