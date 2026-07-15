import { WorkLog, EmployeePerformance } from './types';

export const SUPPORT_EMPLOYEES = [
  'Sarah Connor',
  'David Chen',
  'Marcus Aurelius',
  'Elena Rostova',
  'James Sutherland',
  'Amina Diop',
  'Siddharth Patel',
  'Chloe Fraser'
];

export const TASK_CATEGORIES = [
  'Billing & Invoices',
  'Authentication & Login',
  'UI Bug Reports',
  'Data Export Requests',
  'API Setup',
  'Feature Inquiries',
  'Account Settings',
  'Performance Issues'
];

const RAW_INITIAL_WORK_LOGS = [
  {
    id: 'TSK-1024',
    employeeName: 'Sarah Connor',
    minutes: 45,
    type: 'Major',
    status: 'Solved',
    category: 'Billing & Invoices',
    notes: 'Investigated invoice mismatch for enterprise user. Credited $120 and updated system records.',
    date: '2026-07-14',
    managerReview: 'Perfect',
    managerComments: 'Great breakdown of financial adjustment.',
    callsReceived: 18,
    callsDialed: 14,
    tasksCreatedToday: 8,
    tasksSolvedToday: 6,
    tasksForwardedToday: 1,
    oldQueriesSolved: 3,
    pendingTasks: 1
  },
  {
    id: 'TSK-1025',
    employeeName: 'David Chen',
    minutes: 15,
    type: 'Minor',
    status: 'Solved',
    category: 'Authentication & Login',
    notes: 'Resolved login lock-out due to multiple invalid password attempts. Verified identity via MFA.',
    date: '2026-07-14',
    managerReview: 'Perfect',
    managerComments: 'Swift response time.',
    callsReceived: 15,
    callsDialed: 12,
    tasksCreatedToday: 6,
    tasksSolvedToday: 5,
    tasksForwardedToday: 0,
    oldQueriesSolved: 2,
    pendingTasks: 1
  },
  {
    id: 'TSK-1026',
    employeeName: 'Elena Rostova',
    minutes: 120,
    type: 'Major',
    status: 'Forwarded',
    category: 'UI Bug Reports',
    notes: 'Reported infinite spinner on billing checkout flow. Logged network trace and forwarded to engineering.',
    date: '2026-07-14',
    managerReview: 'Pending Review',
    callsReceived: 20,
    callsDialed: 15,
    tasksCreatedToday: 10,
    tasksSolvedToday: 7,
    tasksForwardedToday: 2,
    oldQueriesSolved: 4,
    pendingTasks: 1
  },
  {
    id: 'TSK-1027',
    employeeName: 'Marcus Aurelius',
    minutes: 30,
    type: 'Minor',
    status: 'Pending',
    category: 'Data Export Requests',
    notes: 'Customer requested full GDPR export of historical workspace logs. Waiting on script confirmation.',
    date: '2026-07-14',
    managerReview: 'Pending Review',
    callsReceived: 12,
    callsDialed: 10,
    tasksCreatedToday: 5,
    tasksSolvedToday: 3,
    tasksForwardedToday: 1,
    oldQueriesSolved: 1,
    pendingTasks: 1
  },
  {
    id: 'TSK-1028',
    employeeName: 'James Sutherland',
    minutes: 50,
    type: 'Major',
    status: 'Solved',
    category: 'API Setup',
    notes: 'Assisted integration engineer with custom Webhook payload headers. Debugged HTTP 403 response.',
    date: '2026-07-13',
    managerReview: 'Error',
    managerComments: 'Should have classified under API Integration instead of API Setup, but correct notes.',
    reviewRequestReason: 'My notes state clearly that the webhook integration configuration was tested, which falls perfectly under API Setup guidelines and matches our workflow template.',
    reviewRequestTime: '2026-07-14 11:24 AM',
    reviewRequestStatus: 'Pending',
    originalManagerReview: 'Error',
    originalManagerComments: 'Should have classified under API Integration instead of API Setup, but correct notes.'
  },
  {
    id: 'TSK-1029',
    employeeName: 'Amina Diop',
    minutes: 20,
    type: 'Minor',
    status: 'Solved',
    category: 'Account Settings',
    notes: 'Processed workspace ownership transfer request. Validated authorization from legal contact.',
    date: '2026-07-13',
    managerReview: 'Perfect',
    managerComments: 'Clean compliance checks.'
  },
  {
    id: 'TSK-1030',
    employeeName: 'Siddharth Patel',
    minutes: 85,
    type: 'Major',
    status: 'Solved',
    category: 'Performance Issues',
    notes: 'Diagnosed latency on dashboard loading times for client workspace. Determined too many active browser extensions.',
    date: '2026-07-13',
    managerReview: 'Perfect',
    managerComments: 'Approved request. SLA delay exclusion applied due to customer environmental hold. Outstanding documentation.',
    reviewRequestReason: 'The user took 45 minutes to install standard diagnostic utilities, which was outside our SLA control. I request SLA exclusion for this ticket.',
    reviewRequestTime: '2026-07-13 03:45 PM',
    reviewRequestStatus: 'Approved',
    originalManagerReview: 'Delay',
    originalManagerComments: 'Resolution took slightly longer than normal, but robust documentation.',
    reevaluationHistory: [
      {
        originalReview: 'Delay',
        originalComments: 'Resolution took slightly longer than normal, but robust documentation.',
        reviewRequestReason: 'The user took 45 minutes to install standard diagnostic utilities, which was outside our SLA control. I request SLA exclusion for this ticket.',
        reviewRequestTime: '2026-07-13 03:45 PM',
        decisionTime: '2026-07-14 09:15 AM',
        reviewingManager: 'Senior Supervisor',
        updatedReview: 'Perfect',
        updatedComments: 'Approved request. SLA delay exclusion applied due to customer environmental hold. Outstanding documentation.',
        decisionStatus: 'Approved'
      }
    ]
  },
  {
    id: 'TSK-1031',
    employeeName: 'Chloe Fraser',
    minutes: 35,
    type: 'Minor',
    status: 'Solved',
    category: 'Feature Inquiries',
    notes: 'Answered detailed questions regarding upcoming v4.2 timeline and capabilities. Shared marketing deck.',
    date: '2026-07-13',
    managerReview: 'Perfect',
  },
  {
    id: 'TSK-1032',
    employeeName: 'Sarah Connor',
    minutes: 10,
    type: 'Minor',
    status: 'Solved',
    category: 'Authentication & Login',
    notes: 'Triggered password reset link manually after client report of server timeout.',
    date: '2026-07-12',
    managerReview: 'Perfect',
  },
  {
    id: 'TSK-1033',
    employeeName: 'David Chen',
    minutes: 90,
    type: 'Major',
    status: 'Forwarded',
    category: 'UI Bug Reports',
    notes: 'Mobile navigation drawer overlapping with action bars on iOS 17 Safari. Logged GitHub ticket.',
    date: '2026-07-12',
    managerReview: 'Late Reply',
    managerComments: 'Response was delayed by 3 hours past standard SLA.'
  },
  {
    id: 'TSK-1034',
    employeeName: 'Marcus Aurelius',
    minutes: 40,
    type: 'Minor',
    status: 'Solved',
    category: 'Billing & Invoices',
    notes: 'Updated tax exemption certificate for corporate customer in state of Texas.',
    date: '2026-07-12',
    managerReview: 'Perfect',
  },
  {
    id: 'TSK-1035',
    employeeName: 'Elena Rostova',
    minutes: 60,
    type: 'Major',
    status: 'Solved',
    category: 'API Setup',
    notes: 'Walked user through setting up basic Bearer token authentication in Postman.',
    date: '2026-07-12',
    managerReview: 'Wrong Category',
    managerComments: 'Task was simple client help. Should have been Minor, not Major.'
  },
  {
    id: 'TSK-1036',
    employeeName: 'James Sutherland',
    minutes: 15,
    type: 'Minor',
    status: 'Pending',
    category: 'Feature Inquiries',
    notes: 'Client asking if SSO is supported on the starter tier. Checked roadmap.',
    date: '2026-07-11',
    managerReview: 'Incomplete',
    managerComments: 'Did not state resolution path or if the client was informed.'
  },
  {
    id: 'TSK-1037',
    employeeName: 'Amina Diop',
    minutes: 45,
    type: 'Minor',
    status: 'Solved',
    category: 'Account Settings',
    notes: 'Processed bulk deletion request for 1,200 test entries in a development workspace.',
    date: '2026-07-11',
    managerReview: 'Perfect',
  }
];

