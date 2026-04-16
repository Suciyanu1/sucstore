import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Lock, CreditCard, Truck, ShieldCheck, MapPin, Building2, Phone, Upload, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { useCartStore } from '../store/useStore';
import { formatPrice, cn } from '../utils/cn';

const NIGERIAN_STATES = [
  { name: 'Abia', rate: 2500 },
  { name: 'Adamawa', rate: 4500 },
  { name: 'Akwa Ibom', rate: 3000 },
  { name: 'Anambra', rate: 2500 },
  { name: 'Bauchi', rate: 4000 },
  { name: 'Bayelsa', rate: 3500 },
  { name: 'Benue', rate: 3000 },
  { name: 'Borno', rate: 5000 },
  { name: 'Cross River', rate: 3500 },
  { name: 'Delta', rate: 3000 },
  { name: 'Ebonyi', rate: 2500 },
  { name: 'Edo', rate: 2500 },
  { name: 'Ekiti', rate: 2000 },
  { name: 'Enugu', rate: 2500 },
  { name: 'Gombe', rate: 4000 },
  { name: 'Imo', rate: 2500 },
  { name: 'Jigawa', rate: 4500 },
  { name: 'Kaduna', rate: 3500 },
  { name: 'Kano', rate: 3500 },
  { name: 'Katsina', rate: 4000 },
  { name: 'Kebbi', rate: 4500 },
  { name: 'Kogi', rate: 2500 },
  { name: 'Kwara', rate: 2000 },
  { name: 'Lagos', rate: 1500 },
  { name: 'Nasarawa', rate: 2500 },
  { name: 'Niger', rate: 2500 },
  { name: 'Ogun', rate: 1500 },
  { name: 'Ondo', rate: 2000 },
  { name: 'Osun', rate: 2000 },
  { name: 'Oyo', rate: 1500 },
  { name: 'Plateau', rate: 3000 },
  { name: 'Rivers', rate: 3000 },
  { name: 'Sokoto', rate: 4500 },
  { name: 'Taraba', rate: 4500 },
  { name: 'Yobe', rate: 5000 },
  { name: 'Zamfara', rate: 4500 },
  { name: 'FCT', rate: 2500 },
];

