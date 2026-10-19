import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import EmployeeTable from "../components/EmployeeTable";
import { getEmployees } from "../api/employeeApi";
import type { EmployeeResponse } from "../types/employee";
import Breadcrumb from "../components/Breadcrumb";

const PAGE_SIZE = 7;

export default function Employees() {
    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("all");
    const [status, setStatus] = useState("all");
    const [page, setPage] = useState(1);

    const {
        data: employees = [],
        isPending, isError
    } = useQuery<EmployeeResponse[]>({queryKey: ["employees"],queryFn: getEmployees,});

    const departmentCount = new Set(employees.map(employee => employee.departmentId)).size;

    const departments = useMemo(() => {
        return [...new Set(employees.map(employee => employee.departmentName))].sort();
    }, [employees]);

    const filteredEmployees = useMemo(() => {
        return employees.filter(employee => {
            const query = search.toLowerCase().trim();
            const matchesSearch = `${employee.firstName} ${employee.lastName} ${employee.email} ${employee.jobPositionTitle}`
                .toLowerCase().includes(query);
            const matchesDepartment = department === "all" || employee.departmentName === department;
            const matchesStatus = status === "all" || employee.status === Number(status);

            return matchesSearch && matchesDepartment && matchesStatus;
        });
    }, [employees, search, department, status]);

    const totalPages = Math.max(1, Math.ceil(filteredEmployees.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const visibleEmployees = filteredEmployees.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    function resetFilters() {
        setSearch("");
        setDepartment("all");
        setStatus("all");
        setPage(1);
    }

    if (isPending) return <p className="p-6 text-slate-500">Loading employees...</p>;
    if (isError) return <p className="p-6 text-red-600">Failed to load employees.</p>;

    return (
        <section className="p-4 sm:p-6 lg:p-8 h-full overflow-y-hidden">
            <section>
                <Breadcrumb page="Employees" />
                <h1 className="font-medium text-4xl">Employees</h1>
                <p className="pt-2 text-ring">
                    {employees.length} people across {departmentCount} departments
                </p>
            </section>
            <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="p-5">
                    <h2 className="font-semibold text-slate-900">Employees</h2>
                    <p className="mt-1 text-sm text-slate-500">
                        {filteredEmployees.length} people match your filters
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                        <input
                            type="search"
                            value={search}
                            onChange={e => { setSearch(e.target.value); setPage(1); }}
                            placeholder="Search by name, email or role..."
                            className="min-w-60 flex-1 rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-700 shadow-sm outline-none focus:border-indigo-400"
                        />

                        <div className="relative">
                            <select
                                value={department}
                                onChange={e => { setDepartment(e.target.value); setPage(1); }}
                                className="appearance-none rounded-xl border border-slate-200 bg-white pl-4 pr-10 py-2.5 text-sm text-slate-700 shadow-sm"
                            >
                                <option value="all">All departments</option>
                                {departments.map(name => (
                                    <option key={name} value={name}>{name}</option>
                                ))}
                            </select>
                            <ChevronDown
                                size={16}
                                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500"
                            />
                        </div>

                        <div className="relative">
                            <select
                                value={status}
                                onChange={e => { setStatus(e.target.value); setPage(1); }}
                                className="appearance-none rounded-xl border border-slate-200 bg-white pl-4 pr-10 py-2.5 text-sm text-slate-700 shadow-sm"
                            >
                                <option value="all">Any status</option>
                                <option value="0">Active</option>
                                <option value="1">On leave</option>
                                <option value="2">Offboarded</option>
                            </select>
                            <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        </div>

                        <button
                            type="button"
                            onClick={resetFilters}
                            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium shadow-sm hover:bg-slate-50"
                        >
                            Reset
                        </button>
                    </div>
                </div>

                <EmployeeTable employees={visibleEmployees} />

                <div className="flex items-center justify-between border-t border-slate-200 px-5 py-4 text-sm">
                    <p className="text-slate-500">
                        Page {currentPage} of {totalPages} · {filteredEmployees.length} employees
                    </p>
                    <div className="flex gap-2">
                        <button
                            type="button"
                            disabled={currentPage === 1}
                            onClick={() => setPage(currentPage - 1)}
                            className="rounded-xl border border-slate-200 px-4 py-2 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Previous
                        </button>
                        <button
                            type="button"
                            disabled={currentPage === totalPages}
                            onClick={() => setPage(currentPage + 1)}
                            className="rounded-xl border border-slate-200 px-4 py-2 shadow-sm hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </section>
        </section>
    );
}
