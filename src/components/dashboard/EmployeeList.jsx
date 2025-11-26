// src/components/dashboard/EmployeeList.jsx
import React from 'react';

const EmployeeList = ({ employees, onEdit, onDelete, onView }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-slate-200">
        <thead className="bg-slate-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Avatar
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Emp Code
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Company Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Manager
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
              Current Project
            </th>
            <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-slate-200">
          {employees.map((emp) => (
            <tr key={emp.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <img className="h-10 w-10 rounded-full" src={emp.personalDetails.avatarUrl} alt={emp.personalDetails.fullName} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">
                {emp.professionalDetails.employmentCode}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                {emp.personalDetails.fullName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                {emp.professionalDetails.companyMail}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                {emp.professionalDetails.reportingManager}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-700">
                {
                  emp.projectDetails.find((p) => p.endDate === 'Present')
                    ?.clientName
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right space-x-2">
                <button
                  onClick={() => onView(emp)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  View
                </button>
                <button
                  onClick={() => onEdit(emp)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(emp.id)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;