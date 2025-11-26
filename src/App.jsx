// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import EmployeeDashboardPage from './pages/EmployeeDashboardPage';
import AdminSignup from './pages/AdminSignup';
import DemoPage from './pages/DemoPage';
import ProtectedRoute from './routes/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/:role" element={<LoginPage />} />
        <Route path="/signup/admin" element={<AdminSignup />} />
        <Route path="/request-demo" element={<DemoPage />} />
        
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard/admin" element={<AdminDashboardPage />} />
          <Route path="/dashboard/employee" element={<EmployeeDashboardPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
};

export default App;