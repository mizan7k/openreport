<<<<<<< HEAD
import React, { useState, useEffect, useMemo } from 'react';
import { WorkLog, EmployeePerformance } from '../types';
import { ExcelTable } from './ExcelTable';
import { ColumnDef } from '@tanstack/react-table';
import { PhoneCall, CheckSquare, PlusSquare, AlertOctagon, HelpCircle, FileCheck, ArrowRightLeft, TrendingUp, Clock } from 'lucide-react';
=======
import React, { useMemo } from 'react';
import { WorkLog, EmployeePerformance } from '../types';
import { ExcelTable } from './ExcelTable';
import { ColumnDef } from '@tanstack/react-table';
import { PhoneCall, CheckSquare, PlusSquare, AlertOctagon, HelpCircle, FileCheck, ArrowRightLeft, TrendingUp } from 'lucide-react';
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
import { getEmployeePerformance, INITIAL_WORK_LOGS } from '../data';

interface DashboardViewProps {
  logs: WorkLog[];
  onNavigate: (view: any) => void;
  onUpdateLog: (id: string, update: Partial<WorkLog>) => void;
}

export function DashboardView({ logs, onNavigate, onUpdateLog }: DashboardViewProps) {
<<<<<<< HEAD
  // Live Clock Ticker
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

=======
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
  // 1. Dynamic Metric Calculations
  const metrics = useMemo(() => {
    const todayStr = '2026-07-14';
    const todayLogs = logs.filter(l => l.date === todayStr);

    const hasManual = logs.some(l => 
      l.callsReceived !== undefined || 
      l.tasksCreatedToday !== undefined ||
      l.isOldQuerySolved !== undefined ||
      !INITIAL_WORK_LOGS.some(init => init.uniqueId === l.uniqueId)
    );

    let callsReceived = 0;
    let callsDialed = 0;
    let tasksCreated = 0;
    let tasksSolved = 0;
    let pendingTasks = 0;
    let oldTasksSolved = 0;

    if (hasManual) {
      logs.forEach(l => {
        callsReceived += l.callsReceived || 0;
        callsDialed += l.callsDialed || 0;

        if (l.tasksCreatedToday !== undefined) {
          tasksCreated += l.tasksCreatedToday;
        } else if (l.id.startsWith('TSK-')) {
          tasksCreated += 1;
        }

        if (l.tasksSolvedToday !== undefined) {
          tasksSolved += l.tasksSolvedToday;
        } else if (l.id.startsWith('TSK-') && l.status === 'Solved') {
          tasksSolved += 1;
        }

        if (l.pendingTasks !== undefined) {
          pendingTasks += l.pendingTasks;
        } else if (l.id.startsWith('TSK-') && l.status === 'Pending') {
          pendingTasks += 1;
        }

        if (l.oldQueriesSolved !== undefined) {
          oldTasksSolved += l.oldQueriesSolved;
        } else if (l.id.startsWith('TSK-') && l.status === 'Solved' && l.isOldQuerySolved) {
          oldTasksSolved += 1;
        }
      });
    } else {
      tasksCreated = logs.length;
      tasksSolved = logs.filter(l => l.status === 'Solved').length;
      pendingTasks = logs.filter(l => l.status === 'Pending').length;

      // Static base stats which are standard support targets
      const baseCallsReceived = 384;
      const baseCallsDialed = 296;
      const baseOldQueriesSolved = 48;

      callsReceived = baseCallsReceived + todayLogs.length;
      callsDialed = baseCallsDialed + todayLogs.filter(l => l.minutes < 30).length;
      oldTasksSolved = baseOldQueriesSolved;
    }

    return {
      callsReceived,
      callsDialed,
      tasksCreated,
      tasksSolved,
      pendingTasks,
      oldTasksSolved,
    };
  }, [logs]);

  // 2. Filter data for the preview tables
  const recentLogs = useMemo(() => {
    return [...logs].sort((a, b) => b.id.localeCompare(a.id)).slice(0, 5);
  }, [logs]);

  const pendingLogs = useMemo(() => {
    return logs.filter(l => l.status === 'Pending');
  }, [logs]);

  // 3. Manager Review Distribution Summary
  const reviewSummary = useMemo(() => {
    const counts = {
      Perfect: 0,
      Error: 0,
      Delay: 0,
      'Late Reply': 0,
      Incomplete: 0,
      'Wrong Category': 0,
      Other: 0,
      'Pending Review': 0,
    };

    logs.forEach(l => {
      if (l.managerReview in counts) {
        counts[l.managerReview as keyof typeof counts]++;
      }
    });

    return Object.entries(counts).map(([status, count]) => ({ status, count }));
  }, [logs]);

  // 4. Team Performance top 5 list
  const topPerformers = useMemo(() => {
    const performances = getEmployeePerformance(logs);
    return performances.sort((a, b) => b.resolutionRate - a.resolutionRate).slice(0, 4);
  }, [logs]);

  // 5. Excel Table Columns for Recent Logs Preview
  const recentLogsColumns: ColumnDef<WorkLog>[] = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'Task ID',
      size: 80,
    },
    {
      accessorKey: 'employeeName',
      header: 'Agent',
      size: 110,
    },
    {
      accessorKey: 'minutes',
      header: 'Min',
      size: 55,
      cell: info => <span className="font-mono">{info.getValue() as number}m</span>
    },
    {
      accessorKey: 'category',
      header: 'Category',
      size: 120,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 80,
      cell: info => {
        const val = info.getValue() as string;
        const color = 
          val === 'Solved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
          val === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
          'bg-blue-50 text-blue-700 border-blue-200';
        return (
<<<<<<< HEAD
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border dark:border-slate-700 ${color}`}>
=======
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${color}`}>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
            {val}
          </span>
        );
      }
    },
    {
      accessorKey: 'managerReview',
      header: 'Manager Review',
      size: 110,
      cell: info => {
        const val = info.getValue() as string;
        const style = 
          val === 'Perfect' ? 'text-emerald-600 font-semibold' :
          val === 'Pending Review' ? 'text-gray-400 font-mono italic' :
          'text-rose-600 font-semibold';
        return <span className={style}>{val}</span>;
      }
    },
    {
      accessorKey: 'notes',
      header: 'Summary Notes',
      size: 250,
<<<<<<< HEAD
      cell: info =>             <span className="text-gray-500 dark:text-slate-400 font-sans truncate block max-w-xs">{info.getValue() as string}</span>
=======
      cell: info => <span className="text-gray-500 font-sans truncate block max-w-xs">{info.getValue() as string}</span>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
    }
  ], []);

  // Columns for Pending Logs Preview
  const pendingLogsColumns: ColumnDef<WorkLog>[] = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'Task ID',
      size: 80,
    },
    {
      accessorKey: 'employeeName',
      header: 'Agent',
      size: 110,
    },
    {
      accessorKey: 'minutes',
      header: 'Time Open',
      size: 80,
<<<<<<< HEAD
      cell: info =>                   <span className="font-mono text-amber-700 dark:text-amber-400">{info.getValue() as number} mins</span>
=======
      cell: info => <span className="font-mono text-amber-700">{info.getValue() as number} mins</span>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
    },
    {
      accessorKey: 'category',
      header: 'Category',
      size: 130,
    },
    {
      accessorKey: 'notes',
      header: 'Unresolved Notes',
      size: 300,
    },
    {
      id: 'actions',
      header: 'Action',
      size: 100,
      cell: ({ row }) => (
        <button
          onClick={() => {
            // Update state to solved
            onUpdateLog(row.original.uniqueId, { status: 'Solved' });
          }}
<<<<<<< HEAD
          className="text-[10px] bg-blue-50 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-slate-800 text-blue-700 dark:text-blue-400 font-mono px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800 cursor-pointer"
=======
          className="text-[10px] bg-blue-50 hover:bg-blue-100 text-blue-700 font-mono px-2 py-0.5 rounded border border-blue-200 cursor-pointer"
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
        >
          Mark Solved
        </button>
      )
    }
  ], [onUpdateLog]);

  return (
<<<<<<< HEAD
    <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-950 space-y-4" id="dashboard-view-container">
      {/* View Title & Breadcrumb */}
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-slate-800 pb-3" id="dashboard-view-header">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100" id="dashboard-view-title">Dashboard Overview</h2>
          <p className="text-xs text-gray-500 dark:text-slate-400 font-mono">WORKSPACE_ROOT / DASHBOARD_SHEET / SHEET1</p>
=======
    <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4" id="dashboard-view-container">
      {/* View Title & Breadcrumb */}
      <div className="flex justify-between items-center border-b border-gray-200 pb-3" id="dashboard-view-header">
        <div>
          <h2 className="text-lg font-semibold text-gray-800" id="dashboard-view-title">Dashboard Overview</h2>
          <p className="text-xs text-gray-500 font-mono">WORKSPACE_ROOT / DASHBOARD_SHEET / SHEET1</p>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => onNavigate('worklogs-add')}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded border border-blue-700 shadow-sm cursor-pointer"
          >
            + Create Log Entry
          </button>
          <button 
            onClick={() => onNavigate('manager-review')}
