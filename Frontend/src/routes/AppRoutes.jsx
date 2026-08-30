import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Layouts
import MainLayout from '../layouts/MainLayout';
// Import Pages
import ProjectListPage from '../features/projects/pages/ProjectListPage';

export default function AppRoutes() {
  return (
    <Routes>
      {/* Nhóm các route dùng MainLayout */}
      <Route 
        path="/" 
        element={
          <MainLayout>
            <ProjectListPage />
          </MainLayout>
        } 
      />
      <Route 
        path="/projects" 
        element={
          <MainLayout>
            <ProjectListPage />
          </MainLayout>
        } 
      />

      {/* Nhóm các route không dùng Layout chung (như Login, Register) */}
      {/* <Route path="/login" element={<LoginPage />} /> */}
      
      {/* Route bắt các đường dẫn không tồn tại (404) */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}