# HRMS Lite Backend API Documentation

Complete API documentation for HRMS Lite Backend - Employee and Attendance Management System.

## Base URL

```
http://localhost:3000/api/v1
```

## Response Format

All API responses follow a consistent format:

### Success Response
```json
{
  "success": true,
  "message": "Success message",
  "data": { ... }
}
```

### Error Response
```json
{
  "success": false,
  "message": "Error message",
  "errors": [ ... ] // Only for validation errors
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (Validation errors)
- `404` - Not Found
- `409` - Conflict (Duplicate entry)
- `500` - Internal Server Error

---

## Employee Management APIs

### 1. Create Employee

**Endpoint:** `POST /employees`

**Description:** Add a new employee to the system.

**Request Body:**
```json
{
  "employeeId": "EMP001",
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "department": "Engineering"
}
```

**Validation Rules:**
- `employeeId`: Required, string, must be unique
- `fullName`: Required, string, min 1 character
- `email`: Required, valid email format, must be unique, automatically converted to lowercase
- `department`: Required, string, min 1 character

**Success Response (201):**
```json
{
  "success": true,
  "message": "Employee created successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
    "employeeId": "EMP001",
    "fullName": "John Doe",
    "email": "john.doe@example.com",
    "department": "Engineering",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Validation error:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Please provide a valid email address"
    }
  ]
}
```

- `409` - Duplicate employeeId or email:
```json
{
  "success": false,
  "message": "employeeId already exists"
}
```

---

### 2. Get All Employees

**Endpoint:** `GET /employees`

**Description:** Fetch all employees from the system, sorted by creation date (newest first).

**Request:** No body or parameters required.

**Success Response (200):**
```json
{
  "success": true,
  "message": "Employees fetched successfully",
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "employeeId": "EMP001",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "department": "Engineering",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
      "employeeId": "EMP002",
      "fullName": "Jane Smith",
      "email": "jane.smith@example.com",
      "department": "Marketing",
      "createdAt": "2024-01-14T09:20:00.000Z",
      "updatedAt": "2024-01-14T09:20:00.000Z"
    }
  ]
}
```

**Empty Response (200):**
```json
{
  "success": true,
  "message": "Employees fetched successfully",
  "data": []
}
```

---

### 3. Delete Employee

**Endpoint:** `DELETE /employees/:id`

**Description:** Delete an employee by MongoDB `_id`.

**URL Parameters:**
- `id` (required): MongoDB ObjectId of the employee

**Example:** `DELETE /employees/65a1b2c3d4e5f6g7h8i9j0k1`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Employee deleted successfully"
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Employee not found"
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Invalid ID format"
}
```

---

## Attendance Management APIs

### 4. Mark Attendance

**Endpoint:** `POST /attendance`

**Description:** Mark attendance for an employee on a specific date.

**Request Body:**
```json
{
  "employeeId": "EMP001",
  "date": "2024-01-15",
  "status": "Present"
}
```

**Validation Rules:**
- `employeeId`: Required, string, must exist in the system
- `date`: Required, string in `YYYY-MM-DD` format
- `status`: Required, enum value: `"Present"` or `"Absent"`

**Success Response (201):**
```json
{
  "success": true,
  "message": "Attendance marked successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
    "employee": {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
      "employeeId": "EMP001",
      "fullName": "John Doe",
      "email": "john.doe@example.com",
      "department": "Engineering"
    },
    "date": "2024-01-15T00:00:00.000Z",
    "status": "Present",
    "createdAt": "2024-01-15T10:30:00.000Z",
    "updatedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

**Error Responses:**
- `400` - Validation error:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": [
    {
      "field": "date",
      "message": "Date must be in YYYY-MM-DD format"
    }
  ]
}
```

- `404` - Employee not found:
```json
{
  "success": false,
  "message": "Employee not found"
}
```

- `409` - Duplicate attendance (same employee, same date):
```json
{
  "success": false,
  "message": "employee already exists"
}
```

---

### 5. Get Attendance by Employee

**Endpoint:** `GET /attendance/:employeeId`

**Description:** Fetch all attendance records for a specific employee, sorted by date (newest first).

**URL Parameters:**
- `employeeId` (required): Employee ID (e.g., "EMP001")

**Example:** `GET /attendance/EMP001`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Attendance records fetched successfully",
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
      "employee": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
        "employeeId": "EMP001",
        "fullName": "John Doe",
        "email": "john.doe@example.com",
        "department": "Engineering"
      },
      "date": "2024-01-15T00:00:00.000Z",
      "status": "Present",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k4",
      "employee": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
        "employeeId": "EMP001",
        "fullName": "John Doe",
        "email": "john.doe@example.com",
        "department": "Engineering"
      },
      "date": "2024-01-14T00:00:00.000Z",
      "status": "Absent",
      "createdAt": "2024-01-14T09:20:00.000Z",
      "updatedAt": "2024-01-14T09:20:00.000Z"
    }
  ]
}
```

**Empty Response (200):**
```json
{
  "success": true,
  "message": "Attendance records fetched successfully",
  "data": []
}
```

**Error Response (404):**
```json
{
  "success": false,
  "message": "Employee not found"
}
```

---

### 6. Get Attendance by Date (Bonus)

**Endpoint:** `GET /attendance?date=YYYY-MM-DD`

**Description:** Fetch all attendance records for a specific date.

**Query Parameters:**
- `date` (required): Date in `YYYY-MM-DD` format

**Example:** `GET /attendance?date=2024-01-15`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Attendance records fetched successfully",
  "data": [
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k3",
      "employee": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k1",
        "employeeId": "EMP001",
        "fullName": "John Doe",
        "email": "john.doe@example.com",
        "department": "Engineering"
      },
      "date": "2024-01-15T00:00:00.000Z",
      "status": "Present",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    },
    {
      "_id": "65a1b2c3d4e5f6g7h8i9j0k5",
      "employee": {
        "_id": "65a1b2c3d4e5f6g7h8i9j0k2",
        "employeeId": "EMP002",
        "fullName": "Jane Smith",
        "email": "jane.smith@example.com",
        "department": "Marketing"
      },
      "date": "2024-01-15T00:00:00.000Z",
      "status": "Absent",
      "createdAt": "2024-01-15T11:00:00.000Z",
      "updatedAt": "2024-01-15T11:00:00.000Z"
    }
  ]
}
```

