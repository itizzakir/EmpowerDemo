// src/components/dashboard/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = ({ role }) => {
  const adminLinks = [
    { name: 'Employees', path: '/dashboard/admin' },
    // Add more admin links here
  ];

  const employeeLinks = [
    { name: 'My Details', path: '/dashboard/employee' },
    // Add more employee links here
  ];

  const links = role === 'admin' ? adminLinks : employeeLinks;

  return (
    <aside className="w-64 bg-white shadow-md">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-slate-800">Dashboard</h2>
      </div>
      <nav>
        <ul>
          {links.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `block px-6 py-3 text-slate-600 hover:bg-slate-100 hover:text-purple-600 ${
                    isActive ? 'bg-slate-100 text-purple-600' : ''
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
