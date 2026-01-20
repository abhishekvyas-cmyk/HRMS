const { z } = require('zod');

/**
 * Validation schemas for attendance endpoints
 */
const createAttendanceSchema = z.object({
  employeeId: z
    .string()
    .min(1, 'Employee ID is required')
    .trim(),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be in YYYY-MM-DD format')
    .transform((str) => new Date(str)),
  status: z.enum(['Present', 'Absent'], {
    errorMap: () => ({ message: 'Status must be either Present or Absent' }),
  }),
});

module.exports = {
  createAttendanceSchema,
};
