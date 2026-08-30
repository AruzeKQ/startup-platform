import React, { useState } from 'react';
// Import chuẩn theo cấu trúc thư mục từ components cùng feature
import ProjectCard from '../components/ProjectCard';
import ApplyModal from '../components/ApplyModal';
import ProjectFilter from '../components/ProjectFilter';

const MOCK_PROJECTS = [
  {
    id: 1,
    title: 'Frontend React Developer (E-commerce)',
    companyName: 'TechStartup X',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=TechX',
    location: 'Hà Nội (Hybrid)',
    salary: 'Thỏa thuận / Share Equity',
    postedAt: '2 giờ trước',
    description: 'Xây dựng giao diện sàn thương mại điện tử kết nối các nhà bán lẻ nhỏ.',
    tags: ['React', 'JavaScript', 'Tailwind', 'Redux'],
  },
  {
    id: 2,
    title: 'Fullstack Node.js & React Developer',
    companyName: 'AI Solution Lab',
    logo: 'https://api.dicebear.com/7.x/shapes/svg?seed=AILab',
    location: 'TP. Hồ Chí Minh (Remote)',
    salary: '10 - 15 triệu / tháng',
    postedAt: '1 ngày trước',
    description: 'Dự án phân tích dữ liệu mạng xã hội bằng AI.',
    tags: ['React', 'Node.js', 'Express', 'MongoDB'],
  }
];

export default function ProjectListPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenApplyModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Tìm Dự Án & Cơ Hội Nổi Bật</h1>
          <p className="mt-3 text-gray-500">Kết nối trực tiếp với các Startup tiềm năng.</p>
        </div>

        {/* Component Filter đã được tách ra */}
        <ProjectFilter />

        {/* Project Grid mapping Component ProjectCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onApply={handleOpenApplyModal}
            />
          ))}
        </div>
      </div>

      {/* Modal Component */}
      <ApplyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        projectTitle={selectedProject?.title}
      />
    </div>
  );
}