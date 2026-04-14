import React from 'react';
import { ShoppingBag, Users, Package, TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { formatPrice } from '../utils/cn';

const salesData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const topProducts = [
  { name: 'Wireless Headphones', sales: 450, color: '#000000' },
  { name: 'Smart Watch', sales: 380, color: '#ea580c' },
  { name: 'Leather Wallet', sales: 320, color: '#4b5563' },
  { name: 'Cotton T-Shirt', sales: 290, color: '#9ca3af' },
];

const recentOrders = [
  { id: '#ORD-7281', customer: 'John Doe', status: 'Delivered', total: 12500, date: '2 mins ago' },
  { id: '#ORD-7280', customer: 'Sarah Smith', status: 'Pending', total: 8400, date: '15 mins ago' },
  { id: '#ORD-7279', customer: 'Mike Johnson', status: 'Processing', total: 21000, date: '1 hour ago' },
  { id: '#ORD-7278', customer: 'Emma Wilson', status: 'Delivered', total: 5600, date: '3 hours ago' },
];

export default function DashboardHome() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold tracking-tighter uppercase">Overview</h1>
        <p className="text-gray-500 mt-1">Welcome back, here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Revenue" 
          value={formatPrice(1284500)} 
          change="+12.5%" 
          isPositive={true} 
          icon={TrendingUp} 
        />
        <StatCard 
          title="Total Orders" 
          value="1,284" 
          change="+8.2%" 
          isPositive={true} 
          icon={ShoppingBag} 
        />
        <StatCard 
          title="Active Users" 
          value="8,432" 
          change="-2.4%" 
          isPositive={false} 
          icon={Users} 
        />
        <StatCard 
          title="Total Products" 
          value="432" 
          change="+4.1%" 
          isPositive={true} 
          icon={Package} 
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold uppercase tracking-widest text-sm">Sales Trends</h3>
            <select className="bg-gray-50 border-none rounded-xl px-4 py-2 text-xs font-bold outline-none">
              <option>Last 7 Days.</option>
              <option>Last 30 Days.</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9ca3af' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 12, fill: '#9ca3af' }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#000000" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorValue)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm">
          <h3 className="font-bold uppercase tracking-widest text-sm mb-8">Top Products</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topProducts} layout="vertical">
                <XAxis type="number" hide />
                <YAxis 
                  dataKey="name" 
                  type="category" 
                  hide
                />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="sales" radius={[0, 10, 10, 0]} barSize={32}>
                  {topProducts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-3">
            {topProducts.map((product) => (
              <div key={product.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: product.color }} />
                  <span className="text-xs font-medium text-gray-600">{product.name}</span>
                </div>
                <span className="text-xs font-bold">{product.sales} sales</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold uppercase tracking-widest text-sm">Recent Orders</h3>
          <button className="text-xs font-bold text-orange-600 hover:text-black transition-colors">View All Orders</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Order ID</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Customer</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Total</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-4 font-bold text-sm">{order.id}</td>
                  <td className="px-8 py-4 text-sm text-gray-600">{order.customer}</td>
                  <td className="px-8 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      order.status === 'Delivered' ? 'bg-green-50 text-green-600' :
                      order.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' :
                      'bg-blue-50 text-blue-600'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-8 py-4 font-bold text-sm">{formatPrice(order.total)}</td>
                  <td className="px-8 py-4 text-xs text-gray-400">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, change, isPositive, icon: Icon }: any) {
  return (
    <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm hover:shadow-xl hover:shadow-gray-100 transition-all group">
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-black group-hover:text-white transition-all">
          <Icon size={24} />
        </div>
        <div className={`flex items-center gap-1 text-xs font-bold ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </div>
      </div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">{title}</p>
      <h4 className="text-2xl font-bold tracking-tight">{value}</h4>
    </div>
  );
}
