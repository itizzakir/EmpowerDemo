// src/pages/EmployeeDashboardPage.jsx
import React, { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import EmployeeDashboard from '../components/dashboard/EmployeeDashboard';
import Header from '../components/common/Header';
import Sidebar from '../components/dashboard/Sidebar'; // Import Sidebar

const EmployeeDashboardPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || currentUser.role !== 'employee') {
      navigate('/login/employee');
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="flex">
        <Sidebar role="employee" />
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
              <h1 className="text-4xl font-bold text-slate-900 tracking-tight">
                Welcome, {currentUser.personalDetails.fullName}!
              </h1>
              <p className="text-slate-600 mt-2 text-lg">
                Here are your details.
              </p>
            </div>
            <EmployeeDashboard employee={currentUser} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default EmployeeDashboardPage;