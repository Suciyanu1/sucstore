import React, { useState } from 'react';
import { Plus, Search, Filter, MoreVertical, Edit2, Trash2, Eye } from 'lucide-react';
import { products } from '../data/mockData';
import { formatPrice, cn } from '../utils/cn';
import { useNavigate } from 'react-router-dom';

export default function DashboardProducts() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter uppercase">Products</h1>
          <p className="text-gray-500 mt-1">Manage your product catalog and variants.</p>
        </div>
        <button 
          onClick={() => navigate('/dashboard/products/add')}
          className="bg-black text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-gray-200"
        >
          <Plus size={20} /> Add Product
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-[32px] border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
            <Search size={18} />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-3 text-sm focus:ring-2 focus:ring-black outline-none transition-all"
          />
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-6 py-3 bg-gray-50 text-gray-500 rounded-2xl font-bold text-sm hover:text-black transition-colors">
            <Filter size={18} /> Filters
          </button>
          <select className="bg-gray-50 border-none rounded-2xl px-6 py-3 text-sm font-bold outline-none">
            <option>All Categories</option>
            <option>Electronics</option>
            <option>Fashion</option>
            <option>Home & Living</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Product</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Category</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Price</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Stock</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-50 shrink-0 border border-gray-100">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <p className="font-bold text-sm line-clamp-1">{product.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">{product.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{product.category}</span>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{formatPrice(product.price)}</span>
                      {product.oldPrice && (
                        <span className="text-[10px] text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
                      )}
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        product.stock > 20 ? "bg-green-500" : product.stock > 0 ? "bg-yellow-500" : "bg-red-500"
                      )} />
                      <span className="text-sm font-medium">{product.stock} in stock</span>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      product.stock > 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"
                    )}>
                      {product.stock > 0 ? 'Active' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-black transition-all shadow-sm">
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => navigate(`/dashboard/products/edit/${product.id}`)}
                        className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-black transition-all shadow-sm"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button className="p-2 hover:bg-red-50 rounded-xl text-gray-400 hover:text-red-600 transition-all shadow-sm">
                        <Trash2 size={16} />
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
  );
}
