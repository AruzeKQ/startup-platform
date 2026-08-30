import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-extrabold text-indigo-600 inline-block mb-2">
            StartupMatch
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Chào mừng trở lại</h2>
          <p className="text-sm text-gray-500 mt-2">Đăng nhập để tiếp tục kết nối</p>
        </div>
        
        {/* Render Form */}
        <LoginForm />
      </div>
    </div>
  );
}