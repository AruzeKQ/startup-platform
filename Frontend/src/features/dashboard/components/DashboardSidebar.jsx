import React from 'react';
import { NavLink } from 'react-router-dom';

const MENU_ITEMS = [
  { to: '/dashboard', icon: '📊', label: 'Tổng quan', end: true },
  { to: '/dashboard/projects', icon: '📁', label: 'Dự án của tôi', end: false },
  { to: '/dashboard/applicants', icon: '👥', label: 'Ứng viên', end: false },
  { to: '/dashboard/messages', icon: '💬', label: 'Tin nhắn', end: false },
  { to: '/dashboard/settings', icon: '⚙️', label: 'Cài đặt', end: false },
];

export default function DashboardSidebar() {
  return (
    <aside className="w-60 bg-white border-r border-gray-200 flex-shrink-0 hidden lg:block">
      <div className="py-4">
        <div className="px-4 mb-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Quản lý</p>
        </div>
        <nav className="space-y-0.5">
          {MENU_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600 border-r-[3px] border-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <span>{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </aside>
  );
}
