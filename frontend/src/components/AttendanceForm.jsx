import { useState } from 'react';
import { ATTENDANCE_STATUS } from '../utils/constants';

/**
 * Form component for marking attendance
 */
export default function AttendanceForm({ employees, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    employeeId: '',
    date: new Date().toISOString().split('T')[0], // Today's date
    status: ATTENDANCE_STATUS.PRESENT,
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
    if (!formData.employeeId) {
      newErrors.employeeId = 'Please select an employee';
    }
    if (!formData.date) {
      newErrors.date = 'Date is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
      // Reset form (keep date as today)
      setFormData((prev) => ({
        ...prev,
        employeeId: '',
        status: ATTENDANCE_STATUS.PRESENT,
      }));
    }
  };

  if (!employees || employees.length === 0) {
    return (
      <div className="card p-6">
        <p className="text-neutral-500 text-center">No employees available. Please add employees first.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="card p-6 sm:p-8">
      <h2 className="text-xl font-semibold text-neutral-900 mb-6">Mark Attendance</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
        <div>
          <label htmlFor="employeeId" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Employee <span className="text-red-500">*</span>
          </label>
          <select
            id="employeeId"
            name="employeeId"
            value={formData.employeeId}
            onChange={handleChange}
            className={`input-base ${errors.employeeId ? 'input-error' : ''}`}
          >
            <option value="">Select Employee</option>
            {employees.map((employee) => (
              <option key={employee._id || employee.id} value={employee.employeeId}>
                {employee.employeeId} - {employee.fullName}
              </option>
            ))}
          </select>
          {errors.employeeId && (
            <p className="text-red-500 text-xs mt-1.5">{errors.employeeId}</p>
          )}
        </div>

        <div>
          <label htmlFor="date" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            max={new Date().toISOString().split('T')[0]} // Cannot select future dates
            className={`input-base ${errors.date ? 'input-error' : ''}`}
          />
          {errors.date && (
            <p className="text-red-500 text-xs mt-1.5">{errors.date}</p>
          )}
        </div>

        <div>
          <label htmlFor="status" className="block text-sm font-medium text-neutral-700 mb-1.5">
            Status <span className="text-red-500">*</span>
          </label>
          <select
            id="status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="input-base"
          >
            <option value={ATTENDANCE_STATUS.PRESENT}>Present</option>
            <option value={ATTENDANCE_STATUS.ABSENT}>Absent</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="btn-primary mt-6"
      >
        {loading ? 'Marking...' : 'Mark Attendance'}
      </button>
    </form>
  );
}
