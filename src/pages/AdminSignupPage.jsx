// src/pages/AdminSignupPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/common/Logo';
import AdminSignupForm from '../components/auth/AdminSignupForm';

const AdminSignupPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4">
      <div className="mb-8">
        <Logo />
      </div>
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-extrabold text-slate-900 text-center mb-6">
          Create Admin Account
        </h2>
        
        <AdminSignupForm />
        
        <div className="text-center mt-6 space-y-2">
          <Link
            to="/login/admin"
            className="text-sm text-purple-600 hover:text-purple-800"
          >
            Already have an account? Log In
          </Link>
          <p className="text-sm">
            <Link to="/login/employee" className="text-purple-600 hover:text-purple-800">
              Switch to Employee Login
            </Link>
          </p>
          <p className="text-sm">
            <Link to="/" className="text-purple-600 hover:text-purple-800">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminSignupPage;