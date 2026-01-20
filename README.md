# HRMS Lite – Full-Stack Application

## 📌 Project Overview

HRMS Lite is a lightweight Human Resource Management System built to manage employee records and track daily attendance.
The application simulates a basic internal HR tool for a **single admin user**, focusing on clean functionality, proper data handling, and production-ready deployment.

The system allows an admin to:

* Add, view, and delete employees
* Mark daily attendance (Present / Absent)
* View attendance records by employee
* Optionally filter attendance by date

The project intentionally avoids advanced HR features to stay within scope and ensure stability.

---

## 🧰 Tech Stack Used

### Backend

* **Node.js**
* **Express.js**
* **MongoDB**
* **Mongoose**
* **Zod / Joi** (for validation)
* **dotenv**
* **CORS**

### Frontend

* **React (JavaScript)**
* **Vite**
* **Tailwind CSS**
* **Fetch / Axios** for API calls

### Deployment

* **Backend:** Render / Railway
* **Frontend:** Vercel / Netlify

---

## 🚀 Features

### Employee Management

* Create employee (unique Employee ID & Email)
* View all employees
* Delete employee

### Attendance Management

* Mark attendance for an employee on a specific date
* Prevent duplicate attendance for the same employee & date
* View attendance records by employee
* (Optional) Filter attendance by date

---

## 🗂 Project Structure (Backend)

```
server.js
src/
 ├─ app.js
 ├─ config/
 │   └─ db.js
 ├─ models/
 │   ├─ employee.model.js
 │   └─ attendance.model.js
 ├─ routes/
 │   └─ v1/
 │       ├─ routes.js
 │       └─ components/
 │           ├─ employee/
 │           └─ attendance/
 ├─ middlewares/
 │   ├─ validate.middleware.js
 │   └─ error.middleware.js
 └─ utils/
     └─ apiResponse.js
```

---

## 🗂 Project Structure (Frontend)

```
src/
 ├─ api/
 │   └─ apiClient.js
 ├─ pages/
 │   ├─ Employees.jsx
 │   └─ Attendance.jsx
 ├─ components/
 │   ├─ EmployeeForm.jsx
 │   ├─ EmployeeList.jsx
 │   ├─ AttendanceForm.jsx
 │   └─ AttendanceList.jsx
 ├─ App.jsx
 ├─ main.jsx
 └─ index.css
```

---

## ⚙️ Steps to Run the Project Locally

### 1️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/hrms_lite
NODE_ENV=development
```

Run backend:

```bash
npm run dev
```

Backend will be available at:

```
http://localhost:3000/api/v1
```

---

### 2️⃣ Frontend Setup

```bash
cd frontend
npm install
```

Create `.env` file:

```env
VITE_API_BASE_URL=http://localhost:3000/api/v1
```

Run frontend:

```bash
npm run dev
```

Frontend will be available at:

```
http://localhost:5173
```

---

## 🧪 API Integration

The frontend communicates with the backend using a centralized API client.
All API calls use the base URL defined in environment variables for easy deployment configuration.

---

## ⚠️ Assumptions & Limitations

* The system assumes **a single admin user**
* **Authentication and authorization are intentionally omitted** as per assignment instructions
* No role-based access control
* Payroll, leave management, and advanced HR features are out of scope
* Designed as a **single-tenant** application
* Focus is on correctness, stability, and clean architecture

---

## ✅ Deployment Notes

* Backend and frontend are deployed separately
* Frontend is connected to the live backend API
* Application runs without errors using the shared URLs

---

## 🏁 Final Notes

This project prioritizes:

* Clean architecture
* Proper validations
* Meaningful error handling
* Production readiness

Over-engineering and unnecessary features were intentionally avoided to match the assignment scope.