export default function Checkout() {
  const { items, getTotal, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingMethod, setShippingMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [selectedState, setSelectedState] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'transfer' | 'pod'>('card');
  const [receipt, setReceipt] = useState<File | null>(null);

  const subtotal = getTotal();
  
  const shippingRate = useMemo(() => {
    if (shippingMethod === 'pickup') return 0;
    const state = NIGERIAN_STATES.find(s => s.name === selectedState);
    return state ? state.rate : 0;
  }, [shippingMethod, selectedState]);

  const total = subtotal + shippingRate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Navigate to success page first
      navigate('/success', { state: { fromCheckout: true } });
      
      // Clear cart after a small delay to ensure navigation has started
      // and the Checkout component is unmounting
      setTimeout(() => {
        clearCart();
        setIsProcessing(false);
      }, 500);
    }, 2000);
  };

  if (items.length === 0 && !isProcessing) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button 
        onClick={() => navigate('/cart')}
        className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-black transition-colors mb-12"
      >
        <ChevronLeft size={16} /> Back to Cart
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Checkout Form */}
        <div>
          <h1 className="text-4xl font-bold tracking-tighter mb-12 uppercase">Checkout</h1>
          
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Contact Info */}
            <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
              <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-black">1</span>
                Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">First Name</label>
                  <input required type="text" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Last Name</label>
                  <input required type="text" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
                  <input required type="email" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Phone Number</label>
                  <input required type="tel" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" placeholder="0801 234 5678" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Other Phone (Optional)</label>
                  <input type="tel" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" placeholder="0901 234 5678" />
                </div>
              </div>
            </section>

            {/* Shipping Method */}
            <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
              <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-black">2</span>
                Shipping Method
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setShippingMethod('delivery')}
                  className={cn(
                    "p-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all",
                    shippingMethod === 'delivery' ? "border-black bg-black text-white" : "border-gray-100 hover:border-gray-200"
                  )}
                >
                  <Truck size={24} />
                  <span className="font-bold text-sm">Delivery</span>
                </button>
                <button 
                  type="button"
                  onClick={() => setShippingMethod('pickup')}
                  className={cn(
                    "p-6 rounded-3xl border-2 flex flex-col items-center gap-3 transition-all",
                    shippingMethod === 'pickup' ? "border-black bg-black text-white" : "border-gray-100 hover:border-gray-200"
                  )}
                >
                  <Building2 size={24} />
                  <span className="font-bold text-sm">Pick up</span>
                </button>
              </div>

              {shippingMethod === 'delivery' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Country</label>
                    <select 
                      required 
                      defaultValue="Nigeria"
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none appearance-none"
                    >
                      <option value="Nigeria">Nigeria</option>
                      <option value="Ghana">Ghana</option>
                      <option value="Kenya">Kenya</option>
                      <option value="South Africa">South Africa</option>
                    </select>
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Street Address</label>
                    <input required type="text" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">State</label>
                    <select 
                      required 
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none"
                    >
                      <option value="">Select State</option>
                      {NIGERIAN_STATES.map(s => (
                        <option key={s.name} value={s.name}>{s.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">City</label>
                    <input required type="text" className="w-full bg-gray-50 border-none rounded-2xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" />
                  </div>
                </div>
              ) : (
                <div className="p-6 bg-orange-50 rounded-3xl border border-orange-100">
                  <div className="flex gap-4">
                    <MapPin className="text-orange-600 shrink-0" size={20} />
                    <div>
                      <h4 className="font-bold text-sm text-orange-900 uppercase tracking-tight">Main Warehouse Pickup</h4>
                      <p className="text-xs text-orange-700 mt-1 leading-relaxed">
                        123 Commerce St, Victoria Island, Lagos.<br />
                        Mon - Fri: 9am - 6pm
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* Payment Method */}
            <section className="bg-white p-8 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
              <h3 className="text-sm font-bold uppercase tracking-widest flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-black text-white text-[10px] flex items-center justify-center font-black">3</span>
                Payment Method
              </h3>
              
              <div className="space-y-4">
                {/* Card Payment */}
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={cn(
                    "w-full p-6 rounded-3xl border-2 flex items-center justify-between transition-all",
                    paymentMethod === 'card' ? "border-black bg-black text-white" : "border-gray-100 hover:border-gray-200"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <CreditCard size={20} />
                    <span className="font-bold text-sm">Pay with Card (Paystack/Flutterwave)</span>
                  </div>
                  <div className="flex gap-2">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3 invert brightness-0" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
                  </div>
                </button>

                {/* Bank Transfer */}
                <div className="space-y-4">
                  <button 
                    type="button"
                    onClick={() => setPaymentMethod('transfer')}
                    className={cn(
                      "w-full p-6 rounded-3xl border-2 flex items-center gap-4 transition-all",
                      paymentMethod === 'transfer' ? "border-black bg-black text-white" : "border-gray-100 hover:border-gray-200"
                    )}
                  >
                    <Building2 size={20} />
                    <span className="font-bold text-sm">Bank Transfer</span>
                  </button>

                  {paymentMethod === 'transfer' && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-8 bg-gray-50 rounded-[32px] border border-gray-100 space-y-6"
                    >
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Bank Name</span>
                          <span className="font-bold">Access Bank</span>
                        </div>
                        <div className="flex justify-between items-center pb-4 border-b border-gray-200">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Account Number</span>
                          <span className="font-bold tracking-wider">0123456789</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Account Name</span>
                          <span className="font-bold">sucstore Luxe Ltd</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Upload Payment Receipt</label>
                        <div className="relative">
                          <input 
                            type="file" 
                            accept="image/*"
                            onChange={(e) => setReceipt(e.target.files?.[0] || null)}
                            className="hidden" 
                            id="receipt-upload"
                          />
                          <label 
                            htmlFor="receipt-upload"
                            className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-200 rounded-2xl hover:border-black transition-all cursor-pointer bg-white group"
                          >
                            {receipt ? (
                              <div className="flex items-center gap-2 text-green-600">
                                <CheckCircle2 size={20} />
                                <span className="font-bold text-sm">{receipt.name}</span>
                              </div>
                            ) : (
                              <>
                                <Upload className="text-gray-400 group-hover:-translate-y-1 transition-transform mb-2" size={24} />
                                <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Click to upload receipt</span>
                              </>
                            )}
                          </label>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Payment on Delivery */}
                <button 
                  type="button"
                  onClick={() => setPaymentMethod('pod')}
                  className={cn(
                    "w-full p-6 rounded-3xl border-2 flex items-center gap-4 transition-all",
                    paymentMethod === 'pod' ? "border-black bg-black text-white" : "border-gray-100 hover:border-gray-200"
                  )}
                >
                  <Phone size={20} />
                  <span className="font-bold text-sm">Payment on Delivery</span>
                </button>
              </div>
            </section>

            <button 
              disabled={isProcessing || (paymentMethod === 'transfer' && !receipt)}
              className={cn(
                "w-full bg-black text-white rounded-full py-6 font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl shadow-gray-200",
                (isProcessing || (paymentMethod === 'transfer' && !receipt)) ? "opacity-70 cursor-not-allowed" : "hover:bg-orange-600"
              )}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Lock size={20} /> Pay {formatPrice(total)}
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:pl-16">
          <div className="bg-gray-50 rounded-[40px] p-10 sticky top-32">
            <h2 className="text-xl font-bold mb-8 uppercase tracking-tighter">Your Order</h2>
            
            <div className="space-y-6 mb-10 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                  <div className="w-20 h-24 rounded-2xl overflow-hidden bg-white shrink-0 border border-gray-100">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="font-bold text-sm line-clamp-1">{item.name}</h4>
                    <p className="text-xs text-gray-400 mt-1">
                      {item.quantity} × {formatPrice(item.price)}
                      {item.selectedSize && ` • ${item.selectedSize}`}
                    </p>
                  </div>
                  <span className="font-bold text-sm self-center">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4 pt-8 border-t border-gray-200">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Subtotal</span>
                <span className="text-black font-bold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Shipping ({shippingMethod === 'delivery' ? selectedState || 'Select State' : 'Pickup'})</span>
                <span className="text-black font-bold">{shippingRate === 0 ? 'FREE' : formatPrice(shippingRate)}</span>
              </div>
              <div className="pt-6 flex justify-between items-end">
                <span className="text-xl font-bold">Total</span>
                <span className="text-3xl font-bold text-orange-600">{formatPrice(total)}</span>
              </div>
            </div>

            <div className="mt-12 space-y-6">
              <div className="flex items-center gap-4 text-gray-400">
                <Truck size={20} />
                <span className="text-xs font-medium">Estimated delivery: 2-4 business days</span>
              </div>
              <div className="flex items-center gap-4 text-gray-400">
                <ShieldCheck size={20} />
                <span className="text-xs font-medium">Secure SSL encrypted checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