<<<<<<< HEAD
            className="bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-gray-700 dark:text-slate-200 text-xs font-medium px-3 py-1.5 rounded border border-gray-200 dark:border-slate-700 shadow-sm cursor-pointer"
=======
            className="bg-white hover:bg-slate-50 text-gray-700 text-xs font-medium px-3 py-1.5 rounded border border-gray-200 shadow-sm cursor-pointer"
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
          >
            Run Review Flow
          </button>
        </div>
      </div>

<<<<<<< HEAD
      {/* Live Digital Clock & Greeting Banner */}
      <div className="bg-gradient-to-r from-slate-800 to-indigo-900 rounded border border-slate-700 p-4 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm" id="dashboard-live-clock-banner">
        <div className="space-y-1">
          <span className="text-[9px] font-mono text-indigo-300 font-bold uppercase tracking-wider bg-slate-700/50 px-2 py-0.5 rounded border border-slate-600/30">System Time Clock</span>
          <h3 className="text-xs font-sans font-medium text-slate-100">Welcome back, Lead Admin. Live operational metrics are rendering below.</h3>
        </div>
        <div className="flex items-center gap-3 bg-slate-900/60 border border-slate-700/50 rounded-lg p-2.5 shadow-inner shrink-0 self-start sm:self-auto">
          <div className="bg-indigo-600 p-1.5 rounded text-white shrink-0">
            <Clock className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-md font-mono font-bold tracking-tight text-white leading-none">
              {formattedTime}
            </div>
            <div className="text-[9px] text-indigo-300 font-mono font-medium mt-1 leading-none uppercase">
              {formattedDate}
            </div>
          </div>
        </div>
      </div>

      {/* KPI STATISTICS METRIC GRID (Excel Style Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2" id="kpi-grid">
        {/* Cell 1: Calls Received */}
        <div className="bg-white dark:bg-slate-900 p-3 border border-gray-200 dark:border-slate-700 rounded-sm shadow-2xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-gray-400 dark:text-slate-500 font-bold uppercase">Calls Received</span>
            <PhoneCall className="w-3.5 h-3.5 text-gray-400 dark:text-slate-500" />
          </div>
          <div className="mt-2">
            <p className="text-xl font-mono font-bold text-gray-800">{metrics.callsReceived}</p>
            <span className="text-[9px] text-green-600 dark:text-green-400 font-mono font-bold">▲ Live Inflow</span>
