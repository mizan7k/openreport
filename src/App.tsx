import React, { useState, useMemo } from 'react';
import { ViewType, WorkLog, Shift } from './types';
import { INITIAL_WORK_LOGS } from './data';
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
            onNavigate={(view) => setView(view)}
            onUpdateLog={handleUpdateLog}
          />
        );

      case 'worklogs-add':
        return (
          <WorkLogsView
            logs={logs}
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
        return <EmployeePerformanceView logs={logs} />;

      case 'reports':

        return <ReportsView logs={logs} />;

      case 'employees':
        return <EmployeesSheetView />;

      case 'settings':
        return (
          <SettingsView
            shifts={shifts}
            onShiftsChange={setShifts}
            isDarkMode={isDarkMode}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
          />
        );

      default:
        return (
          <DashboardView
            logs={logs}
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
    </div>
  );
}
