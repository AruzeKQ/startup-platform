import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import './App.css'; // Import Tailwind CSS

// Giả sử sau này bạn dùng React Query hoặc Context, nó sẽ bọc ở đây
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// const queryClient = new QueryClient();

function App() {
  return (
    // <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        
        <AppRoutes />

      </BrowserRouter>
    // </QueryClientProvider>
  );
}

export default App;