**Error Response (400):**
```json
{
  "success": false,
  "message": "Date query parameter is required"
}
```

or

```json
{
  "success": false,
  "message": "Date must be in YYYY-MM-DD format"
}
```

---

## Data Models

### Employee Model
```typescript
{
  _id: string;              // MongoDB ObjectId
  employeeId: string;       // Unique employee identifier
  fullName: string;         // Employee's full name
  email: string;            // Unique email address (lowercase)
  department: string;       // Department name
  createdAt: Date;         // Auto-generated timestamp
  updatedAt: Date;         // Auto-generated timestamp
}
```

### Attendance Model
```typescript
{
  _id: string;              // MongoDB ObjectId
  employee: {               // Populated employee object
    _id: string;
    employeeId: string;
    fullName: string;
    email: string;
    department: string;
  };
  date: Date;              // Attendance date
  status: "Present" | "Absent";  // Attendance status
  createdAt: Date;         // Auto-generated timestamp
  updatedAt: Date;         // Auto-generated timestamp
}
```

---

## Important Notes

1. **No Authentication**: This API has no authentication or authorization. It's designed for a single admin user.

2. **Unique Constraints**:
   - `employeeId` must be unique across all employees
   - `email` must be unique across all employees
   - One attendance record per employee per date (compound unique index)

3. **Date Format**: All dates must be in `YYYY-MM-DD` format (e.g., "2024-01-15")

4. **Status Values**: Attendance status must be exactly `"Present"` or `"Absent"` (case-sensitive)

5. **Employee ID vs MongoDB ID**:
   - `employeeId` is a custom string identifier (e.g., "EMP001")
   - `_id` is the MongoDB ObjectId used for deletion

6. **Error Handling**: All errors return a consistent format with `success: false` and appropriate status codes.

---

## Example API Calls

### Using Fetch API (JavaScript)

```javascript
// Create Employee
const createEmployee = async () => {
  const response = await fetch('http://localhost:3000/api/v1/employees', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      employeeId: 'EMP001',
      fullName: 'John Doe',
      email: 'john.doe@example.com',
      department: 'Engineering'
    })
  });
  const data = await response.json();
  return data;
};

// Get All Employees
const getEmployees = async () => {
  const response = await fetch('http://localhost:3000/api/v1/employees');
  const data = await response.json();
  return data;
};

// Mark Attendance
const markAttendance = async () => {
  const response = await fetch('http://localhost:3000/api/v1/attendance', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      employeeId: 'EMP001',
      date: '2024-01-15',
      status: 'Present'
    })
  });
  const data = await response.json();
  return data;
};

// Get Attendance by Employee
const getAttendanceByEmployee = async (employeeId) => {
  const response = await fetch(`http://localhost:3000/api/v1/attendance/${employeeId}`);
  const data = await response.json();
  return data;
};

// Get Attendance by Date
const getAttendanceByDate = async (date) => {
  const response = await fetch(`http://localhost:3000/api/v1/attendance?date=${date}`);
  const data = await response.json();
  return data;
};

// Delete Employee
const deleteEmployee = async (id) => {
  const response = await fetch(`http://localhost:3000/api/v1/employees/${id}`, {
    method: 'DELETE'
  });
  const data = await response.json();
  return data;
};
```

---

## Setup Instructions

1. **Install Dependencies:**
   ```bash
   npm install
   ```

2. **Create `.env` file:**
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/hrms_lite
   NODE_ENV=development
   ```

3. **Start Server:**
   ```bash
   npm start
   ```
   Or for development:
   ```bash
   npm run dev
   ```

4. **Health Check:**
   ```bash
   GET http://localhost:3000/health
   ```

---

## API Endpoints Summary

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/employees` | Create new employee |
| GET | `/api/v1/employees` | Get all employees |
| DELETE | `/api/v1/employees/:id` | Delete employee by MongoDB `_id` |
| POST | `/api/v1/attendance` | Mark attendance |
| GET | `/api/v1/attendance/:employeeId` | Get attendance by employee |
| GET | `/api/v1/attendance?date=YYYY-MM-DD` | Get attendance by date |

---

**Ready for Frontend Integration!** 🚀

Use this documentation to build your React + Redux + Tailwind frontend with Vite.
