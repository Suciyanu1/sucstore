import { Link } from 'react-router-dom';
import { Heart, ArrowRight, ShoppingBag } from 'lucide-react';
import { useWishlistStore } from '../store/useStore';
import ProductCard from '../components/product/ProductCard';

export default function Wishlist() {
  const { items } = useWishlistStore();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
        <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8 text-gray-300">
          <Heart size={48} />
        </div>
        <h1 className="text-4xl font-bold tracking-tighter mb-4">YOUR WISHLIST IS EMPTY</h1>
        <p className="text-gray-500 mb-10 max-w-md mx-auto">
          Save items you love to your wishlist and they'll appear here.
        </p>
        <Link to="/" className="inline-flex items-center gap-2 bg-black text-white px-10 py-4 rounded-full font-bold hover:bg-orange-600 transition-all">
          Explore Products <ArrowRight size={20} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold tracking-tighter mb-12 uppercase">My Wishlist ({items.length})</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
