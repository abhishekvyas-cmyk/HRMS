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
    <div className="min-h-[calc(100vh-4rem)] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-bold text-neutral-900 tracking-tight">Attendance Management</h1>
          <p className="mt-1.5 text-neutral-500">Mark and view employee attendance</p>
        </div>

        <div className="space-y-10">
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
          <div className="card p-6">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">View Attendance</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="filterEmployee" className="block text-sm font-medium text-neutral-700 mb-1.5">
                  Select Employee
                </label>
                <select
                  id="filterEmployee"
                  value={selectedEmployeeId}
                  onChange={(e) => setSelectedEmployeeId(e.target.value)}
                  className="input-base"
                >
                  <option value="">Select Employee (Optional)</option>
                  {employees.map((employee) => (
                    <option key={employee._id || employee.id} value={employee.employeeId}>
                      {employee.employeeId} - {employee.fullName}
                    </option>
                  ))}
                </select>
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
