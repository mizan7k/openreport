import React, { useMemo, useState } from 'react';
import { WorkLog, ReviewStatus, ReevaluationHistoryItem } from '../types';
import { ShieldAlert, CheckCircle, XCircle, Clock, History, FileText, UserCheck, MessageSquare, AlertCircle } from 'lucide-react';

interface ManagerReevaluationViewProps {
  logs: WorkLog[];
  onUpdateLog: (id: string, update: Partial<WorkLog>) => void;
}

export function ManagerReevaluationView({ logs, onUpdateLog }: ManagerReevaluationViewProps) {
  // Filtering logs that have a re-evaluation request
  const reevaluationLogs = useMemo(() => {
    return logs.filter(log => log.reviewRequestStatus !== undefined);
  }, [logs]);

  // Tab state for pending vs resolved requests
  const [activeTab, setActiveTab] = useState<'Pending' | 'Resolved'>('Pending');

  // Currently selected log for review
  const [selectedLogId, setSelectedLogId] = useState<string | null>(null);

  // Form states for the decision
  const [reviewingManager, setReviewingManager] = useState('Senior Supervisor');
  const [decisionStatus, setDecisionStatus] = useState<'Approved' | 'Rejected'>('Approved');
  const [updatedReview, setUpdatedReview] = useState<ReviewStatus>('Perfect');
  const [updatedComments, setUpdatedComments] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Get logs filtered by active tab
  const filteredLogs = useMemo(() => {
    return reevaluationLogs.filter(log => {
      if (activeTab === 'Pending') {
        return log.reviewRequestStatus === 'Pending';
      } else {
        return log.reviewRequestStatus === 'Approved' || log.reviewRequestStatus === 'Rejected';
      }
    });
  }, [reevaluationLogs, activeTab]);

  // Find currently selected log details
  const selectedLog = useMemo(() => {
    return logs.find(log => log.uniqueId === selectedLogId) || null;
  }, [logs, selectedLogId]);

  // Reset form when selection changes
  React.useEffect(() => {
    if (selectedLog) {
      setUpdatedReview(selectedLog.managerReview === 'Pending Review' ? 'Perfect' : selectedLog.managerReview);
      setUpdatedComments(selectedLog.managerComments || '');
      setDecisionStatus(selectedLog.reviewRequestStatus === 'Pending' ? 'Approved' : (selectedLog.reviewRequestStatus as 'Approved' | 'Rejected'));
      setSuccessMessage('');
    } else {
      setUpdatedComments('');
      setSuccessMessage('');
    }
  }, [selectedLogId, selectedLog]);

  const REVIEW_OPTIONS: ReviewStatus[] = [
    'Perfect',
    'Error',
    'Delay',
    'Late Reply',
    'Incomplete',
    'Wrong Category',
    'Other'
  ];

  const handleDecisionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedLog) return;

    if (!reviewingManager.trim()) {
      alert('Please specify the name of the Reviewing Manager.');
      return;
    }
    if (!updatedComments.trim()) {
      alert('Please provide updated review comments explaining the decision.');
      return;
    }

    const now = new Date();
    const formattedDateTime = `${now.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })} ${now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`;

    // Build history entry
    const historyItem: ReevaluationHistoryItem = {
      originalReview: selectedLog.originalManagerReview || selectedLog.managerReview,
      originalComments: selectedLog.originalManagerComments || selectedLog.managerComments || 'No comment',
      reviewRequestReason: selectedLog.reviewRequestReason || '',
      reviewRequestTime: selectedLog.reviewRequestTime || '',
      decisionTime: formattedDateTime,
      reviewingManager: reviewingManager.trim(),
      updatedReview,
      updatedComments: updatedComments.trim(),
      decisionStatus
    };

    const newHistory = [...(selectedLog.reevaluationHistory || []), historyItem];

    // Submit log updates
    onUpdateLog(selectedLog.uniqueId, {
      managerReview: updatedReview,
      managerComments: updatedComments.trim(),
      reviewRequestStatus: decisionStatus,
      reevaluationHistory: newHistory
    });

    setSuccessMessage(`Decision submitted successfully! Request is now marked as ${decisionStatus}.`);
    
    // Automatically clear success message after 3 seconds
    setTimeout(() => {
      setSuccessMessage('');
    }, 4000);
  };

  // Badges count
  const pendingCount = useMemo(() => {
    return reevaluationLogs.filter(log => log.reviewRequestStatus === 'Pending').length;
  }, [reevaluationLogs]);

  const resolvedCount = useMemo(() => {
    return reevaluationLogs.filter(log => log.reviewRequestStatus === 'Approved' || log.reviewRequestStatus === 'Rejected').length;
  }, [reevaluationLogs]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-slate-50 dark:bg-slate-950 space-y-4" id="reevaluation-requests-container">
      {/* Page Header */}
      <div className="border-b border-gray-200 dark:border-slate-800 pb-3 flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800 dark:text-slate-100">QA Re-evaluation Dispute Queue</h2>
          <p className="text-xs text-gray-500 dark:text-slate-400 font-mono">
            Review and resolve re-evaluation requests submitted by support agents contesting QA evaluations.
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded text-[11px] font-mono px-3 py-1 text-gray-600 dark:text-slate-400">
          <History className="w-3.5 h-3.5 text-purple-600" />
          <span>Active Dispute System: v1.1</span>
        </div>
      </div>

      {/* Main Container Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-[calc(100vh-140px)] min-h-[500px]">
        {/* Left column: List of requests (cols 5) */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-sm shadow-2xs flex flex-col h-full overflow-hidden">
          {/* Header tabs */}
          <div className="border-b border-gray-100 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-between px-3 py-2 shrink-0">
            <span className="text-[10px] font-mono text-gray-400 font-bold uppercase tracking-wider">Disputes list</span>
            <div className="flex gap-1.5">
              <button
                onClick={() => {
                  setActiveTab('Pending');
                  setSelectedLogId(null);
                }}
                className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                  activeTab === 'Pending'
                    ? 'bg-amber-100 dark:bg-amber-950/40 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent'
                }`}
              >
                Pending ({pendingCount})
              </button>
              <button
                onClick={() => {
                  setActiveTab('Resolved');
                  setSelectedLogId(null);
                }}
                className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                  activeTab === 'Resolved'
                    ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-slate-100 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 border border-transparent'
                }`}
              >
                Resolved ({resolvedCount})
              </button>
            </div>
          </div>

          {/* List panel */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100 dark:divide-slate-800" style={{ scrollbarWidth: 'thin' }}>
            {filteredLogs.length === 0 ? (
              <div className="p-8 text-center text-gray-400 dark:text-slate-500 text-xs flex flex-col items-center justify-center h-full space-y-2">
                <ShieldAlert className="w-8 h-8 text-slate-300 dark:text-slate-600" />
                <p>No {activeTab.toLowerCase()} re-evaluation requests found.</p>
              </div>
            ) : (
              filteredLogs.map(log => {
                const isSelected = selectedLogId === log.uniqueId;
                return (
                  <button
                    key={log.uniqueId}
                    onClick={() => setSelectedLogId(log.uniqueId)}
                    className={`w-full text-left p-3 flex flex-col gap-1.5 transition-colors cursor-pointer border-l-4 ${
                      isSelected
                        ? 'bg-slate-50 dark:bg-slate-800 border-blue-600'
                        : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/50 border-transparent'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="font-mono text-xs font-bold text-gray-800 dark:text-slate-200">
                        Task #{log.id}
                      </span>
                      <span className={`text-[9px] font-mono font-semibold px-1.5 py-0.2 rounded border ${
                        log.reviewRequestStatus === 'Pending' ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border-amber-200 dark:border-amber-800' :
                        log.reviewRequestStatus === 'Approved' ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' :
                        'bg-rose-50 dark:bg-rose-950/30 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                      }`}>
                        {log.reviewRequestStatus}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 text-[10px] text-gray-500 dark:text-slate-400 font-sans gap-x-2 gap-y-0.5">
                      <div>
                        <span className="text-[8px] font-mono font-bold uppercase text-gray-400 dark:text-slate-500 block">Agent</span>
                        <span className="font-semibold text-gray-700 dark:text-slate-200 truncate block">{log.employeeName}</span>
                      </div>
                      <div>
                        <span className="text-[8px] font-mono font-bold uppercase text-gray-400 dark:text-slate-500 block">Original Review</span>
                        <span className="font-semibold text-rose-600 dark:text-rose-400 font-mono truncate block">{log.originalManagerReview || log.managerReview}</span>
                      </div>
                    </div>

                    <div className="bg-slate-50/80 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 p-2 rounded-sm text-[11px] text-gray-600 dark:text-slate-400 line-clamp-2 italic">
                      "{log.reviewRequestReason}"
                    </div>

                    <div className="flex justify-between items-center text-[9px] text-gray-400 dark:text-slate-500 font-mono pt-1">
                      <span>Cat: {log.category}</span>
                      <span>Req: {log.reviewRequestTime || 'Just now'}</span>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right column: Form details & action panel (cols 7) */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-sm shadow-2xs flex flex-col h-full overflow-hidden">
          {selectedLog ? (
            <div className="flex flex-col h-full">
              {/* Card Header details */}
              <div className="bg-slate-50 dark:bg-slate-800 border-b border-gray-100 dark:border-slate-700 px-4 py-3 shrink-0 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider">
                    Detailed Dispute Audit
                  </span>
                  <h3 className="text-sm font-bold text-gray-800 dark:text-slate-100 font-mono">
                    Task Record #{selectedLog.id}
                  </h3>
                </div>
                <div className="text-[10px] font-mono text-gray-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200/50 dark:border-slate-700 rounded px-2.5 py-0.5">
                  Type: <span className="font-bold text-slate-800 dark:text-slate-200">{selectedLog.type}</span> ({selectedLog.minutes} mins)
                </div>
              </div>

              {/* Card Scroll Body */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4" style={{ scrollbarWidth: 'thin' }}>
                {successMessage && (
                  <div className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 p-3 rounded-sm flex items-start gap-2 text-xs font-mono">
                    <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                    <span>{successMessage}</span>
                  </div>
                )}

                {/* Original task notes */}
                <div className="space-y-1 bg-slate-50 dark:bg-slate-950 p-3 rounded-sm border border-slate-100 dark:border-slate-700">
                  <span className="text-[9px] font-mono font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider block">
                    Original Agent Notes
                  </span>
                  <p className="text-xs text-gray-700 dark:text-slate-200 leading-relaxed font-sans whitespace-pre-wrap">
                    {selectedLog.notes || '— No notes logged for this support entry —'}
                  </p>
                </div>

                {/* Dispute Reason (Agent's point of view) */}
                <div className="border border-purple-100 dark:border-purple-900 bg-purple-50/50 dark:bg-purple-950/30 p-3.5 rounded-sm space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] font-mono font-bold text-purple-700 dark:text-purple-400 uppercase tracking-wider flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Employee's Justification
                    </span>
                    <span className="text-[9px] text-purple-500 dark:text-purple-400 font-mono">{selectedLog.reviewRequestTime}</span>
                  </div>
                  <p className="text-xs text-purple-900 dark:text-purple-300 leading-relaxed italic font-medium bg-white/70 dark:bg-slate-800/70 p-2.5 rounded border border-purple-100/40 dark:border-purple-900">
                    "{selectedLog.reviewRequestReason}"
                  </p>
                </div>

                {/* QA Details and Original Evaluator remarks */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-700 p-3 rounded-sm">
                    <span className="text-[9px] font-mono font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                      Contested QA Grade
                    </span>
                    <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900 px-2 py-0.5 rounded">
                      {selectedLog.originalManagerReview || selectedLog.managerReview}
                    </span>
                  </div>

                  <div className="bg-slate-50 dark:bg-slate-950 border border-slate-200/60 dark:border-slate-700 p-3 rounded-sm">
                    <span className="text-[9px] font-mono font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider block mb-1">
                      Previous QA Comments
                    </span>
                    <p className="text-xs text-gray-600 dark:text-slate-400 italic">
                      "{selectedLog.originalManagerComments || selectedLog.managerComments || 'No comments left'}"
                    </p>
                  </div>
                </div>

                {/* Audit History (showing if already has items in array) */}
                {selectedLog.reevaluationHistory && selectedLog.reevaluationHistory.length > 0 && (
                  <div className="border-t border-gray-100 dark:border-slate-700 pt-3 space-y-2">
                    <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider block">
                      Dispute Decision Audit Trail
                    </span>
                    <div className="space-y-2">
                      {selectedLog.reevaluationHistory.map((hist, hIdx) => (
                        <div key={hIdx} className="border border-gray-200 dark:border-slate-700 rounded p-2.5 text-xs bg-slate-50 dark:bg-slate-950 space-y-1.5">
                          <div className="flex justify-between items-center text-[10px] font-mono border-b border-gray-200 dark:border-slate-700 pb-1">
                            <span className="font-bold flex items-center gap-1 text-gray-700 dark:text-slate-200">
                              <UserCheck className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                              Decision by: {hist.reviewingManager}
                            </span>
                            <span className={`px-1.5 py-0.2 rounded font-bold uppercase ${
                              hist.decisionStatus === 'Approved' ? 'bg-emerald-100 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-950/40 text-red-800 dark:text-red-400'
                            }`}>
                              {hist.decisionStatus}
                            </span>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-[10px] text-gray-500 dark:text-slate-400">
                            <div>
                              Original: <span className="font-mono text-rose-600 dark:text-rose-400 line-through">{hist.originalReview}</span>
                            </div>
                            <div>
                              Updated: <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{hist.updatedReview}</span>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-slate-200 leading-normal italic text-[11px] bg-white dark:bg-slate-900 p-2 border border-gray-100 dark:border-slate-700 rounded">
                            "{hist.updatedComments}"
                          </p>
                          <div className="text-[9px] text-gray-400 dark:text-slate-500 text-right font-mono">
                            {hist.decisionTime}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Manager Decision Input Form */}
                {selectedLog.reviewRequestStatus === 'Pending' ? (
                  <form onSubmit={handleDecisionSubmit} className="border-t border-gray-200 dark:border-slate-700 pt-4 space-y-3">
                    <span className="text-[10px] font-mono font-bold text-gray-400 dark:text-slate-500 uppercase tracking-wider block">
                      Record Final Dispute Resolution
                    </span>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                      {/* Reviewing Manager Name */}
                      <div>
                        <label className="block text-gray-500 dark:text-slate-400 font-mono mb-1 text-[10px]">REVIEWING MANAGER</label>
                        <input
                          type="text"
                          required
                          value={reviewingManager}
                          onChange={(e) => setReviewingManager(e.target.value)}
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-sm px-2.5 py-1.5 focus:outline-none focus:bg-white dark:focus:bg-slate-900 font-sans text-xs dark:text-slate-100"
                          placeholder="Manager Name"
                        />
                      </div>

                      {/* Decision status check */}
                      <div>
                        <label className="block text-gray-500 dark:text-slate-400 font-mono mb-1 text-[10px]">DISPUTE DECISION STATUS</label>
                        <div className="grid grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => setDecisionStatus('Approved')}
                            className={`py-1.5 rounded-sm font-bold text-[11px] cursor-pointer border flex items-center justify-center gap-1 transition-colors ${
                              decisionStatus === 'Approved'
                                ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                                : 'bg-slate-50 dark:bg-slate-800 text-gray-600 dark:text-slate-400 border-gray-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                            }`}
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            Approve Dispute
                          </button>
                          <button
                            type="button"
                            onClick={() => setDecisionStatus('Rejected')}
                            className={`py-1.5 rounded-sm font-bold text-[11px] cursor-pointer border flex items-center justify-center gap-1 transition-colors ${
                              decisionStatus === 'Rejected'
                                ? 'bg-rose-500 text-white border-rose-600 shadow-xs'
                                : 'bg-slate-50 dark:bg-slate-800 text-gray-600 dark:text-slate-400 border-gray-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                            }`}
                          >
                            <XCircle className="w-3.5 h-3.5" />
                            Reject Dispute
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Updated QA Grade options */}
                    {decisionStatus === 'Approved' && (
                      <div className="space-y-1">
                        <label className="block text-gray-500 dark:text-slate-400 font-mono text-[10px]">UPDATED QUALITY CLASSIFICATION</label>
                        <select
                          value={updatedReview}
                          onChange={(e) => setUpdatedReview(e.target.value as ReviewStatus)}
                          className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-sm px-2 py-1.5 text-xs focus:outline-none focus:bg-white dark:focus:bg-slate-900 font-semibold font-mono text-emerald-800 dark:text-emerald-400"
                        >
                          {REVIEW_OPTIONS.map(opt => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {/* New corrective action/dispute remarks */}
                    <div className="space-y-1">
                      <label className="block text-gray-500 dark:text-slate-400 font-mono text-[10px]">
                        UPDATED REVIEW COMMENTS / REMARKS
                      </label>
                      <textarea
                        required
                        value={updatedComments}
                        onChange={(e) => setUpdatedComments(e.target.value)}
                        placeholder="Explain the re-evaluation decision and any updated coaching instructions..."
                        rows={3}
                        className="w-full bg-slate-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-600 rounded-sm px-2.5 py-1.5 text-xs focus:outline-none focus:bg-white dark:focus:bg-slate-900 font-sans placeholder-gray-400 dark:placeholder-slate-500 dark:text-slate-100"
                      />
                    </div>

                    {/* Action trigger */}
                    <div className="flex justify-end pt-1">
                      <button
                        type="submit"
                        className="bg-purple-600 dark:bg-purple-500 hover:bg-purple-700 dark:hover:bg-purple-600 text-white text-xs font-bold px-4 py-2 rounded-sm shadow-sm cursor-pointer border border-purple-700 dark:border-purple-600 transition-all flex items-center gap-1"
                      >
                        <FileText className="w-3.5 h-3.5" />
                        Commit Dispute Decision
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="border-t border-gray-200 pt-4">
                    <div className="bg-slate-100/80 dark:bg-slate-800/80 p-3 rounded border border-gray-200 dark:border-slate-700 flex items-center gap-2 text-xs text-gray-600 dark:text-slate-400">
                      <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        This re-evaluation dispute has been resolved and signed-off by the manager.
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 text-center text-gray-400 dark:text-slate-500 text-xs h-full space-y-2">
              <History className="w-10 h-10 text-slate-300 dark:text-slate-600 animate-pulse" />
              <p className="font-sans font-medium text-gray-500 dark:text-slate-400">No Dispute Record Selected</p>
              <p className="max-w-[280px]">
                Choose an active or completed re-evaluation dispute from the list on the left to review its history, agent explanation, and issue a resolution decision.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}