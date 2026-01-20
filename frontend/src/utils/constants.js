// API Base URL from environment variable
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';

// Attendance status options
export const ATTENDANCE_STATUS = {
  PRESENT: 'Present',
  ABSENT: 'Absent',
};

// Common departments (can be extended)
export const DEPARTMENTS = [
  'HR',
  'IT',
  'Finance',
  'Marketing',
  'Sales',
  'Operations',
  'Admin',
];