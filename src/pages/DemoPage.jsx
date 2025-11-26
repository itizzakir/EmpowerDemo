// src/pages/DemoPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/common/Logo';

const DemoPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center py-12 px-4">
      <div className="mb-8">
        <Logo />
      </div>
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
        <h2 className="text-3xl font-extrabold text-slate-900 mb-6">
          Request a Demo
        </h2>
        <p className="text-slate-600 mb-8">
          We're excited to show you how our Employee Management System can help your business. Please fill out the form below to request a demo.
        </p>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 text-left">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 text-left">
              Company Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-slate-700 text-left">
              Company Name
            </label>
            <input
              id="company"
              type="text"
              required
              className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-transform hover:scale-105 shadow-lg"
          >
            Submit Request
          </button>
        </form>
        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-purple-600 hover:text-purple-800">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DemoPage;
