import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div>
            <Link to="/" className="text-2xl font-bold tracking-tighter text-black mb-6 block">
              SWIFT<span className="text-orange-600">SHOP</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed mb-8">
              Premium e-commerce experience with a focus on quality, speed, and customer satisfaction. Discover our curated collection of products.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all">
                <Twitter size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-all">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Shop</h4>
            <ul className="space-y-4">
              <li><Link to="/category/electronics" className="text-gray-500 hover:text-black text-sm transition-colors">Electronics</Link></li>
              <li><Link to="/category/fashion" className="text-gray-500 hover:text-black text-sm transition-colors">Fashion</Link></li>
              <li><Link to="/category/home-living" className="text-gray-500 hover:text-black text-sm transition-colors">Home & Living</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/track-order" className="text-gray-500 hover:text-black text-sm transition-colors">Track Order</Link></li>
              <li><Link to="/shipping" className="text-gray-500 hover:text-black text-sm transition-colors">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-gray-500 hover:text-black text-sm transition-colors">Returns & Exchanges</Link></li>
              <li><Link to="/faq" className="text-gray-500 hover:text-black text-sm transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="text-gray-500 hover:text-black text-sm transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-gray-500 text-sm">
                <MapPin size={18} className="text-black shrink-0" />
                <span>123 Commerce St, Suite 100<br />Victoria Island, Lagos</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm">
                <Phone size={18} className="text-black shrink-0" />
                <span>+234 (800) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-500 text-sm">
                <Mail size={18} className="text-black shrink-0" />
                <span>hello@swiftshop.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-gray-400 text-xs">
            © {currentYear} SWIFTSHOP. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <Link to="/privacy" className="text-gray-400 hover:text-black text-xs transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-gray-400 hover:text-black text-xs transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="text-gray-400 hover:text-black text-xs transition-colors">Cookie Settings</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
