import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { useDashboardStore } from '../store/useStore';
import { cn } from '../utils/cn';

export default function DashboardLayout() {
  const isSidebarOpen = useDashboardStore((state) => state.isSidebarOpen);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className={cn(
        "flex-1 flex flex-col transition-all duration-300 ease-in-out",
        isSidebarOpen ? "ml-72" : "ml-20"
      )}>
        <Topbar />
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
