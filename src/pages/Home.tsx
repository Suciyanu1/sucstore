import { Link } from 'react-router-dom';
import { ArrowRight, Truck, ShieldCheck, Clock, CreditCard } from 'lucide-react';
import { products, categories } from '../data/mockData';
import ProductCard from '../components/product/ProductCard';
import { motion } from 'motion/react';

export default function Home() {
  const featuredProducts = products.filter(p => p.isFeatured);
  const newArrivals = products.filter(p => p.isNew);

  return (
    <div className="space-y-24 pb-24">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/hero/1920/1080" 
            alt="Hero" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl text-white"
          >
            <span className="text-sm font-bold uppercase tracking-[0.3em] mb-6 block text-orange-400">New Collection 2026</span>
            <h1 className="text-6xl sm:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
              ELEVATE YOUR <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-white">LIFESTYLE.</span>
            </h1>
            <p className="text-lg text-gray-200 mb-10 max-w-lg leading-relaxed">
              Discover our curated selection of premium products designed for the modern individual. Quality meets innovation in every piece.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/category/electronics" className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-orange-600 hover:text-white transition-all duration-300 flex items-center gap-2">
                Shop Now <ArrowRight size={20} />
              </Link>
              <Link to="/featured" className="bg-transparent border border-white/30 backdrop-blur-md text-white px-8 py-4 rounded-full font-bold hover:bg-white/10 transition-all duration-300">
                View Lookbook
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: Truck, title: "Free Shipping", desc: "On all orders over $100" },
            { icon: ShieldCheck, title: "Secure Payment", desc: "100% secure payment processing" },
            { icon: Clock, title: "24/7 Support", desc: "Dedicated support anytime" },
            { icon: CreditCard, title: "Easy Returns", desc: "30-day money back guarantee" }
          ].map((feature, i) => (
            <div key={i} className="flex items-center gap-4 p-6 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-xl hover:shadow-gray-100 transition-all duration-300">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-orange-600 shadow-sm">
                <feature.icon size={24} />
              </div>
              <div>
                <h4 className="font-bold text-sm">{feature.title}</h4>
                <p className="text-xs text-gray-500">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 mb-2 block">Categories</span>
            <h2 className="text-4xl font-bold tracking-tighter">SHOP BY CATEGORY</h2>
          </div>
          <Link to="/categories" className="text-sm font-bold border-b-2 border-black pb-1 hover:text-orange-600 hover:border-orange-600 transition-all">View All</Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map((cat, i) => (
            <Link 
              key={cat.id} 
              to={`/category/${cat.slug}`}
              className={cn(
                "group relative h-[400px] overflow-hidden rounded-3xl",
                i === 0 ? "md:col-span-2" : ""
              )}
            >
              <img 
                src={cat.image} 
                alt={cat.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-3xl font-bold text-white mb-2">{cat.name}</h3>
                <span className="text-sm text-white/70 flex items-center gap-2 group-hover:text-white transition-colors">
                  Explore Collection <ArrowRight size={16} />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Promotional Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative h-[500px] rounded-[40px] overflow-hidden flex items-center">
          <img 
            src="https://picsum.photos/seed/promo/1920/1080" 
            alt="Promo" 
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-orange-600/90 mix-blend-multiply" />
          
          <div className="relative z-10 px-12 md:px-24">
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 max-w-xl">
              GET 20% OFF YOUR FIRST ORDER.
            </h2>
            <p className="text-white/80 text-lg mb-10 max-w-md">
              Join our community and be the first to know about new arrivals, exclusive offers, and more.
            </p>
            <form className="flex max-w-md gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-1 bg-white/10 border border-white/20 backdrop-blur-md rounded-full px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:bg-white/20 transition-all"
              />
              <button className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-black hover:text-white transition-all">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>

    </div>
  );
}

// Helper for conditional classes
function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
