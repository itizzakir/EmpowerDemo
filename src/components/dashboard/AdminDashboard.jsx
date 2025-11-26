// src/components/dashboard/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { employeeUsers as initialData } from '../../data/mockData';
import EmployeeList from './EmployeeList';
import EmployeeForm from './EmployeeForm';
import {
  PersonalDetailsView,
  ProfessionalDetailsView,
  ProjectHistoryView,
  FinanceView,
} from './ViewOnlyDetails';

// Simple Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
          <button
            onClick={onClose}
            className="text-slate-500 hover:text-slate-800"
          >
            &times;
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [employees, setEmployees] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [employeeToView, setEmployeeToView] = useState(null);

  useEffect(() => {
    const savedEmployees = localStorage.getItem('employees');
    if (savedEmployees) {
      setEmployees(JSON.parse(savedEmployees));
    } else {
      setEmployees(initialData);
      localStorage.setItem('employees', JSON.stringify(initialData));
    }
  }, []);

  const handleOpenAddModal = () => {
    setEmployeeToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (employee) => {
    setEmployeeToEdit(employee);
    setIsModalOpen(true);
  };

  const handleOpenViewModal = (employee) => {
    setEmployeeToView(employee);
    setIsViewModalOpen(true);
  };

  const handleDeleteEmployee = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      const updatedEmployees = employees.filter((emp) => emp.id !== id);
      setEmployees(updatedEmployees);
      localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    }
  };

  const handleSaveEmployee = (formData) => {
    let updatedEmployees;
    if (employeeToEdit) {
      // Edit
      updatedEmployees = employees.map((emp) =>
        emp.id === employeeToEdit.id ? formData : emp
      );
    } else {
      // Add
      const newEmployee = { ...formData, id: `emp${Date.now()}` }; // more unique id
      updatedEmployees = [...employees, newEmployee];
    }
    setEmployees(updatedEmployees);
    localStorage.setItem('employees', JSON.stringify(updatedEmployees));
    setIsModalOpen(false);
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data? This will clear all changes and restore the original employee list.')) {
      localStorage.removeItem('employees');
      window.location.reload();
    }
  };

  const handleGeneratePdf = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [['Emp Code', 'Name', 'Company Email', 'Manager']],
      body: employees.map(emp => [
        emp.professionalDetails.employmentCode,
        emp.personalDetails.fullName,
        emp.professionalDetails.companyMail,
        emp.professionalDetails.reportingManager
      ])
    });
    doc.save('employee-list.pdf');
  };

  return (
    <div className="bg-white p-8 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold text-slate-800">Employee Management</h2>
        <div className="flex space-x-2">
          <button
            onClick={handleOpenAddModal}
            className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
          >
            <svg className="-ml-0.5 mr-1.5 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Add Employee
          </button>
          <button
            onClick={handleResetData}
            className="inline-flex items-center justify-center rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Reset Data
          </button>
          <button
            onClick={handleGeneratePdf}
            className="inline-flex items-center justify-center rounded-lg bg-gray-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
          >
            Generate PDF
          </button>
        </div>
      </div>

      <EmployeeList
        employees={employees}
        onEdit={handleOpenEditModal}
        onDelete={handleDeleteEmployee}
        onView={handleOpenViewModal}
      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={employeeToEdit ? 'Edit Employee Details' : 'Add New Employee'}
      >
        <EmployeeForm
          employeeToEdit={employeeToEdit}
          onSave={handleSaveEmployee}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>

      {employeeToView && (
        <Modal
          isOpen={isViewModalOpen}
          onClose={() => setIsViewModalOpen(false)}
          title={`Details for ${employeeToView.personalDetails.fullName}`}
        >
          <div className="space-y-8">
            <PersonalDetailsView data={employeeToView.personalDetails} />
            <ProfessionalDetailsView data={employeeToView.professionalDetails} />
            <ProjectHistoryView data={employeeToView.projectDetails} />
            <FinanceView data={employeeToView.financeDetails} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AdminDashboard;