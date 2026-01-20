const express = require('express');
const router = express.Router();
const validate = require('../../../../middlewares/validate.middleware');
const { createEmployeeSchema } = require('./employee.validation');
const {
  createEmployee,
  getAllEmployees,
  deleteEmployee,
} = require('./employee.controller');

// POST /api/v1/employees - Create new employee
router.post('/', validate(createEmployeeSchema), createEmployee);

// GET /api/v1/employees - Get all employees
router.get('/', getAllEmployees);

// DELETE /api/v1/employees/:id - Delete employee
router.delete('/:id', deleteEmployee);

module.exports = router;
