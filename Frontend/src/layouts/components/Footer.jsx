import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start mb-6 md:mb-0">
            <span className="text-xl font-bold text-gray-900">StartupMatch</span>
          </div>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
            <a href="#" className="hover:text-gray-900">Về chúng tôi</a>
            <a href="#" className="hover:text-gray-900">Chính sách bảo mật</a>
            <a href="#" className="hover:text-gray-900">Điều khoản</a>
            <a href="#" className="hover:text-gray-900">Liên hệ</a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-8 flex justify-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} StartupMatch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}