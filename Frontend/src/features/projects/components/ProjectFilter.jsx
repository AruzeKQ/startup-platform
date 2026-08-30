import React from 'react';

export default function ProjectFilter() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 mb-8 flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <input
          type="text"
          placeholder="Nhập vị trí, kỹ năng (React, Node.js, UI/UX)..."
          className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
        />
      </div>
      <div className="flex gap-3">
        <select className="px-4 py-2.5 border border-gray-200 rounded-lg text-sm text-gray-600 bg-white outline-none">
          <option value="">Tất cả địa điểm</option>
          <option value="hanoi">Hà Nội</option>
          <option value="hcm">TP. Hồ Chí Minh</option>
          <option value="remote">Remote</option>
        </select>
        <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg text-sm transition-colors cursor-pointer">
          Tìm kiếm
        </button>
      </div>
    </div>
  );
}