import apiClient from '../api/apiClient';

/**
 * Component to display list of employees with delete functionality
 */
export default function EmployeeList({ employees, onDelete, loading }) {
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await apiClient.delete(`/employees/${id}`);
        onDelete();
      } catch (error) {
        alert(error.message || 'Failed to delete employee');
      }
    }
  };

  if (loading) {
    return null; // Loading handled by parent
  }

  if (!employees || employees.length === 0) {
    return (
      <div className="card p-12 sm:p-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400 mb-5">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.196-2.137M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.196-2.137M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <p className="text-neutral-600 font-medium">No employees found</p>
        <p className="text-neutral-400 text-sm mt-1">Add your first employee to get started</p>
      </div>
    );
  }

  return (
    <div className="card overflow-hidden">
      <div className="px-6 py-4 sm:px-8 sm:py-5 border-b border-neutral-200/80">
        <h2 className="text-lg font-semibold text-neutral-900">Employees <span className="text-neutral-500 font-normal">({employees.length})</span></h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200/80">
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider sm:px-8">
                Employee ID
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider sm:px-8">
                Full Name
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider sm:px-8">
                Email
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider sm:px-8">
                Department
              </th>
              <th className="px-6 py-3.5 text-right text-xs font-semibold text-neutral-500 uppercase tracking-wider sm:px-8">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {employees.map((employee) => (
              <tr key={employee._id || employee.id} className="transition-colors hover:bg-neutral-50/80">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-neutral-900 sm:px-8">
                  {employee.employeeId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 sm:px-8">
                  {employee.fullName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-600 sm:px-8">
                  {employee.email}
                </td>
                <td className="px-6 py-4 whitespace-nowrap sm:px-8">
                  <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-primary-50 text-primary-700">
                    {employee.department}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium sm:px-8">
                  <button
                    onClick={() => handleDelete(employee._id || employee.id)}
                    className="text-red-600 hover:text-red-700 hover:underline transition-colors"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
