// src/components/dashboard/EmployeeForm.jsx
import React, { useState, useEffect } from 'react';

// Reusable Input Field
const FormInput = ({ label, id, ...props }) => (
  <div className="col-span-12 sm:col-span-6 md:col-span-4">
    <label htmlFor={id} className="block text-sm font-medium text-slate-700">
      {label}
    </label>
    <input
      id={id}
      {...props}
      className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 disabled:bg-slate-100"
    />
  </div>
);

// Reusable Address Fields
const AddressFields = ({ legend, data, onChange }) => (
  <fieldset className="col-span-12 sm:col-span-6 grid grid-cols-12 gap-4 border p-4 rounded-md">
    <legend className="text-sm font-medium text-slate-800 px-1">
      {legend}
    </legend>
    <FormInput
      label="Address Line 1"
      id={`${legend}.addressLine1`}
      value={data.addressLine1}
      onChange={onChange}
      required
    />
    <FormInput
      label="Address Line 2"
      id={`${legend}.addressLine2`}
      value={data.addressLine2}
      onChange={onChange}
    />
    <FormInput
      label="City"
      id={`${legend}.city`}
      value={data.city}
      onChange={onChange}
      required
    />
    <FormInput
      label="Pin Code"
      id={`${legend}.pinCode`}
      value={data.pinCode}
      onChange={onChange}
      pattern="\d{6}"
      title="Pin code must be 6 digits"
      required
    />
  </fieldset>
);

