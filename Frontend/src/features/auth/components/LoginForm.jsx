import React, { useState } from 'react';
import { userContext } from '../../../contexts/authContext';
import { Link } from 'react-router-dom';
import { authApi } from '../services/authApi';

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [checked, setChecked] = useState(null)
  const [user, setUser] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await authApi.login({
        email: formData.email,
        password: formData.password,
      });

      window.location.href = '/';
    } catch (error) {
      console.log('Đã xảy ra lỗi', error);
      setChecked(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          required
          placeholder="email@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all"
        />
      </div>

      <div>
        <div className="flex items-center justify-between mb-1">
          <label className="block text-sm font-medium text-gray-700">Mật khẩu</label>
          <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-500">
            Quên mật khẩu?
          </a>
        </div>
        <input
          type="password"
          required
          placeholder="••••••••"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm transition-all"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm shadow-sm cursor-pointer"
      >
        Đăng nhập
      </button>

      <p className="text-center text-sm text-gray-600 mt-4">
        Chưa có tài khoản?{' '}
        <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">
          Đăng ký ngay
        </Link>
      </p>
      {checked && (
        <div className="... bg-red-50 border border-red-300 text-red-700 rounded-lg p-3 text-sm">
          Đăng nhập thất bại, hãy kiểm tra lại tài khoản hoặc mật khẩu.
        </div>
      )}
    </form>
  );
}