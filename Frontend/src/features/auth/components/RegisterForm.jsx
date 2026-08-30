import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function RegisterForm() {
  // Có thêm role: 'candidate' (Ứng viên) hoặc 'startup' (Công ty)
  const [formData, setFormData] = useState({
    role: 'candidate',
    fullName: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Xử lý gọi API Đăng ký
    console.log('Register data:', formData);
    alert(`Đăng ký tài khoản: ${formData.role === 'startup' ? 'Startup' : 'Ứng viên'}`);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Chọn Role */}
      <div className="flex gap-4 mb-2">
        <label className={`flex-1 cursor-pointer border rounded-lg p-3 text-center transition-all ${
          formData.role === 'candidate' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
        }`}>
          <input 
            type="radio" 
            name="role" 
            className="hidden"
            checked={formData.role === 'candidate'}
            onChange={() => setFormData({ ...formData, role: 'candidate' })}
          />
          <span className="text-sm font-medium">🧑‍💻 Ứng viên</span>
        </label>
        
        <label className={`flex-1 cursor-pointer border rounded-lg p-3 text-center transition-all ${
          formData.role === 'startup' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'
        }`}>
          <input 
            type="radio" 
            name="role" 
            className="hidden"
            checked={formData.role === 'startup'}
            onChange={() => setFormData({ ...formData, role: 'startup' })}
          />
          <span className="text-sm font-medium">🚀 Startup</span>
        </label>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {formData.role === 'startup' ? 'Tên Công ty / Startup' : 'Họ và tên'}
        </label>
        <input
          type="text"
          required
          placeholder={formData.role === 'startup' ? 'VD: TechMatch JSC' : 'VD: Nguyễn Quang Khải'}
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
        <input
          type="email"
          required
          placeholder="email@example.com"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
        <input
          type="password"
          required
          placeholder="Tối thiểu 6 ký tự"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors text-sm shadow-sm mt-2 cursor-pointer"
      >
        Tạo tài khoản
      </button>

      <p className="text-center text-sm text-gray-600 mt-4">
        Đã có tài khoản?{' '}
        <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">
          Đăng nhập
        </Link>
      </p>
    </form>
  );
}