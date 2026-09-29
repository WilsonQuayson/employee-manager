export type Employee = {
    id: string;
    name: string;
    email: string;
    jobTitle: string;
    departmentId: string;
    managerId: string | null;
    location: string;
    employmentType: "Full-time" | "Part-time" | "Contract";
    status: "Active" | "On leave";
    startDate: string;
    performanceRating: number;
};

export type Department = {
    id: string;
    name: string;
    managerId: string;
    headcount: number;
    openRoles: number;
    budget: number;
};

export type LeaveRequest = {
    id: string;
    employeeId: string;
    type: "Annual leave" | "Sick leave" | "Personal leave";
    startDate: string;
    endDate: string;
    status: "Pending" | "Approved" | "Declined";
};

export const mockDashboardData = {
    organizationName: "Northwind",
    employeeCount: 218,
    presentToday: 203,
    absentToday: 15,
    openLeaveRequests: 9,
    urgentLeaveRequests: 3,
    newHiresThisMonth: 13,
    employeeGrowth: [
        { month: "Jan", headcount: 184 },
        { month: "Feb", headcount: 188 },
        { month: "Mar", headcount: 191 },
        { month: "Apr", headcount: 195 },
        { month: "May", headcount: 199 },
        { month: "Jun", headcount: 204 },
        { month: "Jul", headcount: 209 },
        { month: "Aug", headcount: 218 },
    ],
};

export const mockDepartments: Department[] = [
    { id: "engineering", name: "Engineering", managerId: "emp-001", headcount: 64, openRoles: 5, budget: 8200000 },
    { id: "sales", name: "Sales", managerId: "emp-002", headcount: 48, openRoles: 3, budget: 5400000 },
    { id: "people", name: "People & Culture", managerId: "emp-003", headcount: 22, openRoles: 1, budget: 2100000 },
    { id: "marketing", name: "Marketing", managerId: "emp-004", headcount: 36, openRoles: 2, budget: 3600000 },
    { id: "operations", name: "Operations", managerId: "emp-005", headcount: 48, openRoles: 2, budget: 4900000 },
];

export const mockEmployees: Employee[] = [
    {
        id: "emp-001",
        name: "Avery Morgan",
        email: "avery.morgan@northwind.example",
        jobTitle: "Engineering Director",
        departmentId: "engineering",
        managerId: null,
        location: "Seattle",
        employmentType: "Full-time",
        status: "Active",
        startDate: "2020-04-13",
        performanceRating: 4.8,
    },
    {
        id: "emp-002",
        name: "Jordan Lee",
        email: "jordan.lee@northwind.example",
        jobTitle: "Sales Director",
        departmentId: "sales",
        managerId: null,
        location: "New York",
        employmentType: "Full-time",
        status: "Active",
        startDate: "2019-09-09",
        performanceRating: 4.6,
    },
    {
        id: "emp-003",
        name: "Taylor Brooks",
        email: "taylor.brooks@northwind.example",
        jobTitle: "People Operations Lead",
        departmentId: "people",
        managerId: null,
        location: "Chicago",
        employmentType: "Full-time",
        status: "Active",
        startDate: "2021-02-22",
        performanceRating: 4.7,
    },
    {
        id: "emp-004",
        name: "Casey Patel",
        email: "casey.patel@northwind.example",
        jobTitle: "Marketing Director",
        departmentId: "marketing",
        managerId: null,
        location: "Austin",
        employmentType: "Full-time",
        status: "Active",
        startDate: "2018-06-04",
        performanceRating: 4.5,
    },
    {
        id: "emp-005",
        name: "Riley Chen",
        email: "riley.chen@northwind.example",
        jobTitle: "Operations Director",
        departmentId: "operations",
        managerId: null,
        location: "Seattle",
        employmentType: "Full-time",
        status: "Active",
        startDate: "2020-11-16",
        performanceRating: 4.4,
    },
    {
        id: "emp-006",
        name: "Sam Rivera",
        email: "sam.rivera@northwind.example",
        jobTitle: "Senior Software Engineer",
        departmentId: "engineering",
        managerId: "emp-001",
        location: "Remote",
        employmentType: "Full-time",
        status: "Active",
        startDate: "2023-03-20",
        performanceRating: 4.2,
    },
    {
        id: "emp-007",
        name: "Alex Kim",
        email: "alex.kim@northwind.example",
        jobTitle: "Account Executive",
        departmentId: "sales",
        managerId: "emp-002",
        location: "New York",
        employmentType: "Full-time",
        status: "On leave",
        startDate: "2022-08-01",
        performanceRating: 4.1,
    },
    {
        id: "emp-008",
        name: "Jamie Wilson",
        email: "jamie.wilson@northwind.example",
        jobTitle: "People Analyst",
        departmentId: "people",
        managerId: "emp-003",
        location: "Chicago",
        employmentType: "Part-time",
        status: "Active",
        startDate: "2024-01-08",
        performanceRating: 4.3,
    },
];

export const mockLeaveRequests: LeaveRequest[] = [
    {
        id: "leave-001",
        employeeId: "emp-007",
        type: "Annual leave",
        startDate: "2026-10-05",
        endDate: "2026-10-09",
        status: "Pending",
    },
    {
        id: "leave-002",
        employeeId: "emp-006",
        type: "Personal leave",
        startDate: "2026-10-12",
        endDate: "2026-10-12",
        status: "Pending",
    },
    {
        id: "leave-003",
        employeeId: "emp-008",
        type: "Annual leave",
        startDate: "2026-10-19",
        endDate: "2026-10-21",
        status: "Approved",
    },
];