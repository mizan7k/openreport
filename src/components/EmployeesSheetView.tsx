import React, { useState, useMemo } from 'react';
import { ExcelTable } from './ExcelTable';
import { ColumnDef } from '@tanstack/react-table';
import { Employee } from '../types';
import { Users, Plus, Pencil, Trash2 } from 'lucide-react';

interface EmployeesSheetViewProps {
  employees: Employee[];
  onEmployeesChange: (employees: Employee[]) => void;
  shifts: { id: string; name: string; startTime: string; endTime: string }[];
}

function makeUid(): string {
  return `e${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function EmployeesSheetView({ employees, onEmployeesChange, shifts }: EmployeesSheetViewProps) {
  // Add/Edit modal state
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
  const [formData, setFormData] = useState<Employee>({
    uid: '', name: '', department: '', designation: '', shift: '',
    email: '', phone: '', status: 'Active', joiningDate: ''
  });

  // Delete confirmation state
  const [deleteConfirmUid, setDeleteConfirmUid] = useState<string | null>(null);

  // Filter state
  const [shiftFilter, setShiftFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  // Unique values for filter dropdowns
  const departments = useMemo(() => [...new Set(employees.map(e => e.department).filter(Boolean))], [employees]);
  const statuses = useMemo(() => [...new Set(employees.map(e => e.status))], [employees]);

  // Pre-filtered data
  const filteredData = useMemo(() => {
    return employees.filter(e => {
      if (shiftFilter && e.shift !== shiftFilter) return false;
      if (departmentFilter && e.department !== departmentFilter) return false;
      if (statusFilter && e.status !== statusFilter) return false;
      return true;
    });
  }, [employees, shiftFilter, departmentFilter, statusFilter]);

  // Open add modal
  const openAddModal = () => {
    setEditingEmployee(null);
    setFormData({
      uid: '',
      name: '',
      department: '',
      designation: '',
      shift: shifts.length > 0 ? `${shifts[0].name} (${shifts[0].startTime} - ${shifts[0].endTime})` : '',
      email: '',
      phone: '',
      status: 'Active',
      joiningDate: new Date().toISOString().split('T')[0]
    });
    setShowModal(true);
  };

  // Open edit modal
  const openEditModal = (emp: Employee) => {
    setEditingEmployee(emp);
    setFormData({ ...emp });
    setShowModal(true);
  };

  // Save employee (add or update)
  const saveEmployee = () => {
    if (!formData.name.trim() || !formData.department.trim() || !formData.designation.trim() || !formData.shift || !formData.joiningDate) return;
    if (editingEmployee) {
      onEmployeesChange(employees.map(e => e.uid === editingEmployee.uid
        ? { ...formData, name: formData.name.trim(), department: formData.department.trim(), designation: formData.designation.trim() }
        : e
      ));
    } else {
      onEmployeesChange([...employees, {
        ...formData,
        uid: makeUid(),
        name: formData.name.trim(),
        department: formData.department.trim(),
        designation: formData.designation.trim()
      }]);
    }
    setShowModal(false);
  };

  // Delete employee
  const deleteEmployee = () => {
    if (deleteConfirmUid) {
      onEmployeesChange(employees.filter(e => e.uid !== deleteConfirmUid));
      setDeleteConfirmUid(null);
    }
  };

  // Update form field
  const updateField = (field: keyof Employee, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const employeeColumns: ColumnDef<Employee>[] = useMemo(() => [
    {
      accessorKey: 'name',
      header: 'Employee Name',
      size: 180,
      cell: info => <span className="font-sans font-semibold text-gray-800 dark:text-slate-100">{info.getValue() as string}</span>
    },
    {
      accessorKey: 'department',
      header: 'Department',
      size: 150,
    },
    {
      accessorKey: 'designation',
      header: 'Designated Role',
      size: 160,
      cell: info => <span className="font-sans text-gray-600 dark:text-slate-400">{info.getValue() as string}</span>
    },
    {
      accessorKey: 'shift',
      header: 'Shift',
      size: 170,
      cell: info => (
        <span className="bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-mono text-[10px] font-bold">
          {info.getValue() as string}
        </span>
      )
    },
    {
      accessorKey: 'email',
      header: 'Corporate Email',
      size: 190,
    },
    {
      accessorKey: 'phone',
      header: 'Phone',
      size: 130,
    },
    {
      accessorKey: 'joiningDate',
      header: 'Joining Date',
      size: 110,
      cell: info => <span className="font-mono text-gray-500 dark:text-slate-400">{info.getValue() as string}</span>
    },
    {
      accessorKey: 'status',
      header: 'Active Status',
      size: 100,
      cell: info => {
        const val = info.getValue() as string;
        const color = val === 'Active'
          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 dark:border-emerald-800 dark:text-emerald-400'
          : 'bg-gray-50 text-gray-400 border border-gray-200 dark:border-slate-700 dark:text-gray-500';
        return <span className={`px-2 py-0.5 rounded font-bold text-[9px] ${color}`}>{val}</span>;
      }
    },
    {
      id: 'actions',
      header: '',
      size: 80,
      cell: info => {
        const emp = info.row.original;
        return (
          <div className="flex items-center gap-1">
            <button
              onClick={() => openEditModal(emp)}
              className="p-1 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 rounded hover:bg-blue-50 dark:hover:bg-blue-950/30 cursor-pointer"
              title="Edit Employee"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setDeleteConfirmUid(emp.uid)}
              className="p-1 text-rose-500 hover:text-rose-700 dark:text-rose-400 dark:hover:text-rose-300 rounded hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer"
              title="Delete Employee"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
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
          <p className="text-xs text-gray-500 dark:text-slate-400 font-mono">Administrative master ledger containing employee records, roles, shifts, and status tracking.</p>
        </div>
        <button
          onClick={openAddModal}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Employee</span>
        </button>
      </div>

      {/* Main Employee Excel Grid */}
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-700 rounded-sm shadow-2xs flex flex-col">
        <div className="px-3 py-2 border-b border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 flex items-center justify-between">
          <h3 className="font-semibold text-gray-700 dark:text-slate-200 font-sans flex items-center gap-1.5 text-xs">
            <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Support Representatives Ledger</span>
          </h3>
          <span className="text-[10px] text-gray-400 dark:text-slate-500 font-mono">Total Employee Records: {employees.length}</span>
        </div>

        {/* Filter Bar */}
        <div className="px-3 py-2 border-b border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-900 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5">
            <label className="text-[10px] font-mono font-semibold text-gray-500 dark:text-slate-400 uppercase">Shift</label>
            <select
              value={shiftFilter}
              onChange={e => setShiftFilter(e.target.value)}
              className="text-[11px] font-mono border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 px-2 py-1 text-gray-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="">All</option>
              {shifts.map(s => {
                const label = `${s.name} (${s.startTime} - ${s.endTime})`;
                return <option key={s.id} value={label}>{label}</option>;
              })}
            </select>
          </div>
          <div className="flex items-center gap-1.5">
            <label className="text-[10px] font-mono font-semibold text-gray-500 dark:text-slate-400 uppercase">Department</label>
            <select
              value={departmentFilter}
              onChange={e => setDepartmentFilter(e.target.value)}
              className="text-[11px] font-mono border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 px-2 py-1 text-gray-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="">All</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-1.5">
            <label className="text-[10px] font-mono font-semibold text-gray-500 dark:text-slate-400 uppercase">Status</label>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="text-[11px] font-mono border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-800 px-2 py-1 text-gray-700 dark:text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="">All</option>
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {(shiftFilter || departmentFilter || statusFilter) && (
            <button
              onClick={() => { setShiftFilter(''); setDepartmentFilter(''); setStatusFilter(''); }}
              className="text-[11px] font-mono text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 underline cursor-pointer"
            >
              Clear Filters
            </button>
          )}
        </div>

        <div className="flex-1">
          <ExcelTable id="employees-ledger" data={filteredData} columns={employeeColumns} globalFilterPlaceholder="Search by name, department, or role..." />
        </div>
      </div>

      {/* Add/Edit Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-slate-900 rounded-sm shadow-xl border border-gray-200 dark:border-slate-700 w-full max-w-lg mx-4 max-h-[90vh] overflow-y-auto">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-slate-100">
                {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 dark:hover:text-slate-300 cursor-pointer">
                <span className="text-lg leading-none">&times;</span>
              </button>
            </div>

            <div className="p-4 space-y-3">
              {/* Row 1: Name (full width) */}
              <div>
                <label className="block text-[10px] font-mono font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Employee Name *</label>
                <input type="text" value={formData.name} onChange={e => updateField('name', e.target.value)} className="w-full border border-gray-300 dark:border-slate-600 rounded px-2 py-1.5 text-xs font-mono bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 focus:outline-none focus:border-blue-500" placeholder="John Doe" />
              </div>

              {/* Row 2: Department + Designation */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Department *</label>
                  <input type="text" value={formData.department} onChange={e => updateField('department', e.target.value)} className="w-full border border-gray-300 dark:border-slate-600 rounded px-2 py-1.5 text-xs font-mono bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 focus:outline-none focus:border-blue-500" placeholder="e.g. Technical Support" />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Designation *</label>
                  <input type="text" value={formData.designation} onChange={e => updateField('designation', e.target.value)} className="w-full border border-gray-300 dark:border-slate-600 rounded px-2 py-1.5 text-xs font-mono bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 focus:outline-none focus:border-blue-500" placeholder="e.g. Support Specialist" />
                </div>
              </div>

              {/* Row 3: Shift (dropdown from settings) + Joining Date */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Shift *</label>
                  <select value={formData.shift} onChange={e => updateField('shift', e.target.value)} className="w-full border border-gray-300 dark:border-slate-600 rounded px-2 py-1.5 text-xs font-mono bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 focus:outline-none focus:border-blue-500">
                    <option value="">Select shift...</option>
                    {shifts.map(s => {
                      const label = `${s.name} (${s.startTime} - ${s.endTime})`;
                      return <option key={s.id} value={label}>{label}</option>;
                    })}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Joining Date *</label>
                  <input type="date" value={formData.joiningDate} onChange={e => updateField('joiningDate', e.target.value)} className="w-full border border-gray-300 dark:border-slate-600 rounded px-2 py-1.5 text-xs font-mono bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 focus:outline-none focus:border-blue-500" />
                </div>
              </div>

              {/* Row 4: Email + Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[10px] font-mono font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Email</label>
                  <input type="email" value={formData.email} onChange={e => updateField('email', e.target.value)} className="w-full border border-gray-300 dark:border-slate-600 rounded px-2 py-1.5 text-xs font-mono bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 focus:outline-none focus:border-blue-500" placeholder="email@domain.com" />
                </div>
                <div>
                  <label className="block text-[10px] font-mono font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Phone</label>
                  <input type="text" value={formData.phone} onChange={e => updateField('phone', e.target.value)} className="w-full border border-gray-300 dark:border-slate-600 rounded px-2 py-1.5 text-xs font-mono bg-white dark:bg-slate-800 text-gray-800 dark:text-slate-100 focus:outline-none focus:border-blue-500" placeholder="+1-555-XXXX" />
                </div>
              </div>

              {/* Row 5: Status */}
              <div>
                <label className="block text-[10px] font-mono font-bold text-gray-500 dark:text-slate-400 uppercase mb-1">Status</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="emp-status" checked={formData.status === 'Active'} onChange={() => updateField('status', 'Active')} className="accent-blue-600" />
                    <span className="text-xs font-mono text-gray-700 dark:text-slate-300">Active</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input type="radio" name="emp-status" checked={formData.status === 'Inactive'} onChange={() => updateField('status', 'Inactive')} className="accent-blue-600" />
                    <span className="text-xs font-mono text-gray-700 dark:text-slate-300">Inactive</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="px-4 py-3 border-t border-gray-200 dark:border-slate-700 flex justify-end gap-2">
              <button onClick={() => setShowModal(false)} className="px-3 py-1.5 text-xs font-mono font-semibold text-gray-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer">
                Cancel
              </button>
              <button onClick={saveEmployee} className="px-3 py-1.5 text-xs font-mono font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 cursor-pointer">
                {editingEmployee ? 'Update Employee' : 'Add Employee'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmUid && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white dark:bg-slate-900 rounded-sm shadow-xl border border-gray-200 dark:border-slate-700 w-full max-w-sm mx-4">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-700">
              <h3 className="text-sm font-semibold text-gray-800 dark:text-slate-100">Confirm Deletion</h3>
            </div>
            <div className="px-4 py-4">
              <p className="text-xs font-mono text-gray-600 dark:text-slate-400">
                Are you sure you want to delete this employee?
              </p>
            </div>
            <div className="px-4 py-3 border-t border-gray-200 dark:border-slate-700 flex justify-end gap-2">
              <button onClick={() => setDeleteConfirmUid(null)} className="px-3 py-1.5 text-xs font-mono font-semibold text-gray-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer">
                Cancel
              </button>
              <button onClick={deleteEmployee} className="px-3 py-1.5 text-xs font-mono font-semibold text-white bg-rose-600 rounded hover:bg-rose-700 cursor-pointer">
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
