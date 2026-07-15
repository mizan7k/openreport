import React, { useState } from 'react';
import { Search, Bell, User, ChevronDown, CheckCircle, Clock } from 'lucide-react';
<<<<<<< HEAD
import { Shift } from '../types';
=======
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb

interface TopNavProps {
  onSearch?: (term: string) => void;
  activeShift: string;
  setActiveShift: (shift: string) => void;
  notificationsCount: number;
<<<<<<< HEAD
  shifts: Shift[];
}

export function TopNav({ onSearch, activeShift, setActiveShift, notificationsCount, shifts }: TopNavProps) {
=======
}

export function TopNav({ onSearch, activeShift, setActiveShift, notificationsCount }: TopNavProps) {
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
  const [searchTerm, setSearchTerm] = useState('');
  const [showShiftDropdown, setShowShiftDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

<<<<<<< HEAD
  // Map dynamic shift configurations to standardized display strings
  const shiftOptions = shifts.map(s => `${s.name} (${s.startTime} - ${s.endTime})`);
=======
  // Hardcoded shifts standard for support teams
  const SHIFTS = [
    'Morning Shift (08:00 - 16:00)',
    'Evening Shift (16:00 - 24:00)',
    'Night Shift (24:00 - 08:00)',
    'General Shift (09:00 - 17:00)'
  ];
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb

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
<<<<<<< HEAD
    <header className="h-12 border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-gray-800 dark:text-slate-100 flex items-center justify-between px-4 sticky top-0 z-40 select-none" id="topnav-container">
=======
    <header className="h-12 border-b border-gray-200 bg-white flex items-center justify-between px-4 sticky top-0 z-40 select-none" id="topnav-container">
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
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
<<<<<<< HEAD
            className="w-full pl-9 pr-3 py-1 text-xs font-sans border border-gray-200 dark:border-slate-700 rounded-sm focus:outline-none focus:border-blue-500 bg-slate-50 dark:bg-slate-800 focus:bg-white dark:focus:bg-slate-900 text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:ring-1 focus:ring-blue-500"
=======
            className="w-full pl-9 pr-3 py-1 text-xs font-sans border border-gray-200 rounded-sm focus:outline-none focus:border-blue-500 bg-slate-50 focus:bg-white placeholder-gray-400 focus:ring-1 focus:ring-blue-500"
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
            id="topnav-search-input"
          />
        </div>
      </div>

      {/* Right Side: Date, Shift, Notification, User details */}
      <div className="flex items-center gap-4 text-xs">
        {/* Current Date */}
<<<<<<< HEAD
        <div className="hidden lg:flex items-center gap-1.5 text-gray-500 dark:text-slate-400 font-mono text-[11px] bg-slate-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded px-2.5 py-1">
=======
        <div className="hidden lg:flex items-center gap-1.5 text-gray-500 font-mono text-[11px] bg-slate-50 border border-gray-100 rounded px-2.5 py-1">
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
          <Clock className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span>{todayDate}</span>
        </div>

        {/* Current Shift Selector */}
        <div className="relative">
          <button
            onClick={() => setShowShiftDropdown(!showShiftDropdown)}
            onBlur={() => setTimeout(() => setShowShiftDropdown(false), 200)}
<<<<<<< HEAD
            className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer font-sans"
=======
            className="flex items-center gap-1.5 px-2.5 py-1 rounded border border-gray-200 bg-white text-gray-700 hover:bg-slate-50 cursor-pointer font-sans"
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
            id="shift-selector-btn"
          >
            <span className="font-semibold text-[10px] text-blue-600 bg-blue-50 px-1 rounded">SHIFT</span>
            <span className="text-[11px] font-mono">{activeShift}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {showShiftDropdown && (
<<<<<<< HEAD
            <div className="absolute right-0 mt-1 w-56 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded shadow-md z-50 py-1 divide-y divide-gray-100 dark:divide-slate-800">
              {shiftOptions.map((shift) => (
                <button
                  key={shift}
                  onClick={() => setActiveShift(shift)}
                  className={`w-full text-left px-3 py-1.5 text-[11px] font-mono hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors ${
                    activeShift === shift ? 'text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-slate-800/50 font-semibold' : 'text-gray-700 dark:text-slate-300'
=======
            <div className="absolute right-0 mt-1 w-56 bg-white border border-gray-200 rounded shadow-md z-50 py-1 divide-y divide-gray-100">
              {SHIFTS.map((shift) => (
                <button
                  key={shift}
                  onClick={() => setActiveShift(shift)}
                  className={`w-full text-left px-3 py-1.5 text-[11px] font-mono hover:bg-blue-50 transition-colors ${
                    activeShift === shift ? 'text-blue-600 bg-blue-50/50 font-semibold' : 'text-gray-700'
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
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
<<<<<<< HEAD
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-slate-200 relative cursor-pointer"
=======
            className="p-1.5 rounded-full hover:bg-slate-100 text-gray-500 hover:text-gray-700 relative cursor-pointer"
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
            id="notification-bell"
          >
            <Bell className="w-4 h-4" />
            {notificationsCount > 0 && (
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
            )}
          </button>

          {showNotifications && (
<<<<<<< HEAD
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
=======
            <div className="absolute right-0 mt-1.5 w-72 bg-white border border-gray-200 rounded shadow-md z-50 py-1.5">
              <div className="px-3 py-1.5 border-b border-gray-200 flex justify-between items-center bg-slate-50">
                <span className="font-semibold text-[11px] text-gray-700">Notifications</span>
                <span className="text-[10px] text-blue-600 font-mono">Mark all read</span>
              </div>
              <div className="divide-y divide-gray-100 max-h-48 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                <div className="p-2.5 hover:bg-slate-50">
                  <p className="text-[11px] text-gray-800">
                    <span className="font-semibold">Marcus Aurelius</span> logged a new Major task.
                  </p>
                  <span className="text-[9px] text-gray-400 font-mono">2 mins ago</span>
                </div>
                <div className="p-2.5 hover:bg-slate-50">
                  <p className="text-[11px] text-gray-800">
                    <span className="font-semibold">Review complete:</span> Sarah Connor task TSK-1024 was marked <span className="text-emerald-600 font-semibold">Perfect</span>.
                  </p>
                  <span className="text-[9px] text-gray-400 font-mono">15 mins ago</span>
                </div>
                <div className="p-2.5 hover:bg-slate-50">
                  <p className="text-[11px] text-gray-800">
                    Daily reporting sheet generated automatically.
                  </p>
                  <span className="text-[9px] text-gray-400 font-mono">1 hour ago</span>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Divider */}
<<<<<<< HEAD
        <div className="h-6 w-px bg-gray-200 dark:bg-slate-800" />
=======
        <div className="h-6 w-px bg-gray-200" />
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb

        {/* User Profile */}
        <div className="relative">
          <button
            onClick={() => setShowProfileDropdown(!showProfileDropdown)}
            onBlur={() => setTimeout(() => setShowProfileDropdown(false), 200)}
<<<<<<< HEAD
            className="flex items-center gap-2 text-left hover:bg-slate-50 dark:hover:bg-slate-800 p-1 rounded-sm cursor-pointer"
            id="profile-dropdown-btn"
          >
            <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-slate-300 font-bold text-[10px] border border-gray-300 dark:border-slate-700">
              AM
            </div>
            <div className="hidden sm:block">
              <p className="text-[11px] font-semibold text-gray-800 dark:text-slate-200 leading-tight">Alex Mercer</p>
              <p className="text-[9px] text-gray-400 dark:text-slate-500 font-mono leading-none">Admin Lead</p>
=======
            className="flex items-center gap-2 text-left hover:bg-slate-50 p-1 rounded-sm cursor-pointer"
            id="profile-dropdown-btn"
          >
            <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-gray-600 font-bold text-[10px] border border-gray-300">
              AM
            </div>
            <div className="hidden sm:block">
              <p className="text-[11px] font-semibold text-gray-800 leading-tight">Alex Mercer</p>
              <p className="text-[9px] text-gray-400 font-mono leading-none">Admin Lead</p>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
            </div>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          {showProfileDropdown && (
<<<<<<< HEAD
            <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded shadow-md z-50 py-1 divide-y divide-gray-100 dark:divide-slate-800">
              <div className="px-3 py-2">
                <p className="text-[11px] text-gray-500 dark:text-slate-400 font-mono">Signed in as:</p>
                <p className="text-[11px] font-semibold text-gray-800 dark:text-slate-200">alex.mercer@srs.office</p>
              </div>
              <div className="py-1">
                <button className="w-full text-left px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-[11px] text-gray-700 dark:text-slate-300">
                  My Profile
                </button>
                <button className="w-full text-left px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-[11px] text-gray-700 dark:text-slate-300">
=======
            <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded shadow-md z-50 py-1 divide-y divide-gray-100">
              <div className="px-3 py-2">
                <p className="text-[11px] text-gray-500 font-mono">Signed in as:</p>
                <p className="text-[11px] font-semibold text-gray-800">alex.mercer@srs.office</p>
              </div>
              <div className="py-1">
                <button className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-[11px] text-gray-700">
                  My Profile
                </button>
                <button className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-[11px] text-gray-700">
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                  Preferences
                </button>
              </div>
              <div className="py-1">
<<<<<<< HEAD
                <button className="w-full text-left px-3 py-1.5 hover:bg-slate-50 dark:hover:bg-slate-800 text-[11px] text-red-600 dark:text-red-400 font-semibold">
=======
                <button className="w-full text-left px-3 py-1.5 hover:bg-slate-50 text-[11px] text-red-600 font-semibold">
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                  Lock Workspace
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
