import type { DepartmentRequest, DepartmentResponse } from "../types/department";

export async function getDepartments(): Promise<DepartmentResponse[]> {
    const response = await fetch("https://localhost:7101/api/Departments");

    if (!response.ok) {
        throw new Error("Failed to fetch departments");
    }

    return response.json();
}

export async function getDepartmentById(id: number): Promise<DepartmentResponse> {
    const response = await fetch(`https://localhost:7101/api/Departments/${id}`);

    if(!response.ok){
        throw new Error("Failed to fetch department");
    }

    return response.json();
}

export async function createDepartment(department: DepartmentRequest): Promise<DepartmentResponse> {
    const url = "https://localhost:7101/api/Departments";

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(department),
    });

    if (!response.ok) {
        throw new Error("Failed to create department");
    }

    return response.json();
}

export async function updateDepartment(id: number, department: DepartmentRequest): Promise<void> {
    const url = `https://localhost:7101/api/Departments/${id}`;

    const response = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(department),
    });

    if (!response.ok) {
        throw new Error("Failed to update department");
    }
}

export async function deleteDepartment(id: number): Promise<void> {
    const url = `https://localhost:7101/api/Departments/${id}`;

    const response = await fetch(url, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete employee");
    }
}