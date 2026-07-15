import React, { useState } from 'react';
import { Settings, Sliders, CheckSquare, RefreshCw, HardDrive, Database, FileSpreadsheet, Clock, Trash2, Plus, Sun, Moon, Lock, ShieldAlert, KeyRound } from 'lucide-react';
import { Shift } from '../types';

interface SettingsViewProps {
  shifts: Shift[];
  onShiftsChange: React.Dispatch<React.SetStateAction<Shift[]>>;
  isDarkMode?: boolean;
  onToggleDarkMode?: () => void;
  managerPin?: string;
  onChangePin?: (pin: string) => void;
}

function calculateShiftHours(startTime: string, endTime: string): string {
  const parseTimeToMinutes = (timeStr: string): number => {
    const cleaned = timeStr.trim().toUpperCase();
    const isPM = cleaned.includes('PM');
    const isAM = cleaned.includes('AM');
    
    const timeOnly = cleaned.replace(/[AP]M/, '').trim();
    const parts = timeOnly.split(':');
    let hours = parseInt(parts[0], 10) || 0;
    const minutes = parseInt(parts[1], 10) || 0;
    
    if (isPM && hours < 12) {
      hours += 12;
    }
    if (isAM && hours === 12) {
      hours = 0;
    }
    
    return hours * 60 + minutes;
  };

  try {
    let startMins = parseTimeToMinutes(startTime);
    let endMins = parseTimeToMinutes(endTime);
    
    if (endMins < startMins) {
      endMins += 24 * 60;
    }
    
    const diffMins = endMins - startMins;
    return (diffMins / 60).toFixed(1) + ' hrs';
  } catch (e) {
    return '8.0 hrs';
  }
}

