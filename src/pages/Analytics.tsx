import React from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Legend
} from 'recharts';
import { formatPrice } from '../utils/cn';

const salesData = [
  { name: 'Mon', sales: 4000, orders: 240 },
  { name: 'Tue', sales: 3000, orders: 198 },
  { name: 'Wed', sales: 2000, orders: 150 },
  { name: 'Thu', sales: 2780, orders: 190 },
  { name: 'Fri', sales: 1890, orders: 120 },
  { name: 'Sat', sales: 2390, orders: 160 },
  { name: 'Sun', sales: 3490, orders: 210 },
];

const categoryData = [
  { name: 'Electronics', value: 400, color: '#000000' },
  { name: 'Fashion', value: 300, color: '#ea580c' },
  { name: 'Home', value: 300, color: '#4b5563' },
  { name: 'Beauty', value: 200, color: '#9ca3af' },
];

export default function Analytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tighter uppercase">Analytics</h1>
        <p className="text-gray-500 mt-1">Deep dive into your store's performance metrics.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sales & Orders Area Chart */}
        <div className="lg:col-span-2 bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
          <h3 className="font-bold uppercase tracking-widest text-sm mb-8">Sales vs Orders</h3>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#000000" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#000000" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#000000" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="orders" stroke="#ea580c" strokeWidth={3} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
          <h3 className="font-bold uppercase tracking-widest text-sm mb-8">Category Share</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 space-y-4">
            {categoryData.map((category) => (
              <div key={category.name} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: category.color }} />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{category.name}</span>
                </div>
                <span className="text-sm font-bold">{category.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Conversion Rate Line Chart */}
      <div className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm">
        <h3 className="font-bold uppercase tracking-widest text-sm mb-8">Conversion Rate (%)</h3>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={salesData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9ca3af' }} />
              <Tooltip 
                contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
              />
              <Line type="monotone" dataKey="orders" stroke="#000000" strokeWidth={4} dot={{ r: 6, fill: '#000000', strokeWidth: 2, stroke: '#fff' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
