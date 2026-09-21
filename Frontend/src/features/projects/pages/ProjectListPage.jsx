import React, { useEffect, useState } from 'react';
import { projectApi } from '../services/projectApi';
// Import chuẩn theo cấu trúc thư mục từ components cùng feature
import ProjectCard from '../components/ProjectCard';
import ApplyModal from '../components/ApplyModal';
import ProjectFilter from '../components/ProjectFilter';

export default function ProjectListPage() {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await projectApi.getProject();
        setProjects(response);
        console.log(response);
      } catch (error) {
        console.log("Đã xảy ra lỗi khi lấy data về", error);
      }
    }
    fetchData();
  }, [])

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
          {
            projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
                onApply={handleOpenApplyModal}
              />
            ))
          }
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