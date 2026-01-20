const { z } = require('zod');

/**
 * Validation schemas for employee endpoints
 */
const createEmployeeSchema = z.object({
  employeeId: z
    .string()
    .min(1, 'Employee ID is required')
    .trim(),
  fullName: z
    .string()
    .min(1, 'Full name is required')
    .trim(),
  email: z
    .string()
    .email('Please provide a valid email address')
    .trim()
    .toLowerCase(),
  department: z
    .string()
    .min(1, 'Department is required')
    .trim(),
});

module.exports = {
  createEmployeeSchema,
};
