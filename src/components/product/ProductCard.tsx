import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '../../data/mockData';
import { useCartStore, useWishlistStore } from '../../store/useStore';
import { formatPrice } from '../../utils/cn';
import { cn } from '../../utils/cn';
import { motion } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  
  const isWishlisted = isInWishlist(product.id);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link to={`/product/${product.slug}`} className="block">
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-gray-50 p-6">
          <img 
            src={product.images[0]} 
            alt={product.name}
            className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-black text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">New</span>
            )}
            {product.oldPrice && (
              <span className="bg-orange-600 text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
              </span>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
            <button 
              onClick={toggleWishlist}
              className={cn(
                "w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-colors",
                isWishlisted ? "bg-red-500 text-white" : "bg-white text-gray-600 hover:text-black"
              )}
            >
              <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
            </button>
            <button 
              onClick={handleAddToCart}
              className="w-10 h-10 bg-white text-gray-600 hover:text-black rounded-full flex items-center justify-center shadow-lg transition-colors"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-400 uppercase tracking-widest">{product.category}</span>
            <div className="flex items-center gap-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              <span className="text-xs font-medium">{product.rating}</span>
            </div>
          </div>
          <h3 className="text-sm font-bold text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors">{product.name}</h3>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-bold text-black">{formatPrice(product.price)}</span>
            {product.oldPrice && (
              <span className="text-sm text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
