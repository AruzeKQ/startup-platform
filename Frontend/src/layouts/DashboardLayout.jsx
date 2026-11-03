import React from 'react';
import Header from './components/Header';
import DashboardSidebar from '../features/dashboard/components/DashboardSidebar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header giữ nguyên trên cùng */}
      <Header />

      <div className="flex flex-1">
        {/* Sidebar bên trái */}
        <DashboardSidebar />

        {/* Nội dung chính */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
