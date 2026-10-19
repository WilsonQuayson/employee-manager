
import type { EmployeeResponse } from "../types/employee";

interface EmployeeTableProps {
    employees: EmployeeResponse[];
}

const statusStyles: Record<number, string> = {
    0: "bg-emerald-50 text-emerald-600 ring-emerald-200",
    1: "bg-amber-50 text-amber-600 ring-amber-200",
    2: "bg-red-50 text-red-600 ring-red-200",
};

const statusLabels: Record<number, string> = {
    0: "Active",
    1: "On leave",
    2: "Offboarded",
};

export default function EmployeeTable({ employees }: EmployeeTableProps) {
    return (
        <div className="w-full overflow-x-auto">
            <table className="w-full min-w-225 text-left text-sm">
                <thead className="border-y border-slate-200 bg-slate-50/50 text-slate-500">
                    <tr>
                        <th className="px-5 py-4 font-medium">Employee</th>
                        <th className="px-5 py-4 font-medium">Position</th>
                        <th className="px-5 py-4 font-medium">Department</th>
                        <th className="px-5 py-4 font-medium">Email</th>
                        <th className="px-5 py-4 font-medium">Status</th>
                        <th className="px-5 py-4 font-medium">Hired</th>
                        <th className="px-5 py-4 text-right font-medium">Actions</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                    {employees.map((employee) => (
                        <tr key={employee.id} className="transition-colors hover:bg-slate-50">
                            <td className="px-5 py-3">
                                <div className="flex items-center gap-3">
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-800">
                                        {employee.firstName.charAt(0)}
                                        {employee.lastName.charAt(0)}
                                    </div>
                                    <span className="whitespace-nowrap font-medium text-slate-900">
                                        {employee.firstName} {employee.lastName}
                                    </span>
                                </div>
                            </td>
                            <td className="px-5 py-3 text-slate-500">{employee.jobPositionTitle}</td>
                            <td className="px-5 py-3 text-slate-500">{employee.departmentName}</td>
                            <td className="px-5 py-3 text-slate-500">{employee.email}</td>
                            <td className="px-5 py-3">
                                <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ring-1 ring-inset ${statusStyles[employee.status] ?? "bg-slate-50 text-slate-600 ring-slate-200"}`}>
                                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                                    {statusLabels[employee.status] ?? "Unknown"}
                                </span>
                            </td>
                            <td className="px-5 py-3 text-slate-500">
                                {employee.hireDate.slice(0, 10)}
                            </td>
                            <td className="px-5 py-3 text-right">
                                <button type="button" className="rounded-lg px-2 py-1 text-lg text-slate-700 hover:bg-slate-100" aria-label={`Actions for ${employee.firstName} ${employee.lastName}`}>
                                    ⋯
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {employees.length === 0 && (
                <p className="py-12 text-center text-sm text-slate-500">No employees found.</p>
            )}
        </div>
    );
}
