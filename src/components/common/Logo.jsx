// src/components/common/Logo.jsx
import React from 'react';

const Logo = ({ className, isDashboard }) => {
  const Tag = isDashboard ? 'div' : 'a';

  const props = {
    className: `flex items-center space-x-2 ${className}`,
  };

  if (!isDashboard) {
    props.href = '/';
  }

  return (
    <Tag {...props}>
      {/* --- NEW "COOL" LOGO (Bolt Icon) --- */}
      <svg
        width="32"
        height="32"
        viewBox="0 0 24 24"
        fill="currentColor" // The fill is set to 'currentColor'
        xmlns="http://www.w3.org/2000/svg"
        className="text-purple-600" // This class provides the actual color
      >
        {/* Solid 'bolt' icon from Heroicons */}
        <path
          fillRule="evenodd" // Changed to camelCase for React
          d="M14.615 1.595a.75.75 0 01.359.852L12.982 9.75h3.268a.75.75 0 01.53 1.28l-6.75 6.75a.75.75 0 01-1.06 0l-6.75-6.75a.75.75 0 01.53-1.28h3.268L9.026 2.447a.75.75 0 01.359-.852l5.23-1.746z"
          clipRule="evenodd" // Changed to camelCase for React
        />
      </svg>
      {/* --- End of new logo --- */}

      <span className="text-2xl font-bold text-slate-800">Empower</span>
    </Tag>
  );
};

export default Logo;