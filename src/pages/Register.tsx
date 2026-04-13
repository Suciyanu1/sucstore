import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate registration
    setTimeout(() => {
      setIsLoading(false);
      navigate('/login');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-[40px] shadow-2xl shadow-gray-200 p-10 sm:p-12"
      >
        <div className="text-center mb-10">
          <Link to="/" className="inline-block mb-8">
            <span className="text-2xl font-black tracking-tighter uppercase">SwiftShop<span className="text-orange-600">.</span></span>
          </Link>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Create an account</h1>
          <p className="text-gray-500">Join our community and start shopping.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                required
                type="text" 
                className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-black outline-none transition-all" 
                placeholder="John Doe"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                required
                type="email" 
                className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-black outline-none transition-all" 
                placeholder="name@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                required
                type={showPassword ? "text" : "password"} 
                className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-14 py-4 focus:ring-2 focus:ring-black outline-none transition-all" 
                placeholder="••••••••"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3 ml-1">
            <input type="checkbox" id="terms" required className="rounded border-gray-300 text-black focus:ring-black" />
            <label htmlFor="terms" className="text-xs text-gray-500">
              I agree to the <Link to="/terms" className="text-black font-bold hover:underline">Terms</Link> and <Link to="/privacy" className="text-black font-bold hover:underline">Privacy Policy</Link>
            </label>
          </div>

          <button 
            disabled={isLoading}
            className="w-full bg-black text-white py-5 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>Create Account <ArrowRight size={18} /></>
            )}
          </button>
        </form>

        <p className="text-center mt-10 text-sm text-gray-500">
          Already have an account? <Link to="/login" className="text-black font-bold hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
