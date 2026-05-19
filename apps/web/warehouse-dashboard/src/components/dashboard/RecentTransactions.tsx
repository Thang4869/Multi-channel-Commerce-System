'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store';

interface Transaction {
  id: string;
  type: 'inbound' | 'outbound' | 'distribution';
  description: string;
  quantity: number;
  timestamp: string;
}

export default function RecentTransactions() {
  const token = useAuthStore((state) => state.token);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTransactions();
  }, [token]);

  const fetchTransactions = async () => {
    try {
      // Mock data
      setTransactions([
        {
          id: '1',
          type: 'inbound',
          description: 'Received shipment from supplier',
          quantity: 500,
          timestamp: new Date().toISOString(),
        },
        {
          id: '2',
          type: 'outbound',
          description: 'Order shipment',
          quantity: 50,
          timestamp: new Date(Date.now() - 3600000).toISOString(),
        },
        {
          id: '3',
          type: 'distribution',
          description: 'Distribution to store',
          quantity: 100,
          timestamp: new Date(Date.now() - 7200000).toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'inbound':
        return '📥';
      case 'outbound':
        return '📤';
      case 'distribution':
        return '🚚';
      default:
        return '📋';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h2>

      {loading ? (
        <div className="text-center py-8">
          <p className="text-gray-600">Loading transactions...</p>
        </div>
      ) : (
        <div className="space-y-3">
          {transactions.map((tx) => (
            <div key={tx.id} className="flex items-center gap-3 p-3 hover:bg-gray-50 rounded">
              <span className="text-2xl">{getTypeIcon(tx.type)}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{tx.description}</p>
                <p className="text-xs text-gray-500">
                  {new Date(tx.timestamp).toLocaleString()}
                </p>
              </div>
              <span className="text-sm font-semibold text-gray-700">+{tx.quantity}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
