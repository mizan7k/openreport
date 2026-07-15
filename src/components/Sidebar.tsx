<<<<<<< HEAD
import React, { useState } from 'react';
import { ViewType, WorkLog } from '../types';
=======
import React from 'react';
import { ViewType } from '../types';
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
import { 
  LayoutDashboard, 
  FileSpreadsheet, 
  PlusCircle, 
  Clock, 
  AlertCircle, 
  History, 
  Users, 
  TrendingUp, 
  Settings, 
  BarChart4, 
  Calendar,
<<<<<<< HEAD
  Layers,
  Menu,
  ShieldAlert
=======
  Layers
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
} from 'lucide-react';

interface SidebarProps {
  currentView: ViewType;
  setView: (view: ViewType) => void;
  pendingCount: number;
<<<<<<< HEAD
  logs: WorkLog[];
}

export function Sidebar({ currentView, setView, pendingCount, logs }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Helper to check active button
  const isActive = (view: ViewType) => currentView === view;

  const pendingDisputesCount = logs ? logs.filter(l => l.reviewRequestStatus === 'Pending').length : 0;

  const getButtonClass = (view: ViewType, hasRightSide = false) => {
    const isAct = currentView === view;
    return `w-full flex items-center rounded transition-all group cursor-pointer ${
      isCollapsed 
        ? 'justify-center py-2' 
        : `${hasRightSide ? 'justify-between' : 'justify-start'} relative px-3 py-1.5`
    } ${
      isAct
        ? 'bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-400 border-l-2 border-blue-600 font-semibold'
        : 'text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-white'
    }`;
  };

  return (
    <aside 
      className={`relative bg-slate-50 dark:bg-slate-900 border-r border-gray-200 dark:border-slate-800 flex flex-col h-full select-none transition-all duration-300 ease-in-out shrink-0 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`} 
      id="sidebar-container"
    >
      {/* App Header branding / Collapse Trigger */}
      <div 
        className={`p-3 border-b border-gray-200 dark:border-slate-800 flex items-center transition-all ${
          isCollapsed ? 'flex-col gap-3 justify-center' : 'justify-between'
        }`} 
        id="sidebar-header"
      >
        {!isCollapsed ? (
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 text-white rounded p-1" id="sidebar-logo">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-sm font-bold tracking-wide text-gray-800 dark:text-slate-100" id="sidebar-title">Open Report</h1>
              <p className="text-[9px] text-emerald-600 font-sans font-semibold leading-tight" id="sidebar-sub">Frictionless Shift Accountability</p>
            </div>
          </div>
        ) : (
          <div className="bg-emerald-600 text-white rounded p-1.5" id="sidebar-logo-collapsed">
            <FileSpreadsheet className="w-4 h-4" />
          </div>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)} 
          className="p-1.5 rounded text-gray-500 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-800 hover:text-gray-800 dark:hover:text-slate-100 cursor-pointer transition-colors"
          title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          id="sidebar-toggle-btn"
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation list */}
      <nav 
        className="flex-1 overflow-y-auto overflow-x-hidden p-2 space-y-4" 
        style={{ scrollbarWidth: 'thin' }} 
        id="sidebar-nav"
      >
        {/* Main Dashboard Section */}
        <div>
          {!isCollapsed && (
            <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold">
              Home
            </div>
          )}
          <div className="space-y-0.5 mt-0.5">
            <button
              onClick={() => setView('dashboard')}
              className={getButtonClass('dashboard', true)}
              id="nav-dashboard-btn"
            >
              <div className="flex items-center gap-2">
                <LayoutDashboard className="w-4 h-4 shrink-0 text-gray-500" />
                {!isCollapsed && <span>Dashboard</span>}
              </div>
              {!isCollapsed && (
                <span className="text-[10px] bg-gray-200/60 text-gray-500 px-1.5 py-0.2 rounded font-mono font-semibold">F1</span>
              )}
              
              {/* Collapsed Tooltip */}
              {isCollapsed && (
                <div className="absolute left-14 bg-slate-800 text-white text-[10px] py-1 px-2 rounded-sm font-sans font-semibold tracking-wide whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 delay-100 shadow-md border border-slate-700">
                  Dashboard
                </div>
              )}
            </button>
          </div>
=======
}

