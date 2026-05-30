'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface InventoryItem {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  reservedQuantity: number;
  warehouseLocation: string;
  lastUpdated: string;
}

export default function InventoryPage() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // filter state not used yet

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    void fetchInventory();
  }, [token, router]);

  const fetchInventory = () => {
    try {
      setLoading(true);
      // Mock data for now
      setInventory([
        {
          id: '1',
          productId: 'PROD-001',
          productName: 'Electronics Device A',
          quantity: 500,
          reservedQuantity: 50,
          warehouseLocation: 'WH-001',
          lastUpdated: new Date().toISOString(),
        },
        {
          id: '2',
          productId: 'PROD-002',
          productName: 'Electronics Device B',
          quantity: 200,
          reservedQuantity: 30,
          warehouseLocation: 'WH-001',
          lastUpdated: new Date().toISOString(),
        },
        {
          id: '3',
          productId: 'PROD-003',
          productName: 'Accessories',
          quantity: 1000,
          reservedQuantity: 150,
          warehouseLocation: 'WH-002',
          lastUpdated: new Date().toISOString(),
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  const getAvailability = (item: InventoryItem) => {
    const available = item.quantity - item.reservedQuantity;
    if (available === 0) return { label: 'Out of Stock', color: 'text-red-600' };
    if (available < 50) return { label: 'Low Stock', color: 'text-yellow-600' };
    return { label: 'In Stock', color: 'text-green-600' };
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Inventory Management</h1>
          <p className="text-gray-600 mt-1">Track and manage warehouse inventory</p>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading inventory...</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-6 font-semibold text-gray-700">Product</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-700">Total Qty</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-700">Reserved</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-700">Available</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-700">Warehouse</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item, index) => {
                  const availability = getAvailability(item);
                  const available = item.quantity - item.reservedQuantity;
                  return (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-6">
                        <div>
                          <p className="font-medium text-gray-900">{item.productName}</p>
                          <p className="text-sm text-gray-500">{item.productId}</p>
                        </div>
                      </td>
                      <td className="py-3 px-6 font-semibold">{item.quantity}</td>
                      <td className="py-3 px-6">{item.reservedQuantity}</td>
                      <td className="py-3 px-6 font-semibold">{available}</td>
                      <td className="py-3 px-6">{item.warehouseLocation}</td>
                      <td className="py-3 px-6">
                        <span className={`font-medium ${availability.color}`}>
                          {availability.label}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
