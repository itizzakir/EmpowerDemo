import React from 'react';

const Integrations = () => {
  return (
    <section id="integrations" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6">
          Seamlessly Connected to Your Favorite Tools
        </h2>
        <p className="text-lg text-slate-600 mb-12 max-w-3xl mx-auto">
          Integrate with Google Workspace, Slack, Jira, Outlook, and more. Make HR processes part of the daily workflow, not extra work.
        </p>
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8">
          <img src="https://logo.clearbit.com/google.com" alt="Google Logo" className="h-10 opacity-60" />
          <img src="https://logo.clearbit.com/slack.com" alt="Slack Logo" className="h-10 opacity-60" />
          <img src="https://logo.clearbit.com/atlassian.com" alt="Jira (Atlassian) Logo" className="h-10 opacity-60" />
          <img src="https://logo.clearbit.com/microsoft.com" alt="Microsoft Logo" className="h-10 opacity-60" />
          <img src="https://logo.clearbit.com/greenhouse.io" alt="Greenhouse Logo" className="h-10 opacity-60" />
        </div>
      </div>
    </section>
  );
};

export default Integrations;