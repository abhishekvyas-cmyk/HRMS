/**
 * Component to display attendance records for a selected employee
 */
export default function AttendanceList({ attendance, employeeName, loading }) {
  if (loading) {
    return null; // Loading handled by parent
  }

  if (!attendance || attendance.length === 0) {
    return (
      <div className="card p-12 sm:p-16 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100 text-neutral-400 mb-5">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
          </svg>
        </div>
        <p className="text-neutral-600 font-medium">No attendance records found</p>
        <p className="text-neutral-400 text-sm mt-1">
          {employeeName ? `No records for ${employeeName}` : 'Select an employee to view attendance'}
        </p>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  // Calculate statistics
  const presentCount = attendance.filter((a) => a.status === 'Present').length;
  const absentCount = attendance.filter((a) => a.status === 'Absent').length;
  const totalDays = attendance.length;

  return (
    <div className="card overflow-hidden">
      <div className="px-6 py-4 sm:px-8 sm:py-5 border-b border-neutral-200/80">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              Attendance Records {employeeName && <span className="font-normal text-neutral-500">– {employeeName}</span>}
            </h2>
            {totalDays > 0 && (
              <p className="text-sm text-neutral-500 mt-1">
                Total: {totalDays} days · Present: {presentCount} · Absent: {absentCount}
              </p>
            )}
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-200/80">
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider sm:px-8">
                Date
              </th>
              <th className="px-6 py-3.5 text-left text-xs font-semibold text-neutral-500 uppercase tracking-wider sm:px-8">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {attendance.map((record, index) => (
              <tr key={record._id || record.id || index} className="transition-colors hover:bg-neutral-50/80">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700 sm:px-8">
                  {formatDate(record.date)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap sm:px-8">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium ${
                      record.status === 'Present'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-red-50 text-red-700'
                    }`}
                  >
                    {record.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