// Add uniqueId, strip TSK- prefix, and assign realistic times dynamically
export const INITIAL_WORK_LOGS: WorkLog[] = RAW_INITIAL_WORK_LOGS.map((log, index) => {
  const numericId = log.id.replace(/^TSK-/, '');
  // Realistic time calculation based on index
  const hours = 8 + (index % 8);
  const minutes = (index * 12) % 60;
  const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
  
  return {
    ...log,
    id: numericId,
    time: timeStr,
    uniqueId: `${numericId}-${index}-${log.date}`
  };
}) as WorkLog[];

// Calculate dynamic employee statistics based on work logs
export function getEmployeePerformance(logs: WorkLog[]): EmployeePerformance[] {
  // Base targets/constants to generate consistent data for each support representative
  const BASE_METRICS: Record<string, { callsReceived: number; callsDialed: number; queriesSolved: number }> = {
    'Sarah Connor': { callsReceived: 142, callsDialed: 110, queriesSolved: 14 },
    'David Chen': { callsReceived: 120, callsDialed: 95, queriesSolved: 9 },
    'Marcus Aurelius': { callsReceived: 98, callsDialed: 88, queriesSolved: 11 },
    'Elena Rostova': { callsReceived: 115, callsDialed: 102, queriesSolved: 8 },
    'James Sutherland': { callsReceived: 130, callsDialed: 118, queriesSolved: 12 },
    'Amina Diop': { callsReceived: 125, callsDialed: 99, queriesSolved: 15 },
    'Siddharth Patel': { callsReceived: 110, callsDialed: 90, queriesSolved: 10 },
    'Chloe Fraser': { callsReceived: 105, callsDialed: 101, queriesSolved: 13 }
  };

  return SUPPORT_EMPLOYEES.map(name => {
    const employeeLogs = logs.filter(log => log.employeeName === name);
    const base = BASE_METRICS[name] || { callsReceived: 100, callsDialed: 90, queriesSolved: 10 };

    const hasManualMetrics = employeeLogs.some(log => 
      log.callsReceived !== undefined || 
      log.tasksCreatedToday !== undefined ||
      log.isOldQuerySolved !== undefined ||
      !INITIAL_WORK_LOGS.some(init => init.uniqueId === log.uniqueId)
    );

    let callsReceived = 0;
    let callsDialed = 0;
    let tasksCreated = 0;
    let solved = 0;
    let pending = 0;
    let forwarded = 0;
    let oldQueriesSolved = 0;

    if (hasManualMetrics) {
      // Aggregate from both standalone Call Summaries, legacy hybrid logs, and individual task entries
      employeeLogs.forEach(log => {
        // Section 1 / Hybrid manual stats
        callsReceived += log.callsReceived || 0;
        callsDialed += log.callsDialed || 0;

        const isTask = !log.id.startsWith('CALL-') && !log.id.startsWith('ACT-');

        // Legacy hybrid stats or auto-calculation from Section 2 task entries
        if (log.tasksCreatedToday !== undefined) {
          tasksCreated += log.tasksCreatedToday;
        } else if (isTask) {
          tasksCreated += 1;
        }

        if (log.tasksSolvedToday !== undefined) {
          solved += log.tasksSolvedToday;
        } else if (isTask && log.status === 'Solved') {
          solved += 1;
        }

        if (log.tasksForwardedToday !== undefined) {
          forwarded += log.tasksForwardedToday;
        } else if (isTask && log.status === 'Forwarded') {
          forwarded += 1;
        }

        if (log.pendingTasks !== undefined) {
          pending += log.pendingTasks;
        } else if (isTask && log.status === 'Pending') {
          pending += 1;
        }

        if (log.oldQueriesSolved !== undefined) {
          oldQueriesSolved += log.oldQueriesSolved;
        } else if (isTask && log.status === 'Solved' && log.isOldQuerySolved) {
          oldQueriesSolved += 1;
        }
      });
    } else {
      // Fallback/Mock behavior for initial data that doesn't have manual fields yet
      const logsSolved = employeeLogs.filter(log => log.status === 'Solved').length;
      const logsPending = employeeLogs.filter(log => log.status === 'Pending').length;
      const logsForwarded = employeeLogs.filter(log => log.status === 'Forwarded').length;

      solved = base.queriesSolved + logsSolved;
      pending = logsPending + 2; // static pending buffer
      forwarded = logsForwarded + 1;
      tasksCreated = base.callsReceived + employeeLogs.length;
      callsReceived = base.callsReceived;
      callsDialed = base.callsDialed;
      oldQueriesSolved = Math.round(base.queriesSolved * 1.5);
    }

    const totalMinutes = employeeLogs.reduce((sum, log) => sum + log.minutes, 0) + (hasManualMetrics ? 0 : (base.callsReceived * 8));

    // Calculate manager review distributions
    const perfect = employeeLogs.filter(log => log.managerReview === 'Perfect').length + (hasManualMetrics ? 0 : 8);
    const error = employeeLogs.filter(log => log.managerReview === 'Error').length + (hasManualMetrics ? 0 : 1);
    const delay = employeeLogs.filter(log => log.managerReview === 'Delay').length + (hasManualMetrics ? 0 : 2);
    const lateReply = employeeLogs.filter(log => log.managerReview === 'Late Reply').length;

    // Calculate dynamic resolution rate
    const totalProcessed = solved + forwarded + pending;
    const resolutionRate = totalProcessed > 0 
      ? Math.round((solved / totalProcessed) * 100) 
      : 85;

    return {
      employeeName: name,
      callsReceived,
      callsDialed,
      tasksCreated,
      solved,
      pending,
      forwarded,
      oldQueriesSolved,
      totalMinutes,
      perfect,
      error,
      delay,
      lateReply,
      resolutionRate: Math.min(98, Math.max(72, resolutionRate))
    };
  });
}