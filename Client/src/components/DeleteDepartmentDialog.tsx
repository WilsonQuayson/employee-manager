import { AlertTriangle, X } from "lucide-react";
import type { DepartmentResponse } from "../types/department";

interface DeleteDepartmentDialogProps {
    department: DepartmentResponse;
    onClose: () => void;
    onConfirm: () => void;
    isPending: boolean;
}

const DeleteDepartmentDialog = ({ department, onClose, onConfirm, isPending }: DeleteDepartmentDialogProps) => {

    /* -------------------- JSX -------------------- */

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={e => {
                if (e.target === e.currentTarget && !isPending) onClose();
            }}
        >
            <div
                role="alertdialog"
                aria-modal="true"
                aria-labelledby="delete-department-title"
                aria-describedby="delete-department-description"
                className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-start justify-between px-6 pt-6">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
                        <AlertTriangle size={22} />
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isPending}
                        aria-label="Close dialog"
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 disabled:opacity-50"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Confirmation Message */}
                <div className="px-6 py-5">
                    <h2 id="delete-department-title" className="text-xl font-semibold text-slate-900">
                        Delete department?
                    </h2>
                    <p id="delete-department-description" className="mt-2 text-sm leading-6 text-slate-500">
                        Are you sure you want to delete{" "}
                        <span className="font-semibold text-slate-900">{department.name}</span>?
                        This action cannot be undone.
                    </p>
                </div>

                {/* Footer */}
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
                        type="button"
                        onClick={onConfirm}
                        disabled={isPending}
                        className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {isPending ? "Deleting..." : "Delete department"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteDepartmentDialog;
