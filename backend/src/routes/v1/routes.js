const express = require('express');
const router = express.Router();

// Import route modules
const employeeRoutes = require('./components/employee/employee.routes');
const attendanceRoutes = require('./components/attendance/attendance.routes');

// Mount routes
router.use('/employees', employeeRoutes);
router.use('/attendance', attendanceRoutes);

module.exports = router;
