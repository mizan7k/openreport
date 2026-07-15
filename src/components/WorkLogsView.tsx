import React, { useMemo, useState, useEffect } from 'react';
import { WorkLog, TaskType, TaskStatus } from '../types';
import { ExcelTable } from './ExcelTable';
import { ColumnDef } from '@tanstack/react-table';
import { 
  FileInput, 
  ClipboardList, 
  CheckCircle, 
  AlertTriangle, 
  Trash2, 
  PhoneCall, 
  PhoneOutgoing, 
  PlusCircle, 
  CheckSquare, 
  Share2, 
  Inbox, 
  Plus, 
<<<<<<< HEAD
  Minus,
  Clock
=======
  Minus 
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
} from 'lucide-react';
import { TASK_CATEGORIES, SUPPORT_EMPLOYEES } from '../data';

interface WorkLogsViewProps {
  logs: WorkLog[];
  onAddLog: (newLog: WorkLog) => void;
  onDeleteLog: (id: string) => void;
<<<<<<< HEAD
  onUpdateLog?: (id: string, update: Partial<WorkLog>) => void;
  activeSubView: 'add' | 'today' | 'pending' | 'history';
  shifts?: any[];
  activeShift?: string;
}

export function WorkLogsView({ logs, onAddLog, onDeleteLog, onUpdateLog, activeSubView }: WorkLogsViewProps) {
  // Today is hardcoded to '2026-07-14' in this app environment
  const todayStr = '2026-07-14';

  // Selected task log for modal popup (full summary, review transparency & re-evaluation request)
  const [selectedTaskLog, setSelectedTaskLog] = useState<WorkLog | null>(null);
  const [reviewRequestReasonInput, setReviewRequestReasonInput] = useState('');
  const [reviewRequestSuccess, setReviewRequestSuccess] = useState('');

=======
  activeSubView: 'add' | 'today' | 'pending' | 'history';
}

