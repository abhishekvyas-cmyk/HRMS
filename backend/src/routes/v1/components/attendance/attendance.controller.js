const Attendance = require('../../../../models/attendance.model');
const Employee = require('../../../../models/employee.model');
const { successResponse, errorResponse } = require('../../../../utils/apiResponse');

/**
 * Mark attendance for an employee
 */
const markAttendance = async (req, res, next) => {
  try {
    const { employeeId, date, status } = req.body;

    // Find employee by employeeId
    const employee = await Employee.findOne({ employeeId });

    if (!employee) {
      return errorResponse(res, 404, 'Employee not found');
    }

    // Create attendance record
    const attendance = await Attendance.create({
      employee: employee._id,
      date,
      status,
    });

    // Populate employee info
    await attendance.populate('employee', 'employeeId fullName email department');

    return successResponse(
      res,
      201,
      'Attendance marked successfully',
      attendance
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get attendance records for a specific employee
 */
const getAttendanceByEmployee = async (req, res, next) => {
  try {
    const { employeeId } = req.params;

    // Find employee by employeeId
    const employee = await Employee.findOne({ employeeId });

    if (!employee) {
      return errorResponse(res, 404, 'Employee not found');
    }

    // Get attendance records
    const attendance = await Attendance.find({ employee: employee._id })
      .populate('employee', 'employeeId fullName email department')
      .sort({ date: -1 });

    return successResponse(
      res,
      200,
      'Attendance records fetched successfully',
      attendance
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get attendance records filtered by date
 */
const getAttendanceByDate = async (req, res, next) => {
  try {
    const { date } = req.query;

    if (!date) {
      return errorResponse(res, 400, 'Date query parameter is required');
    }

    // Validate date format
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return errorResponse(res, 400, 'Date must be in YYYY-MM-DD format');
    }

    const startDate = new Date(date);
    startDate.setHours(0, 0, 0, 0);

    const endDate = new Date(date);
    endDate.setHours(23, 59, 59, 999);

    const attendance = await Attendance.find({
      date: {
        $gte: startDate,
        $lte: endDate,
      },
    })
      .populate('employee', 'employeeId fullName email department')
      .sort({ createdAt: -1 });

    return successResponse(
      res,
      200,
      'Attendance records fetched successfully',
      attendance
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  markAttendance,
  getAttendanceByEmployee,
  getAttendanceByDate,
};
