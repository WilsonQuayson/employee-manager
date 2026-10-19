import type { EmployeeRequest, EmployeeResponse } from "../types/employee";

export async function getEmployees(): Promise<EmployeeResponse[]> {
    const response = await fetch("https://localhost:7101/api/Employees");

    if (!response.ok) {
        throw new Error("Failed to fetch employees");
    }

    return response.json();
}

export async function getEmployeeById(id: number): Promise<EmployeeResponse> {
    const response = await fetch(`https://localhost:7101/api/Employees/${id}`);

    if(!response.ok){
        throw new Error("Failed to fetch employee");
    }

    return response.json();
}

export async function createEmployee(employee: EmployeeRequest): Promise<EmployeeResponse> {
    const url = "https://localhost:7101/api/Employees";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
    });

    if (!response.ok) {
        throw new Error("Failed to create employee");
    }

    return response.json();
}

export async function updateEmployee(id: number, employee: EmployeeRequest): Promise<void> {
    const url = `https://localhost:7101/api/Employees/${id}`;

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
    });

    if (!response.ok) {
        throw new Error("Failed to update employee");
    }
}

export async function deleteEmployee(id: number): Promise<void> {
    const url = `https://localhost:7101/api/Employees/${id}`;

    const response = await fetch(url, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete employee");
    }
}