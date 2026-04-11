import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Package, Truck, CheckCircle2, MapPin, Clock } from 'lucide-react';
import { cn } from '../utils/cn';

export default function TrackOrder() {
  const [searchParams] = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get('id') || '');
  const [email, setEmail] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [orderData, setOrderData] = useState<any>(null);

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderId || !email) return;
    
    setIsSearching(true);
    // Simulate API call
    setTimeout(() => {
      setOrderData({
        id: orderId,
        status: 'shipped',
        date: 'April 10, 2026',
        items: 3,
        total: 542.50,
        steps: [
          { title: 'Order Placed', date: 'April 10, 2026 • 09:15 AM', completed: true },
          { title: 'Processing', date: 'April 10, 2026 • 11:30 AM', completed: true },
          { title: 'Shipped', date: 'April 11, 2026 • 02:45 PM', completed: true, current: true },
          { title: 'Out for Delivery', date: 'Estimated: April 13, 2026', completed: false },
          { title: 'Delivered', date: 'Estimated: April 13, 2026', completed: false }
        ]
      });
      setIsSearching(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold tracking-tighter mb-4 uppercase">Track Your Order</h1>
        <p className="text-gray-500 max-w-md mx-auto">
          Enter your order number and email address to see the current status of your shipment.
        </p>
      </div>

      <div className="bg-white border-2 border-gray-100 rounded-[40px] p-8 sm:p-12 shadow-2xl shadow-gray-100 mb-16">
        <form onSubmit={handleTrack} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block ml-4">Order ID</label>
            <input 
              required
              type="text" 
              placeholder="SW-XXXXXXXXX"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none font-bold"
            />
          </div>
          <div className="md:col-span-1">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2 block ml-4">Email Address</label>
            <input 
              required
              type="email" 
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none font-bold"
            />
          </div>
          <div className="md:col-span-1 flex items-end">
            <button 
              disabled={isSearching}
              className="w-full bg-black text-white rounded-2xl py-4 font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2"
            >
              {isSearching ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Track Order <Search size={18} /></>
              )}
            </button>
          </div>
        </form>
      </div>

      {orderData && (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
          {/* Status Overview */}
          <div className="flex flex-wrap items-center justify-between gap-8 pb-12 border-b border-gray-100">
            <div className="flex items-center gap-6">
              <div className="w-20 h-20 bg-orange-100 text-orange-600 rounded-3xl flex items-center justify-center">
                <Truck size={40} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Current Status</p>
                <h3 className="text-3xl font-bold uppercase tracking-tighter">In Transit</h3>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Estimated Arrival</p>
              <h3 className="text-3xl font-bold uppercase tracking-tighter">April 13, 2026</h3>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative pl-8 space-y-12 before:absolute before:left-0 before:top-2 before:bottom-2 before:w-0.5 before:bg-gray-100">
            {orderData.steps.map((step: any, i: number) => (
              <div key={i} className="relative">
                <div className={cn(
                  "absolute -left-10 w-4 h-4 rounded-full border-4 border-white z-10",
                  step.completed ? "bg-black" : "bg-gray-200"
                )} />
                {step.current && (
                  <div className="absolute -left-12 w-8 h-8 bg-black/10 rounded-full animate-ping" />
                )}
                
                <div className={cn(
                  "transition-all duration-500",
                  step.completed ? "opacity-100" : "opacity-40"
                )}>
                  <h4 className="font-bold text-lg mb-1">{step.title}</h4>
                  <p className="text-sm text-gray-500">{step.date}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 pt-12 border-t border-gray-100">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Shipping Address</p>
                <p className="text-sm font-bold">123 Commerce St, Suite 100<br />New York, NY 10001</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-400">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1">Latest Update</p>
                <p className="text-sm font-bold">Arrived at regional distribution center in New York, NY.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
