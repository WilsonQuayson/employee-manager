import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import EmployeeTable from "../components/EmployeeTable";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEmployees, createEmployee } from "../api/employeeApi";
import type { EmployeeRequest, EmployeeResponse } from "../types/employee";
import Breadcrumb from "../components/Breadcrumb";
import EmployeeModal from "../components/EmployeeModal";
import { getDepartments } from "../api/departmentApi";
import { getJobPositions } from "../api/jobPositionApi";
import { toast } from "sonner";


const PAGE_SIZE = 7;

export default function Employees() {

    /* -------------------- State -------------------- */

    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("all");
    const [status, setStatus] = useState("all");
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);


    /* -------------------- GET Employees -------------------- */

    const {
        data: employees = [],
        isPending,
        isError
    } = useQuery<EmployeeResponse[]>({
        queryKey: ["employees"],
        queryFn: getEmployees
    });


    /* -------------------- GET Departments -------------------- */

    const {
        data: departmentsData = [],
        isPending: isDepartmentsPending,
        isError: isDepartmentsError
    } = useQuery({
        queryKey: ["departments"],
        queryFn: getDepartments
    });


    /* -------------------- GET Job Positions -------------------- */

    const {
        data: jobPositionsData = [],
        isPending: isJobPositionsPending,
        isError: isJobPositionsError
    } = useQuery({
        queryKey: ["jobPositions"],
        queryFn: getJobPositions
    });

    /* -------------------- POST Employee -------------------- */

    const queryClient = useQueryClient();

    const {
        mutate: addEmployee,
        isPending: isCreating
    } = useMutation({
        mutationFn: createEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["employees"]});
            setIsModalOpen(false);
            toast.success("Employee created successfully!");
        },
        onError: (error) => {
            toast.error("Failed to create employee.");
        }
    });


    /* -------------------- Filtering & Pagination -------------------- */

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


    /* -------------------- Handlers -------------------- */

    function resetFilters() {
        setSearch("");
        setDepartment("all");
        setStatus("all");
        setPage(1);
    }

    function handleAddEmployee(employee: EmployeeRequest) { // WIP
        addEmployee(employee);
    }


    /* -------------------- Loading & Error States -------------------- */

    if (isPending || isDepartmentsPending || isJobPositionsPending) {
        return <p className="p-6 text-slate-500">Loading data...</p>;
    }

    if (isError || isDepartmentsError || isJobPositionsError) {
        return <p className="p-6 text-red-600">Failed to load data.</p>;
    }


    /* -------------------- JSX -------------------- */

    return (
        <section className="p-4 sm:p-6 lg:p-8 h-full overflow-y-hidden">
            <section className="flex justify-between">
                <div>
                    <Breadcrumb page="Employees" />
                    <h1 className="font-medium text-4xl">Employees</h1>
                    <p className="pt-2 text-ring">
                        {employees.length} people across {departmentCount} departments
                    </p>
                </div>
                <div className="mt-auto">
                    <button className="bg-emerald-600 px-4 py-1 rounded-2xl text-white flex gap-2 hover:cursor-pointer" onClick={() => setIsModalOpen(true)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        Add employee
                    </button>
                </div>
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
            {isModalOpen && (
                <EmployeeModal
                    mode="create"
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddEmployee}
                    isPending={isCreating}
                    departments={departmentsData}
                    jobPositions={jobPositionsData}
                />
            )}
        </section>
    );
}
