
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Ellipsis, Eye, Pencil, Trash2 } from "lucide-react";
import type { EmployeeResponse } from "../types/employee";

interface EmployeeActionsProps {
    employee: EmployeeResponse;
    onView: (employee: EmployeeResponse) => void;
    onEdit: (employee: EmployeeResponse) => void;
    onDelete: (employee: EmployeeResponse) => void;
}

export default function EmployeeActions({ employee, onView, onEdit, onDelete }: EmployeeActionsProps) {

    /* -------------------- State & Refs -------------------- */

    const [isOpen, setIsOpen] = useState(false);
    const [position, setPosition] = useState({ top: 0, right: 0 });

    const buttonRef = useRef<HTMLButtonElement>(null);
    const menuRef = useRef<HTMLDivElement>(null);

    /* -------------------- Dropdown Positioning -------------------- */

    useLayoutEffect(() => {
        if (!isOpen || !buttonRef.current) return;

        function updatePosition() {
            const rect = buttonRef.current!.getBoundingClientRect();
            const menuHeight = menuRef.current?.offsetHeight ?? 140;
            const spaceBelow = window.innerHeight - rect.bottom;
            const openAbove = spaceBelow < menuHeight + 8 && rect.top > spaceBelow;

            setPosition({
                top: openAbove ? rect.top - menuHeight - 4 : rect.bottom + 4,
                right: window.innerWidth - rect.right
            });
        }

        updatePosition();

        // Reposition the dropdown when the viewport or scroll position changes.
        window.addEventListener("resize", updatePosition);
        window.addEventListener("scroll", updatePosition, true);

        return () => {
            window.removeEventListener("resize", updatePosition);
            window.removeEventListener("scroll", updatePosition, true);
        };
    }, [isOpen]);

    /* -------------------- Dropdown Events -------------------- */

    useEffect(() => {
        if (!isOpen) return;

        function handleClickOutside(e: MouseEvent) {
            const target = e.target as Node;

            if (!buttonRef.current?.contains(target) && !menuRef.current?.contains(target)) {
                setIsOpen(false);
            }
        }

        function handleEscape(e: KeyboardEvent) {
            if (e.key === "Escape") setIsOpen(false);
        }

        // Close the dropdown when clicking outside or pressing Escape.
        document.addEventListener("mousedown", handleClickOutside);
        document.addEventListener("keydown", handleEscape);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen]);

    /* -------------------- Handlers -------------------- */

    function handleAction(action: (employee: EmployeeResponse) => void) {
        setIsOpen(false);
        action(employee);
    }

    /* -------------------- JSX -------------------- */

    return (
        <>
            {/* Actions Button */}
            <button
                ref={buttonRef}
                type="button"
                onClick={() => setIsOpen(prev => !prev)}
                aria-label={`Actions for ${employee.firstName} ${employee.lastName}`}
                aria-expanded={isOpen}
                aria-haspopup="true"
                className="rounded-lg p-2 text-slate-700 hover:bg-slate-100"
            >
                <Ellipsis size={20} />
            </button>

            {/* Dropdown rendered outside the table to prevent overflow clipping */}
            {isOpen && createPortal(
                <div
                    ref={menuRef}
                    style={{ top: position.top, right: position.right }}
                    className="fixed z-100 w-44 rounded-xl border border-slate-200 bg-white p-1 shadow-lg"
                >
                    {/* View Employee */}
                    <button
                        type="button"
                        onClick={() => handleAction(onView)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                    >
                        <Eye size={16} />
                        View employee
                    </button>

                    {/* Edit Employee */}
                    <button
                        type="button"
                        onClick={() => handleAction(onEdit)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                    >
                        <Pencil size={16} />
                        Edit employee
                    </button>

                    <div className="my-1 border-t border-slate-100" />

                    {/* Delete Employee */}
                    <button
                        type="button"
                        onClick={() => handleAction(onDelete)}
                        className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50"
                    >
                        <Trash2 size={16} />
                        Delete employee
                    </button>
                </div>,
                document.body
            )}
        </>
    );
}
