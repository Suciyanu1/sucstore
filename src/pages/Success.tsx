import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Package, Truck, Calendar } from 'lucide-react';
import { motion } from 'motion/react';

export default function Success() {
  const orderId = "SW-" + Math.random().toString(36).substr(2, 9).toUpperCase();

  return (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", damping: 12 }}
        className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8"
      >
        <CheckCircle2 size={48} />
      </motion.div>
      
      <h1 className="text-5xl font-bold tracking-tighter mb-4 uppercase">Order Confirmed!</h1>
      <p className="text-gray-500 text-lg mb-12 max-w-md mx-auto">
        Thank you for your purchase. We've received your order and we're getting it ready for shipment.
      </p>

      <div className="bg-gray-50 rounded-[40px] p-10 mb-12 text-left">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Order Number</p>
            <p className="text-xl font-bold">{orderId}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Estimated Delivery</p>
            <p className="text-xl font-bold">April 15 - 17, 2026</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Shipping Method</p>
            <p className="text-xl font-bold">Express Delivery</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Payment Status</p>
            <p className="text-xl font-bold text-green-600">Paid</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link to={`/track-order?id=${orderId}`} className="bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-orange-600 transition-all flex items-center justify-center gap-2">
          Track Your Order <Package size={20} />
        </Link>
        <Link to="/" className="bg-white border-2 border-gray-100 text-black px-10 py-4 rounded-full font-bold hover:border-black transition-all">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
