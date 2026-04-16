import React from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/mockData';
import { cn } from '../utils/cn';

export default function Inventory() {
  const navigate = useNavigate();
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tighter uppercase">Inventory</h1>
        <p className="text-gray-500 mt-1">Monitor your stock levels and availability.</p>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50/50">
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Product</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">SKU</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Stock Level</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Status</th>
                <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 shrink-0">
                        <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <span className="font-bold text-sm line-clamp-1">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-xs font-mono text-gray-400">{product.slug.toUpperCase()}</td>
                  <td className="px-8 py-4">
                    <div className="flex flex-col gap-1.5 w-32">
                      <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                        <span>{product.stock} units</span>
                        <span className="text-gray-400">100 max</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            product.stock > 50 ? "bg-green-500" : product.stock > 20 ? "bg-yellow-500" : "bg-red-500"
                          )}
                          style={{ width: `${Math.min(product.stock, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <span className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest",
                      product.stock > 20 ? "bg-green-50 text-green-600" : 
                      product.stock > 0 ? "bg-yellow-50 text-yellow-600" : 
                      "bg-red-50 text-red-600"
                    )}>
                      {product.stock > 20 ? 'In Stock' : product.stock > 0 ? 'Low Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-right">
                    <button 
                      onClick={() => navigate(`/dashboard/products/edit/${product.id}`)}
                      className="text-xs font-bold text-orange-600 hover:text-black transition-colors uppercase tracking-widest"
                    >
                      Update
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
