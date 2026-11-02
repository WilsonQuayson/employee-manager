
import { AlertTriangle, X } from "lucide-react";
import type { EmployeeResponse } from "../types/employee";

interface DeleteEmployeeDialogProps {
    employee: EmployeeResponse;
    onClose: () => void;
    onConfirm: () => void;
    isPending: boolean;
}

export default function DeleteEmployeeDialog({ employee, onClose, onConfirm, isPending }: DeleteEmployeeDialogProps) {

    /* -------------------- JSX -------------------- */

    return (
        <div className="fixed inset-0 z-110 flex items-center justify-center bg-black/50 p-4"
            onClick={e => {
                if (e.target === e.currentTarget && !isPending) onClose();
            }}
        >
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="delete-employee-title"
                aria-describedby="delete-employee-description"
                className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                        <AlertTriangle size={22} />
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isPending}
                        aria-label="Close dialog"
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-50"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Confirmation Message */}
                <h2 id="delete-employee-title" className="mt-4 text-xl font-semibold text-slate-900">
                    Delete employee?
                </h2>
                <p id="delete-employee-description" className="mt-2 text-sm leading-6 text-slate-500">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold text-slate-900">
                        {employee.firstName} {employee.lastName}
                    </span>
                    ? This action cannot be undone.
                </p>

                {/* Footer */}
                <div className="mt-6 flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isPending}
                        className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={onConfirm}
                        disabled={isPending}
                        className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isPending ? "Deleting..." : "Delete employee"}
                    </button>
                </div>
            </div>
        </div>
    );
}
