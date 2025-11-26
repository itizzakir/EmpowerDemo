// src/components/sections/SuccessMetrics.jsx
import React from 'react';

const Metric = ({ value, description, detail }) => (
  <div className="text-center">
    <h3 className="text-4xl font-extrabold text-purple-600 mb-2">{value}</h3>
    <p className="text-lg font-semibold text-slate-800">{description}</p>
    <p className="text-slate-500">{detail}</p>  </div>
);

const SuccessMetrics = () => {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900">What Success Looks Like with Empower</h2>
          <p className="text-lg text-slate-600 mt-4 max-w-2xl mx-auto">
            Our customers save time, boost engagement, and build better workplaces.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Metric value="45%" description="Less Admin Time" detail="spent on manual HR tasks." />
          <Metric value="2x" description="Faster Review Cycles" detail="with automated performance management." />
          <Metric value="+23pts" description="Increase in Engagement" detail="in the first year of implementation." />
        </div>
      </div>
    </section>
  );
};

export default SuccessMetrics;