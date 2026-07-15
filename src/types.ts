export type TaskType = 'Major' | 'Minor';
export type TaskStatus = 'Pending' | 'Solved' | 'Forwarded';

export type ReviewStatus = 
  | 'Perfect'
  | 'Error'
  | 'Delay'
  | 'Late Reply'
  | 'Incomplete'
  | 'Wrong Category'
  | 'Other'
  | 'Pending Review';

<<<<<<< HEAD
export interface Shift {
  id: string;
  name: string;
  startTime: string; // e.g. "11:00 AM" or "11:00"
  endTime: string;   // e.g. "07:00 PM" or "19:00"
}

export interface ReevaluationHistoryItem {
  originalReview: ReviewStatus;
  originalComments?: string;
  reviewRequestReason: string;
  reviewRequestTime: string;
  decisionTime: string;
  reviewingManager: string;
  updatedReview: ReviewStatus;
  updatedComments?: string;
  decisionStatus: 'Approved' | 'Rejected';
}

export interface WorkLog {
  id: string; // Task ID like "3012" (numeric only now!)
=======
export interface WorkLog {
  id: string; // Task ID like "TSK-3012"
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
  uniqueId: string; // Truly unique database record ID
  employeeName: string;
  minutes: number;
  type: TaskType;
  status: TaskStatus;
  category: string;
  notes?: string;
  date: string; // "YYYY-MM-DD"
<<<<<<< HEAD
  time?: string; // "HH:MM" (exact time of creation/update)
  managerReview: ReviewStatus;
  managerComments?: string;
  
  // Review Request system fields
  reviewRequestReason?: string;
  reviewRequestTime?: string;
  reviewRequestStatus?: 'Pending' | 'Approved' | 'Rejected';
  originalManagerReview?: ReviewStatus;
  originalManagerComments?: string;
  reevaluationHistory?: ReevaluationHistoryItem[];
  
=======
  managerReview: ReviewStatus;
  managerComments?: string;
  
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
  // Manual Excel-like report fields entered by the agent
  callsReceived?: number;
  callsDialed?: number;
  tasksCreatedToday?: number;
  tasksSolvedToday?: number;
  tasksForwardedToday?: number;
  oldQueriesSolved?: number;
  pendingTasks?: number;
  isOldQuerySolved?: boolean;
}

export interface EmployeePerformance {
  employeeName: string;
  callsReceived: number;
  callsDialed: number;
  tasksCreated: number;
  solved: number;
  pending: number;
  forwarded: number;
  oldQueriesSolved: number;
  totalMinutes: number;
  perfect: number;
  error: number;
  delay: number;
  lateReply: number;
  resolutionRate: number; // percentage
}

export type ViewType =
  | 'dashboard'
  | 'worklogs-add'
  | 'worklogs-today'
  | 'worklogs-pending'
  | 'worklogs-history'
  | 'manager-review'
<<<<<<< HEAD
  | 'manager-reevaluation'
  | 'manager-performance'
  | 'reports'
=======
  | 'manager-performance'
  | 'reports-daily'
  | 'reports-weekly'
  | 'reports-monthly'
  | 'reports-quarterly'
  | 'reports-custom'
>>>>>>> 9091aac7c701d4ed13844b1baa8bd2202094bbeb
  | 'employees'
  | 'settings';
