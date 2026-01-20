import { useState } from 'react';
import apiClient from '../api/apiClient';
import { useApi } from '../hooks/useApi';
import EmployeeForm from '../components/EmployeeForm';
import EmployeeList from '../components/EmployeeList';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';

/**
 * Employees page - Manage employee list
 */
export default function Employees() {
  const [refreshKey, setRefreshKey] = useState(0);
  const { data, loading, error, refetch } = useApi(
    () => apiClient.get('/employees'),
    [refreshKey]
  );

  const handleAddEmployee = async (employeeData) => {
    try {
      await apiClient.post('/employees', employeeData);
      setRefreshKey((prev) => prev + 1); // Trigger refetch
    } catch (err) {
      alert(err.message || 'Failed to add employee');
      throw err; // Re-throw to prevent form reset
    }
  };

  const handleDelete = () => {
    setRefreshKey((prev) => prev + 1); // Trigger refetch
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Employee Management</h1>
          <p className="mt-1.5 text-neutral-500">Add and manage your employees</p>
        </div>

        <div className="space-y-10">
          {/* Add Employee Form */}
          <EmployeeForm onSubmit={handleAddEmployee} loading={false} />

          {/* Employee List */}
          <div>
            {loading && <Loader />}
            {error && <ErrorState message={error} onRetry={refetch} />}
            {!loading && !error && (
              <EmployeeList
                employees={data?.data || data || []}
                onDelete={handleDelete}
                loading={loading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