=======
      {/* KPI STATISTICS METRIC GRID (Excel Style Cards) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2" id="kpi-grid">
        {/* Cell 1: Calls Received */}
        <div className="bg-white p-3 border border-gray-200 rounded-sm shadow-2xs flex flex-col justify-between">
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">Calls Received</span>
            <PhoneCall className="w-3.5 h-3.5 text-gray-400" />
          </div>
          <div className="mt-2">
            <p className="text-xl font-mono font-bold text-gray-800">{metrics.callsReceived}</p>
            <span className="text-[9px] text-green-600 font-mono font-bold">▲ Live Inflow</span>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
          </div>
        </div>

        {/* Cell 2: Calls Dialed */}
<<<<<<< HEAD
        <div className="bg-white dark:bg-slate-900 p-3 border border-gray-200 dark:border-slate-700 rounded-sm shadow-2xs flex flex-col justify-between">
=======
        <div className="bg-white p-3 border border-gray-200 rounded-sm shadow-2xs flex flex-col justify-between">
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">Calls Dialed</span>
            <ArrowRightLeft className="w-3.5 h-3.5 text-gray-400" />
          </div>
          <div className="mt-2">
            <p className="text-xl font-mono font-bold text-gray-800">{metrics.callsDialed}</p>
<<<<<<< HEAD
            <span className="text-[9px] text-gray-400 dark:text-slate-500 font-mono">Outgoing callbacks</span>
=======
            <span className="text-[9px] text-gray-400 font-mono">Outgoing callbacks</span>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
          </div>
        </div>

        {/* Cell 3: Tasks Created */}
<<<<<<< HEAD
        <div className="bg-white dark:bg-slate-900 p-3 border border-gray-200 dark:border-slate-700 rounded-sm shadow-2xs flex flex-col justify-between">
