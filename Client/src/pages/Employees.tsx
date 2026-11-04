import { ChevronDown, Plus } from "lucide-react";
import { useMemo, useState } from "react";
import EmployeeTable from "../components/EmployeeTable";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getEmployees, createEmployee, updateEmployee, deleteEmployee } from "../api/employeeApi";
import type { EmployeeRequest, EmployeeResponse } from "../types/employee";
import Breadcrumb from "../components/Breadcrumb";
import EmployeeModal from "../components/EmployeeModal";
import { getDepartments } from "../api/departmentApi";
import { getJobPositions } from "../api/jobPositionApi";
import { toast } from "sonner";
import DeleteEmployeeDialog from "../components/DeleteEmployeeDialog";
import { useNavigate } from "react-router-dom";


const PAGE_SIZE = 7;

export default function Employees() {

    /* -------------------- State -------------------- */

    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [department, setDepartment] = useState("all");
    const [status, setStatus] = useState("all");
    const [page, setPage] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState<EmployeeResponse | null>(null);
    const [employeeToDelete, setEmployeeToDelete] = useState<EmployeeResponse | null>(null);


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
        onError: () => {
            toast.error("Failed to create employee.");
        }
    });

    /* -------------------- PUT Employee -------------------- */

    const {
        mutate: editEmployee,
        isPending: isUpdating
    } = useMutation({
        mutationFn: ({ id, employee }: { id: number; employee: EmployeeRequest }) =>
            updateEmployee(id, employee),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] });
            setSelectedEmployee(null);
            toast.success("Employee updated successfully!");
        },
        onError: () => {
            toast.error("Failed to update employee.");
        }
    });

    /* -------------------- DELETE Employee -------------------- */

    const {
        mutate: removeEmployee,
        isPending: isDeleting
    } = useMutation({
        mutationFn: deleteEmployee,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] });
            setEmployeeToDelete(null);
            toast.success("Employee deleted successfully!");
        },
        onError: () => {
            toast.error("Failed to delete employee.");
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

    function handleEdit(employee: EmployeeResponse) {
        setSelectedEmployee(employee);
    }

    function handleUpdateEmployee(employee: EmployeeRequest) {
        if (!selectedEmployee) return;

        editEmployee({
            id: selectedEmployee.id,
            employee
        });
    }

    function handleDelete(employee: EmployeeResponse) {
        setEmployeeToDelete(employee);
    }

    function handleConfirmDelete() {
        if (!employeeToDelete) return;
        removeEmployee(employeeToDelete.id);
    }

    /* -------------------- Loading & Error States -------------------- */

    if (isPending || isDepartmentsPending || isJobPositionsPending) {
        return <p className="p-6 text-slate-500">Loading data...</p>;
    }

    if (isError || isDepartmentsError || isJobPositionsError) {
        return <p className="p-6 text-red-600">Failed to load data.</p>;
    }
    
    /* -------------------- Styles -------------------- */

    const inputStyle = "w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/10";
    const selectStyle = `${inputStyle} appearance-none pr-10`;

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
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="flex h-10 min-w-45 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-medium text-white hover:bg-emerald-700"
                    >
                        <Plus size={16} />
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
                            className={`${inputStyle} min-w-60 flex-1 w-auto!`}
                        />

                        <div className="relative">
                            <select
                                value={department}
                                onChange={e => { setDepartment(e.target.value); setPage(1); }}
                                className={`${selectStyle}`}
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
                                className={`${selectStyle}`}
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

                <EmployeeTable
                    employees={visibleEmployees}
                    onView={employee => navigate(`/employees/${employee.id}`)}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />

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
            {selectedEmployee && (
                <EmployeeModal
                    key={selectedEmployee.id}
                    mode="edit"
                    employee={selectedEmployee}
                    departments={departmentsData}
                    jobPositions={jobPositionsData}
                    onClose={() => setSelectedEmployee(null)}
                    onSubmit={handleUpdateEmployee}
                    isPending={isUpdating}
                />
            )}
            {employeeToDelete && (
                <DeleteEmployeeDialog
                    employee={employeeToDelete}
                    onClose={() => setEmployeeToDelete(null)}
                    onConfirm={handleConfirmDelete}
                    isPending={isDeleting}
                />
            )}
        </section>
    );
}
