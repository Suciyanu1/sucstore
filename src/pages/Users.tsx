import React from 'react';
import { Plus, Users as UsersIcon, Mail, Shield, MoreVertical } from 'lucide-react';

const mockUsers = [
  { id: 1, name: 'Success Oyedele', email: 'success@example.com', role: 'Manager', status: 'Active', joined: 'Jan 12, 2024' },
  { id: 2, name: 'Jane Cooper', email: 'jane@example.com', role: 'Staff', status: 'Active', joined: 'Feb 05, 2024' },
  { id: 3, name: 'Cody Fisher', email: 'cody@example.com', role: 'Staff', status: 'Inactive', joined: 'Mar 20, 2024' },
];

export default function Users() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tighter uppercase">Users</h1>
          <p className="text-gray-500 mt-1">Manage team members and their access levels.</p>
        </div>
        <button className="bg-black text-white px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-orange-600 transition-all shadow-xl shadow-gray-200">
          <Plus size={20} /> Add User
        </button>
      </div>

      <div className="bg-white rounded-[40px] border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-gray-50/50">
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">User</th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Role</th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Status</th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400">Joined</th>
              <th className="px-8 py-4 text-xs font-bold uppercase tracking-widest text-gray-400 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {mockUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50/50 transition-colors group">
                <td className="px-8 py-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400 font-bold">
                      {user.name.charAt(0)}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{user.name}</span>
                      <span className="text-[10px] text-gray-400">{user.email}</span>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-4">
                  <div className="flex items-center gap-2">
                    <Shield size={14} className="text-orange-600" />
                    <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{user.role}</span>
                  </div>
                </td>
                <td className="px-8 py-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                    user.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="px-8 py-4 text-xs text-gray-400">{user.joined}</td>
                <td className="px-8 py-4 text-right">
                  <button className="p-2 hover:bg-white rounded-xl text-gray-400 hover:text-black transition-all shadow-sm">
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
