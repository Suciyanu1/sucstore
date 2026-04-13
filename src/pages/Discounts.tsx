import React from 'react';
import { Plus, Tag, Trash2, Edit2 } from 'lucide-react';
import { formatPrice } from '../utils/cn';

const mockDiscounts = [
  { id: 1, code: 'WELCOME20', type: 'Percentage', value: '20%', status: 'Active', usage: '142/500', expiry: 'Dec 31, 2024' },
  { id: 2, code: 'SUMMER50', type: 'Fixed Amount', value: '₦5,000', status: 'Active', usage: '89/200', expiry: 'Aug 31, 2024' },
  { id: 3, code: 'FREESHIP', type: 'Free Shipping', value: '100%', status: 'Expired', usage: '200/200', expiry: 'Mar 01, 2024' },
];

export default function Discounts() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter uppercase">Discounts</h1>
          <p className="text-gray-500 mt-1">Create and manage promotional codes.</p>
        </div>
        <button className="bg-black text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-gray-200">
          <Plus size={20} /> Create Code
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Create Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-6 sticky top-32">
            <h3 className="font-bold uppercase tracking-widest text-sm border-b border-gray-50 pb-4">New Discount</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Code</label>
                <input type="text" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" placeholder="e.g. SAVE10" />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Type</label>
                <select className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none">
                  <option>Percentage</option>
                  <option>Fixed Amount</option>
                  <option>Free Shipping</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Value</label>
                <input type="number" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" placeholder="0" />
              </div>
              <button className="w-full bg-black text-white py-4 rounded-full font-bold hover:bg-orange-600 transition-all mt-4">
                Generate Discount
              </button>
            </div>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50">
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Code</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Value</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Usage</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Status</th>
                  <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {mockDiscounts.map((discount) => (
                  <tr key={discount.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-8 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-600 flex items-center justify-center">
                          <Tag size={16} />
                        </div>
                        <span className="font-bold text-sm">{discount.code}</span>
                      </div>
                    </td>
                    <td className="px-8 py-4 text-sm font-medium">{discount.value}</td>
                    <td className="px-8 py-4 text-xs text-gray-500">{discount.usage}</td>
                    <td className="px-8 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                        discount.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                      }`}>
                        {discount.status}
                      </span>
                    </td>
                    <td className="px-8 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-black transition-all shadow-sm">
                          <Edit2 size={14} />
                        </button>
                        <button className="p-2 hover:bg-red-50 rounded-xl text-gray-400 hover:text-red-600 transition-all shadow-sm">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
