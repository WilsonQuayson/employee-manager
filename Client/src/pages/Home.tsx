import React, { useEffect, useState } from "react";
import Breadcrumb from "../components/Breadcrumb";
import EmployeeGrowthChart from "../components/EmployeeGrowthChart";
import StatsCard from "../components/StatsCard";
import { getDashboard } from "../api/dashboardApi";
import type { DashboardResponse } from "../types/dashboard";

const Home: React.FC = () => {
    const [dashboard, setDashboard] = useState<DashboardResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadDashboard() {
            try {
                const data = await getDashboard();
                setDashboard(data);
            } catch {
                setError("Failed to load dashboard");
            } finally {
                setLoading(false);
            }
        }

        loadDashboard();
    }, []);

    if (loading) {
        return (
            <div role="status" className="flex min-h-[50vh] items-center justify-center">
                <div
                    aria-hidden="true"
                    className="h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600"
                />
                <span className="sr-only">Loading dashboard...</span>
            </div>
        );
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!dashboard) {
        return null;
    }

    return (
        <section className="p-4 sm:p-6 lg:p-8">
            <section>
                <Breadcrumb page="Dashboard" />
                <h1 className="font-medium text-4xl">Good morning, User</h1>
                <p className="pt-2 text-ring">Here's what's happening across your organization today</p>
            </section>
            <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                <StatsCard
                    title="Total employees"
                    value={String(dashboard.totalEmployees)}
                    iconPath="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                />

                <StatsCard
                    title="Average salary"
                    value={`€${dashboard.averageSalary.toLocaleString()}`}
                    iconPath="M12 6v12m3-9.75C14.25 7.5 13.5 7.5 12 7.5s-3 .75-3 2.25 1.5 2.25 3 2.25 3 .75 3 2.25-1.5 2.25-3 2.25s-2.25 0-3-.75"
                />

                <StatsCard
                    title="Departments"
                    value={String(dashboard.totalDepartments)}
                    iconPath="M3.75 21h16.5M4.5 3h15l-.75 18H5.25L4.5 3Zm3.75 4.5h.008v.008H8.25V7.5Zm3.75 0h.008v.008H12V7.5Zm3.75 0h.008v.008h-.008V7.5Z"
                />

                <StatsCard
                    title="New this month"
                    value={String(dashboard.newHiresThisMonth)}
                    iconPath="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
            </section>
            <section className="grid grid-cols-6 gap-4 mt-4">
                <EmployeeGrowthChart data={dashboard.employeeGrowth} />
            </section>
        </section>
    );
};

export default Home;