=======
        <div className="bg-white p-3 border border-gray-200 rounded-sm shadow-2xs flex flex-col justify-between">
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">Tasks Created</span>
            <PlusSquare className="w-3.5 h-3.5 text-gray-400" />
          </div>
          <div className="mt-2">
            <p className="text-xl font-mono font-bold text-gray-800">{metrics.tasksCreated}</p>
            <span className="text-[9px] text-blue-600 font-mono font-bold">Logged today</span>
          </div>
        </div>

        {/* Cell 4: Tasks Solved */}
<<<<<<< HEAD
        <div className="bg-white dark:bg-slate-900 p-3 border border-gray-200 dark:border-slate-700 rounded-sm shadow-2xs flex flex-col justify-between">
=======
        <div className="bg-white p-3 border border-gray-200 rounded-sm shadow-2xs flex flex-col justify-between">
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">Tasks Solved</span>
            <CheckSquare className="w-3.5 h-3.5 text-emerald-500" />
          </div>
          <div className="mt-2">
            <p className="text-xl font-mono font-bold text-emerald-600">{metrics.tasksSolved}</p>
            <span className="text-[9px] text-emerald-600 font-mono font-bold">
              {metrics.tasksCreated > 0 ? Math.round((metrics.tasksSolved / metrics.tasksCreated) * 100) : 100}% rate
            </span>
          </div>
        </div>

        {/* Cell 5: Pending Tasks */}
<<<<<<< HEAD
        <div className="bg-white dark:bg-slate-900 p-3 border border-gray-200 dark:border-slate-700 rounded-sm shadow-2xs flex flex-col justify-between">
=======
        <div className="bg-white p-3 border border-gray-200 rounded-sm shadow-2xs flex flex-col justify-between">
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">Pending Tasks</span>
            <AlertOctagon className="w-3.5 h-3.5 text-amber-500" />
          </div>
          <div className="mt-2">
            <p className="text-xl font-mono font-bold text-amber-600">{metrics.pendingTasks}</p>
            <span className="text-[9px] text-amber-600 font-mono font-bold">Needs SLA follow up</span>
          </div>
        </div>

        {/* Cell 6: Old Tasks Solved */}
<<<<<<< HEAD
        <div className="bg-white dark:bg-slate-900 p-3 border border-gray-200 dark:border-slate-700 rounded-sm shadow-2xs flex flex-col justify-between">
=======
        <div className="bg-white p-3 border border-gray-200 rounded-sm shadow-2xs flex flex-col justify-between">
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
          <div className="flex justify-between items-start">
            <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">Old Solved</span>
            <HelpCircle className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <div className="mt-2">
            <p className="text-xl font-mono font-bold text-purple-700">{metrics.oldTasksSolved}</p>
<<<<<<< HEAD
            <span className="text-[9px] text-purple-600 dark:text-purple-400 font-mono">Backlog cleaned</span>
