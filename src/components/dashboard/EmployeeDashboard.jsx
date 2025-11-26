// src/components/dashboard/EmployeeDashboard.jsx
import React from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  PersonalDetailsView,
  ProfessionalDetailsView,
  ProjectHistoryView,
  FinanceView,
} from './ViewOnlyDetails';

const EmployeeDashboard = ({ employee }) => {
  const handleDownloadPayslips = () => {
    const doc = new jsPDF();
    doc.text('Payslips - Last 6 Months', 14, 16);

    autoTable(doc, {
      startY: 20,
      head: [['Month', 'Year', 'Basic', 'Allowances', 'Deductions', 'Net Salary']],
      body: employee.financeDetails.payslips.map(p => [p.month, p.year, p.basic, p.allowances, p.deductions, p.net]),
      theme: 'striped',
      headStyles: { fillColor: [75, 85, 99] },
    });

    doc.save(`${employee.personalDetails.fullName.replace(' ', '_')}_payslips.pdf`);
  };

  const handleGeneratePdf = () => {
    const doc = new jsPDF();
    
    doc.text('Employee Details', 14, 16);
    
    // Personal Details
    autoTable(doc, {
      startY: 20,
      head: [['Personal Details', '']],
      body: Object.entries(employee.personalDetails).map(([key, value]) => {
        if (key === 'currentAddress' || key === 'permanentAddress') {
          return [key, `${value.addressLine1}, ${value.city} - ${value.pinCode}`];
        }
        if (typeof value === 'object' && value !== null) {
          return [key, '']; // Skip other objects for now
        }
        return [key, value];
      }),
      theme: 'striped',
      headStyles: { fillColor: [75, 85, 99] },
    });

    // Professional Details
    autoTable(doc, {
      head: [['Professional Details', '']],
      body: Object.entries(employee.professionalDetails).map(([key, value]) => {
        if (key === 'officeAddress') {
            return [key, `${value.addressLine1}, ${employee.professionalDetails.city} - ${value.pinCode}`];
        }
        if (key === 'employmentHistory') {
            return [key, value.map(job => `${job.companyName} (${job.joiningDate} to ${job.endDate})`).join('\n')];
        }
        if (typeof value === 'object' && value !== null) {
            return [key, '']; // Skip other objects
        }
        return [key, value];
      }),
      theme: 'striped',
      headStyles: { fillColor: [75, 85, 99] },
    });

    // Project Details
    autoTable(doc, {
        head: [['Project Details', 'Client', 'Start Date', 'End Date']],
        body: employee.projectDetails.map(p => [p.projectCode, p.clientName, p.startDate, p.endDate]),
        theme: 'striped',
        headStyles: { fillColor: [75, 85, 99] },
      });

    // Finance Details
    autoTable(doc, {
      head: [['Finance Details', '']],
      body: Object.entries(employee.financeDetails).map(([key, value]) => [key, value]),
      theme: 'striped',
      headStyles: { fillColor: [75, 85, 99] },
    });
    
    doc.save(`${employee.personalDetails.fullName.replace(' ', '_')}_details.pdf`);
  };

  return (
    <div className="space-y-8">
      {/* --- Action Buttons --- */}
      <div className="bg-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">My Payslips</h2>
          <p className="text-slate-600 mt-1">Download your payslips for the last 6 months.</p>
        </div>
        <button
          onClick={handleDownloadPayslips}
          className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
        >
          <svg className="-ml-0.5 mr-1.5 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download Payslips
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-lg flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">My Details</h2>
          <p className="text-slate-600 mt-1">Download all your details as a PDF.</p>
        </div>
        <button
          onClick={handleGeneratePdf}
          className="inline-flex items-center justify-center rounded-lg bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          <svg className="-ml-0.5 mr-1.5 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
          Download PDF
        </button>
      </div>

      {/* --- Details Sections --- */}
      <div className="bg-white p-8 rounded-2xl shadow-lg">
        <PersonalDetailsView data={employee.personalDetails} />
        <ProfessionalDetailsView data={employee.professionalDetails} />
        <ProjectHistoryView data={employee.projectDetails} />
        <FinanceView data={employee.financeDetails} />
      </div>
    </div>
  );
};

export default EmployeeDashboard;