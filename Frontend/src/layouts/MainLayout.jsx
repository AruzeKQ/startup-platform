import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';

// Nếu bạn dùng react-router-dom v6, bạn có thể dùng <Outlet /> thay cho {children}
export default function MainLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header luôn nằm trên cùng */}
      <Header />
      
      {/* Phần nội dung chính (Trang danh sách dự án, trang chi tiết...) sẽ render ở đây */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer luôn nằm dưới cùng */}
      <Footer />
    </div>
  );
}