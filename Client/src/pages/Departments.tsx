import { Plus } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import DepartmentCard from "../components/DepartmentCard";
import { getEmployees } from "../api/employeeApi";
import DepartmentModal from "../components/DepartmentModal";
import type { DepartmentRequest } from "../types/department";
import { toast } from "sonner";
import { useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getDepartments, createDepartment } from "../api/departmentApi";
import { deleteDepartment } from "../api/departmentApi";
import DeleteDepartmentDialog from "../components/DeleteDepartmentDialog";
import type { DepartmentResponse } from "../types/department";

const Departments = () => {

    /* -------------------- Hooks & State -------------------- */

    const queryClient = useQueryClient();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [departmentToDelete, setDepartmentToDelete] = useState<DepartmentResponse | null>(null);


    /* -------------------- GET Departments -------------------- */

    const {
        data: departments = [],
        isPending: isDepartmentsPending,
        isError: isDepartmentsError
    } = useQuery({
        queryKey: ["departments"],
        queryFn: getDepartments
    });

    /* -------------------- GET Employees -------------------- */

    const {
        data: employees = [],
        isPending: isEmployeesPending,
        isError: isEmployeesError
    } = useQuery({
        queryKey: ["employees"],
        queryFn: getEmployees
    });

    /* -------------------- POST Department -------------------- */

    const {
        mutate: addDepartment,
        isPending: isCreating
    } = useMutation({
        mutationFn: createDepartment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["departments"] });
            setIsModalOpen(false);
            toast.success("Department created successfully!");
        },
        onError: () => {
            toast.error("Failed to create department.");
        }
    });

    /* -------------------- DELETE Department -------------------- */

    const {
        mutate: removeDepartment,
        isPending: isDeleting
    } = useMutation({
        mutationFn: deleteDepartment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["departments"] });
            setDepartmentToDelete(null);
            toast.success("Department deleted successfully!");
        },
        onError: () => {
            toast.error("Failed to delete department.");
        }
    });

    /* -------------------- Calculations -------------------- */

    const employeeCounts = useMemo(() => {
        const counts = new Map<number, number>();

        employees.forEach(employee => {
            counts.set(employee.departmentId, (counts.get(employee.departmentId) ?? 0) + 1);
        });

        return counts;
    }, [employees]);

    /* -------------------- Handlers -------------------- */

    function handleAddDepartment(department: DepartmentRequest) {
        addDepartment(department);
    }

    function handleDeleteDepartment(department: DepartmentResponse) {
        const employeeCount = employeeCounts.get(department.id) ?? 0;
        if (employeeCount > 0) return;

        setDepartmentToDelete(department);
    }

    function handleConfirmDelete() {
        if (!departmentToDelete) return;
        removeDepartment(departmentToDelete.id);
    }


    /* -------------------- Loading & Error States -------------------- */

    if (isDepartmentsPending || isEmployeesPending) {
        return <p className="p-6 text-slate-500">Loading departments...</p>;
    }

    if (isDepartmentsError || isEmployeesError) {
        return <p className="p-6 text-red-600">Failed to load departments.</p>;
    }

    /* -------------------- JSX -------------------- */

    return (
        <section className="p-4 sm:p-6 lg:p-8">
            {/* Page Header */}
            <section className="flex items-end justify-between">
                <div>
                    <Breadcrumb page="Departments" />
                    <h1 className="text-4xl font-medium">Departments</h1>
                    <p className="pt-2 text-slate-500">
                        {departments.length} departments · {employees.length} employees
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                    className="flex h-10 min-w-45 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 text-sm font-medium text-white hover:bg-emerald-700"
                >
                    <Plus size={16} />
                    New department
                </button>
            </section>

            {/* Departments Grid */}
            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {departments.map(department => (
                    <DepartmentCard
                        key={department.id}
                        department={department}
                        employeeCount={employeeCounts.get(department.id) ?? 0}
                        totalEmployees={employees.length}
                        onDelete={handleDeleteDepartment}
                    />
                ))}
            </div>

            {/* Empty State */}
            {departments.length === 0 && (
                <p className="py-12 text-center text-sm text-slate-500">
                    No departments found.
                </p>
            )}
            {/* Create Department Modal */}
            {isModalOpen && (
                <DepartmentModal
                    mode="create"
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleAddDepartment}
                    isPending={isCreating}
                />
            )}
            {/* Delete Department Dialog */}
            {departmentToDelete && (
                <DeleteDepartmentDialog
                    department={departmentToDelete}
                    onClose={() => setDepartmentToDelete(null)}
                    onConfirm={handleConfirmDelete}
                    isPending={isDeleting}
                />
            )}
        </section>
    );
};

export default Departments;
