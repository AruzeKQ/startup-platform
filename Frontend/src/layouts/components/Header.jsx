import React from 'react';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Link để trỏ về trang chủ */}
          <Link to="/" className="flex-shrink-0 flex items-center cursor-pointer">
            <span className="text-2xl font-bold text-indigo-600">StartupMatch</span>
          </Link>

          <nav className="hidden md:flex space-x-8">
            {/* Sử dụng NavLink để tự động bắt trạng thái "active" khi đang ở đúng trang đó */}
            <NavLink 
              to="/projects" 
              className={({ isActive }) => 
                isActive 
                  ? "text-indigo-600 font-medium" 
                  : "text-gray-900 font-medium hover:text-indigo-600 transition-colors"
              }
            >
              Tìm Dự Án
            </NavLink>
            <NavLink 
              to="/startups" 
              className={({ isActive }) => 
                isActive 
                  ? "text-indigo-600 font-medium" 
                  : "text-gray-500 font-medium hover:text-indigo-600 transition-colors"
              }
            >
              Công Ty Khởi Nghiệp
            </NavLink>
          </nav>

          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-gray-500 font-medium hover:text-gray-900 transition-colors text-sm hidden sm:block">
              Đăng nhập
            </Link>
            <Link to="/register" className="text-gray-500 font-medium hover:text-gray-900 transition-colors text-sm hidden sm:block">
              Đăng ký
            </Link>
            {/* <Link to="/post-project" className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-lg text-sm transition-colors shadow-sm">
              Đăng dự án (Startup)
            </Link> */} 
          </div>
        </div>
      </div>
    </header>
  );
}