import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LogOut, Search, UserRound } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { getEmployees } from "../api/employeeApi";
import { useCurrentUser, useLogout } from "../hooks/useAuth";

const TopNav = () => {
    const navigate = useNavigate();
    const { data: user } = useCurrentUser();
    const logoutMutation = useLogout();

    const [search, setSearch] = useState("");
    const [showResults, setShowResults] = useState(false);
    const searchRef = useRef<HTMLDivElement>(null);

    const { data: employees = [], isPending, isError } = useQuery({
        queryKey: ["employees"],
        queryFn: getEmployees,
        enabled: showResults && search.trim().length >= 2,
    });

    const filteredEmployees = employees
        .filter((employee) =>
            `${employee.firstName} ${employee.lastName}`
                .toLowerCase()
                .includes(search.trim().toLowerCase())
        )
        .slice(0, 5);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (!searchRef.current?.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleEmployeeClick = (id: number) => {
        navigate(`/employees/${id}`);
        setSearch("");
        setShowResults(false);
    };

    const initials = user?.displayName
        .trim()
        .split(/\s+/)
        .map((name) => name[0])
        .slice(0, 2)
        .join("")
        .toUpperCase() || "?";

    const handleLogout = async () => {
        try {
            await logoutMutation.mutateAsync();
            navigate("/login", { replace: true });
        } catch {
            toast.error("Failed to log out. Please try again.");
        }
    };

    return (
        <section className="max-h-16 flex-1 border-b border-border flex items-center justify-between px-8">
            <div className="flex items-center gap-4 h-full">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 20.25h12m-7.5-3v3m3-3v3m-10.125-3h17.25c.621 0 1.125-.504 1.125-1.125V4.875c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125Z" />
                </svg>

                <div ref={searchRef} className="relative">
                    <Search
                        size={16}
                        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                    />

                    <input
                        type="search"
                        placeholder="Search employees"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setShowResults(true);
                        }}
                        onFocus={() => setShowResults(true)}
                        onKeyDown={(e) => {
                            if (e.key === "Escape") setShowResults(false);
                        }}
                        className="h-9 w-140 rounded-xl border border-border bg-secondary pl-9 pr-3 outline-none focus:outline-none focus:ring-0"
                    />

                    {showResults && search.trim().length >= 2 && (
                        <div className="absolute left-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-border bg-white shadow-lg">
                            {isPending ? (
                                <p className="p-4 text-sm text-muted-foreground">Searching...</p>
                            ) : isError ? (
                                <p className="p-4 text-sm text-destructive">Failed to search employees.</p>
                            ) : filteredEmployees.length === 0 ? (
                                <p className="p-4 text-sm text-muted-foreground">No employees found.</p>
                            ) : (
                                filteredEmployees.map((employee) => (
                                    <button
                                        key={employee.id}
                                        type="button"
                                        onClick={() => handleEmployeeClick(employee.id)}
                                        className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-secondary"
                                    >
                                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary">
                                            <UserRound size={17} className="text-muted-foreground" />
                                        </div>

                                        <div>
                                            <p className="text-sm font-medium">
                                                {employee.firstName} {employee.lastName}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {employee.departmentName}
                                            </p>
                                        </div>
                                    </button>
                                ))
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="flex gap-4 items-center">
                <div
                    title={user?.displayName ?? "Account"}
                    className="flex items-center justify-center rounded-full bg-gray-700/50 size-8"
                >
                    <p className="text-white text-xs">{initials}</p>
                </div>

                <button
                    type="button"
                    onClick={handleLogout}
                    disabled={logoutMutation.isPending}
                    title="Log out"
                    aria-label="Log out"
                    className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-50"
                >
                    <LogOut size={18} />
                </button>
            </div>
        </section>
    );
};

export default TopNav;