export function Sidebar({ currentView, setView, pendingCount }: SidebarProps) {
  // Navigation groupings
  const isWorkLogsActive = ['worklogs-add', 'worklogs-today', 'worklogs-pending', 'worklogs-history'].includes(currentView);
  const isManagerActive = ['manager-review', 'manager-performance'].includes(currentView);
  const isReportsActive = ['reports-daily', 'reports-weekly', 'reports-monthly', 'reports-quarterly', 'reports-custom'].includes(currentView);

  return (
    <aside className="w-64 bg-slate-50 border-r border-gray-200 flex flex-col h-full select-none" id="sidebar-container">
      {/* App Header branding */}
      <div className="p-4 border-b border-gray-200 flex items-center gap-2" id="sidebar-header">
        <div className="bg-blue-600 text-white rounded p-1" id="sidebar-logo">
          <FileSpreadsheet className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-sm font-semibold tracking-wide text-gray-800" id="sidebar-title">SRS Workspace</h1>
          <p className="text-[10px] text-gray-500 font-mono" id="sidebar-sub">Support Reporting v1.2</p>
        </div>
      </div>

      {/* Navigation list */}
      <nav className="flex-1 overflow-y-auto p-2 space-y-4" style={{ scrollbarWidth: 'thin' }} id="sidebar-nav">
        {/* Main Dashboard Section */}
        <div>
          <button
            onClick={() => setView('dashboard')}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-xs font-medium transition-all ${
              currentView === 'dashboard'
                ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
            id="nav-dashboard-btn"
          >
            <div className="flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 shrink-0 text-gray-500" />
              <span>Dashboard</span>
            </div>
            <span className="text-[10px] bg-gray-200/60 text-gray-500 px-1.5 py-0.2 rounded font-mono font-semibold">F1</span>
          </button>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
        </div>

        {/* Work Logs Section */}
        <div>
<<<<<<< HEAD
          {!isCollapsed ? (
            <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold flex items-center gap-1.5">
              <Layers className="w-3 h-3 text-gray-400" />
              <span>Work Logs</span>
            </div>
          ) : (
            <div className="border-t border-gray-200 dark:border-slate-800 my-2 pt-2" />
          )}
          <div className={`space-y-0.5 ${!isCollapsed ? 'mt-1 pl-1' : ''}`}>
            {/* Add Work Log */}
            <button
              onClick={() => setView('worklogs-add')}
              className={getButtonClass('worklogs-add')}
            >
              <div className="flex items-center gap-2">
                <PlusCircle className="w-3.5 h-3.5 shrink-0 text-gray-500" />
                {!isCollapsed && <span>Add Work Log</span>}
              </div>
              {isCollapsed && (
                <div className="absolute left-14 bg-slate-800 text-white text-[10px] py-1 px-2 rounded-sm font-sans font-semibold tracking-wide whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 delay-100 shadow-md border border-slate-700">
                  Add Work Log
                </div>
              )}
            </button>

            {/* Today's Logs */}
            <button
              onClick={() => setView('worklogs-today')}
              className={getButtonClass('worklogs-today')}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 shrink-0 text-gray-500" />
                {!isCollapsed && <span>Today's Logs</span>}
              </div>
              {isCollapsed && (
                <div className="absolute left-14 bg-slate-800 text-white text-[10px] py-1 px-2 rounded-sm font-sans font-semibold tracking-wide whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 delay-100 shadow-md border border-slate-700">
                  Today's Logs
                </div>
              )}
            </button>

            {/* Pending Tasks */}
            <button
              onClick={() => setView('worklogs-pending')}
              className={getButtonClass('worklogs-pending', true)}
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 shrink-0 text-gray-500" />
                {!isCollapsed && <span>Pending Tasks</span>}
              </div>
              {pendingCount > 0 && !isCollapsed && (
=======
          <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold flex items-center gap-1.5">
            <Layers className="w-3 h-3 text-gray-400" />
            <span>Work Logs</span>
          </div>
          <div className="mt-1 pl-1 space-y-0.5">
            <button
              onClick={() => setView('worklogs-add')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-[11px] transition-all ${
                currentView === 'worklogs-add'
                  ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <PlusCircle className="w-3.5 h-3.5 text-gray-400" />
                <span>Add Work Log</span>
              </div>
            </button>
            <button
              onClick={() => setView('worklogs-today')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-[11px] transition-all ${
                currentView === 'worklogs-today'
                  ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-gray-400" />
                <span>Today's Logs</span>
              </div>
            </button>
            <button
              onClick={() => setView('worklogs-pending')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-[11px] transition-all ${
                currentView === 'worklogs-pending'
                  ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <AlertCircle className="w-3.5 h-3.5 text-gray-400" />
                <span>Pending Tasks</span>
              </div>
              {pendingCount > 0 && (
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                <span className="bg-amber-100 text-amber-800 font-mono text-[9px] px-1.5 py-0.2 rounded-full font-bold">
                  {pendingCount}
                </span>
              )}
<<<<<<< HEAD
              {isCollapsed && (
                <div className="absolute left-14 bg-slate-800 text-white text-[10px] py-1 px-2 rounded-sm font-sans font-semibold tracking-wide whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 delay-100 shadow-md border border-slate-700">
                  Pending Tasks {pendingCount > 0 ? `(${pendingCount})` : ''}
                </div>
              )}
            </button>

            {/* Task History */}
            <button
              onClick={() => setView('worklogs-history')}
              className={getButtonClass('worklogs-history')}
            >
              <div className="flex items-center gap-2">
                <History className="w-3.5 h-3.5 shrink-0 text-gray-500" />
                {!isCollapsed && <span>Task History</span>}
              </div>
              {isCollapsed && (
                <div className="absolute left-14 bg-slate-800 text-white text-[10px] py-1 px-2 rounded-sm font-sans font-semibold tracking-wide whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 delay-100 shadow-md border border-slate-700">
                  Task History
                </div>
              )}
=======
            </button>
            <button
              onClick={() => setView('worklogs-history')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-[11px] transition-all ${
                currentView === 'worklogs-history'
                  ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <History className="w-3.5 h-3.5 text-gray-400" />
                <span>Task History</span>
              </div>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
            </button>
          </div>
        </div>

        {/* Manager Section */}
        <div>
<<<<<<< HEAD
          {!isCollapsed ? (
            <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold flex items-center gap-1.5">
              <Users className="w-3 h-3 text-gray-400" />
              <span>Manager Hub</span>
            </div>
          ) : (
            <div className="border-t border-gray-200 dark:border-slate-800 my-2 pt-2" />
          )}
          <div className={`space-y-0.5 ${!isCollapsed ? 'mt-1 pl-1' : ''}`}>
            {/* Review Reports */}
            <button
              onClick={() => setView('manager-review')}
              className={getButtonClass('manager-review')}
            >
              <div className="flex items-center gap-2">
                <BarChart4 className="w-3.5 h-3.5 shrink-0 text-gray-500" />
                {!isCollapsed && <span>Review Reports</span>}
              </div>
              {isCollapsed && (
                <div className="absolute left-14 bg-slate-800 text-white text-[10px] py-1 px-2 rounded-sm font-sans font-semibold tracking-wide whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 delay-100 shadow-md border border-slate-700">
                  Review Reports
                </div>
              )}
            </button>

            {/* Team Performance */}
            <button
              onClick={() => setView('manager-performance')}
              className={getButtonClass('manager-performance')}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 shrink-0 text-gray-500" />
                {!isCollapsed && <span>Team Performance</span>}
              </div>
              {isCollapsed && (
                <div className="absolute left-14 bg-slate-800 text-white text-[10px] py-1 px-2 rounded-sm font-sans font-semibold tracking-wide whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 delay-100 shadow-md border border-slate-700">
                  Team Performance
                </div>
              )}
            </button>

            {/* Re-evaluation Disputes */}
            <button
              onClick={() => setView('manager-reevaluation')}
              className={getButtonClass('manager-reevaluation', true)}
            >
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0 text-gray-500" />
                {!isCollapsed && <span>Dispute Queue</span>}
              </div>
              {!isCollapsed && pendingDisputesCount > 0 && (
                <span className="bg-purple-100 text-purple-800 text-[9px] font-bold px-1.5 py-0.2 rounded-full border border-purple-200">
                  {pendingDisputesCount}
                </span>
              )}
              {isCollapsed && (
                <div className="absolute left-14 bg-slate-800 text-white text-[10px] py-1 px-2 rounded-sm font-sans font-semibold tracking-wide whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 delay-100 shadow-md border border-slate-700">
                  Dispute Queue {pendingDisputesCount > 0 ? `(${pendingDisputesCount})` : ''}
                </div>
              )}
=======
          <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold flex items-center gap-1.5">
            <Users className="w-3 h-3 text-gray-400" />
            <span>Manager Hub</span>
          </div>
          <div className="mt-1 pl-1 space-y-0.5">
            <button
              onClick={() => setView('manager-review')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-[11px] transition-all ${
                currentView === 'manager-review'
                  ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <BarChart4 className="w-3.5 h-3.5 text-gray-400" />
                <span>Review Reports</span>
              </div>
            </button>
            <button
              onClick={() => setView('manager-performance')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-[11px] transition-all ${
                currentView === 'manager-performance'
                  ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-2">
                <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
                <span>Team Performance</span>
              </div>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
            </button>
          </div>
        </div>

        {/* Reports Section */}
        <div>
<<<<<<< HEAD
          {!isCollapsed ? (
            <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold flex items-center gap-1.5">
              <Calendar className="w-3 h-3 text-gray-400" />
              <span>Reports</span>
            </div>
          ) : (
            <div className="border-t border-gray-200 dark:border-slate-800 my-2 pt-2" />
          )}
          <div className={`space-y-0.5 ${!isCollapsed ? 'mt-1 pl-1' : ''}`}>
            {/* Reports Engine */}
            <button
              onClick={() => setView('reports')}
              className={getButtonClass('reports')}
            >
              <div className="flex items-center gap-2">
                <FileSpreadsheet className="w-3.5 h-3.5 shrink-0 text-gray-500" />
                {!isCollapsed && <span>Reports Engine</span>}
              </div>
              {isCollapsed && (
                <div className="absolute left-14 bg-slate-800 text-white text-[10px] py-1 px-2 rounded-sm font-sans font-semibold tracking-wide whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 delay-100 shadow-md border border-slate-700">
                  Reports Engine
                </div>
              )}
=======
          <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-gray-400 font-bold flex items-center gap-1.5">
            <Calendar className="w-3 h-3 text-gray-400" />
            <span>Reports</span>
          </div>
          <div className="mt-1 pl-1 space-y-0.5">
            <button
              onClick={() => setView('reports-daily')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-[11px] transition-all ${
                currentView === 'reports-daily'
                  ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span>Daily Report</span>
            </button>
            <button
              onClick={() => setView('reports-weekly')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-[11px] transition-all ${
                currentView === 'reports-weekly'
                  ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span>Weekly Report</span>
            </button>
            <button
              onClick={() => setView('reports-monthly')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-[11px] transition-all ${
                currentView === 'reports-monthly'
                  ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span>Monthly Report</span>
            </button>
            <button
              onClick={() => setView('reports-quarterly')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-[11px] transition-all ${
                currentView === 'reports-quarterly'
                  ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span>Quarterly Report</span>
            </button>
            <button
              onClick={() => setView('reports-custom')}
              className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-[11px] transition-all ${
                currentView === 'reports-custom'
                  ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <span>Custom Export</span>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
            </button>
          </div>
        </div>

<<<<<<< HEAD
        {/* Core Settings / Employees Section */}
        <div>
          {!isCollapsed ? (
            <div className="border-t border-gray-200 dark:border-slate-800 my-2 pt-2" />
          ) : (
            <div className="border-t border-gray-200 dark:border-slate-800 my-2 pt-2" />
          )}
          <div className="space-y-0.5">
            {/* Employees */}
            <button
              onClick={() => setView('employees')}
              className={getButtonClass('employees')}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 shrink-0 text-gray-500" />
                {!isCollapsed && <span>Employees Sheet</span>}
              </div>
              {isCollapsed && (
                <div className="absolute left-14 bg-slate-800 text-white text-[10px] py-1 px-2 rounded-sm font-sans font-semibold tracking-wide whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 delay-100 shadow-md border border-slate-700">
                  Employees Sheet
                </div>
              )}
            </button>

            {/* Settings */}
            <button
              onClick={() => setView('settings')}
              className={getButtonClass('settings')}
            >
              <div className="flex items-center gap-2">
                <Settings className="w-4 h-4 shrink-0 text-gray-500" />
                {!isCollapsed && <span>Settings</span>}
              </div>
              {isCollapsed && (
                <div className="absolute left-14 bg-slate-800 text-white text-[10px] py-1 px-2 rounded-sm font-sans font-semibold tracking-wide whitespace-nowrap z-50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-150 delay-100 shadow-md border border-slate-700">
                  Settings
                </div>
              )}
            </button>
          </div>
=======
        {/* Core Sections */}
        <div className="pt-2 border-t border-gray-200 space-y-0.5">
          <button
            onClick={() => setView('employees')}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-xs font-medium transition-all ${
              currentView === 'employees'
                ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span>Employees Sheet</span>
            </div>
          </button>

          <button
            onClick={() => setView('settings')}
            className={`w-full flex items-center justify-between px-3 py-1.5 rounded text-xs font-medium transition-all ${
              currentView === 'settings'
                ? 'bg-blue-50 text-blue-700 border-l-2 border-blue-600'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-gray-500" />
              <span>Settings</span>
            </div>
          </button>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
        </div>
      </nav>

      {/* Footer statistics (very simple Excel cell simulation) */}
<<<<<<< HEAD
      <div 
        className={`bg-slate-100 dark:bg-slate-950 border-t border-gray-200 dark:border-slate-800 text-[10px] font-mono text-gray-500 dark:text-slate-400 transition-all ${
          isCollapsed ? 'p-2 flex flex-col gap-2 items-center' : 'p-3'
        }`} 
        id="sidebar-footer"
      >
        {!isCollapsed ? (
          <>
            <div className="flex items-center justify-between">
              <span>Sheet Mode:</span>
              <span className="text-blue-600 font-bold">READY</span>
            </div>
            <div className="flex items-center justify-between mt-1">
              <span>Server State:</span>
              <span className="text-green-600 font-bold">OFFLINE (DEMO)</span>
            </div>
          </>
        ) : (
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" title="Offline (Demo)" />
        )}
=======
      <div className="p-3 bg-slate-100 border-t border-gray-200 text-[10px] font-mono text-gray-500" id="sidebar-footer">
        <div className="flex items-center justify-between">
          <span>Sheet Mode:</span>
          <span className="text-blue-600 font-bold">READY</span>
        </div>
        <div className="flex items-center justify-between mt-1">
          <span>Server State:</span>
          <span className="text-green-600 font-bold">OFFLINE (DEMO)</span>
        </div>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
      </div>
    </aside>
  );
}
