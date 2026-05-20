'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store';
import DashboardLayout from '@/components/layout/DashboardLayout';

interface Distribution {
  id: string;
  warehouseId: string;
  status: 'pending' | 'approved' | 'shipped' | 'delivered';
  itemsCount: number;
  destinationStore: string;
  createdAt: string;
  updatedAt: string;
}

export default function DistributionsPage() {
  const router = useRouter();
  const token = useAuthStore((state) => state.token);
  const [distributions, setDistributions] = useState<Distribution[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState({ status: 'all' });

  useEffect(() => {
    if (!token) {
      router.push('/login');
      return;
    }

    fetchDistributions();
  }, [token, router]);

  const fetchDistributions = async () => {
    try {
      setLoading(true);
      // Mock data
      setDistributions([
        {
          id: 'DIST-001',
          warehouseId: 'WH-001',
          status: 'pending',
          itemsCount: 5,
          destinationStore: 'Store A',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: 'DIST-002',
          warehouseId: 'WH-001',
          status: 'approved',
          itemsCount: 3,
          destinationStore: 'Store B',
          createdAt: new Date(Date.now() - 86400000).toISOString(),
          updatedAt: new Date(Date.now() - 86400000).toISOString(),
        },
        {
          id: 'DIST-003',
          warehouseId: 'WH-002',
          status: 'shipped',
          itemsCount: 8,
          destinationStore: 'Store C',
          createdAt: new Date(Date.now() - 172800000).toISOString(),
          updatedAt: new Date(Date.now() - 86400000).toISOString(),
        },
      ]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load distributions');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'approved':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDistributions =
    filter.status === 'all'
      ? distributions
      : distributions.filter((d) => d.status === filter.status);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Distributions</h1>
            <p className="text-gray-600 mt-1">Manage warehouse distributions to stores</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition">
            New Distribution
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Filter */}
        <div className="bg-white rounded-lg shadow p-4">
          <label className="text-sm font-medium text-gray-700">Filter by Status</label>
          <select
            value={filter.status}
            onChange={(e) => setFilter({ ...filter, status: e.target.value })}
            className="mt-2 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading distributions...</p>
          </div>
        ) : filteredDistributions.length === 0 ? (
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <p className="text-gray-600">No distributions found</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-3 px-6 font-semibold text-gray-700">ID</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-700">Destination</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-700">Items</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-700">Status</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-700">Created</th>
                  <th className="text-left py-3 px-6 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredDistributions.map((dist, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-6 font-semibold text-gray-900">{dist.id}</td>
                    <td className="py-3 px-6">{dist.destinationStore}</td>
                    <td className="py-3 px-6">{dist.itemsCount} items</td>
                    <td className="py-3 px-6">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(dist.status)}`}>
                        {dist.status}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      {new Date(dist.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-6">
                      <button className="text-blue-600 hover:text-blue-700 font-medium">
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
