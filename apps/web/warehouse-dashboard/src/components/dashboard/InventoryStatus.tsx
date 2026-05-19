'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store';

interface InventoryItem {
  productId: string;
  productName: string;
  quantity: number;
  warehouseLocation: string;
  status: 'in-stock' | 'low' | 'out-of-stock';
}

export default function InventoryStatus() {
  const token = useAuthStore((state) => state.token);
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInventory();
  }, [token]);

  const fetchInventory = async () => {
    try {
      // Mock data
      setInventory([
        {
          productId: '1',
          productName: 'Product A',
          quantity: 500,
          warehouseLocation: 'WH-001',
          status: 'in-stock',
        },
        {
          productId: '2',
          productName: 'Product B',
          quantity: 45,
          warehouseLocation: 'WH-001',
          status: 'low',
        },
        {
          productId: '3',
          productName: 'Product C',
          quantity: 0,
          warehouseLocation: 'WH-002',
          status: 'out-of-stock',
        },
        {
          productId: '4',
          productName: 'Product D',
          quantity: 350,
          warehouseLocation: 'WH-002',
          status: 'in-stock',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'in-stock':
        return 'bg-green-100 text-green-800';
      case 'low':
        return 'bg-yellow-100 text-yellow-800';
      case 'out-of-stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Inventory Status</h2>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading inventory...</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Product</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Quantity</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Location</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{item.productName}</td>
                  <td className="py-3 px-4 font-semibold">{item.quantity}</td>
                  <td className="py-3 px-4">{item.warehouseLocation}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(item.status)}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
