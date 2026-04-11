import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useCartStore, useWishlistStore } from '../../store/useStore';
import { categories } from '../../data/mockData';
import { cn } from '../../utils/cn';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const cartCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled ? "bg-white/80 backdrop-blur-md shadow-sm py-3" : "bg-transparent py-5"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-black transition-colors"
            onClick={() => setIsMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold tracking-tighter text-black">SWIFT<span className="text-orange-600">SHOP</span></span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {categories.map((category) => (
              <div key={category.id} className="group relative py-2">
                <Link
                  to={`/category/${category.slug}`}
                  className="text-sm font-medium text-gray-700 hover:text-black flex items-center gap-1 transition-colors"
                >
                  {category.name}
                  <ChevronDown size={14} className="group-hover:rotate-180 transition-transform duration-300" />
                </Link>

                {/* Dropdown */}
                <div className="absolute top-full left-0 w-48 bg-white shadow-xl rounded-xl py-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 border border-gray-100">
                  {category.subCategories.map((sub) => (
                    <Link
                      key={sub.slug}
                      to={`/category/${category.slug}/${sub.slug}`}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition-colors"
                    >
                      {sub.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            <button
              className="p-2 text-gray-600 hover:text-black transition-colors"
              onClick={() => setIsSearchOpen(true)}
            >
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="p-2 text-gray-600 hover:text-black transition-colors relative">
              <Heart size={20} />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {wishlistCount}
                </span>
              )}
            </Link>
            <Link to="/cart" className="p-2 text-gray-600 hover:text-black transition-colors relative">
              <ShoppingCart size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 bg-orange-600 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <div className={cn(
        "fixed inset-0 bg-black/50 z-[60] transition-opacity duration-300 lg:hidden",
        isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )} onClick={() => setIsMenuOpen(false)}>
        <div
          className={cn(
            "fixed inset-y-0 left-0 w-full max-w-xs bg-white shadow-2xl transition-transform duration-300 transform",
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="p-6 flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <span className="text-xl font-bold tracking-tighter">SWIFTSHOP</span>
              <button onClick={() => setIsMenuOpen(false)} className="p-2">
                <X size={24} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              {categories.map((category) => (
                <div key={category.id} className="mb-6">
                  <Link
                    to={`/category/${category.slug}`}
                    className="text-lg font-bold mb-3 block"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                  <div className="space-y-2 pl-4 border-l border-gray-100">
                    {category.subCategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        to={`/category/${category.slug}/${sub.slug}`}
                        className="block text-gray-600 py-1"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 border-top border-gray-100 mt-auto">
              <Link to="/track-order" className="text-sm text-gray-500 hover:text-black block py-2" onClick={() => setIsMenuOpen(false)}>Track Order</Link>
              <Link to="/about" className="text-sm text-gray-500 hover:text-black block py-2" onClick={() => setIsMenuOpen(false)}>About Us</Link>
            </div>
          </div>
        </div>
      </div>

      {/* Search Overlay */}
      <div className={cn(
        "fixed inset-0 bg-white z-[70] transition-all duration-500 flex flex-col",
        isSearchOpen ? "opacity-100 visible" : "opacity-0 invisible"
      )}>
        <div className="max-w-3xl mx-auto w-full px-4 pt-20">
          <div className="flex justify-end mb-8">
            <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:rotate-90 transition-transform duration-300">
              <X size={32} />
            </button>
          </div>
          <form onSubmit={handleSearch} className="relative">
            <input
              type="text"
              placeholder="Search for products, brands..."
              className="w-full text-3xl sm:text-5xl font-light border-b-2 border-gray-100 py-4 focus:outline-none focus:border-black transition-colors"
              autoFocus={isSearchOpen}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-0 bottom-6 p-2">
              <Search size={32} />
            </button>
          </form>
          <div className="mt-12">
            <p className="text-sm text-gray-400 uppercase tracking-widest mb-4">Popular Categories</p>
            <div className="flex flex-wrap gap-3">
              {categories.map(cat => (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className="px-6 py-2 rounded-full border border-gray-200 hover:border-black transition-colors"
                  onClick={() => setIsSearchOpen(false)}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
