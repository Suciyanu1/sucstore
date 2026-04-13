import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';
import { useAuthStore } from '../store/useStore';
import { cn } from '../utils/cn';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();
  const location = useLocation();
  
  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[40px] shadow-2xl shadow-gray-200">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-black text-white mb-6">
            <Lock size={32} />
          </div>
          <h2 className="text-4xl font-bold tracking-tighter uppercase">Secure Access</h2>
          <p className="mt-2 text-sm text-gray-500">Please enter your credentials to continue</p>
        </div>
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-4 rounded-2xl border border-red-100">
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Mail size={20} />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-12 pr-4 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all"
                placeholder="Email address"
              />
            </div>
            
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                <Lock size={20} />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-12 pr-12 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-black outline-none transition-all"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-black transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={cn(
              "group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm font-bold rounded-full text-white bg-black hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black transition-all duration-300 shadow-xl shadow-gray-200",
              isLoading && "opacity-70 cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <span className="flex items-center gap-2">
                Sign In <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </span>
            )}
          </button>
        </form>
        
        <div className="text-center mt-6">
          <button 
            onClick={() => navigate('/')}
            className="text-xs font-bold text-gray-400 uppercase tracking-widest hover:text-black transition-colors"
          >
            Back to Storefront
          </button>
        </div>
      </div>
    </div>
  );
}
