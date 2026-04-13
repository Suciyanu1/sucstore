import React, { useState } from 'react';
import { Truck, Plus, Trash2, Edit2, Save, X as CloseIcon } from 'lucide-react';
import { cn } from '../utils/cn';

const INITIAL_STATES = [
  { name: 'Lagos', rate: 1500 },
  { name: 'Oyo', rate: 1500 },
  { name: 'Ogun', rate: 1500 },
  { name: 'FCT', rate: 2500 },
  { name: 'Rivers', rate: 3000 },
];

export default function DashboardShipping() {
  const [enableFee, setEnableFee] = useState(true);
  const [states, setStates] = useState(INITIAL_STATES);
  const [editingState, setEditingState] = useState<string | null>(null);
  const [editRate, setEditRate] = useState<number>(0);

  const handleEdit = (name: string, rate: number) => {
    setEditingState(name);
    setEditRate(rate);
  };

  const handleSave = () => {
    setStates(states.map(s => s.name === editingState ? { ...s, rate: editRate } : s));
    setEditingState(null);
  };

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
                <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Default Flat Rate (₦)</label>
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
              <h3 className="font-bold uppercase tracking-widest text-sm">State-based Rates</h3>
              <button className="text-xs font-bold text-orange-600 hover:text-black transition-colors uppercase tracking-widest flex items-center gap-2">
                <Plus size={14} /> Add State
              </button>
            </div>
            
            <div className="space-y-4">
              {states.map((state) => (
                <div key={state.name} className="flex items-center justify-between p-6 bg-gray-50 rounded-3xl group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-gray-400">
                      <Truck size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-sm">{state.name}</h4>
                      <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Standard Delivery</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    {editingState === state.name ? (
                      <div className="flex items-center gap-2">
                        <input 
                          type="number" 
                          value={editRate}
                          onChange={(e) => setEditRate(parseInt(e.target.value))}
                          className="w-24 bg-white border-none rounded-lg px-3 py-1 text-sm font-bold focus:ring-2 focus:ring-black outline-none"
                        />
                        <button onClick={handleSave} className="p-2 bg-black text-white rounded-lg hover:bg-orange-600 transition-all">
                          <Save size={14} />
                        </button>
                        <button onClick={() => setEditingState(null)} className="p-2 bg-white text-gray-400 rounded-lg hover:text-black transition-all">
                          <CloseIcon size={14} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <span className="font-bold text-sm">₦{state.rate.toLocaleString()}</span>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button onClick={() => handleEdit(state.name, state.rate)} className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-black transition-all shadow-sm">
                            <Edit2 size={14} />
                          </button>
                          <button className="p-2 hover:bg-red-50 rounded-xl text-gray-400 hover:text-red-600 transition-all shadow-sm">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Preview */}
        <div className="lg:col-span-1">
          <div className="bg-black text-white p-10 rounded-[40px] shadow-2xl shadow-gray-200 space-y-8 sticky top-32">
            <h3 className="font-bold uppercase tracking-widest text-xs text-gray-400">Admin Insights</h3>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Avg. Shipping Cost</span>
                <span className="font-bold">₦2,400.00</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Most Active Zone</span>
                <span className="font-bold text-orange-600">Lagos</span>
              </div>
            </div>
            <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
              <p className="text-[10px] text-gray-400 leading-relaxed italic">
                "Rates set here will be automatically applied at checkout based on the customer's selected state."
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
