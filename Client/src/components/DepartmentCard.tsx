import { Users, Trash2 } from "lucide-react";
import type { DepartmentResponse } from "../types/department";

interface DepartmentCardProps {
    department: DepartmentResponse;
    employeeCount: number;
    totalEmployees: number;
    onDelete: (department: DepartmentResponse) => void;
}

const DepartmentCard = ({ department, employeeCount, totalEmployees, onDelete }: DepartmentCardProps) => {

    /* -------------------- Calculations -------------------- */

    const percentage = totalEmployees > 0
        ? Math.round((employeeCount / totalEmployees) * 100)
        : 0;

    /* -------------------- JSX -------------------- */

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md">
            {/* Department Header */}
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="font-semibold text-slate-900">{department.name}</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        {employeeCount} {employeeCount === 1 ? "employee" : "employees"}
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => onDelete(department)}
                    disabled={employeeCount > 0}
                    title={employeeCount > 0 ? "Cannot delete a department with employees" : "Delete department"}
                    aria-label={`Delete ${department.name}`}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-red-50 text-red-600 hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                    <Trash2 size={17} />
                </button>
            </div>

            {/* Employee Distribution */}
            <div className="mt-6">
                <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-500">Share of employees</span>
                    <span className="font-medium text-slate-900">{percentage}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-emerald-100">
                    <div
                        className="h-full rounded-full bg-emerald-600 transition-all"
                        style={{ width: `${percentage}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default DepartmentCard;
