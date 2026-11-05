
import { apiClient } from "./apiClient";
import type { DepartmentRequest, DepartmentResponse } from "../types/department";

export const getDepartments = async (): Promise<DepartmentResponse[]> => {
  return apiClient<DepartmentResponse[]>("/Departments");
};

export const getDepartmentById = async (id: number): Promise<DepartmentResponse> => {
  return apiClient<DepartmentResponse>(`/Departments/${id}`);
};

export const createDepartment = async (department: DepartmentRequest): Promise<DepartmentResponse> => {
  return apiClient<DepartmentResponse>("/Departments", {
    method: "POST",
    body: JSON.stringify(department),
  });
};

export const updateDepartment = async (id: number, department: DepartmentRequest): Promise<void> => {
  await apiClient<void>(`/Departments/${id}`, {
    method: "PUT",
    body: JSON.stringify(department),
  });
};

export const deleteDepartment = async (id: number): Promise<void> => {
  await apiClient<void>(`/Departments/${id}`, {
    method: "DELETE",
  });
};
