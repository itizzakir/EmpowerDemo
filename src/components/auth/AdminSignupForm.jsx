// src/components/auth/AdminSignupForm.jsx
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const AdminSignupForm = () => {
  const { signup } = useAuth();
  
  const [name, setName] = useState('');
  const [adminId, setAdminId] = useState(''); // Using email for Admin ID
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    // Call the new signup function
    const success = signup(name, adminId, password);

    if (!success) {
      setError('Could not create account. Please try again.');
    }
    // On success, the AuthContext handles navigation
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-slate-700"
        >
          Full Name
        </label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div>
        <label
          htmlFor="adminId"
          className="block text-sm font-medium text-slate-700"
        >
          Admin Email (ID)
        </label>
        <input
          id="adminId"
          type="email"
          value={adminId}
          onChange={(e) => setAdminId(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        />
      </div>

      <div className="relative">
        <label
          htmlFor="password"
          className="block text-sm font-medium text-slate-700"
        >
          Password
        </label>
        <input
          id="password"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-0 top-6 px-3 flex items-center text-sm text-slate-500 hover:text-slate-700"
        >
          {showPassword ? 'Hide' : 'Show'}
        </button>
      </div>

      <div className="relative">
        <label
          htmlFor="confirmPassword"
          className="block text-sm font-medium text-slate-700"
        >
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type={showConfirmPassword ? 'text' : 'password'}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
        />
        <button
          type="button"
          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          className="absolute inset-y-0 right-0 top-6 px-3 flex items-center text-sm text-slate-500 hover:text-slate-700"
        >
          {showConfirmPassword ? 'Hide' : 'Show'}
        </button>
      </div>

      {error && (
        <p className="text-sm text-red-600 text-center">{error}</p>
      )}

      <button
        type="submit"
        className="w-full bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-transform hover:scale-105 shadow-lg"
      >
        Sign Up
      </button>
    </form>
  );
};

export default AdminSignupForm;