import React, { useState } from 'react';
import { Search, Bell, ChevronDown, Clock } from 'lucide-react';
import { Shift } from '../types';

interface TopNavProps {
  onSearch?: (term: string) => void;
  activeShift: string;
  setActiveShift: (shift: string) => void;
  notificationsCount: number;
  shifts: Shift[];
}

export function TopNav({ onSearch, activeShift, setActiveShift, notificationsCount, shifts }: TopNavProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [showShiftDropdown, setShowShiftDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Map dynamic shift configurations to standardized display strings
  const shiftOptions = shifts.map(s => `${s.name} (${s.startTime} - ${s.endTime})`);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  // Modern clean current date
  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="h-12 border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 flex items-center justify-between px-4 sticky top-0 z-40 select-none" id="topnav-container">
      {/* Search Input Bar (Excel look) */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <div className="relative w-full">
          <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 pointer-events-none text-gray-400">
            <Search className="w-4 h-4" />
          </span>
          <input
            type="text"
            placeholder="Search tasks, agents, logs... (Enter)"
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-9 pr-3 py-1 text-xs font-sans border border-gray-200 dark:border-slate-700 rounded-sm focus:outline-none focus:border-blue-500 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:ring-1 focus:ring-blue-500"
            id="topnav-search-input"
          />
        </div>
      </div>

      {/* Right Side: Date, Shift, Notification, User details */}
      <div className="flex items-center gap-4 text-xs">
        {/* Current Date */}
        <div className="hidden lg:flex items-center gap-1.5 text-gray-500 dark:text-slate-400 font-mono text-[11px] bg-slate-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded px-2.5 py-1">
          <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span>{todayDate}</span>
        </div>

        {/* Current Shift Selector */}
        <div className="relative">
          <button
            onClick={() => setShowShiftDropdown(!showShiftDropdown)}
            onBlur={() => setTimeout(() => setShowShiftDropdown(false), 200)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer font-sans"
            id="shift-selector-btn"
          >
            <span className="font-semibold text-[10px] text-blue-600 bg-blue-50 px-1 rounded">SHIFT</span>
            <span className="text-[11px] font-mono">{activeShift}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {showShiftDropdown && (
            <div className="absolute right-0 mt-1 w-56 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded shadow-md z-50 py-1 divide-y divide-gray-100 dark:divide-slate-800">
              {shiftOptions.map((shift) => (
                <button
                  key={shift}
                  onClick={() => setActiveShift(shift)}
                  className={`w-full text-left px-3 py-1.5 text-[11px] font-mono hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors ${
                    activeShift === shift ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-slate-800/50 font-semibold' : 'text-gray-700 dark:text-slate-300'
                  }`}
                >
                  {shift}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notification Icon */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-slate-200 relative cursor-pointer"
            id="notification-bell"
          >
            <Bell className="w-4 h-4" />
            {notificationsCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-1.5 w-72 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded shadow-md z-50 py-1.5">
              <div className="px-3 py-1.5 border-b border-gray-200 dark:border-slate-800 flex justify-between items-center bg-slate-50 dark:bg-slate-800">
                <span className="font-semibold text-[11px] text-gray-700 dark:text-slate-200">Notifications</span>
                <span className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">Mark all read</span>
              </div>
              <div className="divide-y divide-gray-100 dark:divide-slate-800 max-h-48 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                <div className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <p className="text-[11px] text-gray-800 dark:text-slate-200">
                    <span className="font-semibold">Marcus Aurelius</span> logged a new Major task.
                  </p>
                  <span className="text-[9px] text-gray-400 dark:text-slate-500 font-mono">2 mins ago</span>
                </div>
                <div className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <p className="text-[11px] text-gray-800 dark:text-slate-200">
                    <span className="font-semibold">Review complete:</span> Sarah Connor task TSK-1024 was marked <span className="text-emerald-600 font-semibold">Perfect</span>.
                  </p>
                  <span className="text-[9px] text-gray-400 dark:text-slate-500 font-mono">15 mins ago</span>
                </div>
                <div className="p-2.5 hover:bg-slate-50 dark:hover:bg-slate-800">
                  <p className="text-[11px] text-gray-800 dark:text-slate-200">
                    Daily reporting sheet generated automatically.
                  </p>
                  <span className="text-[9px] text-gray-400 dark:text-slate-500 font-mono">1 hour ago</span>
                </div>
              </div>
            </div>
          )}
        </div>


      </div>
    </header>
  );
}