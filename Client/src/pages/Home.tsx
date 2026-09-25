import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import StatsCard from "../components/StatsCard";

const Home: React.FC = () => {
    return (
        <section className="p-8">
            <section>
                <Breadcrumb page="Dashboard" />
                <h1 className="font-medium text-4xl">Good morning, Wilson</h1>
                <p className="pt-2 text-ring">Here's what's happening across Northwind today</p>
            </section>
            <section className="mt-8 grid grid-cols-5 gap-4">
                <StatsCard
                    title="Total employees"
                    value="218"
                    badge="+4.3%"
                    badgeClassName="bg-primary/15 text-primary"
                    detail="vs last month"
                    iconPath="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1-5.25 0Z"
                />
                <StatsCard
                    title="Present today"
                    value="203"
                    badge="+91.1%"
                    badgeClassName="bg-primary/15 text-primary"
                    detail="attendance rate"
                    iconPath="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                />
                <StatsCard
                    title="Absent"
                    value="15"
                    badge="-2 vs avg%"
                    badgeClassName="bg-error/15 text-error"
                    iconPath="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM4 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 10.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
                <StatsCard
                    title="Open leave requests"
                    value="9"
                    badge="3 urgent"
                    badgeClassName="bg-gray-600/10 text-gray-400"
                    iconPath="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"
                />
                <StatsCard
                    title="New this month"
                    value="13"
                    badge="+18%"
                    badgeClassName="bg-primary/30 text-primary"
                    detail="hiring pace"
                    iconPath="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                />
            </section>
        </section>
    );
};

export default Home;
