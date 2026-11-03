import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ProjectStatusBadge from './ProjectStatusBadge';

// Màu gradient cho logo placeholder
const LOGO_COLORS = [
  'from-violet-500 to-indigo-500',
  'from-emerald-500 to-teal-500',
  'from-orange-500 to-red-500',
  'from-blue-500 to-cyan-500',
  'from-pink-500 to-rose-500',
  'from-amber-500 to-yellow-500',
];

// Mock data — thay bằng props thật khi implement logic
const MOCK_PROJECTS = [
  {
    _id: '1',
    projectName: 'AI Chatbot Platform',
    companyName: 'StartupABC',
    location: 'Hà Nội',
    salary: '15-20M',
    tags: ['React', 'AI', 'Node.js'],
    status: 'recruiting',
    memberCount: 5,
    postedAt: '30/10/2026',
    logoInitials: 'AI',
  },
  {
    _id: '2',
    projectName: 'E-Commerce App',
    companyName: 'StartupABC',
    location: 'TP. HCM',
    salary: '10-15M',
    tags: ['Node.js', 'MongoDB'],
    status: 'working',
    memberCount: 2,
    postedAt: '24/10/2026',
    logoInitials: 'EC',
  },
  {
    _id: '3',
    projectName: 'FinTech Mobile',
    companyName: 'StartupABC',
    location: 'Đà Nẵng',
    salary: '20-25M',
    tags: ['Flutter', 'Python'],
    status: 'finished',
    memberCount: 3,
    postedAt: '15/10/2026',
    logoInitials: 'FM',
  },
  {
    _id: '4',
    projectName: 'Social Media Dashboard',
    companyName: 'StartupABC',
    location: 'Remote',
    salary: '12-18M',
    tags: ['React', 'Express.js'],
    status: 'recruiting',
    memberCount: 1,
    postedAt: '10/10/2026',
    logoInitials: 'SM',
  },
  {
    _id: '5',
    projectName: 'Healthcare Booking',
    companyName: 'StartupABC',
    location: 'Hà Nội',
    salary: '15-22M',
    tags: ['Java', 'MySQL'],
    status: 'working',
    memberCount: 4,
    postedAt: '05/10/2026',
    logoInitials: 'HB',
  },
  {
    _id: '6',
    projectName: 'EdTech Platform',
    companyName: 'StartupABC',
    location: 'TP. HCM',
    salary: '10-14M',
    tags: ['React', 'MongoDB', 'AI'],
    status: 'recruiting',
    memberCount: 0,
    postedAt: '01/10/2026',
    logoInitials: 'ET',
  },
];

function ActionMenu({ projectId, isOpen, onToggle }) {
  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className="text-gray-400 hover:text-gray-600 text-lg px-2 cursor-pointer"
      >
        ⋮
      </button>
      {isOpen && (
        <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-200 py-1 w-48 z-10">
          <Link
            to={`/dashboard/projects/${projectId}`}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
          >
            👁️ Xem chi tiết
          </Link>
          <button
            onClick={() => {
              /* TODO: Implement edit */
              console.log('TODO: Edit project', projectId);
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            ✏️ Chỉnh sửa
          </button>
          <button
            onClick={() => {
              /* TODO: Implement manage members */
              console.log('TODO: Manage members', projectId);
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            👥 Quản lý thành viên
          </button>
          <button
            onClick={() => {
              /* TODO: Implement manage tasks */
              console.log('TODO: Manage tasks', projectId);
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
          >
            ✅ Quản lý tasks
          </button>
          <div className="border-t border-gray-100 my-1"></div>
          <button
            onClick={() => {
              /* TODO: Implement delete */
              console.log('TODO: Delete project', projectId);
            }}
            className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
          >
            🗑️ Xóa dự án
          </button>
        </div>
      )}
    </div>
  );
}

// Avatar stack cho member count
function MemberAvatars({ count }) {
  const colors = ['bg-blue-400', 'bg-pink-400', 'bg-amber-400'];
  const shown = Math.min(count, 3);
  const remaining = count - shown;

  if (count === 0) {
    return <span className="text-xs text-gray-400">—</span>;
  }

  return (
    <div className="flex -space-x-2">
      {Array.from({ length: shown }).map((_, i) => (
        <div
          key={i}
          className={`w-7 h-7 rounded-full ${colors[i % colors.length]} border-2 border-white text-white text-xs flex items-center justify-center`}
        />
      ))}
      {remaining > 0 && (
        <div className="w-7 h-7 rounded-full bg-gray-200 border-2 border-white text-gray-500 text-xs flex items-center justify-center">
          +{remaining}
        </div>
      )}
    </div>
  );
}

export default function ProjectTable({ projects = MOCK_PROJECTS, compact = false, onView, onEdit, onDelete }) {
  const [openMenuId, setOpenMenuId] = useState(null);

  const handleToggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // Đóng menu khi click bên ngoài
  const handleTableClick = () => {
    if (openMenuId) setOpenMenuId(null);
  };

  return (
    <div onClick={handleTableClick}>
      <table className="w-full">
        <thead>
          <tr className={`border-b border-gray-200 ${compact ? '' : 'bg-gray-50'}`}>
            <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Dự án</th>
            {!compact && (
              <>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Vị trí</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Lương</th>
                <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Tags</th>
              </>
            )}
            <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Trạng thái</th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Thành viên</th>
            <th className="text-left text-xs font-medium text-gray-500 uppercase px-5 py-3">Ngày đăng</th>
            {!compact && (
              <th className="text-center text-xs font-medium text-gray-500 uppercase px-5 py-3"></th>
            )}
          </tr>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr
              key={project._id}
              className="border-b border-gray-50 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => {
                /* TODO: Navigate to project detail */
                console.log('TODO: View project', project._id);
              }}
            >
              <td className="px-5 py-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${LOGO_COLORS[index % LOGO_COLORS.length]} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                    {project.logoInitials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900">{project.projectName}</p>
                    <p className="text-xs text-gray-400">{project.companyName}</p>
                  </div>
                </div>
              </td>
              {!compact && (
                <>
                  <td className="px-5 py-4 text-sm text-gray-600">{project.location}</td>
                  <td className="px-5 py-4">
                    <span className="text-sm font-medium text-emerald-700">{project.salary}</span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-1 flex-wrap">
                      {project.tags?.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-indigo-50 text-indigo-600 px-2 py-0.5 rounded font-medium">
                          {tag}
                        </span>
                      ))}
                      {project.tags?.length > 2 && (
                        <span className="text-xs text-gray-400">+{project.tags.length - 2}</span>
                      )}
                    </div>
                  </td>
                </>
              )}
              <td className="px-5 py-4">
                <ProjectStatusBadge status={project.status} />
              </td>
              <td className="px-5 py-4">
                <MemberAvatars count={project.memberCount} />
              </td>
              <td className="px-5 py-4 text-sm text-gray-500">{project.postedAt}</td>
              {!compact && (
                <td className="px-5 py-4 text-center" onClick={(e) => e.stopPropagation()}>
                  <ActionMenu
                    projectId={project._id}
                    isOpen={openMenuId === project._id}
                    onToggle={() => handleToggleMenu(project._id)}
                  />
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
