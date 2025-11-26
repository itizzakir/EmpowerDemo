// src/components/landing/FinalCTA.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const FinalCTA = () => {
  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
          Empowering Teams at 1,500+ Leading Organizations
        </h2>
        <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
          Ready to free your team from admin overload and focus on what truly matters? See how Empower can transform your workplace.        </p>
        <Link to="/request-demo">
        <button className="bg-purple-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-transform hover:scale-105 shadow-lg">
          Request a Demo
        </button>
        </Link>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 mt-16">
          <img src="https://logo.clearbit.com/spotify.com" alt="Spotify" className="h-10 opacity-60" />
          <img src="https://logo.clearbit.com/segment.com" alt="Segment" className="h-10 opacity-60" />
          <img src="https://logo.clearbit.com/zapier.com" alt="Zapier" className="h-10 opacity-60" />
          <img src="https://logo.clearbit.com/notion.so" alt="Notion" className="h-10 opacity-60" />
          <img src="https://logo.clearbit.com/figma.com" alt="Figma" className="h-10 opacity-60" />
        </div>
      </div>
    </section>
  );};

export default FinalCTA;