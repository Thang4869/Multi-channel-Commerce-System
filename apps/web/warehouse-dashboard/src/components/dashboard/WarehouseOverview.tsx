'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store';

interface WarehouseStats {
  totalWarehouses: number;
  totalInventory: number;
  pendingDistributions: number;
  lowStockProducts: number;
}

export default function WarehouseOverview() {
  const token = useAuthStore((state) => state.token);
  const [stats, setStats] = useState<WarehouseStats>({
    totalWarehouses: 0,
    totalInventory: 0,
    pendingDistributions: 0,
    lowStockProducts: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, [token]);

  const fetchStats = async () => {
    try {
      // In a real app, you'd fetch this from the API
      // For now, using mock data
      setStats({
        totalWarehouses: 5,
        totalInventory: 45230,
        pendingDistributions: 12,
        lowStockProducts: 8,
      });
    } finally {
      setLoading(false);
    }
  };

  const cards = [
    {
      label: 'Total Warehouses',
      value: stats.totalWarehouses,
      color: 'bg-blue-600',
      icon: '🏭',
    },
    {
      label: 'Total Inventory',
      value: stats.totalInventory,
      color: 'bg-green-600',
      icon: '📦',
    },
    {
      label: 'Pending Distributions',
      value: stats.pendingDistributions,
      color: 'bg-yellow-600',
      icon: '🚚',
    },
    {
      label: 'Low Stock Products',
      value: stats.lowStockProducts,
      color: 'bg-red-600',
      icon: '⚠️',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`${card.color} rounded-lg shadow p-6 text-white`}
        >
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium opacity-90">{card.label}</p>
              <p className="text-3xl font-bold mt-2">{card.value}</p>
            </div>
            <span className="text-4xl opacity-50">{card.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
