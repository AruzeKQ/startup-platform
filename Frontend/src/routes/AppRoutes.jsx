import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Layouts
import MainLayout from '../layouts/MainLayout';
// Import Pages
import ProjectListPage from '../features/projects/pages/ProjectListPage';

// Import Auth Pages
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';

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
      {/* Nhóm các route KHÔNG dùng Header/Footer (Trang độc lập) */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Route bắt các đường dẫn không tồn tại (404) */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}