export function SettingsView({ shifts, onShiftsChange, isDarkMode = false, onToggleDarkMode, managerPin = '1234', onChangePin }: SettingsViewProps) {
  const [slaTarget, setSlaTarget] = useState(85);
  const [categories, setCategories] = useState([
    'Billing & Invoices',
    'Authentication & Login',
    'UI Bug Reports',
    'Data Export Requests',
    'API Setup',
    'Feature Inquiries',
    'Account Settings',
    'Performance Issues'
  ]);
  const [newCat, setNewCat] = useState('');
  const [autoArchiving, setAutoArchiving] = useState(true);
  const [feedback, setFeedback] = useState('');

  // Shift form states
  const [newShiftName, setNewShiftName] = useState('');
  const [newShiftStart, setNewShiftStart] = useState('09:00 AM');
  const [newShiftEnd, setNewShiftEnd] = useState('05:00 PM');

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCat.trim()) return;
    if (categories.some(c => c.toLowerCase() === newCat.trim().toLowerCase())) {
      setFeedback('Category already exists in list.');
      return;
    }
    setCategories([...categories, newCat.trim()]);
    setNewCat('');
    setFeedback('Category appended successfully.');
    setTimeout(() => setFeedback(''), 3000);
  };

  // Manager PIN state
  const [currentPinInput, setCurrentPinInput] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinFeedback, setPinFeedback] = useState('');

  const handleChangePin = () => {
    if (currentPinInput !== managerPin) {
      setPinFeedback('Current PIN is incorrect.');
      return;
    }
    if (newPin.length < 4 || newPin.length > 6) {
      setPinFeedback('New PIN must be 4–6 digits.');
      return;
    }
    if (newPin !== confirmPin) {
      setPinFeedback('New PIN and confirmation do not match.');
      return;
    }
    if (onChangePin) onChangePin(newPin);
    setPinFeedback('Manager PIN updated successfully.');
    setCurrentPinInput('');
    setNewPin('');
    setConfirmPin('');
    setTimeout(() => setPinFeedback(''), 3000);
  };

  const handleAddShift = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShiftName.trim()) {
      setFeedback('Shift name cannot be empty.');
      return;
    }
    if (shifts.some(s => s.name.toLowerCase() === newShiftName.trim().toLowerCase())) {
      setFeedback('A shift with this name already exists.');
      return;
    }
    
    const newShift: Shift = {
      id: String(Date.now()),
      name: newShiftName.trim(),
      startTime: newShiftStart.trim(),
      endTime: newShiftEnd.trim()
    };

    onShiftsChange([...shifts, newShift]);
    setNewShiftName('');
    setFeedback(`Shift "${newShift.name}" added successfully.`);
    setTimeout(() => setFeedback(''), 3000);
  };

  const handleDeleteShift = (id: string) => {
    const shiftToDelete = shifts.find(s => s.id === id);
    if (shifts.length <= 1) {
      setFeedback('At least one shift must remain active.');
      setTimeout(() => setFeedback(''), 3000);
      return;
    }
    onShiftsChange(shifts.filter(s => s.id !== id));
    if (shiftToDelete) {
      setFeedback(`Shift "${shiftToDelete.name}" deleted successfully.`);
      setTimeout(() => setFeedback(''), 3000);
    }
  };

  const handleSaveWorkspace = () => {
    setFeedback('Workspace parameters written to system memory.');
    setTimeout(() => setFeedback(''), 3000);
  };

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-950 space-y-4 text-xs text-gray-800 dark:text-slate-200" id="settings-view-container">
      {/* Title */}
      <div className="border-b border-gray-200 dark:border-slate-800 pb-3">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100">Workspace & System Settings</h2>
        <p className="text-xs text-gray-500 dark:text-slate-400 font-mono">Configure operational targets, dynamic dropdown options, archiving behaviors, and database properties.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Left Card: Targets */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-sm p-4 space-y-4">
          <div className="flex items-center gap-1.5 pb-2 border-b border-gray-100 dark:border-slate-800 font-semibold text-gray-700 dark:text-slate-200">
            <Sliders className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Target Performance Parameters</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-gray-500 dark:text-slate-400 font-mono font-bold uppercase mb-1">Target SLA Resolution Rate (%)</label>
              <div className="flex items-center gap-2">
                <input
                  type="range"
                  min="50"
                  max="100"
                  value={slaTarget}
                  onChange={(e) => setSlaTarget(Number(e.target.value))}
                  className="w-full h-1 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="font-mono font-bold bg-blue-50 dark:bg-slate-800 text-blue-700 dark:text-blue-400 border border-blue-100 dark:border-slate-700 px-2 py-0.5 rounded text-[11px] shrink-0">
                  {slaTarget}%
                </span>
              </div>
              <p className="text-[10px] text-gray-400 dark:text-slate-500 mt-1">Alert thresholds and highlight rules update instantly based on this target.</p>
            </div>

            <div>
              <label className="block text-gray-500 dark:text-slate-400 font-mono font-bold uppercase mb-1">Backup & Archiving Strategy</label>
              <label className="flex items-center gap-2 mt-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={autoArchiving}
                  onChange={(e) => setAutoArchiving(e.target.checked)}
                  className="rounded text-blue-600 dark:text-blue-400 focus:ring-blue-500 dark:bg-slate-800 dark:border-slate-700"
                />
                <span className="font-sans text-gray-700 dark:text-slate-300">Auto-archive logged items older than 30 business days</span>
              </label>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-slate-800">
              <label className="block text-gray-500 dark:text-slate-400 font-mono font-bold uppercase mb-2">System Appearance</label>
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 p-3 rounded-sm">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded bg-amber-50 dark:bg-slate-800 text-amber-600 dark:text-amber-400">
                    {isDarkMode ? <Moon className="w-4 h-4 text-indigo-500 dark:text-indigo-400" /> : <Sun className="w-4 h-4 text-amber-500" />}
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700 dark:text-slate-200 block text-xs">Dark Mode Theme</span>
                    <span className="text-[10px] text-gray-400 dark:text-slate-500">Reduce eye strain in low-light environments</span>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={isDarkMode}
                    onChange={onToggleDarkMode}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 dark:bg-slate-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-500"></div>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Category editor */}
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-sm p-4 space-y-4">
          <div className="flex items-center gap-1.5 pb-2 border-b border-gray-100 dark:border-slate-800 font-semibold text-gray-700 dark:text-slate-200">
            <CheckSquare className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Manage Support Categories</span>
          </div>

          <form onSubmit={handleAddCategory} className="flex gap-2">
            <input
              type="text"
              value={newCat}
              onChange={(e) => setNewCat(e.target.value)}
              placeholder="Ex: Billing API, Performance, SSO"
              className="flex-1 bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-sm px-2 py-1 text-xs focus:outline-none focus:bg-white dark:focus:bg-slate-900 text-gray-800 dark:text-slate-100"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-[11px] font-semibold px-3 py-1 rounded-sm border border-blue-700 dark:border-blue-600 cursor-pointer"
            >
              Add Row
            </button>
          </form>

          <div className="border border-gray-200 dark:border-slate-800 rounded-sm overflow-hidden bg-slate-50 dark:bg-slate-900 max-h-36 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
            <table className="w-full text-left font-mono text-[10px]">
              <thead>
                <tr className="bg-slate-100 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 font-bold divide-x divide-gray-200 dark:divide-slate-700">
                  <th className="px-2 py-1">Row #</th>
                  <th className="px-2 py-1">Category Label</th>
                  <th className="px-2 py-1 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
                {categories.map((cat, idx) => (
                  <tr key={cat} className="divide-x divide-gray-100 dark:divide-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                    <td className="px-2 py-1 text-gray-400 dark:text-slate-500">{idx + 1}</td>
                    <td className="px-2 py-1 text-gray-700 dark:text-slate-200 font-sans font-medium">{cat}</td>
                    <td className="px-2 py-1 text-center">
                      <button
                        type="button"
                        onClick={() => setCategories(categories.filter(c => c !== cat))}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-bold font-mono cursor-pointer"
                      >
                        [Delete]
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Dynamic Shift timings Editor */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-sm p-4 space-y-4">
        <div className="flex items-center gap-1.5 pb-2 border-b border-gray-100 dark:border-slate-800 font-semibold text-gray-700 dark:text-slate-200">
          <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <span>Manage Operational Shifts</span>
        </div>

        <form onSubmit={handleAddShift} className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end">
          <div>
            <label className="block text-gray-500 dark:text-slate-400 font-mono text-[9px] uppercase font-bold mb-1">Shift Name</label>
            <input
              type="text"
              value={newShiftName}
              onChange={(e) => setNewShiftName(e.target.value)}
              placeholder="Ex: Shift 4, Weekend AM"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-sm px-2.5 py-1 text-xs focus:outline-none focus:bg-white dark:focus:bg-slate-900 text-gray-800 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-gray-500 dark:text-slate-400 font-mono text-[9px] uppercase font-bold mb-1">Start Time (AM/PM)</label>
            <input
              type="text"
              value={newShiftStart}
              onChange={(e) => setNewShiftStart(e.target.value)}
              placeholder="Ex: 11:00 AM"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-sm px-2.5 py-1 text-xs focus:outline-none focus:bg-white dark:focus:bg-slate-900 text-gray-800 dark:text-slate-100"
            />
          </div>
          <div>
            <label className="block text-gray-500 dark:text-slate-400 font-mono text-[9px] uppercase font-bold mb-1">End Time (AM/PM)</label>
            <input
              type="text"
              value={newShiftEnd}
              onChange={(e) => setNewShiftEnd(e.target.value)}
              placeholder="Ex: 07:00 PM"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-sm px-2.5 py-1 text-xs focus:outline-none focus:bg-white dark:focus:bg-slate-900 text-gray-800 dark:text-slate-100"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 dark:bg-emerald-500 dark:hover:bg-emerald-600 text-white text-[11px] font-semibold py-1.5 px-3 rounded-sm border border-emerald-700 dark:border-emerald-600 flex items-center justify-center gap-1 cursor-pointer transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Shift</span>
            </button>
          </div>
        </form>

        <div className="border border-gray-200 dark:border-slate-800 rounded-sm overflow-hidden bg-slate-50 dark:bg-slate-900">
          <table className="w-full text-left font-mono text-[10px]">
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-800 border-b border-gray-200 dark:border-slate-700 text-gray-500 dark:text-slate-400 font-bold divide-x divide-gray-200 dark:divide-slate-700">
                <th className="px-3 py-2">ID</th>
                <th className="px-3 py-2">Shift Name</th>
                <th className="px-3 py-2">Start Time</th>
                <th className="px-3 py-2">End Time</th>
                <th className="px-3 py-2">Calculated Shift Duration</th>
                <th className="px-3 py-2 text-center">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-slate-800 bg-white dark:bg-slate-900">
              {shifts.map((shift, idx) => (
                <tr key={shift.id} className="divide-x divide-gray-100 dark:divide-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                  <td className="px-3 py-1.5 text-gray-400 dark:text-slate-500 font-bold">{idx + 1}</td>
                  <td className="px-3 py-1.5 font-sans font-semibold text-gray-800 dark:text-slate-200">{shift.name}</td>
                  <td className="px-3 py-1.5 text-blue-600 dark:text-blue-400 font-mono font-medium">{shift.startTime}</td>
                  <td className="px-3 py-1.5 text-indigo-600 dark:text-indigo-400 font-mono font-medium">{shift.endTime}</td>
                  <td className="px-3 py-1.5 font-mono">
                    <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900 px-1.5 py-0.2 rounded font-bold text-[9px]">
                      {calculateShiftHours(shift.startTime, shift.endTime)}
                    </span>
                  </td>
                  <td className="px-3 py-1.5 text-center">
                    <button
                      type="button"
                      onClick={() => handleDeleteShift(shift.id)}
                      className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-bold font-sans hover:underline flex items-center gap-1 mx-auto text-[10px] cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Delete</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Manager Security */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-sm p-4 space-y-3">
        <div className="flex items-center gap-1.5 pb-2 border-b border-gray-100 dark:border-slate-800 font-semibold text-gray-700 dark:text-slate-200">
          <ShieldAlert className="w-4 h-4 text-amber-500 dark:text-amber-400" />
          <span>Manager Security</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-end">
          <div>
            <label className="block text-gray-500 dark:text-slate-400 font-mono text-[9px] uppercase font-bold mb-1">Current PIN</label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={6}
              value={currentPinInput}
              onChange={e => { setCurrentPinInput(e.target.value.replace(/\D/g, '').slice(0, 6)); setPinFeedback(''); }}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-sm px-2.5 py-1 text-xs font-mono focus:outline-none focus:bg-white dark:focus:bg-slate-900 text-gray-800 dark:text-slate-100"
              placeholder="Enter current PIN"
            />
          </div>
          <div>
            <label className="block text-gray-500 dark:text-slate-400 font-mono text-[9px] uppercase font-bold mb-1">New PIN (4–6 digits)</label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={6}
              value={newPin}
              onChange={e => { setNewPin(e.target.value.replace(/\D/g, '').slice(0, 6)); setPinFeedback(''); }}
              className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-sm px-2.5 py-1 text-xs font-mono focus:outline-none focus:bg-white dark:focus:bg-slate-900 text-gray-800 dark:text-slate-100"
              placeholder="Enter new PIN"
            />
          </div>
          <div className="flex items-end gap-2">
            <div className="flex-1">
              <label className="block text-gray-500 dark:text-slate-400 font-mono text-[9px] uppercase font-bold mb-1">Confirm PIN</label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={6}
                value={confirmPin}
                onChange={e => { setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 6)); setPinFeedback(''); }}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-sm px-2.5 py-1 text-xs font-mono focus:outline-none focus:bg-white dark:focus:bg-slate-900 text-gray-800 dark:text-slate-100"
                placeholder="Confirm new PIN"
              />
            </div>
            <button
              onClick={handleChangePin}
              className="bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 text-white text-[11px] font-semibold py-1.5 px-3 rounded-sm border border-amber-700 dark:border-amber-600 flex items-center gap-1 cursor-pointer transition-colors shrink-0"
            >
              <KeyRound className="w-3.5 h-3.5" />
              <span>Update PIN</span>
            </button>
          </div>
        </div>

        {pinFeedback && (
          <div className={`font-mono text-[10px] px-2.5 py-1.5 rounded-sm border ${
            pinFeedback.includes('successfully')
              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
              : 'bg-red-50 dark:bg-red-950/40 text-red-600 dark:text-red-400 border-red-200 dark:border-red-800'
          }`}>
            {pinFeedback}
          </div>
        )}
      </div>

      {/* Brand & Slogan Credits Card */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-700 dark:from-emerald-700 dark:to-teal-900 rounded-sm p-4 text-white space-y-2 relative overflow-hidden" id="brand-credits-card">
        <div className="relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold tracking-wide">Open Report</span>
            <span className="bg-emerald-800/60 dark:bg-emerald-950/60 text-[9px] px-2 py-0.5 rounded font-mono font-medium">v2.0</span>
          </div>
          <p className="text-xs text-emerald-100 dark:text-emerald-200 italic mt-0.5 font-medium">"Frictionless Shift Accountability"</p>
          <div className="mt-4 pt-3 border-t border-emerald-500/40 dark:border-emerald-700/40 flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono">
            <span>Operational Reporting Suite</span>
            <span>
              built with â¤ï¸ by{' '}
              <a
                href="https://github.com/mizan7k"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-emerald-200 transition-colors font-bold text-white"
              >
                mizan7k
              </a>
            </span>
          </div>
        </div>
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none">
          <FileSpreadsheet className="w-28 h-28" />
        </div>
      </div>

      {/* Save Trigger / Feedback */}
      {feedback && (
        <div className="bg-blue-50 dark:bg-slate-800 text-blue-800 dark:text-blue-200 border border-blue-200 dark:border-slate-700 rounded p-2.5 font-mono">
          {feedback}
        </div>
      )}

      <div className="flex justify-end pt-2">
        <button
          onClick={handleSaveWorkspace}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-xs font-semibold px-4 py-1.5 rounded-sm border border-blue-700 dark:border-blue-600 shadow-sm cursor-pointer"
        >
          Commit Workspace Parameters
        </button>
      </div>
    </div>
  );
}