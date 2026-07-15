import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { ViewType, WorkLog, Shift, Employee } from './types';
import { INITIAL_WORK_LOGS, INITIAL_EMPLOYEES } from './data';
import { Sidebar } from './components/Sidebar';
import { TopNav } from './components/TopNav';
import { DashboardView } from './components/DashboardView';
import { WorkLogsView } from './components/WorkLogsView';
import { ManagerReviewView } from './components/ManagerReviewView';
import { EmployeePerformanceView } from './components/EmployeePerformanceView';
import { ManagerReevaluationView } from './components/ManagerReevaluationView';
import { ReportsView } from './components/ReportsView';
import { EmployeesSheetView } from './components/EmployeesSheetView';
import { SettingsView } from './components/SettingsView';
import { ShieldAlert, Lock, X } from 'lucide-react';

export default function App() {
  // Navigation View
  const [currentView, setView] = useState<ViewType>('dashboard');

  // Dark Mode preference
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('theme') === 'dark';
  });

  // Toggle/Sync theme with system classes
  React.useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  // Logs database memory (starts with realistic initial records)
  const [logs, setLogs] = useState<WorkLog[]>(INITIAL_WORK_LOGS);

  // Dynamic Shifts configured by managers (Settings)
  const [shifts, setShifts] = useState<Shift[]>([
    { id: '1', name: 'Shift 1', startTime: '11:00 AM', endTime: '07:00 PM' },
    { id: '2', name: 'Shift 2', startTime: '01:30 PM', endTime: '09:30 PM' },
    { id: '3', name: 'Shift 3', startTime: '05:00 PM', endTime: '01:00 AM' }
  ]);

  // Active shift configuration (Set initial default active shift to Shift 1)
  const [activeShift, setActiveShift] = useState('Shift 1 (11:00 AM - 07:00 PM)');

  // Centralized Employee Registry with localStorage persistence
  const [employees, setEmployees] = useState<Employee[]>(() => {
    try {
      const stored = localStorage.getItem('employees');
      if (stored) return JSON.parse(stored);
    } catch {}
    return INITIAL_EMPLOYEES;
  });

  useEffect(() => {
    localStorage.setItem('employees', JSON.stringify(employees));
  }, [employees]);

  // Manager PIN protection
  const [managerPin, setManagerPin] = useState<string>(() => {
    return localStorage.getItem('managerPin') || '1234';
  });

  useEffect(() => {
    localStorage.setItem('managerPin', managerPin);
  }, [managerPin]);

  const [isManagerUnlocked, setIsManagerUnlocked] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const [pendingPinView, setPendingPinView] = useState<ViewType | null>(null);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');

  const protectedViews: ViewType[] = ['manager-review', 'manager-reevaluation', 'manager-performance'];

  const handleProtectedNav = useCallback((view: ViewType) => {
    if (isManagerUnlocked) {
      setView(view);
    } else {
      setPendingPinView(view);
      setPinInput('');
      setPinError('');
      setShowPinModal(true);
    }
  }, [isManagerUnlocked]);

  const verifyPin = useCallback(() => {
    if (pinInput === managerPin) {
      setIsManagerUnlocked(true);
      setShowPinModal(false);
      if (pendingPinView) {
        setView(pendingPinView);
        setPendingPinView(null);
      }
      setPinInput('');
      setPinError('');
    } else {
      setPinError('Incorrect PIN');
      setPinInput('');
    }
  }, [pinInput, managerPin, pendingPinView]);

  const lockManager = useCallback(() => {
    setIsManagerUnlocked(false);
    setView('dashboard');
  }, []);

  // Global search input state (prop-drilled or filtered at layout level)
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');

  // 1. Logs mutation handlers
  const handleAddLog = (newLog: WorkLog) => {
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleUpdateLog = (uniqueId: string, updatedFields: Partial<WorkLog>) => {
    setLogs((prev) =>
      prev.map((log) => (log.uniqueId === uniqueId ? { ...log, ...updatedFields } : log))
    );
  };

  const handleDeleteLog = (uniqueId: string) => {
    setLogs((prev) => prev.filter((log) => log.uniqueId !== uniqueId));
  };

  // 2. Pending alerts & notification calculations
  const pendingCount = useMemo(() => {
    return logs.filter((l) => l.status === 'Pending').length;
  }, [logs]);

  const notificationsCount = useMemo(() => {
    return logs.filter((l) => l.managerReview === 'Pending Review' || l.reviewRequestStatus === 'Pending').length;
  }, [logs]);

  // 3. Layout Router
  const renderActiveView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <DashboardView
            logs={logs}
            employees={employees}
            onNavigate={(view) => setView(view)}
            onUpdateLog={handleUpdateLog}
          />
        );

      case 'worklogs-add':
        return (
          <WorkLogsView
            logs={logs}
            employees={employees}
            onAddLog={handleAddLog}
            onDeleteLog={handleDeleteLog}
            onUpdateLog={handleUpdateLog}
            activeSubView="add"
            shifts={shifts}
            activeShift={activeShift}
          />
        );

      case 'worklogs-today':
        return (
          <WorkLogsView
            logs={logs}
            employees={employees}
            onAddLog={handleAddLog}
            onDeleteLog={handleDeleteLog}
            onUpdateLog={handleUpdateLog}
            activeSubView="today"
            shifts={shifts}
            activeShift={activeShift}
          />
        );

      case 'worklogs-pending':
        return (
          <WorkLogsView
            logs={logs}
            employees={employees}
            onAddLog={handleAddLog}
            onDeleteLog={handleDeleteLog}
            onUpdateLog={handleUpdateLog}
            activeSubView="pending"
            shifts={shifts}
            activeShift={activeShift}
          />
        );

      case 'worklogs-history':
        return (
          <WorkLogsView
            logs={logs}
            employees={employees}
            onAddLog={handleAddLog}
            onDeleteLog={handleDeleteLog}
            onUpdateLog={handleUpdateLog}
            activeSubView="history"
            shifts={shifts}
            activeShift={activeShift}
          />
        );

      case 'manager-review':
        return (
          <ManagerReviewView
            logs={logs}
            onUpdateLog={handleUpdateLog}
          />
        );

      case 'manager-reevaluation':
        return (
          <ManagerReevaluationView
            logs={logs}
            onUpdateLog={handleUpdateLog}
          />
        );

      case 'manager-performance':
        return <EmployeePerformanceView logs={logs} employees={employees} />;

      case 'reports':
        return <ReportsView logs={logs} />;

      case 'employees':
        return (
          <EmployeesSheetView
            employees={employees}
            onEmployeesChange={setEmployees}
            shifts={shifts}
          />
        );

      case 'settings':
        return (
          <SettingsView
            shifts={shifts}
            onShiftsChange={setShifts}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            managerPin={managerPin}
            onChangePin={setManagerPin}
          />
        );

      default:
        return (
          <DashboardView
            logs={logs}
            employees={employees}
            onNavigate={(view) => setView(view)}
            onUpdateLog={handleUpdateLog}
          />
        );
    }
  };

  return (
    <div className="flex h-screen w-screen bg-slate-100 dark:bg-slate-950 overflow-hidden text-slate-800 dark:text-slate-100" id="main-app-container">
      {/* Sidebar Panes */}
      <Sidebar
        currentView={currentView}
        setView={setView}
        pendingCount={pendingCount}
        logs={logs}
        isManagerUnlocked={isManagerUnlocked}
        onLockManager={lockManager}
        onNavigateProtected={handleProtectedNav}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col h-full overflow-hidden" id="workspace-frame">
        {/* Top Utility Belt */}
        <TopNav
          activeShift={activeShift}
          setActiveShift={setActiveShift}
          notificationsCount={notificationsCount}
          onSearch={(term) => setGlobalSearchTerm(term)}
          shifts={shifts}
        />

        {/* Dynamic Sheet Workspaces */}
        <main className="flex-1 overflow-hidden flex flex-col" id="active-viewport">
          {renderActiveView()}
        </main>
      </div>

      {/* Manager PIN Verification Modal */}
      {showPinModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-slate-900 rounded-sm shadow-xl border border-gray-200 dark:border-slate-700 w-full max-w-sm mx-4">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-slate-100 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-500" />
                <span>Manager PIN Required</span>
              </h3>
              <button onClick={() => { setShowPinModal(false); setPendingPinView(null); setPinError(''); }} className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <p className="text-xs font-mono text-gray-600 dark:text-slate-400">
                Enter your 4–6 digit Manager PIN to access the Manager Hub.
              </p>
              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={pinInput}
                onChange={e => { const v = e.target.value.replace(/\D/g, '').slice(0, 6); setPinInput(v); setPinError(''); }}
                onKeyDown={e => { if (e.key === 'Enter' && pinInput.length >= 4) verifyPin(); }}
                className="w-full border border-gray-300 dark:border-slate-600 rounded px-3 py-2 text-lg font-mono text-center tracking-[0.5em] bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 focus:outline-none focus:border-blue-500"
                placeholder="******"
                autoFocus
              />
              {pinError && (
                <p className="text-xs font-mono text-red-500 dark:text-red-400 text-center">{pinError}</p>
              )}
            </div>
            <div className="px-4 py-3 border-t border-gray-200 dark:border-slate-700 flex justify-end gap-2">
              <button onClick={() => { setShowPinModal(false); setPendingPinView(null); setPinError(''); }} className="px-3 py-1.5 text-xs font-mono font-semibold text-gray-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer">
                Cancel
              </button>
              <button
                onClick={verifyPin}
                disabled={pinInput.length < 4}
                className="px-4 py-1.5 text-xs font-mono font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Unlock</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
