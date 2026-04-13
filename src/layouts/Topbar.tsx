import React, { useState } from 'react';
import { Search, Bell, User, LogOut, Settings, ExternalLink } from 'lucide-react';
import { useAuthStore } from '../store/useStore';
import { useNavigate, Link } from 'react-router-dom';
import { cn } from '../utils/cn';

export default function Topbar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-40">
      {/* Search */}
      <div className="relative w-96">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
          <Search size={18} />
        </div>
        <input
          type="text"
          placeholder="Search for anything..."
          className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-4 py-2.5 text-sm focus:ring-2 focus:ring-black outline-none transition-all"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-6">
        <Link 
          to="/" 
          target="_blank"
          className="flex items-center gap-2 text-xs font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest"
        >
          View Store <ExternalLink size={14} />
        </Link>

        <button className="relative w-10 h-10 rounded-2xl bg-gray-50 flex items-center justify-center text-gray-500 hover:text-black transition-colors">
          <Bell size={20} />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-orange-600 rounded-full border-2 border-white" />
        </button>

        {/* Profile Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 pl-2 pr-1 py-1 rounded-2xl hover:bg-gray-50 transition-colors"
          >
            <div className="text-right hidden sm:block">
              <p className="text-sm font-bold text-black leading-tight">{user?.name}</p>
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{user?.role}</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-black text-white flex items-center justify-center font-bold text-sm">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </button>

          {isProfileOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsProfileOpen(false)}
              />
              <div className="absolute right-0 mt-4 w-56 bg-white rounded-3xl shadow-2xl shadow-gray-200 border border-gray-100 py-2 z-20 animate-in fade-in zoom-in duration-200">
                <div className="px-4 py-3 border-b border-gray-50 mb-2">
                  <p className="text-sm font-bold text-black">{user?.name}</p>
                  <p className="text-xs text-gray-400 truncate">{user?.email}</p>
                </div>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors">
                  <User size={18} /> Profile
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-colors">
                  <Settings size={18} /> Settings
                </button>
                <div className="h-px bg-gray-50 my-2" />
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
