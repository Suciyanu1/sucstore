import React from 'react';
import { Search, Filter, Eye, Download } from 'lucide-react';
import { formatPrice, cn } from '../utils/cn';

const mockOrders = [
  { id: '#ORD-7281', customer: 'John Doe', email: 'john@example.com', status: 'Delivered', total: 12500, date: 'Apr 12, 2024', items: 3 },
  { id: '#ORD-7280', customer: 'Sarah Smith', email: 'sarah@example.com', status: 'Pending', total: 8400, date: 'Apr 12, 2024', items: 1 },
  { id: '#ORD-7279', customer: 'Mike Johnson', email: 'mike@example.com', status: 'Processing', total: 21000, date: 'Apr 11, 2024', items: 5 },
  { id: '#ORD-7278', customer: 'Emma Wilson', email: 'emma@example.com', status: 'Shipped', total: 5600, date: 'Apr 11, 2024', items: 2 },
  { id: '#ORD-7277', customer: 'David Brown', email: 'david@example.com', status: 'Cancelled', total: 15000, date: 'Apr 10, 2024', items: 4 },
];

export default function Orders() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter uppercase">Orders</h1>
          <p className="text-gray-500 mt-1">Track and manage customer purchases.</p>
        </div>
        <button className="bg-white border border-gray-100 text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-gray-50 transition-all shadow-sm">
          <Download size={20} /> Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search orders by ID or customer..."
            className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-500 rounded-2xl font-bold text-sm hover:text-black transition-colors">
            <Filter size={18} /> Status
          </button>
          <input type="date" className="bg-gray-50 border-none rounded-2xl px-6 py-3 text-sm font-bold outline-none text-gray-500" />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Order ID</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Customer</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Items</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Total</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Date</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {mockOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-4 font-bold text-sm">{order.id}</td>
                  <td className="px-8 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{order.customer}</span>
                      <span className="text-[10px] text-gray-400 truncate max-w-[150px]">{order.email}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-sm text-gray-500">{order.items} items</td>
                  <td className="px-8 py-4 font-bold text-sm">{formatPrice(order.total)}</td>
                  <td className="px-8 py-4">
                    <span className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      order.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                      order.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' :
                      order.status === 'Cancelled' ? 'bg-red-50 text-red-600' :
                      'bg-blue-50 text-blue-600'
                    )}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-xs text-gray-400">{order.date}</td>
                  <td className="px-8 py-4 text-right">
                    <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-black transition-all shadow-sm opacity-0 group-hover:opacity-100">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
