import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectTable from '../components/ProjectTable';
import ConfirmModal from '../components/ConfirmModal';

export default function MyProjectsPage() {
  // State cho UI — bạn sẽ mở rộng thêm khi implement logic
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // TODO: Implement các state sau khi code logic
  // const [projects, setProjects] = useState([]);
  // const [search, setSearch] = useState('');
  // const [statusFilter, setStatusFilter] = useState('');
  // const [sortBy, setSortBy] = useState('newest');
  // const [selectedProjectId, setSelectedProjectId] = useState(null);

  return (
    <div>
      {/* Page Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dự Án Của Tôi</h1>
          <p className="text-sm text-gray-500 mt-1">Quản lý tất cả dự án bạn đã đăng tải</p>
        </div>
        <Link
          to="/post-project"
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2.5 rounded-lg text-sm transition-colors shadow-sm flex items-center gap-2"
        >
          <span>+</span> Đăng Dự Án Mới
        </Link>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-5">
        <div className="flex-1 relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
          <input
            type="text"
            placeholder="Tìm kiếm dự án..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
            // TODO: onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
          // TODO: onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="recruiting">Đang tuyển</option>
          <option value="working">Đang làm</option>
          <option value="finished">Hoàn thành</option>
        </select>
        <select
          className="px-4 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-600 focus:ring-2 focus:ring-indigo-500 outline-none bg-white"
          // TODO: onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="newest">Mới nhất</option>
          <option value="oldest">Cũ nhất</option>
          <option value="name">Tên A-Z</option>
        </select>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <ProjectTable compact={false} />

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-500">Hiển thị 1-6 / 6 dự án</p>
          <div className="flex gap-1">
            <button className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-400 bg-white cursor-not-allowed">
              ←
            </button>
            <button className="px-3 py-1.5 text-sm rounded-lg bg-indigo-600 text-white font-medium cursor-pointer">
              1
            </button>
            <button className="px-3 py-1.5 text-sm rounded-lg border border-gray-300 text-gray-400 bg-white cursor-not-allowed">
              →
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={() => {
          /* TODO: Implement delete project logic */
          console.log('TODO: Delete project');
          setIsDeleteModalOpen(false);
        }}
        title="Xóa dự án?"
        message="Bạn có chắc chắn muốn xóa dự án này? Hành động này không thể hoàn tác."
      />
    </div>
  );
}
