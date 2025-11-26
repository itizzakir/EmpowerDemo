// src/components/landing/Hero.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight mb-6">
          The All-in-One Platform to Manage & Grow Your People
        </h1>
        <p className="text-lg text-slate-600 mb-10 max-w-3xl mx-auto">
          From HRIS and payroll to performance and engagement, Empower unites everything you need to build a thriving workplace and empower your teams.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link to="/request-demo">
          <button className="bg-purple-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-transform hover:scale-105 shadow-lg">
            Request a Demo
          </button>
          </Link>
          <Link to="/#features">
          <button className="bg-white text-slate-700 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-slate-100 transition-transform hover:scale-105 border border-slate-300 shadow-lg">
            See Features
          </button>
          </Link>
        </div>
        <div className="relative max-w-5xl mx-auto mt-16">
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80"
            alt="A diverse team collaborating on a project board"
            className="rounded-xl shadow-2xl mx-auto"
          />
        </div>      </div>
    </section>
  );
};

export default Hero;