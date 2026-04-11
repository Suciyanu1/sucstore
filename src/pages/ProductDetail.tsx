import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Star, Heart, ShoppingCart, Truck, ShieldCheck, RotateCcw, Minus, Plus, ChevronRight } from 'lucide-react';
import { products } from '../data/mockData';
import { useCartStore, useWishlistStore } from '../store/useStore';
import { formatPrice, cn } from '../utils/cn';
import ProductCard from '../components/product/ProductCard';
import { motion, AnimatePresence } from 'motion/react';

export default function ProductDetail() {
  const { productSlug } = useParams();
  const navigate = useNavigate();
  const product = products.find(p => p.slug === productSlug);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  
  const addItem = useCartStore((state) => state.addItem);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Product not found</h2>
        <button onClick={() => navigate('/')} className="text-orange-600 font-bold border-b-2 border-orange-600">Back to Home</button>
      </div>
    );
  }

  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    // Check if all variants are selected
    if (product.variants) {
      const allSelected = product.variants.every(v => selectedVariants[v.type]);
      if (!allSelected) {
        alert('Please select all options');
        return;
      }
    }
    
    addItem(
      product, 
      quantity, 
      selectedVariants['size'], 
      selectedVariants['color']
    );
    // Show some feedback
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest mb-12">
        <button onClick={() => navigate('/')} className="hover:text-black">Home</button>
        <ChevronRight size={12} />
        <button onClick={() => navigate(`/category/${product.category}`)} className="hover:text-black">{product.category}</button>
        <ChevronRight size={12} />
        <span className="text-black font-bold">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50 relative">
            <AnimatePresence mode="wait">
              <motion.img 
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                src={product.images[selectedImage]} 
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </AnimatePresence>
            
            {product.isNew && (
              <span className="absolute top-6 left-6 bg-black text-white text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em]">New Arrival</span>
            )}
          </div>
          
          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.map((img, i) => (
                <button 
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={cn(
                    "aspect-square rounded-xl overflow-hidden border-2 transition-all",
                    selectedImage === i ? "border-black" : "border-transparent opacity-60 hover:opacity-100"
                  )}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={cn(
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-200"
                    )} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-400 font-medium">({product.reviewsCount} reviews)</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tighter mb-4">{product.name}</h1>
            
            <div className="flex items-center gap-4 mb-6">
              <span className="text-3xl font-bold text-black">{formatPrice(product.price)}</span>
              {product.oldPrice && (
                <>
                  <span className="text-xl text-gray-400 line-through">{formatPrice(product.oldPrice)}</span>
                  <span className="bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full">
                    SAVE {formatPrice(product.oldPrice - product.price)}
                  </span>
                </>
              )}
            </div>
            
            <p className="text-gray-500 leading-relaxed text-lg">
              {product.description}
            </p>
          </div>

          {/* Variants */}
          {product.variants?.map((variant) => (
            <div key={variant.type} className="mb-8">
              <h4 className="text-sm font-bold uppercase tracking-widest mb-4">Select {variant.type}</h4>
              <div className="flex flex-wrap gap-3">
                {variant.options.map((option) => (
                  <button
                    key={option}
                    onClick={() => setSelectedVariants(prev => ({ ...prev, [variant.type]: option }))}
                    className={cn(
                      "px-6 py-2 rounded-full border-2 text-sm font-bold transition-all",
                      selectedVariants[variant.type] === option 
                        ? "border-black bg-black text-white" 
                        : "border-gray-100 hover:border-gray-300"
                    )}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}

          {/* Quantity & Actions */}
          <div className="space-y-6 mt-auto">
            <div className="flex items-center gap-6">
              <div className="flex items-center border-2 border-gray-100 rounded-full px-2 py-1">
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="p-2 hover:text-orange-600 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => q + 1)}
                  className="p-2 hover:text-orange-600 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
              
              <div className="flex-1 flex gap-4">
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-black text-white rounded-full py-4 font-bold flex items-center justify-center gap-3 hover:bg-orange-600 transition-all duration-300 shadow-xl shadow-gray-200"
                >
                  <ShoppingCart size={20} /> Add to Cart
                </button>
                <button 
                  onClick={() => isWishlisted ? removeFromWishlist(product.id) : addToWishlist(product)}
                  className={cn(
                    "w-14 h-14 rounded-full flex items-center justify-center border-2 transition-all duration-300",
                    isWishlisted ? "bg-red-500 border-red-500 text-white" : "border-gray-100 text-gray-400 hover:border-black hover:text-black"
                  )}
                >
                  <Heart size={24} fill={isWishlisted ? "currentColor" : "none"} />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-100">
              <div className="flex flex-col items-center text-center gap-2">
                <Truck size={20} className="text-gray-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">Free Delivery</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <ShieldCheck size={20} className="text-gray-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">2 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2">
                <RotateCcw size={20} className="text-gray-400" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">60 Day Returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2 block">You might also like</span>
              <h2 className="text-4xl font-bold tracking-tighter">RELATED PRODUCTS</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
