const Employee = require('../../../../models/employee.model');
const { successResponse, errorResponse } = require('../../../../utils/apiResponse');

/**
 * Create a new employee
 */
const createEmployee = async (req, res, next) => {
  try {
    const { employeeId, fullName, email, department } = req.body;

    const employee = await Employee.create({
      employeeId,
      fullName,
      email,
      department,
    });

    return successResponse(
      res,
      201,
      'Employee created successfully',
      employee
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Get all employees
 */
const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });

    return successResponse(
      res,
      200,
      'Employees fetched successfully',
      employees
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Delete employee by ID
 */
const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;

    const employee = await Employee.findByIdAndDelete(id);

    if (!employee) {
      return errorResponse(res, 404, 'Employee not found');
    }

    return successResponse(res, 200, 'Employee deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  deleteEmployee,
};
