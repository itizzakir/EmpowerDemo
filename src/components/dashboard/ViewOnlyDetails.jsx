// src/components/dashboard/ViewOnlyDetails.jsx
import React from 'react';

// Reusable item for displaying a key-value pair
const DetailItem = ({ label, value }) => (
  <div className="py-2 sm:grid sm:grid-cols-3 sm:gap-4">
    <dt className="text-sm font-medium text-slate-500">{label}</dt>
    <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
      {value || '-'}
    </dd>
  </div>
);

// Reusable card for each section
const DetailCard = ({ title, children }) => (
  <div className="bg-white p-8 rounded-xl shadow-lg">
    <h3 className="text-2xl font-semibold text-purple-600 mb-6 border-b pb-3">
      {title}
    </h3>
    <dl className="divide-y divide-slate-200">{children}</dl>
  </div>
);

export const PersonalDetailsView = ({ data }) => (
  <DetailCard title="Personal Details">
    <DetailItem label="Full Name" value={data.fullName} />
    <DetailItem label="Date of Birth" value={data.dob} />
    <DetailItem label="Gender" value={data.gender} />
    <DetailItem label="Age" value={data.age} />
    <DetailItem label="Mobile" value={data.mobile} />
    <DetailItem label="Personal Email" value={data.personalMail} />
    <DetailItem
      label="Current Address"
      value={`${data.currentAddress.addressLine1}, ${data.currentAddress.city} - ${data.currentAddress.pinCode}`}
    />
    <DetailItem
      label="Permanent Address"
      value={`${data.permanentAddress.addressLine1}, ${data.permanentAddress.city} - ${data.permanentAddress.pinCode}`}
    />
    <DetailItem
      label="Emergency Contact"
      value={`${data.emergencyContactName} (${data.emergencyContactMobile})`}
    />
  </DetailCard>
);

export const ProfessionalDetailsView = ({ data }) => (
  <DetailCard title="Professional Details">
    <DetailItem label="Employment Code" value={data.employmentCode} />
    <DetailItem label="Company Email" value={data.companyMail} />
    <DetailItem label="Date of Joining" value={data.dateOfJoining} />
    <DetailItem label="Reporting Manager" value={data.reportingManager} />
    <DetailItem label="HR Name" value={data.hrName} />
    <DetailItem label="Office Phone" value={data.officePhone} />
    <DetailItem
      label="Office Address"
      value={`${data.officeAddress.addressLine1}, ${data.city} - ${data.officeAddress.pinCode}`}
    />
    {/* Employment History Table */}
    <div className="py-4">
      <dt className="text-sm font-medium text-slate-500 mb-2">
        Employment History
      </dt>
      <dd className="mt-1 text-sm text-slate-900 sm:mt-0 sm:col-span-2">
        {data.employmentHistory.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1">
            {data.employmentHistory.map((job, idx) => (
              <li key={idx}>
                <strong>{job.companyName}</strong> ({job.joiningDate} to{' '}
                {job.endDate})
              </li>
            ))}
          </ul>
        ) : (
          '-'
        )}
      </dd>
    </div>
  </DetailCard>
);

export const ProjectHistoryView = ({ data }) => (
  <DetailCard title="Project History">
    {data.map((project, idx) => (
      <div key={idx} className="py-4">
        <DetailItem label="Project Name" value={project.clientName} />
        <DetailItem label="Project Code" value={project.projectCode} />
        <DetailItem
          label="Duration"
          value={`${project.startDate} to ${project.endDate}`}
        />
        <DetailItem
          label="Reporting Manager"
          value={project.reportingManager}
        />
      </div>
    ))}
  </DetailCard>
);

export const FinanceView = ({ data }) => (
  <DetailCard title="Finance Details">
    <DetailItem label="PAN Card" value={data.panCard} />
    <DetailItem label="Aadhar Card" value={data.aadharCard} />
    <DetailItem label="Bank Name" value={data.bankName} />
    <DetailItem label="Branch" value={data.branch} />
    <DetailItem label="IFSC Code" value={data.ifscCode} />
  </DetailCard>
);