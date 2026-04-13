import { Link } from 'react-router-dom';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { motion } from 'motion/react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <div className="max-w-2xl w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-[12rem] sm:text-[16rem] font-black leading-none tracking-tighter text-gray-100 select-none">
            404
          </span>
          
          <div className="relative -mt-20 sm:-mt-32">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight mb-6">Lost in the collection?</h1>
            <p className="text-gray-500 text-lg mb-12 max-w-md mx-auto">
              The page you're looking for doesn't exist or has been moved to another category.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/" 
                className="w-full sm:w-auto bg-black text-white px-10 py-5 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-gray-200"
              >
                <Home size={20} /> Back to Home
              </Link>
              <Link 
                to="/search" 
                className="w-full sm:w-auto bg-white border-2 border-gray-100 text-black px-10 py-5 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-gray-50 transition-all"
              >
                <Search size={20} /> Search Products
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="mt-24 pt-12 border-t border-gray-100">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">Popular Categories</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['Electronics', 'Fashion', 'Home', 'Beauty'].map(cat => (
              <Link 
                key={cat}
                to={`/category/${cat.toLowerCase()}`}
                className="px-6 py-2 rounded-full bg-gray-50 text-sm font-bold hover:bg-black hover:text-white transition-all"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
