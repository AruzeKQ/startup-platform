import React from 'react';
import { Link } from 'react-router-dom';
import StatsCard from '../components/StatsCard';
import ProjectTable from '../components/ProjectTable';
import RecentActivity from '../components/RecentActivity';

export default function DashboardOverviewPage() {
  return (
    <div>
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Tổng quan Dashboard</h1>
        <p className="text-sm text-gray-500 mt-1">Chào mừng trở lại! Đây là tình hình dự án của bạn.</p>
      </div>

      {/* Stats Cards - TODO: Thay giá trị mock bằng data thật từ API */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatsCard
          icon="📁"
          label="Tổng Dự Án"
          value={12}
          trend="+2 tháng này"
          trendType="up"
          bgColor="bg-indigo-50"
        />
        <StatsCard
          icon="🟢"
          label="Đang Tuyển"
          value={5}
          trend="41.7% tổng dự án"
          trendType="neutral"
          bgColor="bg-emerald-50"
        />
        <StatsCard
          icon="👥"
          label="Tổng Thành Viên"
          value={34}
          trend="+8 tháng này"
          trendType="up"
          bgColor="bg-blue-50"
        />
        <StatsCard
          icon="✅"
          label="Tasks Đang Chạy"
          value={18}
          trend="6 cần review"
          trendType="neutral"
          bgColor="bg-amber-50"
        />
      </div>

      {/* Two-column layout: Project Table + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Projects (2/3 width) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between p-5 border-b border-gray-100">
            <h2 className="text-base font-semibold text-gray-900">Dự Án Gần Đây</h2>
            <Link
              to="/dashboard/projects"
              className="text-sm text-indigo-600 font-medium hover:text-indigo-700"
            >
              Xem tất cả →
            </Link>
          </div>
          {/* compact=true: hiển thị ít cột hơn */}
          <ProjectTable compact={true} />
        </div>

        {/* Recent Activity (1/3 width) */}
        <div className="lg:col-span-1">
          <RecentActivity />
        </div>
      </div>
    </div>
  );
}
