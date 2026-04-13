import React from 'react';
import { Save, Globe, CreditCard, Bell, Shield, Mail } from 'lucide-react';

export default function Settings() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter uppercase">Settings</h1>
          <p className="text-gray-500 mt-1">Configure your store's global preferences.</p>
        </div>
        <button className="bg-black text-white px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-gray-200">
          <Save size={20} /> Save Changes
        </button>
      </div>

      <div className="space-y-8">
        {/* Store Info */}
        <section className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
              <Globe size={20} />
            </div>
            <h3 className="font-bold uppercase tracking-widest text-sm">Store Information</h3>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Store Name</label>
              <input type="text" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" placeholder="SwiftShop Luxe" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Support Email</label>
              <input type="email" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" placeholder="hello@swiftshop.com" />
            </div>
            <div className="sm:col-span-2 space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Store Address</label>
              <textarea rows={3} className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none resize-none" placeholder="123 Commerce St, Victoria Island, Lagos" />
            </div>
          </div>
        </section>

        {/* Payment Settings */}
        <section className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
              <CreditCard size={20} />
            </div>
            <h3 className="font-bold uppercase tracking-widest text-sm">Payment Methods</h3>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Paystack', status: 'Connected', icon: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Paystack_Logo.png' },
              { name: 'Flutterwave', status: 'Disconnected', icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Flutterwave_Logo.png/1200px-Flutterwave_Logo.png' },
              { name: 'Bank Transfer', status: 'Active', icon: null },
            ].map((method) => (
              <div key={method.name} className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl group">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center overflow-hidden p-2">
                    {method.icon ? <img src={method.icon} alt={method.name} className="w-full h-full object-contain" /> : <CreditCard size={20} className="text-gray-400" />}
                  </div>
                  <h4 className="font-bold text-sm">{method.name}</h4>
                </div>
                <div className="flex items-center gap-6">
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${
                    method.status === 'Connected' || method.status === 'Active' ? 'text-green-600' : 'text-gray-400'
                  }`}>
                    {method.status}
                  </span>
                  <button className="text-xs font-bold text-orange-600 hover:text-black transition-colors uppercase tracking-widest">Configure</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Notification Settings */}
        <section className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
          <div className="flex items-center gap-3 border-b border-gray-50 pb-6">
            <div className="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-gray-400">
              <Bell size={20} />
            </div>
            <h3 className="font-bold uppercase tracking-widest text-sm">Notifications</h3>
          </div>
          <div className="space-y-6">
            {[
              { label: 'Order Confirmation', desc: 'Send email to customer when order is placed' },
              { label: 'Shipment Updates', desc: 'Notify customer when order status changes to shipped' },
              { label: 'Low Stock Alerts', desc: 'Notify manager when stock level falls below threshold' },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm">{item.label}</h4>
                  <p className="text-xs text-gray-400">{item.desc}</p>
                </div>
                <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-black transition-colors focus:outline-none">
                  <span className="inline-block h-4 w-4 transform rounded-full bg-white translate-x-6 transition-transform" />
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
