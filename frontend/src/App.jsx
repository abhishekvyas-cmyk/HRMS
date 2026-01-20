import { useState } from 'react';
import Employees from './pages/Employees';
import Attendance from './pages/Attendance';

/**
 * Main App component with navigation
 */
function App() {
  const [activeTab, setActiveTab] = useState('employees');

  return (
    <div className="min-h-screen bg-neutral-50/80">
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-200/60 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 text-white font-bold text-sm shadow-lg shadow-primary-500/20">
                H
              </div>
              <h1 className="text-xl font-bold tracking-tight text-neutral-900">HRMS Lite</h1>
            </div>
            <nav className="flex p-1 rounded-xl bg-neutral-100/80">
              <button
                onClick={() => setActiveTab('employees')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'employees'
                    ? 'bg-white text-primary-600 shadow-card'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Employees
              </button>
              <button
                onClick={() => setActiveTab('attendance')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                  activeTab === 'attendance'
                    ? 'bg-white text-primary-600 shadow-card'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Attendance
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="animate-fade-in">
        {activeTab === 'employees' && <Employees />}
        {activeTab === 'attendance' && <Attendance />}
      </main>
    </div>
  );
}

export default App;
