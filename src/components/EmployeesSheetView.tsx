import React, { useMemo } from 'react';
import { ExcelTable } from './ExcelTable';
import { ColumnDef } from '@tanstack/react-table';
import { Users, FileSpreadsheet, Plus, HelpCircle } from 'lucide-react';

interface EmployeeRecord {
  id: string;
  name: string;
  email: string;
  role: string;
  tier: string;
  hireDate: string;
  status: 'Active' | 'On Leave' | 'Inactive';
}

export function EmployeesSheetView() {
  const employeeData: EmployeeRecord[] = useMemo(() => [
    { id: 'EMP-9021', name: 'Sarah Connor', email: 'sarah.c@srs.office', role: 'Support Specialist', tier: 'Tier 2', hireDate: '2024-03-12', status: 'Active' },
    { id: 'EMP-9022', name: 'David Chen', email: 'david.c@srs.office', role: 'Customer Success Rep', tier: 'Tier 1', hireDate: '2025-01-05', status: 'Active' },
    { id: 'EMP-9023', name: 'Marcus Aurelius', email: 'marcus.a@srs.office', role: 'Support Lead', tier: 'Tier 2', hireDate: '2023-11-15', status: 'Active' },
    { id: 'EMP-9024', name: 'Elena Rostova', email: 'elena.r@srs.office', role: 'Integration Engineer', tier: 'Tier 3', hireDate: '2024-07-22', status: 'Active' },
    { id: 'EMP-9025', name: 'James Sutherland', email: 'james.s@srs.office', role: 'Support Specialist', tier: 'Tier 2', hireDate: '2024-02-18', status: 'Active' },
    { id: 'EMP-9026', name: 'Amina Diop', email: 'amina.d@srs.office', role: 'Senior Success Engineer', tier: 'Tier 3', hireDate: '2023-05-10', status: 'Active' },
    { id: 'EMP-9027', name: 'Siddharth Patel', email: 'sid.p@srs.office', role: 'Customer Success Rep', tier: 'Tier 1', hireDate: '2025-02-01', status: 'Active' },
    { id: 'EMP-9028', name: 'Chloe Fraser', email: 'chloe.f@srs.office', role: 'Support Specialist', tier: 'Tier 2', hireDate: '2024-09-09', status: 'On Leave' },
  ], []);

  const employeeColumns: ColumnDef<EmployeeRecord>[] = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'Employee ID',
      size: 100,
    },
    {
      accessorKey: 'name',
      header: 'Employee Name',
      size: 160,
      cell: info => <span className="font-sans font-semibold text-gray-800">{info.getValue() as string}</span>
    },
    {
      accessorKey: 'email',
      header: 'Corporate Email',
      size: 180,
    },
    {
      accessorKey: 'role',
      header: 'Designated Role',
      size: 150,
      cell: info => <span className="font-sans text-gray-600">{info.getValue() as string}</span>
    },
    {
      accessorKey: 'tier',
      header: 'Escalation Level',
      size: 110,
      cell: info => (
        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200 font-mono text-[10px] font-bold">
          {info.getValue() as string}
        </span>
      )
    },
    {
      accessorKey: 'hireDate',
      header: 'Hire Date',
      size: 110,
      cell: info => <span className="font-mono text-gray-500">{info.getValue() as string}</span>
    },
    {
      accessorKey: 'status',
      header: 'Active Status',
      size: 100,
      cell: info => {
        const val = info.getValue() as string;
        const color = 
          val === 'Active' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
          val === 'On Leave' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
          'bg-gray-50 text-gray-400 border border-gray-200';
        return (
          <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${color}`}>
            {val}
          </span>
        );
      }
    }
  ], []);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-950 space-y-4" id="employees-sheet-container">
      {/* Title */}
      <div className="border-b border-gray-200 dark:border-slate-800 pb-3 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100">Support Representative Master Sheet</h2>
          <p className="text-xs text-gray-500 dark:text-slate-400 font-mono">Administrative master ledger containing employee IDs, tier alignments, roles, and status tracking.</p>
        </div>
      </div>

      {/* Main Employee Excel Grid */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-sm shadow-2xs flex flex-col">
        <div className="px-3 py-2 border-b border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
          <h3 className="font-semibold text-gray-700 dark:text-slate-200 font-sans flex items-center gap-1.5 text-xs">
            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Support Representatives Ledger</span>
          </h3>
          <span className="text-[10px] text-gray-400 dark:text-slate-500 font-mono">Total Employee Records: {employeeData.length}</span>
        </div>
        <div className="flex-1">
          <ExcelTable id="employees-ledger" data={employeeData} columns={employeeColumns} globalFilterPlaceholder="Filter employee directory..." />
        </div>
      </div>
    </div>
  );
}