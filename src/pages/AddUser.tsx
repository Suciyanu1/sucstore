import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, User, Mail, Shield, Lock, Save } from 'lucide-react';
import { cn } from '../utils/cn';

export default function AddUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'Staff',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate user creation
    console.log('User created:', formData);
    navigate('/dashboard/users');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/dashboard/users')}
          className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center text-gray-400 hover:text-black transition-all shadow-sm"
        >
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="text-4xl font-bold tracking-tighter uppercase">Add New User</h1>
          <p className="text-gray-500 mt-1">Create a new team member account.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <section className="bg-white p-10 rounded-[40px] border border-gray-100 shadow-sm space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div className="space-y-2 sm:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <User size={18} />
                </div>
                <input 
                  required
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-black outline-none transition-all" 
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div className="space-y-2 sm:col-span-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Mail size={18} />
                </div>
                <input 
                  required
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-black outline-none transition-all" 
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Role</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Shield size={18} />
                </div>
                <select 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-black outline-none transition-all appearance-none"
                >
                  <option value="Staff">Staff</option>
                  <option value="Manager">Manager</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">Password</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input 
                  required
                  type="password" 
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="w-full bg-gray-50 border-none rounded-2xl pl-12 pr-6 py-4 focus:ring-2 focus:ring-black outline-none transition-all" 
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <button 
            type="button"
            onClick={() => navigate('/dashboard/users')}
            className="px-8 py-4 rounded-full font-bold text-gray-500 hover:text-black transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="bg-black text-white px-10 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-gray-200"
          >
            <Save size={20} /> Create User
          </button>
        </div>
      </form>
    </div>
  );
}
