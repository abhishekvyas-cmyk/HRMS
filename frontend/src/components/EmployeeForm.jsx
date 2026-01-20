import { useState } from 'react';
import { DEPARTMENTS } from '../utils/constants';

/**
 * Form component for adding new employees
 */
export default function EmployeeForm({ onSubmit, loading }) {
  const [formData, setFormData] = useState({
    employeeId: '',
    fullName: '',
    email: '',
    department: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.employeeId.trim()) {
      newErrors.employeeId = 'Employee ID is required';
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.department) {
      newErrors.department = 'Department is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      // Reset form
      setFormData({
        employeeId: '',
        fullName: '',
        email: '',
        department: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="card p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-neutral-900 mb-6">Add New Employee</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
        <div>
          <label htmlFor="employeeId" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Employee ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="employeeId"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className={`input-base ${errors.employeeId ? 'input-error' : ''}`}
            placeholder="EMP001"
          />
          {errors.employeeId && (
            <p className="text-red-500 text-xs mt-1.5">{errors.employeeId}</p>
          )}
        </div>

        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`input-base ${errors.fullName ? 'input-error' : ''}`}
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs mt-1.5">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`input-base ${errors.email ? 'input-error' : ''}`}
            placeholder="john.doe@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1.5">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="department" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Department <span className="text-red-500">*</span>
          </label>
          <select
            id="department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            className={`input-base ${errors.department ? 'input-error' : ''}`}
          >
            <option value="">Select Department</option>
            {DEPARTMENTS.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="text-red-500 text-xs mt-1.5">{errors.department}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary mt-6"
      >
        {loading ? 'Adding...' : 'Add Employee'}
      </button>
    </form>
  );
}