=======
            <span className="text-[9px] text-purple-600 font-mono">Backlog cleaned</span>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
          </div>
        </div>
      </div>

      {/* MID SECTION: PREVIEW TABLES (SHEET SECTIONS) */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4" id="mid-section">
        {/* Recent Work Logs Table (2 cols span) */}
<<<<<<< HEAD
        <div className="xl:col-span-2 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-sm shadow-2xs flex flex-col">
          <div className="px-3 py-2 border-b border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
            <h3 className="font-semibold text-gray-700 dark:text-slate-200 font-sans flex items-center gap-1.5 text-xs">
=======
        <div className="xl:col-span-2 bg-white border border-gray-200 rounded-sm shadow-2xs flex flex-col">
          <div className="px-3 py-2 border-b border-gray-200 bg-slate-50 flex items-center justify-between">
            <h3 className="font-semibold text-gray-700 font-sans flex items-center gap-1.5 text-xs">
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              Recent Work Logs Sheet (Last 5 Entries)
            </h3>
            <button
              onClick={() => onNavigate('worklogs-history')}
<<<<<<< HEAD
              className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-mono text-[10px] uppercase font-bold"
=======
              className="text-blue-600 hover:text-blue-800 font-mono text-[10px] uppercase font-bold"
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
            >
              View Full Sheet →
            </button>
          </div>
          <div className="flex-1">
            <ExcelTable id="recent-logs" data={recentLogs} columns={recentLogsColumns} />
          </div>
        </div>

        {/* Sidebar Mini Summaries: Review Summary & Top Performers */}
        <div className="space-y-4">
          {/* Manager Review Distribution Summary */}
<<<<<<< HEAD
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-sm shadow-2xs flex flex-col">
            <div className="px-3 py-2 border-b border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
              <h3 className="font-semibold text-gray-700 dark:text-slate-200 font-sans flex items-center gap-1.5 text-xs">
=======
          <div className="bg-white border border-gray-200 rounded-sm shadow-2xs flex flex-col">
            <div className="px-3 py-2 border-b border-gray-200 bg-slate-50 flex items-center justify-between">
              <h3 className="font-semibold text-gray-700 font-sans flex items-center gap-1.5 text-xs">
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                <FileCheck className="w-3.5 h-3.5 text-blue-600" />
                Manager Review Audit Count
              </h3>
            </div>
            <div className="p-2">
              <table className="w-full border-collapse border border-gray-200 font-mono text-[11px]">
                <thead>
                  <tr className="bg-slate-50 divide-x divide-gray-200 border-b border-gray-200 text-[10px] text-gray-500">
                    <th className="px-3 py-1 font-semibold text-left">Quality Code</th>
                    <th className="px-3 py-1 font-semibold text-right">Occurrence</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {reviewSummary.map(({ status, count }) => (
                    <tr key={status} className="divide-x divide-gray-100 hover:bg-slate-50">
                      <td className="px-3 py-1.5 flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${
                          status === 'Perfect' ? 'bg-emerald-500' :
                          status === 'Pending Review' ? 'bg-gray-300' : 'bg-red-400'
                        }`} />
                        <span>{status}</span>
                      </td>
                      <td className="px-3 py-1.5 text-right font-bold text-gray-700">{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Team Performers Sheet */}
<<<<<<< HEAD
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-sm shadow-2xs flex flex-col">
            <div className="px-3 py-2 border-b border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
              <h3 className="font-semibold text-gray-700 dark:text-slate-200 font-sans flex items-center gap-1.5 text-xs">
=======
          <div className="bg-white border border-gray-200 rounded-sm shadow-2xs flex flex-col">
            <div className="px-3 py-2 border-b border-gray-200 bg-slate-50 flex items-center justify-between">
              <h3 className="font-semibold text-gray-700 font-sans flex items-center gap-1.5 text-xs">
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                Team Performance Highlights
              </h3>
              <button
                onClick={() => onNavigate('manager-performance')}
<<<<<<< HEAD
                className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-mono text-[10px] uppercase font-bold"
=======
                className="text-blue-600 hover:text-blue-800 font-mono text-[10px] uppercase font-bold"
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
              >
                View Analytics →
              </button>
            </div>
            <div className="p-2">
              <table className="w-full border-collapse border border-gray-200 font-mono text-[11px]">
                <thead>
                  <tr className="bg-slate-50 divide-x divide-gray-200 border-b border-gray-200 text-[10px] text-gray-500">
                    <th className="px-3 py-1 font-semibold text-left">Agent Name</th>
                    <th className="px-3 py-1 font-semibold text-right">Total Min</th>
                    <th className="px-3 py-1 font-semibold text-right">SLA %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {topPerformers.map((emp) => (
                    <tr key={emp.employeeName} className="divide-x divide-gray-100 hover:bg-slate-50">
                      <td className="px-3 py-1.5 font-sans font-medium text-gray-700">{emp.employeeName}</td>
                      <td className="px-3 py-1.5 text-right font-semibold text-gray-600">{emp.totalMinutes}m</td>
                      <td className="px-3 py-1.5 text-right">
<<<<<<< HEAD
                        <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-150 dark:border-emerald-800 px-1 rounded font-bold text-[10px]">
=======
                        <span className="bg-emerald-50 text-emerald-700 border border-emerald-150 px-1 rounded font-bold text-[10px]">
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                          {emp.resolutionRate}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: PENDING TASKS SPREADSHEET */}
      <div className="bg-white border border-gray-200 rounded-sm shadow-2xs flex flex-col" id="pending-tasks-section">
<<<<<<< HEAD
        <div className="px-3 py-2 border-b border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
          <h3 className="font-semibold text-gray-700 dark:text-slate-200 font-sans flex items-center gap-1.5 text-xs">
=======
        <div className="px-3 py-2 border-b border-gray-200 bg-slate-50 flex items-center justify-between">
          <h3 className="font-semibold text-gray-700 font-sans flex items-center gap-1.5 text-xs">
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
            <span className="w-2 h-2 rounded-full bg-amber-500"></span>
            Unresolved Pending Support Queues
          </h3>
          <button
            onClick={() => onNavigate('worklogs-pending')}
            className="text-blue-600 hover:text-blue-800 font-mono text-[10px] uppercase font-bold"
          >
            View Work Queue →
          </button>
        </div>
        <div className="flex-1">
          <ExcelTable id="pending-logs" data={pendingLogs} columns={pendingLogsColumns} />
        </div>
      </div>
    </div>
  );
}
