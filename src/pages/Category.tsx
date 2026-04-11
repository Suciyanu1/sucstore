import { useParams, Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import { Filter, ChevronDown, SlidersHorizontal } from 'lucide-react';
import { products, categories } from '../data/mockData';
import ProductCard from '../components/product/ProductCard';
import { cn } from '../utils/cn';

export default function Category() {
  const { categorySlug, subCategorySlug } = useParams();
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  
  const category = categories.find(c => c.slug === categorySlug);
  
  const filteredProducts = useMemo(() => {
    let result = products.filter(p => p.category === categorySlug);
    
    if (subCategorySlug) {
      result = result.filter(p => p.subCategory === subCategorySlug);
    }
    
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortBy === 'rating') result.sort((a, b) => b.rating - a.rating);
    
    return result;
  }, [categorySlug, subCategorySlug, sortBy, priceRange]);

  if (!category) return null;

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="relative h-[40vh] flex items-center justify-center overflow-hidden mb-12">
        <img 
          src={category.image} 
          alt={category.name} 
          className="absolute inset-0 w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        <div className="relative z-10 text-center text-white">
          <h1 className="text-6xl sm:text-8xl font-bold tracking-tighter uppercase mb-4">{category.name}</h1>
          <p className="text-lg text-white/70 max-w-lg mx-auto">
            Discover our premium collection of {category.name.toLowerCase()} products.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subcategories Nav */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          <Link 
            to={`/category/${categorySlug}`}
            className={cn(
              "px-8 py-3 rounded-full border-2 font-bold transition-all",
              !subCategorySlug ? "bg-black border-black text-white" : "border-gray-100 hover:border-gray-300"
            )}
          >
            All {category.name}
          </Link>
          {category.subCategories.map(sub => (
            <Link 
              key={sub.slug}
              to={`/category/${categorySlug}/${sub.slug}`}
              className={cn(
                "px-8 py-3 rounded-full border-2 font-bold transition-all",
                subCategorySlug === sub.slug ? "bg-black border-black text-white" : "border-gray-100 hover:border-gray-300"
              )}
            >
              {sub.name}
            </Link>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 shrink-0 space-y-10">
            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                <Filter size={16} /> Filters
              </h4>
              
              <div className="space-y-8">
                {/* Price Range */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase mb-4">Price Range</p>
                  <div className="space-y-4">
                    <input 
                      type="range" 
                      min="0" 
                      max="2000" 
                      step="50"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full h-1 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-black"
                    />
                    <div className="flex justify-between text-sm font-bold">
                      <span>$0</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Sort */}
                <div>
                  <p className="text-xs font-bold text-gray-400 uppercase mb-4">Sort By</p>
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full bg-gray-50 border-none rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-black outline-none"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-sm text-gray-500 font-medium">Showing <span className="text-black font-bold">{filteredProducts.length}</span> products</p>
              <button className="lg:hidden flex items-center gap-2 text-sm font-bold">
                <SlidersHorizontal size={18} /> Filters
              </button>
            </div>

            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center bg-gray-50 rounded-[40px]">
                <p className="text-gray-400 mb-4">No products found matching your filters.</p>
                <button 
                  onClick={() => {
                    setPriceRange([0, 2000]);
                    setSortBy('newest');
                  }}
                  className="text-black font-bold border-b-2 border-black"
                >
                  Reset all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
