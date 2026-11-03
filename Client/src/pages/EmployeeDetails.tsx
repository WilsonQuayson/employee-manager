import { useParams } from "react-router-dom";
import { Pen } from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import { useState } from "react";
import { getDepartments } from "../api/departmentApi";
import { getJobPositions } from "../api/jobPositionApi";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { EmployeeRequest } from "../types/employee";
import { toast } from "sonner";
import EmployeeModal from "../components/EmployeeModal";
import { getEmployeeById, updateEmployee } from "../api/employeeApi";

const EmployeeDetails = () => {

    /* -------------------- Hooks & State -------------------- */

    const { id } = useParams<{ id: string }>();

    const employeeId = Number(id);
    const isValidId = Number.isInteger(employeeId) && employeeId > 0;

    const [isModalOpen, setIsModalOpen] = useState(false);

    /* -------------------- GET Employee -------------------- */

    const {
        data: employee,
        isPending,
        isError
    } = useQuery({
        queryKey: ["employees", employeeId],
        queryFn: () => getEmployeeById(employeeId),
        enabled: isValidId,
        retry: false
    });

    /* -------------------- GET Departments -------------------- */

    const {
        data: departments = [],
        isPending: isDepartmentsPending
    } = useQuery({
        queryKey: ["departments"],
        queryFn: getDepartments,
        enabled: isModalOpen
    });

    /* -------------------- GET Job Positions -------------------- */

    const {
        data: jobPositions = [],
        isPending: isJobPositionsPending
    } = useQuery({
        queryKey: ["jobPositions"],
        queryFn: getJobPositions,
        enabled: isModalOpen
    });

    /* -------------------- PUT Employee -------------------- */

    const queryClient = useQueryClient();

    const {
        mutate: editEmployee,
        isPending: isUpdating
    } = useMutation({
        mutationFn: ({ id, employee }: { id: number; employee: EmployeeRequest }) =>
            updateEmployee(id, employee),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["employees"] });
            setIsModalOpen(false);
            toast.success("Employee updated successfully!");
        },
        onError: () => {
            toast.error("Failed to update employee.");
        }
    });

    /* -------------------- Handlers -------------------- */

    function handleUpdateEmployee(updatedEmployee: EmployeeRequest) {
        if (!employee) return;

        editEmployee({
            id: employee.id,
            employee: updatedEmployee
        });
    }

    /* -------------------- Loading & Error States -------------------- */

    if (!isValidId) {
        return <p className="p-6 text-red-600">Invalid employee ID.</p>;
    }

    if (isPending) {
        return <p className="p-6 text-slate-500">Loading employee...</p>;
    }

    if (isError || !employee) {
        return <p className="p-6 text-red-600">Employee not found or failed to load.</p>;
    }

    /* -------------------- JSX -------------------- */

    return (
        <section className="p-4 sm:p-6 lg:p-8">
            <section className="flex justify-between">
                <div>
                    <Breadcrumb
                        page={`${employee.firstName} ${employee.lastName}`}
                        parent={{ label: "Employees", path: "/employees" }}
                    />
                    <h1 className="font-medium text-4xl">{`${employee.firstName} ${employee.lastName}`}</h1>
                    <p className="pt-2 text-ring">
                        {employee.jobPositionTitle} · {employee.departmentName}
                    </p>
                </div>
                <div className="mt-auto">
                    <button className="bg-emerald-600 px-4 py-2 rounded-2xl text-white flex gap-2 hover:cursor-pointer items-center" onClick={() => setIsModalOpen(true)}>
                        <Pen size={16} />
                        Edit Profile
                    </button>
                </div>
            </section>

            {/* Personal Information */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-lg font-semibold text-slate-900">Personal Information</h2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <p className="text-sm text-slate-500">First Name</p>
                        <p className="mt-1 font-medium text-slate-900">{employee.firstName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Last Name</p>
                        <p className="mt-1 font-medium text-slate-900">{employee.lastName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Email</p>
                        <p className="mt-1 font-medium text-slate-900">{employee.email}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Phone Number</p>
                        <p className="mt-1 font-medium text-slate-900">{employee.phoneNumber || "Not provided"}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Date of Birth</p>
                        <p className="mt-1 font-medium text-slate-900">{employee.dateOfBirth.slice(0, 10)}</p>
                    </div>
                </div>
            </div>

            {/* Employment Information */}
            <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-lg font-semibold text-slate-900">Employment Information</h2>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <p className="text-sm text-slate-500">Department</p>
                        <p className="mt-1 font-medium text-slate-900">{employee.departmentName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Job Position</p>
                        <p className="mt-1 font-medium text-slate-900">{employee.jobPositionTitle}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Hire Date</p>
                        <p className="mt-1 font-medium text-slate-900">{employee.hireDate.slice(0, 10)}</p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Annual Salary</p>
                        <p className="mt-1 font-medium text-slate-900">
                            {employee.salary.toLocaleString("en-BE", { style: "currency", currency: "EUR" })}
                        </p>
                    </div>
                    <div>
                        <p className="text-sm text-slate-500">Status</p>
                        <p className="mt-1 font-medium text-slate-900">
                            {["Active", "On Leave", "Offboarded"][employee.status] ?? "Unknown"}
                        </p>
                    </div>
                </div>
            </div>
            {/* Edit Employee Modal */}
            {isModalOpen && !isDepartmentsPending && !isJobPositionsPending && (
                <EmployeeModal
                    key={employee.id}
                    mode="edit"
                    employee={employee}
                    departments={departments}
                    jobPositions={jobPositions}
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleUpdateEmployee}
                    isPending={isUpdating}
                />
            )}
        </section>
    );
}

export default EmployeeDetails;