export function WorkLogsView({ logs, onAddLog, onDeleteLog, activeSubView }: WorkLogsViewProps) {
  // Today is hardcoded to '2026-07-14' in this app environment
  const todayStr = '2026-07-14';

>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
  // Manual Summary Metrics State
  const [callsReceived, setCallsReceived] = useState<number>(7);
  const [callsDialed, setCallsDialed] = useState<number>(4);

  // Individual Task Form State
  const [taskId, setTaskId] = useState('');
  const [minutes, setMinutes] = useState(30);
  const [taskType, setTaskType] = useState<TaskType>('Minor');
  const [status, setStatus] = useState<TaskStatus>('Solved');
  const [category, setCategory] = useState(TASK_CATEGORIES[0]);
  const [notes, setNotes] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(SUPPORT_EMPLOYEES[0]);
  const [isOldQuerySolved, setIsOldQuerySolved] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

<<<<<<< HEAD
  // Support Non-Task Activities State
  const [entryType, setEntryType] = useState<'task' | 'activity'>('task');
  const [activityType, setActivityType] = useState<string>('Washroom');
  const [customActivity, setCustomActivity] = useState<string>('');

=======
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
  // Live aggregated shift metrics for the selected employee (computed from logs)
  const selectedEmployeeStats = useMemo(() => {
    const employeeLogs = logs.filter(l => l.employeeName === selectedEmployee && l.date === todayStr);
    
    let callsReceivedSum = 0;
    let callsDialedSum = 0;
    let tasksCreatedCount = 0;
    let tasksSolvedCount = 0;
    let tasksForwardedCount = 0;
    let oldQueriesSolvedCount = 0;
    let pendingCount = 0;

    employeeLogs.forEach(log => {
      callsReceivedSum += log.callsReceived || 0;
      callsDialedSum += log.callsDialed || 0;

<<<<<<< HEAD
      const isTask = !log.id.startsWith('CALL-') && !log.id.startsWith('ACT-');

      if (log.tasksCreatedToday !== undefined) {
        tasksCreatedCount += log.tasksCreatedToday;
      } else if (isTask) {
=======
      if (log.tasksCreatedToday !== undefined) {
        tasksCreatedCount += log.tasksCreatedToday;
      } else if (log.id.startsWith('TSK-')) {
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
        tasksCreatedCount += 1;
      }

      if (log.tasksSolvedToday !== undefined) {
        tasksSolvedCount += log.tasksSolvedToday;
<<<<<<< HEAD
      } else if (isTask && log.status === 'Solved') {
=======
      } else if (log.id.startsWith('TSK-') && log.status === 'Solved') {
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
        tasksSolvedCount += 1;
      }

      if (log.tasksForwardedToday !== undefined) {
        tasksForwardedCount += log.tasksForwardedToday;
<<<<<<< HEAD
      } else if (isTask && log.status === 'Forwarded') {
=======
      } else if (log.id.startsWith('TSK-') && log.status === 'Forwarded') {
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
        tasksForwardedCount += 1;
      }

      if (log.pendingTasks !== undefined) {
        pendingCount += log.pendingTasks;
<<<<<<< HEAD
      } else if (isTask && log.status === 'Pending') {
=======
      } else if (log.id.startsWith('TSK-') && log.status === 'Pending') {
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
        pendingCount += 1;
      }

      if (log.oldQueriesSolved !== undefined) {
        oldQueriesSolvedCount += log.oldQueriesSolved;
<<<<<<< HEAD
      } else if (isTask && log.status === 'Solved' && log.isOldQuerySolved) {
=======
      } else if (log.id.startsWith('TSK-') && log.status === 'Solved' && log.isOldQuerySolved) {
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
        oldQueriesSolvedCount += 1;
      }
    });

    return {
      callsReceived: callsReceivedSum,
      callsDialed: callsDialedSum,
      tasksCreated: tasksCreatedCount,
      tasksSolved: tasksSolvedCount,
      tasksForwarded: tasksForwardedCount,
      oldQueriesSolved: oldQueriesSolvedCount,
      pending: pendingCount
    };
  }, [logs, selectedEmployee]);

<<<<<<< HEAD
  // Daily Shift Accountability targets (480 mins work, 55 mins break)
  const accountability = useMemo(() => {
    const employeeTodayLogs = logs.filter(l => l.employeeName === selectedEmployee && l.date === todayStr);
    
    let workingMins = 0;
    let breakMins = 0;

    employeeTodayLogs.forEach(log => {
      if (log.category === 'Break') {
        breakMins += log.minutes;
      } else if (log.category !== 'Calls Summary') {
        workingMins += log.minutes;
      }
    });

    const workingTarget = 480;
    const breakTarget = 55;
    const workingRemaining = Math.max(0, workingTarget - workingMins);
    const breakRemaining = Math.max(0, breakTarget - breakMins);
    const met = workingMins >= workingTarget && breakMins >= breakTarget;

    return {
      workingMins,
      breakMins,
      workingTarget,
      breakTarget,
      workingRemaining,
      breakRemaining,
      met
    };
  }, [logs, selectedEmployee]);

  // Utility to capture exact time in HH:MM format
  const getCurrentTimeStr = () => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    return `${hours}:${minutes}`;
  };

=======
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
  // Auto-generate Task ID on load to make logging fast
  useEffect(() => {
    const highestNum = logs
      .map(log => {
<<<<<<< HEAD
        const match = log.id.match(/^(\d+)$/) || log.id.match(/TSK-(\d+)/);
        return match ? parseInt(match[1] || match[0], 10) : 1000;
      })
      .reduce((max, num) => Math.max(max, num), 1000);
    
    setTaskId(String(highestNum + 1));
=======
        const match = log.id.match(/TSK-(\d+)/);
        return match ? parseInt(match[1], 10) : 1000;
      })
      .reduce((max, num) => Math.max(max, num), 1000);
    
    setTaskId(`TSK-${highestNum + 1}`);
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
  }, [logs]);

  // Fast numeric increment helpers
  const adjustVal = (setter: React.Dispatch<React.SetStateAction<number>>, delta: number, min = 0) => {
    setter(prev => Math.max(min, prev + delta));
  };

  // Form submit for Section 1 (Call Statistics summary only)
  const handleSaveCallSummary = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    setSuccessMessage('');

    const callLog: WorkLog = {
      id: `CALL-${selectedEmployee.replace(/\s+/g, '-').toUpperCase()}-${Date.now()}`,
      uniqueId: `CALL-${selectedEmployee.replace(/\s+/g, '-').toUpperCase()}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      employeeName: selectedEmployee,
      minutes: 0,
      type: 'Minor',
      status: 'Solved',
      category: 'Calls Summary',
      notes: `Recorded Call Statistics: ${callsReceived} Received, ${callsDialed} Dialed.`,
      date: todayStr,
<<<<<<< HEAD
      time: getCurrentTimeStr(),
=======
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
      managerReview: 'Perfect',
      callsReceived: Number(callsReceived),
      callsDialed: Number(callsDialed),
    };

    onAddLog(callLog);
    setSuccessMessage(`Call statistics summary successfully saved for ${selectedEmployee}.`);
  };

  // Form submit for Section 2 (Specific Work Log Row Entry only)
  const handleSaveLog = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');
    setSuccessMessage('');

<<<<<<< HEAD
=======
    if (!taskId.trim() || !taskId.startsWith('TSK-')) {
      setValidationError('Task ID must start with "TSK-" followed by numeric values (e.g. TSK-1038)');
      return;
    }

>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
    if (!minutes || minutes <= 0) {
      setValidationError('Minutes spent must be a positive integer.');
      return;
    }

<<<<<<< HEAD
    let finalLog: WorkLog;

    if (entryType === 'task') {
      const trimmedId = taskId.trim();
      const isNumeric = /^\d+$/.test(trimmedId);
      if (!trimmedId || !isNumeric) {
        setValidationError('Task ID must contain only numeric digits (e.g. 1038).');
        return;
      }

      finalLog = {
        id: trimmedId,
        uniqueId: `${trimmedId}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        employeeName: selectedEmployee,
        minutes: Number(minutes),
        type: taskType,
        status,
        category,
        notes: notes.trim() ? notes.trim() : undefined,
        date: todayStr,
        time: getCurrentTimeStr(),
        managerReview: 'Pending Review',
        isOldQuerySolved: status === 'Solved' ? isOldQuerySolved : false
      };

      const nextNum = parseInt(trimmedId, 10) + 1;
      setTaskId(String(nextNum));
    } else {
      // Non-Task Activity Row
      const finalActivityLabel = activityType === 'Others (custom)'
        ? (customActivity.trim() || 'Custom Activity')
        : activityType;

      const activityId = `ACT-${finalActivityLabel.toUpperCase().replace(/\s+/g, '-')}-${Date.now()}`;

      finalLog = {
        id: activityId,
        uniqueId: `${activityId}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        employeeName: selectedEmployee,
        minutes: Number(minutes),
        type: 'Minor',
        status: 'Solved',
        category: finalActivityLabel,
        notes: notes.trim() ? notes.trim() : undefined,
        date: todayStr,
        time: getCurrentTimeStr(),
        managerReview: 'Perfect'
      };

      setCustomActivity('');
    }

    onAddLog(finalLog);
    setNotes('');
    setIsOldQuerySolved(false);
    setSuccessMessage(
      entryType === 'task'
        ? `Task log ${finalLog.id} successfully added to the spreadsheet.`
        : `Non-Task Activity "${finalLog.category}" of ${finalLog.minutes}m logged successfully.`
    );
=======
    const newLog: WorkLog = {
      id: taskId.trim().toUpperCase(),
      uniqueId: `${taskId.trim().toUpperCase()}-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      employeeName: selectedEmployee,
      minutes: Number(minutes),
      type: taskType,
      status,
      category,
      notes: notes.trim() ? notes.trim() : undefined, // Notes are fully optional!
      date: todayStr,
      managerReview: 'Pending Review',
      isOldQuerySolved: status === 'Solved' ? isOldQuerySolved : false
    };

    onAddLog(newLog);
    setNotes('');
    setIsOldQuerySolved(false);
    setSuccessMessage(`Task log ${newLog.id} successfully added to the spreadsheet.`);
    
    // Auto-increment the next ID
    const match = newLog.id.match(/TSK-(\d+)/);
    if (match) {
      const nextNum = parseInt(match[1], 10) + 1;
      setTaskId(`TSK-${nextNum}`);
    }
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
  };

  // Filter logs for tables based on active view type
  const filteredLogs = useMemo(() => {
    switch (activeSubView) {
      case 'today':
        return logs.filter(l => l.date === todayStr);
      case 'pending':
        return logs.filter(l => l.status === 'Pending');
      case 'history':
      case 'add':
      default:
        return logs;
    }
  }, [logs, activeSubView]);

  // Excel columns definition for log lists
  const logColumns: ColumnDef<WorkLog>[] = useMemo(() => [
    {
      accessorKey: 'id',
      header: 'Task ID',
      size: 80,
<<<<<<< HEAD
      cell: ({ row, getValue }) => {
        const val = getValue() as string;
        if (val.startsWith('ACT-') || val.startsWith('CALL-')) {
          return (
            <span className="bg-slate-100 text-slate-600 font-mono text-[9px] font-bold px-1.5 py-0.5 rounded border border-slate-200">
              {val.startsWith('ACT-') ? 'Activity' : 'Call Summary'}
            </span>
          );
        }
        return (
          <button
            onClick={() => {
              setSelectedTaskLog(row.original);
              setReviewRequestReasonInput('');
              setReviewRequestSuccess('');
            }}
            className="font-mono text-blue-600 hover:text-blue-800 font-bold hover:underline cursor-pointer text-left focus:outline-none"
          >
            {val}
          </button>
        );
      }
    },
    {
      accessorKey: 'time',
      header: 'Time',
      size: 65,
      cell: info => <span className="font-mono text-gray-500 font-semibold">{info.getValue() as string || '—'}</span>
=======
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
    },
    {
      accessorKey: 'employeeName',
      header: 'Employee / Agent',
      size: 130,
    },
    {
      accessorKey: 'minutes',
      header: 'Minutes',
      size: 70,
      cell: info => <span className="font-mono text-gray-700 font-semibold">{info.getValue() as number}m</span>
    },
    {
      accessorKey: 'type',
      header: 'Complexity',
      size: 90,
      cell: info => {
        const val = info.getValue() as string;
        return (
          <span className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
            val === 'Major' ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' : 'bg-slate-100 text-slate-700 border border-slate-300'
          }`}>
            {val}
          </span>
        );
      }
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
      accessorKey: 'category',
      header: 'Category',
      size: 120,
    },
    {
      accessorKey: 'callsReceived',
      header: 'Calls Rec',
      size: 75,
      cell: info => <span className="font-mono text-gray-600">{info.getValue() !== undefined ? (info.getValue() as number) : '-'}</span>
    },
    {
      accessorKey: 'callsDialed',
      header: 'Calls Dial',
      size: 75,
      cell: info => <span className="font-mono text-gray-600">{info.getValue() !== undefined ? (info.getValue() as number) : '-'}</span>
    },
    {
      accessorKey: 'tasksCreatedToday',
      header: 'Created',
      size: 75,
      cell: info => <span className="font-mono font-semibold text-gray-700">{info.getValue() !== undefined ? (info.getValue() as number) : '-'}</span>
    },
    {
      accessorKey: 'tasksSolvedToday',
      header: 'Solved',
      size: 75,
      cell: info => <span className="font-mono text-emerald-600 font-semibold">{info.getValue() !== undefined ? (info.getValue() as number) : '-'}</span>
    },
    {
      accessorKey: 'tasksForwardedToday',
      header: 'Forwarded',
      size: 80,
      cell: info => <span className="font-mono text-blue-600">{info.getValue() !== undefined ? (info.getValue() as number) : '-'}</span>
    },
    {
      accessorKey: 'oldQueriesSolved',
      header: 'Backlog Solv',
      size: 95,
      cell: info => <span className="font-mono text-purple-600">{info.getValue() !== undefined ? (info.getValue() as number) : '-'}</span>
    },
    {
      accessorKey: 'pendingTasks',
      header: 'Pending',
      size: 75,
      cell: info => {
        const val = info.getValue() as number;
        if (val === undefined) return <span className="font-mono text-gray-400">-</span>;
        return <span className={`font-mono font-bold ${val > 0 ? 'text-amber-600' : 'text-gray-500'}`}>{val}</span>;
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
      header: 'Notes',
      size: 200,
      cell: info => <p className="text-gray-500 truncate text-[11px] max-w-[180px]" title={info.getValue() as string}>{info.getValue() as string || '—'}</p>
    },
    {
      id: 'delete-action',
      header: 'Delete',
      size: 60,
      cell: ({ row }) => (
        <button
          onClick={() => {
            if (confirm(`Are you sure you want to remove this log entry for ${row.original.id}?`)) {
              onDeleteLog(row.original.uniqueId);
            }
          }}
          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 cursor-pointer flex justify-center w-full"
          title="Delete Entry"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      )
    }
  ], [onDeleteLog]);

  // Page headings helper
  const viewMeta = useMemo(() => {
    switch (activeSubView) {
      case 'add':
        return {
          title: 'Add Support Work Log',
          description: 'Document and classify support hours, calls, and actions directly into the operational database.',
        };
      case 'today':
        return {
          title: "Today's Logged Sheets",
          description: `Review support tasks logged specifically on this active operational date (${todayStr}).`,
        };
      case 'pending':
        return {
          title: 'Pending Work Queue',
          description: 'Access unresolved support tasks waiting on user confirmation, telemetry response, or SLA actions.',
        };
      case 'history':
      default:
        return {
          title: 'Total Support Task History',
          description: 'A fully searchable and filterable database containing historic logs from all operators.',
        };
    }
  }, [activeSubView]);

  return (
<<<<<<< HEAD
    <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-950 space-y-4" id="worklogs-view-container">
      {/* Title */}
      <div className="border-b border-gray-200 dark:border-slate-800 pb-3">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100">{viewMeta.title}</h2>
        <p className="text-xs text-gray-500 dark:text-slate-400 font-mono">{viewMeta.description}</p>
=======
    <div className="flex-1 overflow-y-auto p-4 bg-slate-50 space-y-4" id="worklogs-view-container">
      {/* Title */}
      <div className="border-b border-gray-200 pb-3">
        <h2 className="text-lg font-semibold text-gray-800">{viewMeta.title}</h2>
        <p className="text-xs text-gray-500 font-mono">{viewMeta.description}</p>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
      </div>

      {/* CONDITIONAL SUBVIEW: ADD LOG INPUT FORM */}
      {activeSubView === 'add' && (
<<<<<<< HEAD
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-sm shadow-2xs p-4" id="add-log-panel">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 dark:border-slate-800 mb-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-slate-200">
              <FileInput className="w-4 h-4 text-blue-600" />
              <span>Operational Report Entry Matrix</span>
            </div>
            <div className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 text-[10px] font-mono px-2 py-0.5 rounded uppercase">
=======
        <div className="bg-white border border-gray-200 rounded-sm shadow-2xs p-4" id="add-log-panel">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100 mb-4">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-700">
              <FileInput className="w-4 h-4 text-blue-600" />
              <span>Operational Report Entry Matrix</span>
            </div>
            <div className="bg-slate-100 text-slate-600 border border-slate-200 text-[10px] font-mono px-2 py-0.5 rounded uppercase">
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
              Manual Excel Spreadsheet Entry Mode
            </div>
          </div>

          {/* UNIFIED EMPLOYEE SELECTION BAR */}
<<<<<<< HEAD
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-sm p-4 mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-500 dark:text-slate-400 font-mono font-bold mb-1 uppercase tracking-wider text-[10px]">
=======
          <div className="bg-slate-50 border border-slate-200 rounded-sm p-4 mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-500 font-mono font-bold mb-1 uppercase tracking-wider text-[10px]">
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                Active Employee Selection
              </label>
              <select
                value={selectedEmployee}
                onChange={(e) => {
                  setSelectedEmployee(e.target.value);
                  setValidationError('');
                  setSuccessMessage('');
                }}
<<<<<<< HEAD
                className="w-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-sm px-3 py-2 text-xs focus:outline-none focus:border-blue-500 font-semibold cursor-pointer dark:text-slate-100"
=======
                className="w-full bg-white border border-gray-300 rounded-sm px-3 py-2 text-xs focus:outline-none focus:border-blue-500 font-semibold cursor-pointer"
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
              >
                {SUPPORT_EMPLOYEES.map(emp => (
                  <option key={emp} value={emp}>{emp}</option>
                ))}
              </select>
            </div>
<<<<<<< HEAD
            <div className="flex items-center text-[11px] text-slate-600 dark:text-slate-400 font-mono leading-relaxed bg-blue-50/50 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900 p-2.5 rounded">
              💡 Selecting an employee dynamically updates their read-only Shift Summary from recorded task logs. Use Section 1 for manual call counts and Section 2 for logging specific task details or non-task activities.
            </div>
          </div>

          {/* DAILY TIME ACCOUNTABILITY DASHBOARD */}
          <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-sm p-4 mb-4" id="shift-accountability-dashboard">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-2 mb-3">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span className="font-bold text-gray-800 dark:text-slate-200 font-mono tracking-wider uppercase text-[10px]">
                  Daily Shift Time Accountability Tracker
                </span>
              </div>
              <div>
                {accountability.met ? (
                  <span className="bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1 border border-emerald-200 dark:border-emerald-800 animate-bounce">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Shift Requirements Met
                  </span>
                ) : (
                  <span className="bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded border border-amber-200 dark:border-amber-800">
                    Active Shift Tracker
                  </span>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Working Minutes Tracker */}
              <div className="bg-white dark:bg-slate-900 p-3 border border-slate-200 dark:border-slate-700 rounded-sm space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 dark:text-slate-400 font-semibold">Logged Working Time:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {accountability.workingMins} / {accountability.workingTarget} mins
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-emerald-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (accountability.workingMins / accountability.workingTarget) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 dark:text-slate-500 font-mono">
                  <span>Shift Target: 480m</span>
                  <span>
                    {accountability.workingRemaining > 0 
                      ? `${accountability.workingRemaining} mins remaining` 
                      : '✅ Shift Goal Met'}
                  </span>
                </div>
              </div>

              {/* Dedicated Break Tracker */}
              <div className="bg-white dark:bg-slate-900 p-3 border border-slate-200 dark:border-slate-700 rounded-sm space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 dark:text-slate-400 font-semibold">Logged Break Time:</span>
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {accountability.breakMins} / {accountability.breakTarget} mins
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-teal-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (accountability.breakMins / accountability.breakTarget) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-[10px] text-gray-400 dark:text-slate-500 font-mono">
                  <span>Break Target: 55m</span>
                  <span>
                    {accountability.breakRemaining > 0 
                      ? `${accountability.breakRemaining} mins remaining` 
                      : '✅ Break Goal Met'}
                  </span>
                </div>
              </div>
=======
            <div className="flex items-center text-[11px] text-slate-600 font-mono leading-relaxed bg-blue-50/50 border border-blue-100 p-2.5 rounded">
              💡 Selecting an employee dynamically updates their read-only Shift Summary from recorded task logs. Use Section 1 for manual call counts and Section 2 for logging specific task details.
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
            </div>
          </div>

          {/* NOTIFICATION CENTER */}
          {(validationError || successMessage) && (
            <div className="mb-4 space-y-2">
              {validationError && (
<<<<<<< HEAD
                <div className="flex items-center gap-1.5 text-red-600 dark:text-red-400 font-mono text-[11px] bg-red-50 dark:bg-red-950/30 p-2.5 rounded border border-red-100 dark:border-red-900">
=======
                <div className="flex items-center gap-1.5 text-red-600 font-mono text-[11px] bg-red-50 p-2.5 rounded border border-red-100">
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Error: {validationError}</span>
                </div>
              )}
              {successMessage && (
<<<<<<< HEAD
                <div className="flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400 font-mono text-[11px] bg-emerald-50 dark:bg-emerald-950/30 p-2.5 rounded border border-emerald-100 dark:border-emerald-900">
=======
                <div className="flex items-center gap-1.5 text-emerald-700 font-mono text-[11px] bg-emerald-50 p-2.5 rounded border border-emerald-100">
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                  <CheckCircle className="w-4 h-4 shrink-0" />
                  <span>Success: {successMessage}</span>
                </div>
              )}
            </div>
          )}

          {/* GRID LAYOUT: TWO ENTIRELY INDEPENDENT FORM BLOCKS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* LEFT COLUMN: SECTION 1 - RECORD CALL STATISTICS ONLY */}
<<<<<<< HEAD
            <div className="bg-slate-50/60 dark:bg-slate-950/60 p-4 rounded-sm border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between">
              <form onSubmit={handleSaveCallSummary} className="space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                    <PhoneCall className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="font-bold text-gray-700 dark:text-slate-200 font-mono tracking-wider uppercase text-[10px]">
=======
            <div className="bg-slate-50/60 p-4 rounded-sm border border-slate-200/80 flex flex-col justify-between">
              <form onSubmit={handleSaveCallSummary} className="space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                    <PhoneCall className="w-4 h-4 text-blue-600" />
                    <span className="font-bold text-gray-700 font-mono tracking-wider uppercase text-[10px]">
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                      1. Daily Shift Summary (Calls Only)
                    </span>
                  </div>
                  
<<<<<<< HEAD
                  <p className="text-[11px] text-gray-500 dark:text-slate-400 leading-normal">
                    Enter today's manual call counts for <span className="font-bold text-gray-700 dark:text-slate-200">{selectedEmployee}</span>. This form submits only call statistics.
=======
                  <p className="text-[11px] text-gray-500 leading-normal">
                    Enter today's manual call counts for <span className="font-bold text-gray-700">{selectedEmployee}</span>. This form submits only call statistics.
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Calls Received */}
                    <div className="space-y-1">
<<<<<<< HEAD
                      <label className="flex items-center gap-1 text-gray-500 dark:text-slate-400 font-mono font-bold uppercase tracking-wider text-[10px]">
                        <PhoneCall className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" /> Calls Received
=======
                      <label className="flex items-center gap-1 text-gray-500 font-mono font-bold uppercase tracking-wider text-[10px]">
                        <PhoneCall className="w-3.5 h-3.5 text-blue-500" /> Calls Received
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                      </label>
                      <div className="flex items-center">
                        <button 
                          type="button" 
                          onClick={() => adjustVal(setCallsReceived, -1)}
<<<<<<< HEAD
                          className="px-2 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-600 rounded-l-sm cursor-pointer"
=======
                          className="px-2 py-1.5 bg-slate-200 hover:bg-slate-300 border border-slate-300 rounded-l-sm cursor-pointer"
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <input 
                          type="number" 
                          value={callsReceived} 
                          onChange={e => setCallsReceived(Math.max(0, parseInt(e.target.value, 10) || 0))}
<<<<<<< HEAD
                          onFocus={(e) => e.target.select()}
                          className="w-full text-center bg-white dark:bg-slate-800 border-y border-slate-300 dark:border-slate-600 py-1.5 text-xs font-mono focus:outline-none dark:text-slate-100"
=======
                          className="w-full text-center bg-white border-y border-slate-300 py-1.5 text-xs font-mono focus:outline-none"
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                        />
                        <button 
                          type="button" 
                          onClick={() => adjustVal(setCallsReceived, 1)}
<<<<<<< HEAD
                          className="px-2 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-600 rounded-r-sm cursor-pointer"
=======
                          className="px-2 py-1.5 bg-slate-200 hover:bg-slate-300 border border-slate-300 rounded-r-sm cursor-pointer"
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>

                    {/* Calls Dialed */}
                    <div className="space-y-1">
<<<<<<< HEAD
                      <label className="flex items-center gap-1 text-gray-500 dark:text-slate-400 font-mono font-bold uppercase tracking-wider text-[10px]">
                        <PhoneOutgoing className="w-3.5 h-3.5 text-blue-500 dark:text-blue-400" /> Calls Dialed
=======
                      <label className="flex items-center gap-1 text-gray-500 font-mono font-bold uppercase tracking-wider text-[10px]">
                        <PhoneOutgoing className="w-3.5 h-3.5 text-blue-500" /> Calls Dialed
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                      </label>
                      <div className="flex items-center">
                        <button 
                          type="button" 
                          onClick={() => adjustVal(setCallsDialed, -1)}
<<<<<<< HEAD
                          className="px-2 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-600 rounded-l-sm cursor-pointer"
=======
                          className="px-2 py-1.5 bg-slate-200 hover:bg-slate-300 border border-slate-300 rounded-l-sm cursor-pointer"
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <input 
                          type="number" 
                          value={callsDialed} 
                          onChange={e => setCallsDialed(Math.max(0, parseInt(e.target.value, 10) || 0))}
<<<<<<< HEAD
                          onFocus={(e) => e.target.select()}
                          className="w-full text-center bg-white dark:bg-slate-800 border-y border-slate-300 dark:border-slate-600 py-1.5 text-xs font-mono focus:outline-none dark:text-slate-100"
=======
                          className="w-full text-center bg-white border-y border-slate-300 py-1.5 text-xs font-mono focus:outline-none"
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                        />
                        <button 
                          type="button" 
                          onClick={() => adjustVal(setCallsDialed, 1)}
<<<<<<< HEAD
                          className="px-2 py-1.5 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 border border-slate-300 dark:border-slate-600 rounded-r-sm cursor-pointer"
=======
                          className="px-2 py-1.5 bg-slate-200 hover:bg-slate-300 border border-slate-300 rounded-r-sm cursor-pointer"
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* READ-ONLY SPREADSHEET SHIFT SUMMARY */}
<<<<<<< HEAD
                  <div className="border border-slate-200 dark:border-slate-700 rounded-sm bg-white dark:bg-slate-900 overflow-hidden mt-4 shadow-3xs">
                    <div className="bg-slate-100 dark:bg-slate-800 px-3 py-1.5 border-b border-slate-200 dark:border-slate-700 font-mono text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase flex justify-between items-center">
                      <span>Shift Summary Ledger: {selectedEmployee}</span>
                      <span className="bg-blue-100 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 font-semibold px-1.5 py-0.2 rounded text-[9px]">Excel Format</span>
                    </div>
                    <div className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
                      <div className="flex justify-between items-center p-2 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                        <span className="text-gray-500 dark:text-slate-400">Calls Received:</span>
                        <span className="font-mono font-bold text-blue-600 dark:text-blue-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 border border-slate-200 dark:border-slate-700 rounded min-w-[32px] text-center">
                          {selectedEmployeeStats.callsReceived}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                        <span className="text-gray-500 dark:text-slate-400">Calls Dialed:</span>
                        <span className="font-mono font-bold text-blue-600 dark:text-blue-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 border border-slate-200 dark:border-slate-700 rounded min-w-[32px] text-center">
                          {selectedEmployeeStats.callsDialed}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                        <span className="text-gray-500 dark:text-slate-400">Tasks Created (Auto):</span>
                        <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 border border-slate-200 dark:border-slate-700 rounded min-w-[32px] text-center">
                          {selectedEmployeeStats.tasksCreated}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                        <span className="text-gray-500 dark:text-slate-400">Tasks Solved (Auto):</span>
                        <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 border border-slate-200 dark:border-slate-700 rounded min-w-[32px] text-center">
                          {selectedEmployeeStats.tasksSolved}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                        <span className="text-gray-500 dark:text-slate-400">Tasks Forwarded (Auto):</span>
                        <span className="font-mono font-bold text-blue-500 dark:text-blue-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 border border-slate-200 dark:border-slate-700 rounded min-w-[32px] text-center">
                          {selectedEmployeeStats.tasksForwarded}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 hover:bg-slate-50/50 dark:hover:bg-slate-800/50">
                        <span className="text-gray-500 dark:text-slate-400">Backlog Solved (Auto):</span>
                        <span className="font-mono font-bold text-purple-600 dark:text-purple-400 bg-slate-50 dark:bg-slate-800 px-2 py-0.5 border border-slate-200 dark:border-slate-700 rounded min-w-[32px] text-center">
                          {selectedEmployeeStats.oldQueriesSolved}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-amber-50/30 dark:bg-amber-950/30 hover:bg-amber-50/50 dark:hover:bg-amber-950/50">
                        <span className="text-amber-800 dark:text-amber-400 font-medium">Pending Queue (Auto):</span>
                        <span className="font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-100/50 dark:bg-amber-950/40 px-2 py-0.5 border border-amber-200 dark:border-amber-800 rounded min-w-[32px] text-center">
=======
                  <div className="border border-slate-200 rounded-sm bg-white overflow-hidden mt-4 shadow-3xs">
                    <div className="bg-slate-100 px-3 py-1.5 border-b border-slate-200 font-mono text-[10px] font-bold text-slate-600 uppercase flex justify-between items-center">
                      <span>Shift Summary Ledger: {selectedEmployee}</span>
                      <span className="bg-blue-100 text-blue-700 font-semibold px-1.5 py-0.2 rounded text-[9px]">Excel Format</span>
                    </div>
                    <div className="divide-y divide-slate-100 font-mono text-xs">
                      <div className="flex justify-between items-center p-2 hover:bg-slate-50/50">
                        <span className="text-gray-500">Calls Received:</span>
                        <span className="font-mono font-bold text-blue-600 bg-slate-50 px-2 py-0.5 border border-slate-200 rounded min-w-[32px] text-center">
                          {selectedEmployeeStats.callsReceived}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 hover:bg-slate-50/50">
                        <span className="text-gray-500">Calls Dialed:</span>
                        <span className="font-mono font-bold text-blue-600 bg-slate-50 px-2 py-0.5 border border-slate-200 rounded min-w-[32px] text-center">
                          {selectedEmployeeStats.callsDialed}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 hover:bg-slate-50/50">
                        <span className="text-gray-500">Tasks Created (Auto):</span>
                        <span className="font-mono font-bold text-indigo-600 bg-slate-50 px-2 py-0.5 border border-slate-200 rounded min-w-[32px] text-center">
                          {selectedEmployeeStats.tasksCreated}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 hover:bg-slate-50/50">
                        <span className="text-gray-500">Tasks Solved (Auto):</span>
                        <span className="font-mono font-bold text-emerald-600 bg-slate-50 px-2 py-0.5 border border-slate-200 rounded min-w-[32px] text-center">
                          {selectedEmployeeStats.tasksSolved}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 hover:bg-slate-50/50">
                        <span className="text-gray-500">Tasks Forwarded (Auto):</span>
                        <span className="font-mono font-bold text-blue-500 bg-slate-50 px-2 py-0.5 border border-slate-200 rounded min-w-[32px] text-center">
                          {selectedEmployeeStats.tasksForwarded}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 hover:bg-slate-50/50">
                        <span className="text-gray-500">Backlog Solved (Auto):</span>
                        <span className="font-mono font-bold text-purple-600 bg-slate-50 px-2 py-0.5 border border-slate-200 rounded min-w-[32px] text-center">
                          {selectedEmployeeStats.oldQueriesSolved}
                        </span>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-amber-50/30 hover:bg-amber-50/50">
                        <span className="text-amber-800 font-medium">Pending Queue (Auto):</span>
                        <span className="font-mono font-bold text-amber-600 bg-amber-100/50 px-2 py-0.5 border border-amber-200 rounded min-w-[32px] text-center">
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                          {selectedEmployeeStats.pending}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
<<<<<<< HEAD
                    className="w-full sm:w-auto px-5 py-2 border border-blue-700 dark:border-blue-600 bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 text-white rounded-sm font-semibold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer text-xs"
=======
                    className="w-full sm:w-auto px-5 py-2 border border-blue-700 bg-blue-600 hover:bg-blue-700 text-white rounded-sm font-semibold shadow-xs flex items-center justify-center gap-1.5 cursor-pointer text-xs"
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Save Call Summary</span>
                  </button>
                </div>
              </form>
            </div>

            {/* RIGHT COLUMN: SECTION 2 - SPECIFIC WORK LOG ROW ENTRY ONLY */}
<<<<<<< HEAD
            <div className="p-4 border border-gray-200 dark:border-slate-700 rounded-sm space-y-4 bg-white dark:bg-slate-900 shadow-3xs" id="section-2-worklog-row">
              <form onSubmit={handleSaveLog} className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-700 pb-2">
                  <PlusCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span className="font-bold text-gray-700 dark:text-slate-200 font-mono tracking-wider uppercase text-[10px]">
=======
            <div className="p-4 border border-gray-200 rounded-sm space-y-4">
              <form onSubmit={handleSaveLog} className="space-y-4">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
                  <PlusCircle className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-gray-700 font-mono tracking-wider uppercase text-[10px]">
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                    2. Specific Work Log Row Entry
                  </span>
                </div>

<<<<<<< HEAD
                <p className="text-[11px] text-gray-500 dark:text-slate-400 leading-normal">
                  Log a specific support task or a non-task activity for <span className="font-bold text-gray-700 dark:text-slate-200">{selectedEmployee}</span>.
                </p>

                {/* Entry Type Switcher Toggle */}
                <div className="flex bg-slate-100 dark:bg-slate-800 p-0.5 rounded-sm border border-slate-200 dark:border-slate-700" id="entry-type-tabs">
                  <button
                    type="button"
                    onClick={() => {
                      setEntryType('task');
                      setValidationError('');
                      setSuccessMessage('');
                    }}
                    className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-sm cursor-pointer transition-all ${
                      entryType === 'task' 
                        ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm border border-slate-200/80 dark:border-slate-700/80 font-bold' 
                        : 'text-gray-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    Customer Task
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setEntryType('activity');
                      setValidationError('');
                      setSuccessMessage('');
                    }}
                    className={`flex-1 text-center py-1.5 text-xs font-semibold rounded-sm cursor-pointer transition-all ${
                      entryType === 'activity' 
                        ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-400 shadow-sm border border-slate-200/80 dark:border-slate-700/80 font-bold' 
                        : 'text-gray-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  >
                    Non-Task Activity
                  </button>
                </div>

                {/* Conditional Fields Based on Selected Entry Type */}
                {entryType === 'task' ? (
                  <>
                    {/* Task ID & Minutes Spent */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                          <label className="block text-gray-500 dark:text-slate-400 font-mono font-bold mb-1 uppercase tracking-wider text-[10px]">
                            Task ID (Numeric)
                          </label>
                          <input
                            type="text"
                            value={taskId}
                            onChange={(e) => setTaskId(e.target.value.replace(/\D/g, ''))}
                            onFocus={(e) => e.target.select()}
                            placeholder="e.g. 1038"
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-sm px-3 py-2 text-xs font-mono focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 dark:text-slate-100"
                            required
                        />
                      </div>

                      <div>
                          <label className="block text-gray-500 dark:text-slate-400 font-mono font-bold mb-1 uppercase tracking-wider text-[10px]">
                            Minutes Spent
                          </label>
                          <input
                            type="number"
                            value={minutes}
                            onChange={(e) => setMinutes(Math.max(1, parseInt(e.target.value, 10) || 0))}
                            onFocus={(e) => e.target.select()}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-sm px-3 py-2 text-xs font-mono focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 dark:text-slate-100"
                            required
                            min="1"
                          />
                        </div>
                      </div>

                      {/* Complexity, Current Status, and Category */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                          <label className="block text-gray-500 dark:text-slate-400 font-mono font-bold mb-1 uppercase tracking-wider text-[10px]">
                            Complexity
                          </label>
                        <div className="flex gap-4 pt-2">
                          <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                            <input
                              type="radio"
                              name="taskType"
                              checked={taskType === 'Minor'}
                              onChange={() => setTaskType('Minor')}
                              className="text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                            />
                            <span>Minor</span>
                          </label>
                          <label className="flex items-center gap-1.5 cursor-pointer text-xs">
                            <input
                              type="radio"
                              name="taskType"
                              checked={taskType === 'Major'}
                              onChange={() => setTaskType('Major')}
                              className="text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                            />
                            <span>Major</span>
                          </label>
                        </div>
                      </div>

                      <div>
                          <label className="block text-gray-500 dark:text-slate-400 font-mono font-bold mb-1 uppercase tracking-wider text-[10px]">
                            Current Status
                          </label>
                        <select
                          value={status}
                          onChange={(e) => setStatus(e.target.value as TaskStatus)}
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-sm px-2.5 py-1.5 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 cursor-pointer dark:text-slate-100"
                        >
                          <option value="Solved">Solved</option>
                          <option value="Pending">Pending</option>
                          <option value="Forwarded">Forwarded</option>
                        </select>
                      </div>

                      <div>
                          <label className="block text-gray-500 dark:text-slate-400 font-mono font-bold mb-1 uppercase tracking-wider text-[10px]">
                            Category
                          </label>
                        <select
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-sm px-2.5 py-1.5 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 cursor-pointer dark:text-slate-100"
                        >
                          {TASK_CATEGORIES.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Backlog Query Checkbox */}
                    {status === 'Solved' && (
                      <div className="flex items-center gap-2 pt-2 pb-1 bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900 rounded-sm px-2.5">
                        <input
                          type="checkbox"
                          id="isOldQuerySolved"
                          checked={isOldQuerySolved}
                          onChange={(e) => setIsOldQuerySolved(e.target.checked)}
                          className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer w-3.5 h-3.5"
                        />
                        <label htmlFor="isOldQuerySolved" className="text-[10px] font-mono font-bold text-purple-800 dark:text-purple-400 cursor-pointer select-none">
                          Is this solving a BACKLOG / OLD QUERY?
                        </label>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {/* Non-Task Activity Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                          <label className="block text-gray-500 dark:text-slate-400 font-mono font-bold mb-1 uppercase tracking-wider text-[10px]">
                            Activity Type
                          </label>
                          <select
                            value={activityType}
                            onChange={(e) => setActivityType(e.target.value)}
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-sm px-2.5 py-2 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 cursor-pointer font-semibold text-slate-700 dark:text-slate-200"
                        >
                          <option value="Washroom">Washroom</option>
                          <option value="Salah (Prayer)">Salah (Prayer)</option>
                          <option value="Meeting">Meeting</option>
                          <option value="Break">Break</option>
                          <option value="Training">Training</option>
                          <option value="Others (custom)">Others (custom)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-gray-500 font-mono font-bold mb-1 uppercase tracking-wider text-[10px]">
                          Minutes Spent
                        </label>
                        <input
                          type="number"
                          value={minutes}
                          onChange={(e) => setMinutes(Math.max(1, parseInt(e.target.value, 10) || 0))}
                          onFocus={(e) => e.target.select()}
                          className="w-full bg-slate-50 border border-gray-200 rounded-sm px-3 py-2 text-xs font-mono focus:outline-none focus:border-emerald-500 focus:bg-white"
                          required
                          min="1"
                        />
                      </div>
                    </div>

                    {/* Conditional Custom Name Input */}
                    {activityType === 'Others (custom)' && (
                      <div>
                          <label className="block text-gray-500 dark:text-slate-400 font-mono font-bold mb-1 uppercase tracking-wider text-[10px]">
                            Custom Activity Name
                          </label>
                          <input
                            type="text"
                            value={customActivity}
                            onChange={(e) => setCustomActivity(e.target.value)}
                            onFocus={(e) => e.target.select()}
                            placeholder="e.g. System Audit"
                            className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-sm px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 dark:text-slate-100"
                            required
                        />
                      </div>
                    )}
                  </>
=======
                <p className="text-[11px] text-gray-500 leading-normal">
                  Log a specific support query row for <span className="font-bold text-gray-700">{selectedEmployee}</span>. Today's task created, solved, and pending metrics are calculated automatically from these entries.
                </p>

                {/* Task ID & Minutes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-500 font-mono font-bold mb-1 uppercase tracking-wider text-[10px]">Task ID</label>
                    <input
                      type="text"
                      value={taskId}
                      onChange={(e) => setTaskId(e.target.value.toUpperCase())}
                      placeholder="TSK-1038"
                      className="w-full bg-slate-50 border border-gray-200 rounded-sm px-3 py-2 text-xs font-mono focus:outline-none focus:border-blue-500 focus:bg-white"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-gray-500 font-mono font-bold mb-1 uppercase tracking-wider text-[10px]">Minutes Spent</label>
                    <input
                      type="number"
                      value={minutes}
                      onChange={(e) => setMinutes(Math.max(1, parseInt(e.target.value, 10) || 0))}
                      className="w-full bg-slate-50 border border-gray-200 rounded-sm px-3 py-2 text-xs font-mono focus:outline-none focus:border-blue-500 focus:bg-white"
                      required
                      min="1"
                    />
                  </div>
                </div>

                {/* Complexity, Status, Category */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-gray-500 font-mono font-bold mb-1 uppercase tracking-wider text-[10px]">Complexity</label>
                    <div className="flex gap-4 pt-2">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="taskType"
                          checked={taskType === 'Minor'}
                          onChange={() => setTaskType('Minor')}
                          className="text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span>Minor</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="taskType"
                          checked={taskType === 'Major'}
                          onChange={() => setTaskType('Major')}
                          className="text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                        <span>Major</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-gray-500 font-mono font-bold mb-1 uppercase tracking-wider text-[10px]">Current Status</label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value as TaskStatus)}
                      className="w-full bg-slate-50 border border-gray-200 rounded-sm px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
                    >
                      <option value="Solved">Solved</option>
                      <option value="Pending">Pending</option>
                      <option value="Forwarded">Forwarded</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-gray-500 font-mono font-bold mb-1 uppercase tracking-wider text-[10px]">Category</label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      className="w-full bg-slate-50 border border-gray-200 rounded-sm px-2.5 py-1.5 text-xs focus:outline-none focus:border-blue-500 focus:bg-white cursor-pointer"
                    >
                      {TASK_CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Backlog query solved checkbox (conditional) */}
                {status === 'Solved' && (
                  <div className="flex items-center gap-2 pt-2 pb-1 bg-purple-50/50 border border-purple-100 rounded-sm px-2.5">
                    <input
                      type="checkbox"
                      id="isOldQuerySolved"
                      checked={isOldQuerySolved}
                      onChange={(e) => setIsOldQuerySolved(e.target.checked)}
                      className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 cursor-pointer w-3.5 h-3.5"
                    />
                    <label htmlFor="isOldQuerySolved" className="text-[10px] font-mono font-bold text-purple-800 cursor-pointer select-none">
                      Is this solving a BACKLOG / OLD QUERY?
                    </label>
                  </div>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                )}

                {/* Notes (Optional) */}
                <div>
                  <div className="flex justify-between mb-1">
<<<<<<< HEAD
                    <label className="block text-gray-500 dark:text-slate-400 font-mono font-bold uppercase tracking-wider text-[10px]">
                      Notes / Remarks
                    </label>
                    <span className="text-[9px] text-gray-400 dark:text-slate-500 font-mono italic">Optional</span>
=======
                    <label className="block text-gray-500 font-mono font-bold uppercase tracking-wider text-[10px]">Notes</label>
                    <span className="text-[9px] text-gray-400 font-mono italic">Optional</span>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                  </div>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
<<<<<<< HEAD
                    placeholder="Ex: Completed shift checklist or solved user blockages. (Optional notes field)"
                    rows={2}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-sm px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-900 placeholder-gray-400 dark:placeholder-slate-500 font-sans dark:text-slate-100"
=======
                    placeholder="Ex: Customer confirmed access restored. (Optional notes field)"
                    rows={2}
                    className="w-full bg-slate-50 border border-gray-200 rounded-sm px-3 py-2 text-xs focus:outline-none focus:border-blue-500 focus:bg-white placeholder-gray-400 font-sans"
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => {
                      setNotes('');
                      setValidationError('');
                      setSuccessMessage('');
                    }}
<<<<<<< HEAD
                    className="px-4 py-1.5 border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-gray-600 dark:text-slate-400 rounded-sm cursor-pointer text-xs"
=======
                    className="px-4 py-1.5 border border-gray-200 bg-white hover:bg-slate-50 text-gray-600 rounded-sm cursor-pointer text-xs"
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                  >
                    Reset fields
                  </button>
                  <button
                    type="submit"
<<<<<<< HEAD
                    className="px-5 py-1.5 border border-emerald-700 dark:border-emerald-600 bg-emerald-600 dark:bg-emerald-500 hover:bg-emerald-700 dark:hover:bg-emerald-600 text-white rounded-sm font-semibold shadow-xs flex items-center gap-1 cursor-pointer text-xs"
=======
                    className="px-5 py-1.5 border border-blue-700 bg-blue-600 hover:bg-blue-700 text-white rounded-sm font-semibold shadow-xs flex items-center gap-1 cursor-pointer text-xs"
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
                  >
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Save Record to Spreadsheet</span>
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      )}

      {/* SPREADSHEET TABLE SHEET LIST */}
<<<<<<< HEAD
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-sm shadow-2xs flex flex-col" id="logs-list-panel">
        <div className="px-3 py-2 border-b border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
          <h3 className="font-semibold text-gray-700 dark:text-slate-200 font-sans flex items-center gap-1.5 text-xs">
            <ClipboardList className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Operational Log Matrix ({filteredLogs.length} Records)</span>
          </h3>
          <div className="text-[10px] text-gray-400 dark:text-slate-500 font-mono">
            Filtered view: <span className="text-blue-600 dark:text-blue-400 font-bold uppercase">{activeSubView}</span>
=======
      <div className="bg-white border border-gray-200 rounded-sm shadow-2xs flex flex-col" id="logs-list-panel">
        <div className="px-3 py-2 border-b border-gray-200 bg-slate-50 flex items-center justify-between">
          <h3 className="font-semibold text-gray-700 font-sans flex items-center gap-1.5 text-xs">
            <ClipboardList className="w-4 h-4 text-blue-600" />
            <span>Operational Log Matrix ({filteredLogs.length} Records)</span>
          </h3>
          <div className="text-[10px] text-gray-400 font-mono">
            Filtered view: <span className="text-blue-600 font-bold uppercase">{activeSubView}</span>
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
          </div>
        </div>
        <div className="flex-1">
          <ExcelTable id={`logs-tab-${activeSubView}`} data={filteredLogs} columns={logColumns} />
        </div>
      </div>
<<<<<<< HEAD

      {/* TASK LOG DETAILED MODAL POPUP */}
      {selectedTaskLog && (
        <div className="fixed inset-0 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-fade-in" id="task-detail-modal-backdrop">
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-sm shadow-xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="bg-slate-50 dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 px-4 py-3 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider">Log Record Overview</span>
                <h3 className="text-sm font-bold text-gray-800 dark:text-slate-100 font-mono">Task ID: {selectedTaskLog.id}</h3>
              </div>
              <button
                onClick={() => setSelectedTaskLog(null)}
                className="text-gray-400 dark:text-slate-500 hover:text-gray-600 dark:hover:text-slate-300 text-xs font-mono font-bold cursor-pointer bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 px-2 py-1 rounded"
              >
                [Esc] Close
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 overflow-y-auto space-y-4" style={{ scrollbarWidth: 'thin' }}>
              {/* Basic Fields Grid */}
              <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 dark:bg-slate-950 p-3 rounded-sm border border-gray-100 dark:border-slate-700">
                <div>
                  <span className="text-[9px] text-gray-400 dark:text-slate-500 font-mono uppercase font-bold">Agent Name</span>
                  <p className="font-semibold text-gray-700 dark:text-slate-200">{selectedTaskLog.employeeName}</p>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 dark:text-slate-500 font-mono uppercase font-bold">Logged Date & Time</span>
                  <p className="font-semibold text-gray-700 dark:text-slate-200 font-mono">{selectedTaskLog.date} at {selectedTaskLog.time || '09:00'}</p>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 dark:text-slate-500 font-mono uppercase font-bold">Minutes Spent</span>
                  <p className="font-semibold text-gray-700 dark:text-slate-200 font-mono">{selectedTaskLog.minutes} mins</p>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 dark:text-slate-500 font-mono uppercase font-bold">Task Category</span>
                  <p className="font-semibold text-gray-700 dark:text-slate-200">{selectedTaskLog.category}</p>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 dark:text-slate-500 font-mono uppercase font-bold">Complexity Level</span>
                  <span className={`inline-block px-1.5 py-0.2 rounded font-mono text-[9px] font-bold ${
                    selectedTaskLog.type === 'Major' ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    {selectedTaskLog.type}
                  </span>
                </div>
                <div>
                  <span className="text-[9px] text-gray-400 dark:text-slate-500 font-mono uppercase font-bold">Current Status</span>
                  <span className={`inline-block px-1.5 py-0.2 rounded text-[9px] font-semibold ${
                    selectedTaskLog.status === 'Solved' ? 'bg-emerald-50 text-emerald-700' :
                    selectedTaskLog.status === 'Pending' ? 'bg-amber-50 text-amber-700' :
                    'bg-blue-50 text-blue-700'
                  }`}>
                    {selectedTaskLog.status}
                  </span>
                </div>
              </div>

              {/* Notes Section */}
              <div className="space-y-1">
                <span className="text-[10px] text-gray-400 dark:text-slate-500 font-mono uppercase font-bold">Task Notes / Remarks</span>
                <p className="text-xs bg-slate-50/50 dark:bg-slate-800/50 p-2.5 rounded-sm border border-slate-100 dark:border-slate-700 text-gray-700 dark:text-slate-200 leading-relaxed font-sans min-h-[50px] whitespace-pre-wrap">
                  {selectedTaskLog.notes || '— No notes logged for this support entry —'}
                </p>
              </div>

              {/* MANAGER EVALUATION (Review Transparency) */}
              <div className="border-t border-gray-100 dark:border-slate-700 pt-3 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono uppercase font-bold">Quality Assurance Evaluation</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                    selectedTaskLog.managerReview === 'Perfect' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800' :
                    selectedTaskLog.managerReview === 'Pending Review' ? 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700' :
                    'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800'
                  }`}>
                    {selectedTaskLog.managerReview}
                  </span>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-sm border border-gray-200 dark:border-slate-700">
                  <span className="text-[9px] text-gray-400 dark:text-slate-500 font-mono uppercase font-bold block mb-1">Evaluator Comments</span>
                  <p className="text-xs text-gray-700 dark:text-slate-200 italic">
                    "{selectedTaskLog.managerComments || 'No evaluative remarks have been left by the manager yet.'}"
                  </p>
                </div>
              </div>

              {/* REVIEW REQUEST SYSTEM (UI and Action) */}
              {selectedTaskLog.managerReview !== 'Pending Review' && (
                <div className="border-t border-gray-100 dark:border-slate-700 pt-3 space-y-2">
                  <span className="text-[10px] text-purple-700 dark:text-purple-400 font-mono uppercase font-bold block">Discrepancy Re-evaluation Request</span>
                  
                  {selectedTaskLog.reviewRequestStatus ? (
                    <div className="bg-purple-50 dark:bg-purple-950/30 p-3 rounded-sm border border-purple-100 dark:border-purple-900 space-y-1.5 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[10px] font-bold text-purple-800 dark:text-purple-400">REQUEST STATUS</span>
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                          selectedTaskLog.reviewRequestStatus === 'Pending' ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400' :
                          selectedTaskLog.reviewRequestStatus === 'Approved' ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400' :
                          'bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-400'
                        }`}>
                          {selectedTaskLog.reviewRequestStatus} Re-evaluation
                        </span>
                      </div>
                      <p className="text-[11px] text-purple-700 dark:text-purple-300">
                        <span className="font-bold">Your submitted reason:</span> "{selectedTaskLog.reviewRequestReason}"
                      </p>
                      {selectedTaskLog.reviewRequestStatus === 'Pending' && (
                        <p className="text-[9px] text-purple-500 dark:text-purple-400 font-mono italic">
                          This log has been submitted to the manager queue for re-auditing.
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-[10px] text-gray-500 dark:text-slate-400 leading-normal">
                        If you believe the QA evaluation is inaccurate or requires clarification, submit a formal re-evaluation request directly to your supervisor.
                      </p>
                      {reviewRequestSuccess && (
                        <div className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900 p-2.5 rounded text-[10px] font-mono">
                          {reviewRequestSuccess}
                        </div>
                      )}
                      <textarea
                        value={reviewRequestReasonInput}
                        onChange={(e) => setReviewRequestReasonInput(e.target.value)}
                        placeholder="Detail the justification for re-auditing this log entry..."
                        rows={2}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-sm px-2.5 py-1.5 text-xs focus:outline-none focus:border-purple-500 focus:bg-white dark:focus:bg-slate-900 placeholder-gray-400 dark:placeholder-slate-500 font-sans dark:text-slate-100"
                      />
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => {
                            if (!reviewRequestReasonInput.trim()) {
                              alert('Please provide a reason/justification for the review request.');
                              return;
                            }
                            if (onUpdateLog) {
                              const updateData = {
                                reviewRequestReason: reviewRequestReasonInput.trim(),
                                reviewRequestTime: `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
                                reviewRequestStatus: 'Pending' as const,
                                originalManagerReview: selectedTaskLog.managerReview,
                                originalManagerComments: selectedTaskLog.managerComments || 'No comment'
                              };
                              onUpdateLog(selectedTaskLog.uniqueId, updateData);
                              
                              // update modal state as well
                              setSelectedTaskLog(prev => prev ? { ...prev, ...updateData } : null);
                              setReviewRequestSuccess('Your re-evaluation request has been sent to the managers queue.');
                              setReviewRequestReasonInput('');
                            }
                          }}
                          className="bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-600 text-white font-semibold text-[10px] px-3 py-1.5 rounded-sm border border-purple-700 dark:border-purple-600 cursor-pointer transition-colors shadow-2xs"
                        >
                          Submit Re-evaluation Request
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* RE-EVALUATION DISPUTE HISTORY */}
              {selectedTaskLog.reevaluationHistory && selectedTaskLog.reevaluationHistory.length > 0 && (
                <div className="border-t border-gray-100 dark:border-slate-700 pt-3 space-y-2">
                  <span className="text-[10px] text-purple-700 dark:text-purple-400 font-mono uppercase font-bold block">
                    Discrepancy Re-evaluation History
                  </span>
                  <div className="space-y-3">
                    {selectedTaskLog.reevaluationHistory.map((hist, hIdx) => (
                      <div key={hIdx} className="bg-slate-50 dark:bg-slate-950 border border-purple-100 dark:border-purple-900 rounded-sm p-3 space-y-2 text-xs">
                        {/* Header line */}
                        <div className="flex justify-between items-center border-b border-gray-200/60 dark:border-slate-700 pb-1.5">
                          <span className="font-mono text-[9px] font-bold text-gray-500 dark:text-slate-400">
                            Disputed Event #{hIdx + 1}
                          </span>
                          <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                            hist.decisionStatus === 'Approved' ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-400'
                          }`}>
                            {hist.decisionStatus} Re-evaluation
                          </span>
                        </div>

                        {/* Audit Trail Details */}
                        <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-500 dark:text-slate-400">
                          <div>
                            <span className="font-semibold text-gray-400 dark:text-slate-500 block uppercase text-[8px] font-mono">Original Review</span>
                            <span className="font-mono text-rose-600 dark:text-rose-400 line-through font-bold">{hist.originalReview}</span>
                          </div>
                          <div>
                            <span className="font-semibold text-gray-400 dark:text-slate-500 block uppercase text-[8px] font-mono">Final Decision</span>
                            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{hist.updatedReview}</span>
                          </div>
                        </div>

                        {/* Original review Comments & Request Reason */}
                        <div className="space-y-1 bg-white/60 dark:bg-slate-800/60 p-2 rounded border border-gray-100 dark:border-slate-700">
                          <p className="text-[10px] text-gray-500 dark:text-slate-400">
                            <span className="font-bold">Original comment:</span> "{hist.originalComments}"
                          </p>
                          <p className="text-[10px] text-purple-800 dark:text-purple-400">
                            <span className="font-bold">Dispute reason:</span> "{hist.reviewRequestReason}"
                          </p>
                        </div>

                        {/* Updated comments by manager */}
                        <div className="bg-white dark:bg-slate-900 border border-gray-200/50 dark:border-slate-700 p-2.5 rounded-sm">
                          <div className="flex justify-between items-center text-[9px] text-gray-400 dark:text-slate-500 font-mono mb-1">
                            <span>DECISION BY: {hist.reviewingManager}</span>
                            <span>{hist.decisionTime}</span>
                          </div>
                          <p className="text-gray-700 dark:text-slate-200 font-medium italic leading-relaxed text-[11px]">
                            "{hist.updatedComments}"
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="bg-slate-50 dark:bg-slate-800 border-t border-gray-100 dark:border-slate-700 px-4 py-2.5 flex justify-end">
              <button
                onClick={() => setSelectedTaskLog(null)}
                className="bg-gray-800 dark:bg-slate-700 hover:bg-gray-900 dark:hover:bg-slate-600 text-white text-[11px] font-semibold px-4 py-1.5 rounded-sm cursor-pointer"
              >
                Close Summary
              </button>
            </div>
          </div>
        </div>
      )}
=======
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
    </div>
  );
}
