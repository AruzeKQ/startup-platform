import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ProjectStatusBadge from '../components/ProjectStatusBadge';
import MemberTable from '../components/MemberTable';
import TaskTable from '../components/TaskTable';
import DocumentList from '../components/DocumentList';
import ReviewList from '../components/ReviewList';

// Mock data cho project detail — thay bằng API data khi implement logic
const MOCK_PROJECT = {
  _id: '1',
  projectName: 'AI Chatbot Platform',
  companyName: 'StartupABC',
  location: 'Hà Nội',
  salary: '15-20M VNĐ',
  status: 'recruiting',
  description: 'Nền tảng chatbot AI thông minh cho doanh nghiệp, sử dụng NLP và machine learning để tự động hóa chăm sóc khách hàng.',
  tags: ['React', 'AI', 'Node.js', 'MongoDB'],
  logoInitials: 'AI',
  memberCount: 5,
  taskCount: 8,
  taskCompleted: 5,
  docCount: 3,
};

const TABS = [
  { key: 'members', label: '👥 Thành viên' },
  { key: 'tasks', label: '✅ Tasks' },
  { key: 'docs', label: '📄 Tài liệu' },
  { key: 'reviews', label: '⭐ Reviews' },
];

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState('members');

  // TODO: Fetch project detail bằng id
  // useEffect(() => { fetchProject(id) }, [id]);
  const project = MOCK_PROJECT;

  const completionPercent = project.taskCount > 0
    ? Math.round((project.taskCompleted / project.taskCount) * 100)
    : 0;

  return (
    <div>
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
        <Link to="/dashboard" className="hover:text-indigo-600 transition-colors">Dashboard</Link>
        <span>›</span>
        <Link to="/dashboard/projects" className="hover:text-indigo-600 transition-colors">Dự án của tôi</Link>
        <span>›</span>
        <span className="text-gray-900 font-medium">{project.projectName}</span>
      </div>

      {/* Project Header Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-500 flex items-center justify-center text-white text-lg font-bold flex-shrink-0">
              {project.logoInitials}
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="text-xl font-bold text-gray-900">{project.projectName}</h1>
                <ProjectStatusBadge status={project.status} />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {project.companyName} • {project.location} • 💰 {project.salary}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                /* TODO: Navigate to edit project */
                console.log('TODO: Edit project', id);
              }}
              className="px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              ✏️ Chỉnh sửa
            </button>
            <button
              onClick={() => {
                /* TODO: Implement delete with confirm modal */
                console.log('TODO: Delete project', id);
              }}
              className="px-4 py-2 rounded-lg border border-red-200 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
            >
              🗑️ Xóa
            </button>
          </div>
        </div>

        {/* Mini Stats */}
        <div className="flex gap-8 mt-5 pt-5 border-t border-gray-100">
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{project.memberCount}</p>
            <p className="text-xs text-gray-500">Thành viên</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{project.taskCount}</p>
            <p className="text-xs text-gray-500">Tasks</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-indigo-600">{completionPercent}%</p>
            <p className="text-xs text-gray-500">Hoàn thành</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-gray-900">{project.docCount}</p>
            <p className="text-xs text-gray-500">Tài liệu</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        {/* Tab Navigation */}
        <div className="flex border-b border-gray-200 px-5">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-3 text-sm font-medium transition-colors cursor-pointer ${
                activeTab === tab.key
                  ? 'text-indigo-600 border-b-2 border-indigo-600'
                  : 'text-gray-500 hover:text-indigo-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-5">
          {activeTab === 'members' && <MemberTable />}
          {activeTab === 'tasks' && <TaskTable />}
          {activeTab === 'docs' && <DocumentList />}
          {activeTab === 'reviews' && <ReviewList />}
        </div>
      </div>
    </div>
  );
}
