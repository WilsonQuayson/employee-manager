import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { toast } from "sonner";
import { useCurrentUser, useLogout } from "../hooks/useAuth";

const TopNav = () => {
    const navigate = useNavigate();
    const { data: user } = useCurrentUser();
    const logoutMutation = useLogout();

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

                <div className="relative">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-4.35-4.35m1.85-5.15a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                    </svg>

                    <input
                        type="search"
                        placeholder="Search employees, departments, documents..."
                        className="h-9 w-140 rounded-xl border border-border bg-secondary pl-9 pr-3 outline-none focus:outline-none focus:ring-0"
                    />
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
                    className="flex size-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground disabled:opacity-50 cursor-pointer"
                >
                    <LogOut size={18} />
                </button>
            </div>
        </section>
    );
};

export default TopNav;
