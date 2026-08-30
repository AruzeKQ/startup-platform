import React from 'react';
import { Link } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
        <div className="text-center mb-8">
          <Link to="/" className="text-3xl font-extrabold text-indigo-600 inline-block mb-2">
            StartupMatch
          </Link>
          <h2 className="text-2xl font-bold text-gray-900">Tạo tài khoản mới</h2>
          <p className="text-sm text-gray-500 mt-2">Tham gia cộng đồng Startup & Nhân tài</p>
        </div>
        
        {/* Render Form */}
        <RegisterForm />
      </div>
    </div>
  );
}