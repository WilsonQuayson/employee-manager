import { useState } from "react";
import { X } from "lucide-react";
import type { DepartmentRequest, DepartmentResponse } from "../types/department";

interface DepartmentModalProps {
    mode: "create" | "edit";
    department?: DepartmentResponse;
    onClose: () => void;
    onSubmit: (department: DepartmentRequest) => void;
    isPending: boolean;
}

const DepartmentModal = ({ mode, department, onClose, onSubmit, isPending }: DepartmentModalProps) => {

    /* -------------------- Form State -------------------- */

    const [formData, setFormData] = useState<DepartmentRequest>({
        name: department?.name ?? ""
    });

    /* -------------------- Handlers -------------------- */

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        if (isPending || !formData.name.trim()) return;

        onSubmit({ name: formData.name.trim() });
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
                aria-labelledby="department-modal-title"
                className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            >
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">
                    <div>
                        <h2 id="department-modal-title" className="text-xl font-semibold text-slate-900">
                            {mode === "create" ? "Add Department" : "Edit Department"}
                        </h2>
                        <p className="mt-1 text-sm text-slate-500">
                            {mode === "create"
                                ? "Create a new department."
                                : "Update the department information."}
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

                {/* Form */}
                <form onSubmit={handleSubmit}>
                    <div className="p-6">
                        <label htmlFor="department-name" className={labelStyle}>
                            Department Name
                        </label>
                        <input
                            id="department-name"
                            type="text"
                            required
                            maxLength={100}
                            value={formData.name}
                            onChange={e => setFormData({ name: e.target.value })}
                            placeholder="e.g. Engineering"
                            className={inputStyle}
                        />
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
                            type="submit"
                            disabled={isPending || !formData.name.trim()}
                            className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isPending ? "Saving..." : mode === "create" ? "Create Department" : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DepartmentModal;
