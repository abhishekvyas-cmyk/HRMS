import { useState } from 'react';
import apiClient from '../api/apiClient';
import { useApi } from '../hooks/useApi';
import AttendanceForm from '../components/AttendanceForm';
import AttendanceList from '../components/AttendanceList';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';

/**
 * Attendance page - Mark and view attendance
 */
export default function Attendance() {
  const [selectedEmployeeId, setSelectedEmployeeId] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  // Fetch employees list
  const {
    data: employeesData,
    loading: employeesLoading,
    error: employeesError,
  } = useApi(() => apiClient.get('/employees'), []);

  // Fetch attendance based on selected filters
  const {
    data: attendanceData,
    loading: attendanceLoading,
    error: attendanceError,
    refetch: refetchAttendance,
  } = useApi(
    () => {
      // If neither employee nor date is selected, don't fetch
      if (!selectedEmployeeId && !selectedDate) {
        return Promise.resolve({ data: [] });
      }
      
      // Build endpoint based on selected filters
      let endpoint = '';
      if (selectedEmployeeId && selectedDate) {
        // Both employee and date selected
        endpoint = `/attendance/${selectedEmployeeId}?date=${selectedDate}`;
      } else if (selectedEmployeeId) {
        // Only employee selected
        endpoint = `/attendance/${selectedEmployeeId}`;
      } else if (selectedDate) {
        // Only date selected (bonus feature)
        endpoint = `/attendance?date=${selectedDate}`;
      }
      
      return apiClient.get(endpoint);
    },
    [selectedEmployeeId, selectedDate, refreshKey]
  );

  const employees = employeesData?.data || employeesData || [];

  const handleMarkAttendance = async (attendanceData) => {
    try {
      await apiClient.post('/attendance', attendanceData);
      setRefreshKey((prev) => prev + 1); // Trigger refetch
      // Auto-select the employee if not already selected
      if (!selectedEmployeeId) {
        setSelectedEmployeeId(attendanceData.employeeId);
      }
    } catch (err) {
      alert(err.message || 'Failed to mark attendance');
      throw err;
    }
  };

  const selectedEmployee = employees.find(
    (emp) => emp.employeeId === selectedEmployeeId
  );
  const employeeName = selectedEmployee
    ? `${selectedEmployee.employeeId} - ${selectedEmployee.fullName}`
    : selectedDate && !selectedEmployeeId
    ? `All Employees - ${new Date(selectedDate).toLocaleDateString()}`
    : '';

  const attendance = attendanceData?.data || attendanceData || [];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Attendance Management</h1>
          <p className="mt-2 text-gray-600">Mark and view employee attendance</p>
        </div>

        <div className="space-y-8">
          {/* Mark Attendance Form */}
          {employeesLoading ? (
            <Loader />
          ) : employeesError ? (
            <ErrorState message={employeesError} />
          ) : (
            <AttendanceForm
              employees={employees}
              onSubmit={handleMarkAttendance}
              loading={false}
            />
          )}

          {/* Filter Section */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold text-gray-800 mb-4">View Attendance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="filterEmployee" className="block text-sm font-medium text-gray-700 mb-1">
                  Select Employee
                </label>
                <select
                  id="filterEmployee"
                  value={selectedEmployeeId}
                  onChange={(e) => setSelectedEmployeeId(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Employee (Optional)</option>
                  {employees.map((employee) => (
                    <option key={employee._id || employee.id} value={employee.employeeId}>
                      {employee.employeeId} - {employee.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="filterDate" className="block text-sm font-medium text-gray-700 mb-1">
                  Filter by Date (Optional)
                </label>
                <input
                  type="date"
                  id="filterDate"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {selectedDate && (
                  <button
                    onClick={() => setSelectedDate('')}
                    className="mt-2 text-sm text-blue-600 hover:text-blue-800"
                  >
                    Clear date filter
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Attendance List */}
          <div>
            {attendanceLoading && <Loader />}
            {attendanceError && <ErrorState message={attendanceError} onRetry={refetchAttendance} />}
            {!attendanceLoading && !attendanceError && (
              <AttendanceList
                attendance={attendance}
                employeeName={employeeName}
                loading={attendanceLoading}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
