import React, { useMemo } from 'react';
import { WorkLog, EmployeePerformance } from '../types';
import { ExcelTable } from './ExcelTable';
import { ColumnDef } from '@tanstack/react-table';
import { getEmployeePerformance } from '../data';
import { TrendingUp, Award, AlertTriangle, ShieldCheck } from 'lucide-react';

interface EmployeePerformanceViewProps {
  logs: WorkLog[];
}

export function EmployeePerformanceView({ logs }: EmployeePerformanceViewProps) {
  // Generate dynamically updated performance sheets
  const performances = useMemo(() => {
    return getEmployeePerformance(logs);
  }, [logs]);

  // Overall support center metrics
  const supportCenterStats = useMemo(() => {
    const totalCalls = performances.reduce((sum, e) => sum + e.callsReceived, 0);
    const totalMinutes = performances.reduce((sum, e) => sum + e.totalMinutes, 0);
    const avgResolutionRate = Math.round(
      performances.reduce((sum, e) => sum + e.resolutionRate, 0) / (performances.length || 1)
    );
    const perfectReviews = performances.reduce((sum, e) => sum + e.perfect, 0);

    return {
      totalCalls,
      totalMinutes,
      avgResolutionRate,
      perfectReviews,
    };
  }, [performances]);

  // Excel columns definition for Performance Matrix
  const performanceColumns: ColumnDef<EmployeePerformance>[] = useMemo(() => [
    {
      accessorKey: 'employeeName',
      header: 'Employee Name',
      size: 130,
      cell: info => <span className="font-sans font-semibold text-gray-800">{info.getValue() as string}</span>
    },
    {
      accessorKey: 'callsReceived',
      header: 'Calls Rec',
      size: 75,
      cell: info => <span className="font-mono text-gray-600">{info.getValue() as number}</span>
    },
    {
      accessorKey: 'callsDialed',
      header: 'Calls Dial',
      size: 75,
      cell: info => <span className="font-mono text-gray-600">{info.getValue() as number}</span>
    },
    {
      accessorKey: 'tasksCreated',
      header: 'Tasks Created',
      size: 90,
      cell: info => <span className="font-mono font-bold text-gray-700">{info.getValue() as number}</span>
    },
    {
      accessorKey: 'solved',
      header: 'Solved',
      size: 70,
      cell: info => <span className="font-mono text-emerald-600 font-semibold">{info.getValue() as number}</span>
    },
    {
      accessorKey: 'pending',
      header: 'Pending',
      size: 70,
      cell: info => <span className="font-mono text-amber-600 font-semibold">{info.getValue() as number}</span>
    },
    {
      accessorKey: 'forwarded',
      header: 'Forwarded',
      size: 80,
      cell: info => <span className="font-mono text-blue-600">{info.getValue() as number}</span>
    },
    {
      accessorKey: 'oldQueriesSolved',
      header: 'Backlog Solved',
      size: 100,
      cell: info => <span className="font-mono text-purple-600">{info.getValue() as number}</span>
    },
    {
      accessorKey: 'totalMinutes',
      header: 'Total Minutes',
      size: 95,
      cell: info => <span className="font-mono text-gray-600 font-semibold">{info.getValue() as number}m</span>
    },
    {
      accessorKey: 'perfect',
      header: 'Perfect (QA)',
      size: 85,
      cell: info => <span className="font-mono text-emerald-600 font-bold">{info.getValue() as number}</span>
    },
    {
      accessorKey: 'error',
      header: 'Err (QA)',
      size: 70,
      cell: info => <span className={`font-mono font-semibold ${info.getValue() as number > 0 ? 'text-red-500' : 'text-gray-400'}`}>{info.getValue() as number}</span>
    },
    {
      accessorKey: 'delay',
      header: 'Dly (QA)',
      size: 70,
      cell: info => <span className={`font-mono ${info.getValue() as number > 0 ? 'text-amber-500' : 'text-gray-400'}`}>{info.getValue() as number}</span>
    },
    {
      accessorKey: 'lateReply',
      header: 'Late Rpl (QA)',
      size: 90,
      cell: info => <span className={`font-mono ${info.getValue() as number > 0 ? 'text-rose-500' : 'text-gray-400'}`}>{info.getValue() as number}</span>
    },
    {
      accessorKey: 'resolutionRate',
      header: 'SLA Res Rate %',
      size: 110,
      cell: info => {
        const val = info.getValue() as number;
        let color = 'bg-emerald-50 text-emerald-700 border-emerald-200';
        if (val < 80) color = 'bg-rose-50 text-rose-700 border-rose-200';
        else if (val < 90) color = 'bg-amber-50 text-amber-700 border-amber-200';
        
        return (
          <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10px] border ${color}`}>
            {val}%
          </span>
        );
      }
    }
  ], []);

  return (
<<<<<<< HEAD
    <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-950 space-y-4" id="team-performance-container">
      {/* Title */}
      <div className="border-b border-gray-200 dark:border-slate-800 pb-3 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100">Support Representative Performance Sheets</h2>
          <p className="text-xs text-gray-500 dark:text-slate-400 font-mono">Consolidated telemetry metrics, log counts, call records, and quality scores calculated dynamically from support records.</p>
=======
    <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4" id="team-performance-container">
      {/* Title */}
      <div className="border-b border-gray-200 pb-3 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Support Representative Performance Sheets</h2>
          <p className="text-xs text-gray-500 font-mono">Consolidated telemetry metrics, log counts, call records, and quality scores calculated dynamically from support records.</p>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
        </div>
      </div>

      {/* Overview Metric Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2" id="perf-summary-cards">
<<<<<<< HEAD
        <div className="bg-white dark:bg-slate-900 p-3 border border-gray-200 dark:border-slate-700 rounded-sm shadow-2xs">
          <p className="text-[10px] font-mono font-bold text-gray-400 dark:text-slate-500 uppercase">Total Calls Handled</p>
          <p className="text-xl font-mono font-bold text-gray-800 dark:text-slate-100 mt-1">{supportCenterStats.totalCalls}</p>
          <span className="text-[9px] text-gray-500 dark:text-slate-400 font-mono">Inbound + Outbound</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3 border border-gray-200 dark:border-slate-700 rounded-sm shadow-2xs">
          <p className="text-[10px] font-mono font-bold text-gray-400 dark:text-slate-500 uppercase">Representative Logging Hours</p>
          <p className="text-xl font-mono font-bold text-gray-800 dark:text-slate-100 mt-1">{Math.round(supportCenterStats.totalMinutes / 60)} hrs</p>
          <span className="text-[9px] text-gray-500 dark:text-slate-400 font-mono">Active tracking minutes: {supportCenterStats.totalMinutes}</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3 border border-gray-200 dark:border-slate-700 rounded-sm shadow-2xs">
          <p className="text-[10px] font-mono font-bold text-gray-400 dark:text-slate-500 uppercase">Average Center SLA %</p>
          <p className="text-xl font-mono font-bold text-emerald-600 dark:text-emerald-400 mt-1">{supportCenterStats.avgResolutionRate}%</p>
          <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-mono font-semibold">SLA Target: 85% Met</span>
        </div>

        <div className="bg-white dark:bg-slate-900 p-3 border border-gray-200 dark:border-slate-700 rounded-sm shadow-2xs">
          <p className="text-[10px] font-mono font-bold text-gray-400 dark:text-slate-500 uppercase">Audit Perfect QA Marks</p>
          <p className="text-xl font-mono font-bold text-indigo-600 dark:text-indigo-400 mt-1">{supportCenterStats.perfectReviews}</p>
          <span className="text-[9px] text-indigo-600 dark:text-indigo-400 font-mono font-semibold">Exemplary resolutions</span>
=======
        <div className="bg-white p-3 border border-gray-200 rounded-sm shadow-2xs">
          <p className="text-[10px] font-mono font-bold text-gray-400 uppercase">Total Calls Handled</p>
          <p className="text-xl font-mono font-bold text-gray-800 mt-1">{supportCenterStats.totalCalls}</p>
          <span className="text-[9px] text-gray-500 font-mono">Inbound + Outbound</span>
        </div>

        <div className="bg-white p-3 border border-gray-200 rounded-sm shadow-2xs">
          <p className="text-[10px] font-mono font-bold text-gray-400 uppercase">Representative Logging Hours</p>
          <p className="text-xl font-mono font-bold text-gray-800 mt-1">{Math.round(supportCenterStats.totalMinutes / 60)} hrs</p>
          <span className="text-[9px] text-gray-500 font-mono">Active tracking minutes: {supportCenterStats.totalMinutes}</span>
        </div>

        <div className="bg-white p-3 border border-gray-200 rounded-sm shadow-2xs">
          <p className="text-[10px] font-mono font-bold text-gray-400 uppercase">Average Center SLA %</p>
          <p className="text-xl font-mono font-bold text-emerald-600 mt-1">{supportCenterStats.avgResolutionRate}%</p>
          <span className="text-[9px] text-emerald-600 font-mono font-semibold">SLA Target: 85% Met</span>
        </div>

        <div className="bg-white p-3 border border-gray-200 rounded-sm shadow-2xs">
          <p className="text-[10px] font-mono font-bold text-gray-400 uppercase">Audit Perfect QA Marks</p>
          <p className="text-xl font-mono font-bold text-indigo-600 mt-1">{supportCenterStats.perfectReviews}</p>
          <span className="text-[9px] text-indigo-600 font-mono font-semibold">Exemplary resolutions</span>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
        </div>
      </div>

      {/* Main Excel Sheet Grid */}
<<<<<<< HEAD
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-sm shadow-2xs flex flex-col">
        <div className="px-3 py-2 border-b border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
          <h3 className="font-semibold text-gray-700 dark:text-slate-200 font-sans flex items-center gap-1.5 text-xs">
            <TrendingUp className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Support Performance Ledger (Spreadsheet Grid)</span>
          </h3>
          <div className="text-[10px] text-gray-400 dark:text-slate-500 font-mono">All rows sortable • Filters active</div>
=======
      <div className="bg-white border border-gray-200 rounded-sm shadow-2xs flex flex-col">
        <div className="px-3 py-2 border-b border-gray-200 bg-slate-50 flex items-center justify-between">
          <h3 className="font-semibold text-gray-700 font-sans flex items-center gap-1.5 text-xs">
            <TrendingUp className="w-4 h-4 text-blue-600" />
            <span>Support Performance Ledger (Spreadsheet Grid)</span>
          </h3>
          <div className="text-[10px] text-gray-400 font-mono">All rows sortable • Filters active</div>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
        </div>
        <div className="flex-1">
          <ExcelTable id="performance-excel" data={performances} columns={performanceColumns} globalFilterPlaceholder="Filter employees..." />
        </div>
      </div>
    </div>
  );
}
