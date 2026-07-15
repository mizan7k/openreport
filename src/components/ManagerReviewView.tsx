import React, { useMemo, useState } from 'react';
import { WorkLog, ReviewStatus } from '../types';
import { ExcelTable } from './ExcelTable';
import { ColumnDef } from '@tanstack/react-table';
import { ShieldCheck, MessageSquare, Save, Check, FileCheck, CheckCircle2 } from 'lucide-react';

interface ManagerReviewViewProps {
  logs: WorkLog[];
  onUpdateLog: (id: string, update: Partial<WorkLog>) => void;
}

export function ManagerReviewView({ logs, onUpdateLog }: ManagerReviewViewProps) {
  // We keep track of local changes before final submit to make it feel like "Save Sheet" action
  const [editedComments, setEditedComments] = useState<Record<string, string>>({});
  const [editedReviews, setEditedReviews] = useState<Record<string, ReviewStatus>>({});
  const [successId, setSuccessId] = useState<string | null>(null);

  // Hardcoded review options requested by user
  const REVIEW_OPTIONS: ReviewStatus[] = [
    'Perfect',
    'Error',
    'Delay',
    'Late Reply',
    'Incomplete',
    'Wrong Category',
    'Other'
  ];

  // Handle immediate change of review status
  const handleReviewChange = (uniqueId: string, value: ReviewStatus) => {
    setEditedReviews(prev => ({ ...prev, [uniqueId]: value }));
    // Also save immediately to the logs so the rest of the application stays reactive
    onUpdateLog(uniqueId, { managerReview: value });
    triggerSuccessAlert(uniqueId);
  };

  // Handle change of comments
  const handleCommentsChange = (uniqueId: string, value: string) => {
    setEditedComments(prev => ({ ...prev, [uniqueId]: value }));
  };

  // Save the comment specifically for a row
  const handleSaveRow = (uniqueId: string) => {
    const comment = editedComments[uniqueId] ?? '';
    const review = editedReviews[uniqueId] ?? logs.find(l => l.uniqueId === uniqueId)?.managerReview;

    onUpdateLog(uniqueId, {
      managerComments: comment,
      ...(review ? { managerReview: review } : {})
    });

    triggerSuccessAlert(uniqueId);
  };

  const triggerSuccessAlert = (uniqueId: string) => {
    setSuccessId(uniqueId);
    setTimeout(() => {
      setSuccessId(null);
    }, 2000);
  };

  // Excel columns definition for Manager Review Sheet
  const reviewColumns: ColumnDef<WorkLog>[] = useMemo(() => [
    {
      accessorKey: 'employeeName',
      header: 'Employee / Agent',
      size: 130,
      cell: info => <span className="font-sans font-medium text-gray-700">{info.getValue() as string}</span>
    },
    {
      accessorKey: 'id',
      header: 'Task ID',
      size: 90,
    },
    {
      accessorKey: 'minutes',
      header: 'Minutes',
      size: 70,
      cell: info => <span className="font-mono text-gray-600 font-semibold">{info.getValue() as number}m</span>
    },
    {
      accessorKey: 'category',
      header: 'Category',
      size: 130,
    },
    {
      accessorKey: 'status',
      header: 'Status',
      size: 90,
      cell: info => {
        const val = info.getValue() as string;
        const color = 
          val === 'Solved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
          val === 'Pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
          'bg-blue-50 text-blue-700 border-blue-200';
        return (
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${color}`}>
            {val}
          </span>
        );
      }
    },
    {
      accessorKey: 'managerReview',
      header: 'Manager Review Classification (Dropdown)',
      size: 160,
      cell: ({ row }) => {
        const currentReview = editedReviews[row.original.uniqueId] ?? row.original.managerReview;
        return (
          <select
            value={currentReview}
            onChange={(e) => handleReviewChange(row.original.uniqueId, e.target.value as ReviewStatus)}
            className={`w-full text-xs font-semibold px-2 py-1 rounded-sm border ${
              currentReview === 'Perfect' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' :
              currentReview === 'Pending Review' ? 'border-gray-200 bg-slate-50 text-gray-400 italic' :
              'border-rose-200 bg-rose-50/50 text-rose-800'
            } focus:outline-none focus:ring-1 focus:ring-blue-500`}
          >
            <option value="Pending Review">-- Select Classification --</option>
            {REVIEW_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        );
      }
    },
    {
      accessorKey: 'managerComments',
      header: 'Audit & Review Comments',
      size: 240,
      cell: ({ row }) => {
        const currentComment = editedComments[row.original.uniqueId] ?? row.original.managerComments ?? '';
        return (
          <input
            type="text"
            value={currentComment}
            onChange={(e) => handleCommentsChange(row.original.uniqueId, e.target.value)}
            onBlur={() => handleSaveRow(row.original.uniqueId)}
            placeholder="Write corrective action comments..."
            className="w-full px-2 py-1 text-xs border border-gray-200 rounded-sm bg-slate-50 focus:bg-white focus:outline-none focus:border-blue-500 font-sans"
          />
        );
      }
    },
    {
      id: 'actions',
      header: 'Status Sign-off',
      size: 90,
      cell: ({ row }) => {
        const isSaved = successId === row.original.uniqueId;
        return (
          <div className="flex items-center justify-center">
            {isSaved ? (
              <span className="flex items-center gap-1 text-emerald-600 font-bold text-[10px] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                <Check className="w-3 h-3" />
                Saved
              </span>
            ) : (
              <button
                onClick={() => handleSaveRow(row.original.uniqueId)}
                className="flex items-center gap-1 text-[10px] font-mono font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-2.5 py-0.5 rounded cursor-pointer"
              >
                <Save className="w-3 h-3 text-blue-600" />
                Sign-off
              </button>
            )}
          </div>
        );
      }
    }
  ], [editedComments, editedReviews, successId]);

  return (
<<<<<<< HEAD
    <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-950 space-y-4" id="manager-review-container">
      {/* Title Header */}
      <div className="border-b border-gray-200 dark:border-slate-800 pb-3 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100">Support Audit & Manager Review Sheet</h2>
          <p className="text-xs text-gray-500 dark:text-slate-400 font-mono">Conduct detailed performance reviews, category checks, and SLA audits of logging records.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded text-[11px] font-mono px-3 py-1 flex items-center gap-1.5 text-gray-600 dark:text-slate-400">
=======
    <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4" id="manager-review-container">
      {/* Title Header */}
      <div className="border-b border-gray-200 pb-3 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">Support Audit & Manager Review Sheet</h2>
          <p className="text-xs text-gray-500 font-mono">Conduct detailed performance reviews, category checks, and SLA audits of logging records.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="bg-white border border-gray-200 rounded text-[11px] font-mono px-3 py-1 flex items-center gap-1.5 text-gray-600">
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Unreviewed Logs: {logs.filter(l => l.managerReview === 'Pending Review').length}</span>
          </div>
        </div>
      </div>

      {/* Audit Guide */}
<<<<<<< HEAD
      <div className="bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 rounded-sm p-3 text-xs flex gap-3 text-gray-700 dark:text-slate-200">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
        <div>
          <p className="font-semibold text-blue-900 dark:text-blue-300 mb-0.5">Manager Spreadsheet Instructions:</p>
          <ul className="list-disc pl-4 space-y-0.5 text-gray-600 dark:text-slate-400 text-[11px]">
            <li>Select a quality classification from the dropdown in the <strong className="text-gray-800 dark:text-slate-200">Manager Review</strong> column.</li>
            <li>Type any coaching comments in the <strong className="text-gray-800 dark:text-slate-200">Audit & Review Comments</strong> cell. Leaving the cell or pressing <kbd className="bg-gray-100 dark:bg-slate-800 px-1 border border-gray-300 dark:border-slate-600 rounded text-[9px] font-mono">Sign-off</kbd> commits details.</li>
=======
      <div className="bg-blue-50/50 border border-blue-200 rounded-sm p-3 text-xs flex gap-3 text-gray-700">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
        <div>
          <p className="font-semibold text-blue-900 mb-0.5">Manager Spreadsheet Instructions:</p>
          <ul className="list-disc pl-4 space-y-0.5 text-gray-600 text-[11px]">
            <li>Select a quality classification from the dropdown in the <strong className="text-gray-800">Manager Review</strong> column.</li>
            <li>Type any coaching comments in the <strong className="text-gray-800">Audit & Review Comments</strong> cell. Leaving the cell or pressing <kbd className="bg-gray-100 px-1 border border-gray-300 rounded text-[9px] font-mono">Sign-off</kbd> commits details.</li>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
            <li>The system aggregates these evaluations dynamically into the team performance report sheet.</li>
          </ul>
        </div>
      </div>

      {/* Main Review Excel Grid */}
<<<<<<< HEAD
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-sm shadow-2xs flex flex-col">
        <div className="px-3 py-2 border-b border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
          <h3 className="font-semibold text-gray-700 dark:text-slate-200 font-sans flex items-center gap-1.5 text-xs">
            <FileCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Support Audit Sheet Matrix</span>
          </h3>
          <span className="text-[10px] text-gray-400 dark:text-slate-500 font-mono">Changes save automatically to transient spreadsheet memory</span>
=======
      <div className="bg-white border border-gray-200 rounded-sm shadow-2xs flex flex-col">
        <div className="px-3 py-2 border-b border-gray-200 bg-slate-50 flex items-center justify-between">
          <h3 className="font-semibold text-gray-700 font-sans flex items-center gap-1.5 text-xs">
            <FileCheck className="w-4 h-4 text-blue-600" />
            <span>Support Audit Sheet Matrix</span>
          </h3>
          <span className="text-[10px] text-gray-400 font-mono">Changes save automatically to transient spreadsheet memory</span>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
        </div>
        <div className="flex-1">
          <ExcelTable id="manager-review-grid" data={logs} columns={reviewColumns} globalFilterPlaceholder="Filter by employee, category or notes..." />
        </div>
      </div>
    </div>
  );
}
