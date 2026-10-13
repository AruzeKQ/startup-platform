import React from 'react';
import { Routes, Route } from 'react-router-dom';
// Import PublicRoute
import PublicRoute from './PublicRoute';
// Import PrivateRoute
import PrivateRoute from './PrivateRoute';

// Import Layouts
import MainLayout from '../layouts/MainLayout';
// Import Pages
import ProjectListPage from '../features/projects/pages/ProjectListPage';

// Import Auth Pages
import LoginPage from '../features/auth/pages/LoginPage';
import RegisterPage from '../features/auth/pages/RegisterPage';

// Import PostProject Page
import PostProjectPage from '../features/projects/pages/PostProjectPage';

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

      <Route element={<PrivateRoute />}>
        <Route
          path="/post-project"
          element={
            <MainLayout>
              <PostProjectPage />
            </MainLayout>
          }
        />
      </Route>

      {/* Nhóm các route không dùng Layout chung (như Login, Register) */}
      {/* Nhóm các route KHÔNG dùng Header/Footer (Trang độc lập) */}

      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>



      {/* Route bắt các đường dẫn không tồn tại (404) */}
      {/* <Route path="*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}