import React from 'react';
import { Plus, Image as ImageIcon, Trash2, ExternalLink } from 'lucide-react';

const mockBanners = [
  { id: 1, title: 'Summer Collection', position: 'Homepage Hero', status: 'Active', image: 'https://picsum.photos/seed/fashion/800/400' },
  { id: 2, title: 'Flash Sale', position: 'Category Sidebar', status: 'Scheduled', image: 'https://picsum.photos/seed/tech/800/400' },
];

export default function Banners() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter uppercase">Banners</h1>
          <p className="text-gray-500 mt-1">Manage promotional banners and advertisements.</p>
        </div>
        <button className="bg-black text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-gray-200">
          <Plus size={20} /> Add Banner
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mockBanners.map((banner) => (
          <div key={banner.id} className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden group">
            <div className="aspect-[2/1] relative overflow-hidden">
              <img src={banner.image} alt={banner.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" referrerPolicy="no-referrer" />
              <div className="absolute top-4 left-4">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                  banner.status === 'Active' ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'
                }`}>
                  {banner.status}
                </span>
              </div>
            </div>
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-bold text-lg">{banner.title}</h3>
                  <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mt-1">{banner.position}</p>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-50 rounded-xl text-gray-400 hover:text-black transition-all">
                    <ExternalLink size={18} />
                  </button>
                  <button className="p-2 hover:bg-red-50 rounded-xl text-gray-400 hover:text-red-600 transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <button className="w-full py-3 rounded-2xl border border-gray-100 text-sm font-bold hover:bg-gray-50 transition-colors">
                Edit Banner
              </button>
            </div>
          </div>
        ))}
        
        {/* Add New Placeholder */}
        <button className="aspect-[2/1] md:aspect-auto rounded-[40px] border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all group">
          <div className="w-16 h-16 rounded-3xl bg-gray-50 flex items-center justify-center mb-4 group-hover:bg-black group-hover:text-white transition-all">
            <Plus size={32} />
          </div>
          <p className="font-bold uppercase tracking-widest text-sm">Create New Banner</p>
        </button>
      </div>
    </div>
  );
}
