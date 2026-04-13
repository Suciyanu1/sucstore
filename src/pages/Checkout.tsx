import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Lock, CreditCard, Truck, ShieldCheck } from 'lucide-react';
import { useCartStore } from '../store/useStore';
import { formatPrice, cn } from '../utils/cn';

export default function Checkout() {
  const { items, getTotal, clearCart } = useCartStore();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getTotal();
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      clearCart();
      navigate('/success');
    }, 2000);
  };

  if (items.length === 0) {
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
          <h1 className="text-4xl font-bold tracking-tighter mb-12">CHECKOUT</h1>
          
          <form onSubmit={handleSubmit} className="space-y-12">
            {/* Contact Info */}
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-black text-white text-[10px] flex items-center justify-center">1</span>
                Contact Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required type="text" placeholder="First Name" className="w-full bg-gray-50 border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" />
                <input required type="text" placeholder="Last Name" className="w-full bg-gray-50 border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" />
                <input required type="email" placeholder="Email Address" className="w-full bg-gray-50 border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-black outline-none sm:col-span-2" />
              </div>
            </section>

            {/* Shipping Info */}
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-black text-white text-[10px] flex items-center justify-center">2</span>
                Shipping Address
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input required type="text" placeholder="Street Address" className="w-full bg-gray-50 border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-black outline-none sm:col-span-2" />
                <input required type="text" placeholder="City" className="w-full bg-gray-50 border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" />
                <input required type="text" placeholder="Postal Code" className="w-full bg-gray-50 border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" />
                <select required className="w-full bg-gray-50 border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-black outline-none">
                  <option value="NG">Nigeria</option>
                </select>
                <select required className="w-full bg-gray-50 border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-black outline-none">
                  <option value="">Select State</option>
                  <option value="Abia">Abia</option>
                  <option value="Adamawa">Adamawa</option>
                  <option value="Akwa Ibom">Akwa Ibom</option>
                  <option value="Anambra">Anambra</option>
                  <option value="Bauchi">Bauchi</option>
                  <option value="Bayelsa">Bayelsa</option>
                  <option value="Benue">Benue</option>
                  <option value="Borno">Borno</option>
                  <option value="Cross River">Cross River</option>
                  <option value="Delta">Delta</option>
                  <option value="Ebonyi">Ebonyi</option>
                  <option value="Edo">Edo</option>
                  <option value="Ekiti">Ekiti</option>
                  <option value="Enugu">Enugu</option>
                  <option value="Gombe">Gombe</option>
                  <option value="Imo">Imo</option>
                  <option value="Jigawa">Jigawa</option>
                  <option value="Kaduna">Kaduna</option>
                  <option value="Kano">Kano</option>
                  <option value="Katsina">Katsina</option>
                  <option value="Kebbi">Kebbi</option>
                  <option value="Kogi">Kogi</option>
                  <option value="Kwara">Kwara</option>
                  <option value="Lagos">Lagos</option>
                  <option value="Nasarawa">Nasarawa</option>
                  <option value="Niger">Niger</option>
                  <option value="Ogun">Ogun</option>
                  <option value="Ondo">Ondo</option>
                  <option value="Osun">Osun</option>
                  <option value="Oyo">Oyo</option>
                  <option value="Plateau">Plateau</option>
                  <option value="Rivers">Rivers</option>
                  <option value="Sokoto">Sokoto</option>
                  <option value="Taraba">Taraba</option>
                  <option value="Yobe">Yobe</option>
                  <option value="Zamfara">Zamfara</option>
                  <option value="FCT">Federal Capital Territory (FCT)</option>
                </select>
              </div>
            </section>

            {/* Payment Info */}
            <section>
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-black text-white text-[10px] flex items-center justify-center">3</span>
                Payment Method
              </h3>
              <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CreditCard size={20} />
                    <span className="font-bold">Credit Card</span>
                  </div>
                  <div className="flex gap-2 opacity-50">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required type="text" placeholder="Card Number" className="w-full bg-white border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-black outline-none sm:col-span-2" />
                  <input required type="text" placeholder="MM/YY" className="w-full bg-white border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" />
                  <input required type="text" placeholder="CVC" className="w-full bg-white border-none rounded-xl px-6 py-4 focus:ring-2 focus:ring-black outline-none" />
                </div>
              </div>
            </section>

            <button 
              disabled={isProcessing}
              className={cn(
                "w-full bg-black text-white rounded-full py-6 font-bold text-lg flex items-center justify-center gap-3 transition-all duration-300 shadow-2xl shadow-gray-200",
                isProcessing ? "opacity-70 cursor-not-allowed" : "hover:bg-orange-600"
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
            <h2 className="text-xl font-bold mb-8">YOUR ORDER</h2>
            
            <div className="space-y-6 mb-10 max-h-[40vh] overflow-y-auto pr-4 custom-scrollbar">
              {items.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4">
                  <div className="w-20 h-24 rounded-xl overflow-hidden bg-white shrink-0">
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
                <span>Shipping</span>
                <span className="text-black font-bold">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Tax</span>
                <span className="text-black font-bold">{formatPrice(tax)}</span>
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
