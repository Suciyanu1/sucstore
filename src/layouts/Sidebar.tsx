import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Package, 
  Database, 
  ShoppingBag, 
  Tag, 
  Star, 
  Users, 
  Truck, 
  Image as ImageIcon, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useDashboardStore } from '../store/useStore';
import { cn } from '../utils/cn';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Package, label: 'Products', path: '/dashboard/products' },
  { icon: Database, label: 'Inventory', path: '/dashboard/inventory' },
  { icon: ShoppingBag, label: 'Orders', path: '/dashboard/orders' },
  { icon: Tag, label: 'Discounts', path: '/dashboard/discounts' },
  { icon: Star, label: 'Reviews', path: '/dashboard/reviews' },
  { icon: Users, label: 'Users', path: '/dashboard/users' },
  { icon: Truck, label: 'Shipping', path: '/dashboard/shipping' },
  { icon: ImageIcon, label: 'Banners', path: '/dashboard/banners' },
  { icon: BarChart3, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export default function Sidebar() {
  const location = useLocation();
  const { isSidebarOpen, toggleSidebar } = useDashboardStore();

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-full bg-white border-r border-gray-100 transition-all duration-300 ease-in-out z-50",
      isSidebarOpen ? "w-72" : "w-20"
    )}>
      <div className="flex flex-col h-full">
        {/* Logo */}
        <div className="h-20 flex items-center px-6 border-b border-gray-50">
          <Link to="/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center shrink-0">
              <div className="w-4 h-4 bg-white rounded-sm" />
            </div>
            {isSidebarOpen && (
              <span className="font-bold tracking-tighter text-xl whitespace-nowrap">MANAGEMENT</span>
            )}
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 custom-scrollbar">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center gap-4 px-4 py-3 rounded-2xl transition-all group",
                      isActive 
                        ? "bg-black text-white shadow-lg shadow-gray-200" 
                        : "text-gray-500 hover:bg-gray-50 hover:text-black"
                    )}
                  >
                    <item.icon size={20} className={cn("shrink-0", isActive ? "text-white" : "text-gray-400 group-hover:text-black")} />
                    {isSidebarOpen && (
                      <span className="font-bold text-sm whitespace-nowrap">{item.label}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Toggle Button */}
        <div className="p-4 border-t border-gray-50">
          <button
            onClick={toggleSidebar}
            className="w-full flex items-center justify-center py-3 rounded-2xl bg-gray-50 text-gray-500 hover:text-black transition-colors"
          >
            {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
          </button>
        </div>
      </div>
    </aside>
  );
}
