import { useState } from "react";
import { X } from "lucide-react";
import type { EmployeeRequest, EmployeeResponse } from "../types/employee";
import type { DepartmentResponse } from "../types/department";
import type { JobPositionResponse } from "../types/jobpositions";

interface EmployeeModalProps {
    mode: "create" | "edit";
    employee?: EmployeeResponse;
    departments: DepartmentResponse[];
    jobPositions: JobPositionResponse[];
    onClose: () => void;
    onSubmit: (employee: EmployeeRequest) => void;
    isPending: boolean;
}

const EmployeeModal = ({
    mode,
    employee,
    departments,
    jobPositions,
    onClose,
    onSubmit,
    isPending
}: EmployeeModalProps) => {

    /* -------------------- Form State -------------------- */

    const [formData, setFormData] = useState<EmployeeRequest>({
        firstName: employee?.firstName ?? "",
        lastName: employee?.lastName ?? "",
        email: employee?.email ?? "",
        phoneNumber: employee?.phoneNumber ?? null,
        dateOfBirth: employee?.dateOfBirth?.slice(0, 10) ?? "",
        hireDate: employee?.hireDate?.slice(0, 10) ?? "",
        status: employee?.status ?? 0,
        salary: employee?.salary ?? 0,
        departmentId: employee?.departmentId ?? 0,
        jobPositionId: employee?.jobPositionId ?? 0
    });

    /* -------------------- Handlers -------------------- */

    function updateField<K extends keyof EmployeeRequest>(field: K, value: EmployeeRequest[K]) {
        setFormData(prev => ({...prev, [field]: value}));
    }

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (isPending) return;
        onSubmit(formData);
    }

    /* -------------------- Styles -------------------- */

    const inputStyle = "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10";
    const labelStyle = "mb-1.5 block text-sm font-medium text-slate-700";

    /* -------------------- JSX -------------------- */

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={e => {
                if (e.target === e.currentTarget && !isPending) onClose();
            }}
        >
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="employee-modal-title"
                className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
                {/* -------------------- Header -------------------- */}

                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                    <div>
                        <h2 id="employee-modal-title" className="text-xl font-semibold text-slate-900">
                            {mode === "create" ? "Add Employee" : "Edit Employee"}
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            {mode === "create"
                                ? "Fill in the details to add a new employee."
                                : "Update the employee information below."}
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isPending}
                        aria-label="Close modal"
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* -------------------- Form -------------------- */}

                <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">

                    <div className="grid grid-cols-1 gap-5 overflow-y-auto p-6 sm:grid-cols-2">

                        {/* First Name */}
                        <div>
                            <label htmlFor="employee-first-name" className={labelStyle}>First Name</label>
                            <input
                                id="employee-first-name"
                                type="text"
                                required
                                maxLength={35}
                                value={formData.firstName}
                                onChange={e => updateField("firstName", e.target.value)}
                                placeholder="John"
                                className={inputStyle}
                            />
                        </div>

                        {/* Last Name */}
                        <div>
                            <label htmlFor="employee-last-name" className={labelStyle}>Last Name</label>
                            <input
                                id="employee-last-name"
                                type="text"
                                required
                                maxLength={35}
                                value={formData.lastName}
                                onChange={e => updateField("lastName", e.target.value)}
                                placeholder="Doe"
                                className={inputStyle}
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="employee-email" className={labelStyle}>Email Address</label>
                            <input
                                id="employee-email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={e => updateField("email", e.target.value)}
                                placeholder="john@example.com"
                                className={inputStyle}
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="employee-phone" className={labelStyle}>Phone Number</label>
                            <input
                                id="employee-phone"
                                type="tel"
                                value={formData.phoneNumber ?? ""}
                                onChange={e => updateField("phoneNumber", e.target.value || null)}
                                placeholder="+32 123 45 67 89"
                                className={inputStyle}
                            />
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label htmlFor="employee-dob" className={labelStyle}>Date of Birth</label>
                            <input
                                id="employee-dob"
                                type="date"
                                required
                                value={formData.dateOfBirth}
                                onChange={e => updateField("dateOfBirth", e.target.value)}
                                className={inputStyle}
                            />
                        </div>

                        {/* Hire Date */}
                        <div>
                            <label htmlFor="employee-hire-date" className={labelStyle}>Hire Date</label>
                            <input
                                id="employee-hire-date"
                                type="date"
                                required
                                value={formData.hireDate}
                                onChange={e => updateField("hireDate", e.target.value)}
                                className={inputStyle}
                            />
                        </div>

                        {/* Department */}
                        <div>
                            <label htmlFor="employee-department" className={labelStyle}>Department</label>
                            <select
                                id="employee-department"
                                required
                                value={formData.departmentId}
                                onChange={e => updateField("departmentId", Number(e.target.value))}
                                className={inputStyle}
                            >
                                <option value={0} disabled>Select department</option>
                                {departments.map(dept => (
                                    <option key={dept.id} value={dept.id}>
                                        {dept.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Job Position */}
                        <div>
                            <label htmlFor="employee-position" className={labelStyle}>Job Position</label>
                            <select
                                id="employee-position"
                                required
                                value={formData.jobPositionId}
                                onChange={e => updateField("jobPositionId", Number(e.target.value))}
                                className={inputStyle}
                            >
                                <option value={0} disabled>Select position</option>
                                {jobPositions.map(position => (
                                    <option key={position.id} value={position.id}>
                                        {position.title}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Salary */}
                        <div>
                            <label htmlFor="employee-salary" className={labelStyle}>Salary (€)</label>
                            <input
                                id="employee-salary"
                                type="number"
                                min={0}
                                step="0.01"
                                required
                                value={formData.salary}
                                onChange={e => updateField("salary", Number(e.target.value))}
                                className={inputStyle}
                            />
                        </div>

                        {/* Status */}
                        <div>
                            <label htmlFor="employee-status" className={labelStyle}>Employment Status</label>
                            <select
                                id="employee-status"
                                value={formData.status}
                                onChange={e => updateField("status", Number(e.target.value))}
                                className={inputStyle}
                            >
                                <option value={0}>Active</option>
                                <option value={1}>On Leave</option>
                                <option value={2}>Offboarded</option>
                            </select>
                        </div>
                    </div>

                    {/* -------------------- Footer -------------------- */}

                    <div className="flex justify-end gap-3 border-t border-slate-200 bg-slate-50 px-6 py-4">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isPending}
                            className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isPending || !formData.departmentId || !formData.jobPositionId}
                            className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isPending ? "Saving..." : mode === "create" ? "Create Employee" : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EmployeeModal;