const EmployeeForm = ({ employeeToEdit, onSave, onCancel }) => {
  const isEditMode = !!employeeToEdit;

  const getInitialState = () => {
    if (isEditMode) return employeeToEdit;
    // Default structure for a new employee
    return {
      personalDetails: {
        fullName: '',
        dob: '',
        gender: '',
        age: '',
        currentAddress: {
          city: '',
          addressLine1: '',
          addressLine2: '',
          pinCode: '',
        },
        permanentAddress: {
          city: '',
          addressLine1: '',
          addressLine2: '',
          pinCode: '',
        },
        mobile: '',
        personalMail: '',
        emergencyContactName: '',
        emergencyContactMobile: '',
      },
      professionalDetails: {
        employmentCode: '',
        companyMail: '',
        officePhone: '',
        city: '',
        officeAddress: { addressLine1: '', addressLine2: '', pinCode: '' },
        reportingManager: '',
        hrName: '',
        employmentHistory: [], // { companyName, joiningDate, endDate }
        dateOfJoining: '',
      },
      projectDetails: [], // { projectCode, startDate, endDate, clientName, reportingManager }
      financeDetails: {
        panCard: '',
        aadharCard: '',
        bankName: '',
        branch: '',
        ifscCode: '',
        ctcBreakup: '',
      },
    };
  };

  const [formData, setFormData] = useState(getInitialState);

  // Simple deep-set for nested form data
  const handleChange = (e) => {
    const { id, value } = e.target;
    const [section, field, subField] = id.split('.');

    if (subField) {
      // Handles nested objects like addresses
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: {
            ...prev[section][field],
            [subField]: value,
          },
        },
      }));
    } else {
      // Handles direct fields
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation logic here
    onSave(formData);
  };

  // Note: Project & Employment History list management is omitted for brevity
  // but would involve adding/removing items from the formData state arrays.

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* --- Personal Details --- */}
      <fieldset className="grid grid-cols-12 gap-6">
        <legend className="col-span-12 text-lg font-semibold text-purple-600 border-b pb-2 mb-2">
          Personal Details
        </legend>
        <FormInput
          label="Full Name"
          id="personalDetails.fullName"
          value={formData.personalDetails.fullName}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Date of Birth"
          id="personalDetails.dob"
          type="date"
          value={formData.personalDetails.dob}
          onChange={handleChange}
          disabled={isEditMode} // Per spec
          required
        />
        <div className="col-span-12 sm:col-span-6 md:col-span-4">
          <label
            htmlFor="personalDetails.gender"
            className="block text-sm font-medium text-slate-700"
          >
            Gender
          </label>
          <select
            id="personalDetails.gender"
            value={formData.personalDetails.gender}
            onChange={handleChange}
            disabled={isEditMode} // Per spec
            required
            className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 disabled:bg-slate-100"
          >
            <option value="">Select...</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <FormInput
          label="Age"
          id="personalDetails.age"
          type="number"
          max="999"
          value={formData.personalDetails.age}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Mobile"
          id="personalDetails.mobile"
          pattern="\d{10}"
          title="Mobile must be 10 digits"
          value={formData.personalDetails.mobile}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Personal Email"
          id="personalDetails.personalMail"
          type="email"
          value={formData.personalDetails.personalMail}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Emergency Contact Name"
          id="personalDetails.emergencyContactName"
          value={formData.personalDetails.emergencyContactName}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Emergency Contact Mobile"
          id="personalDetails.emergencyContactMobile"
          pattern="\d{10}"
          title="Mobile must be 10 digits"
          value={formData.personalDetails.emergencyContactMobile}
          onChange={handleChange}
          required
        />
        <AddressFields
          legend="Current Address"
          data={formData.personalDetails.currentAddress}
          onChange={handleChange}
        />
        <AddressFields
          legend="Permanent Address"
          data={formData.personalDetails.permanentAddress}
          onChange={handleChange}
        />
      </fieldset>

      {/* --- Professional Details --- */}
      <fieldset className="grid grid-cols-12 gap-6">
        <legend className="col-span-12 text-lg font-semibold text-purple-600 border-b pb-2 mb-2">
          Professional Details
        </legend>
        <FormInput
          label="Employment Code"
          id="professionalDetails.employmentCode"
          pattern="\d{6}"
          title="Must be 6 digits"
          value={formData.professionalDetails.employmentCode}
          onChange={handleChange}
          disabled={isEditMode} // Per spec
          required
        />
        <FormInput
          label="Company Email"
          id="professionalDetails.companyMail"
          type="email"
          value={formData.professionalDetails.companyMail}
          onChange={handleChange}
          disabled={isEditMode} // Per spec
          required
        />
        <FormInput
          label="Date of Joining"
          id="professionalDetails.dateOfJoining"
          type="date"
          value={formData.professionalDetails.dateOfJoining}
          onChange={handleChange}
          disabled={isEditMode} // Per spec
          required
        />
        <FormInput
          label="Office Phone"
          id="professionalDetails.officePhone"
          pattern="\d{8,12}"
          title="Must be 8-12 digits"
          value={formData.professionalDetails.officePhone}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Reporting Manager (Email/Code)"
          id="professionalDetails.reportingManager"
          value={formData.professionalDetails.reportingManager}
          onChange={handleChange}
          required
        />
        <FormInput
          label="HR Name"
          id="professionalDetails.hrName"
          value={formData.professionalDetails.hrName}
          onChange={handleChange}
          required
        />
        <AddressFields
          legend="Office Address"
          data={formData.professionalDetails.officeAddress}
          onChange={handleChange}
        />
        {/* Employment History & Project Details are complex lists and omitted for setup brevity */}
      </fieldset>

      {/* --- Finance Details --- */}
      <fieldset className="grid grid-cols-12 gap-6">
        <legend className="col-span-12 text-lg font-semibold text-purple-600 border-b pb-2 mb-2">
          Finance Details
        </legend>
        <FormInput
          label="Pan Card"
          id="financeDetails.panCard"
          value={formData.financeDetails.panCard}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Aadhar Card"
          id="financeDetails.aadharCard"
          value={formData.financeDetails.aadharCard}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Bank Name"
          id="financeDetails.bankName"
          value={formData.financeDetails.bankName}
          onChange={handleChange}
          required
        />
        <FormInput
          label="Branch"
          id="financeDetails.branch"
          value={formData.financeDetails.branch}
          onChange={handleChange}
          required
        />
        <FormInput
          label="IFSC Code"
          id="financeDetails.ifscCode"
          value={formData.financeDetails.ifscCode}
          onChange={handleChange}
          required
        />
        <FormInput
          label="CTC Breakup"
          id="financeDetails.ctcBreakup"
          value={formData.financeDetails.ctcBreakup}
          onChange={handleChange}
          required
        />
      </fieldset>

      {/* --- Actions --- */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="bg-white text-slate-700 px-6 py-2 rounded-lg font-semibold hover:bg-slate-100 border border-slate-300"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700"
        >
          Save Employee
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;