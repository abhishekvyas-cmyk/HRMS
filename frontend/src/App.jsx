import { useState } from 'react';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';

/**
 * Main App component with navigation
 */
function App() {
  const [activeTab, setActiveTab] = useState('employees');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">HRMS Lite</h1>
            </div>
            <nav className="flex space-x-1">
              <button
                onClick={() => setActiveTab('employees')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'employees'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Employees
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === 'attendance'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                Attendance
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {activeTab === 'employees' && <Employees />}
        {activeTab === 'attendance' && <Attendance />}
      </main>
    </div>
  );
}

export default App;
