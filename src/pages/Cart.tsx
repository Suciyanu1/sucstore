import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Minus, Plus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/useStore';
import { formatPrice, cn } from '../utils/cn';

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-300">
          <ShoppingBag size={48} />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter mb-4">YOUR CART IS EMPTY</h1>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Explore our collections and find something you love.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-orange-600 transition-all">
          Start Shopping <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  const subtotal = getTotal();
  const shipping = subtotal > 500 ? 0 : 25;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold tracking-tighter mb-12">SHOPPING CART ({items.length})</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-8">
          {items.map((item) => (
            <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-6 pb-8 border-b border-gray-100 group">
              <Link to={`/product/${item.slug}`} className="w-32 h-40 rounded-2xl overflow-hidden bg-gray-50 shrink-0">
                <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </Link>
              
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between mb-2">
                  <Link to={`/product/${item.slug}`} className="font-bold text-lg hover:text-orange-600 transition-colors">{item.name}</Link>
                  <button 
                    onClick={() => removeItem(item.id, item.selectedSize, item.selectedColor)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-4 text-xs text-gray-400 uppercase tracking-widest mb-4">
                  {item.selectedSize && <span>Size: <span className="text-black font-bold">{item.selectedSize}</span></span>}
                  {item.selectedColor && <span>Color: <span className="text-black font-bold">{item.selectedColor}</span></span>}
                  <span>Category: <span className="text-black font-bold">{item.category}</span></span>
                </div>

                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center border border-gray-100 rounded-full px-2 py-1">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                      className="p-1.5 hover:text-orange-600 transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                      className="p-1.5 hover:text-orange-600 transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <span className="font-bold text-lg">{formatPrice(item.price * item.quantity)}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-gray-50 rounded-[32px] p-8 sticky top-32">
            <h2 className="text-xl font-bold mb-8">ORDER SUMMARY</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-gray-500">
                <span>Subtotal</span>
                <span className="text-black font-bold">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Estimated Shipping</span>
                <span className="text-black font-bold">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between text-gray-500">
                <span>Estimated Tax (8%)</span>
                <span className="text-black font-bold">{formatPrice(tax)}</span>
              </div>
              <div className="pt-4 border-t border-gray-200 flex justify-between items-end">
                <span className="text-lg font-bold">Total</span>
                <span className="text-3xl font-bold text-orange-600">{formatPrice(total)}</span>
              </div>
            </div>

            <button 
              onClick={() => navigate('/checkout')}
              className="w-full bg-black text-white rounded-full py-5 font-bold hover:bg-orange-600 transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-gray-200"
            >
              Checkout Now <ArrowRight size={20} />
            </button>
            
            <div className="mt-8 space-y-4">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest text-center">We Accept</p>
              <div className="flex justify-center gap-4 opacity-30 grayscale">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="Paypal" className="h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
