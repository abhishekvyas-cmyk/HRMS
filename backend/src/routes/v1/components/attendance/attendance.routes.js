const express = require('express');
const router = express.Router();
const validate = require('../../../../middlewares/validate.middleware');
const { createAttendanceSchema } = require('./attendance.validation');
const {
  markAttendance,
  getAttendanceByEmployee,
  getAttendanceByDate,
} = require('./attendance.controller');

// POST /api/v1/attendance - Mark attendance
router.post('/', validate(createAttendanceSchema), markAttendance);

// GET /api/v1/attendance?date=YYYY-MM-DD - Get attendance by date (bonus)
router.get('/', getAttendanceByDate);

// GET /api/v1/attendance/:employeeId - Get attendance by employee
router.get('/:employeeId', getAttendanceByEmployee);

module.exports = router;
