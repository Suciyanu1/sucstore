import React, { useState } from 'react';
import { Truck, Plus, Trash2 } from 'lucide-react';
import { cn } from '../utils/cn';

export default function DashboardShipping() {
  const [enableFee, setEnableFee] = useState(true);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold tracking-tighter uppercase">Shipping</h1>
        <p className="text-gray-500 mt-1">Configure shipping rates and delivery zones.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* General Settings */}
          <section className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center justify-between border-b border-gray-50 pb-6">
              <h3 className="font-bold uppercase tracking-widest text-sm">General Settings</h3>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Enable Shipping Fee</span>
                <button 
                  onClick={() => setEnableFee(!enableFee)}
                  className={cn(
                    "relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none",
                    enableFee ? "bg-black" : "bg-gray-200"
                  )}
                >
                  <span className={cn(
                    "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                    enableFee ? "translate-x-6" : "translate-x-1"
                  )} />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Flat Rate (₦)</label>
                <input 
                  type="number" 
                  disabled={!enableFee}
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none disabled:opacity-50" 
                  placeholder="2500"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Free Shipping Threshold (₦)</label>
                <input 
                  type="number" 
                  className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" 
                  placeholder="500000"
                />
              </div>
            </div>
          </section>

          {/* Delivery Zones */}
          <section className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
            <div className="flex items-center justify-between border-b border-gray-50 pb-6">
              <h3 className="font-bold uppercase tracking-widest text-sm">Delivery Zones</h3>
              <button className="text-xs font-bold text-orange-600 hover:text-black transition-colors uppercase tracking-widest flex items-center gap-2">
                <Plus size={14} /> Add Zone
              </button>
            </div>
            
            <div className="space-y-4">
              {[
                { name: 'Lagos State', rate: '₦2,500', time: '1-2 Days' },
                { name: 'Other States', rate: '₦5,000', time: '3-5 Days' },
                { name: 'International', rate: 'Calculated', time: '7-14 Days' },
              ].map((zone) => (
                <div key={zone.name} className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-400">
                      <Truck size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{zone.name}</h4>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">{zone.time}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <span className="font-bold text-sm">{zone.rate}</span>
                    <button className="text-gray-400 hover:text-red-600 transition-colors opacity-0 group-hover:opacity-100">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Preview */}
        <div className="lg:col-span-1">
          <div className="bg-black text-white p-10 rounded-[40px] shadow-2xl shadow-gray-200 space-y-8 sticky top-32">
            <h3 className="font-bold uppercase tracking-widest text-xs text-gray-400">Checkout Preview</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Subtotal</span>
                <span className="font-bold">₦125,000.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Shipping</span>
                <span className="font-bold text-orange-600">₦2,500.00</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                <span className="text-lg font-bold">Total</span>
                <span className="text-2xl font-bold">₦127,500.00</span>
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[10px] text-gray-400 leading-relaxed italic">
                "Customers in Lagos will see a ₦2,500 flat rate for orders below ₦500,000."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
