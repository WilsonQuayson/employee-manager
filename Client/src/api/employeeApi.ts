
import { apiClient } from "./apiClient";
import type { EmployeeRequest, EmployeeResponse } from "../types/employee";

export const getEmployees = async (): Promise<EmployeeResponse[]> => {
  return apiClient<EmployeeResponse[]>("/Employees");
};

export const getEmployeeById = async (id: number): Promise<EmployeeResponse> => {
  return apiClient<EmployeeResponse>(`/Employees/${id}`);
};

export const createEmployee = async (employee: EmployeeRequest): Promise<EmployeeResponse> => {
  return apiClient<EmployeeResponse>("/Employees", {
    method: "POST",
    body: JSON.stringify(employee),
  });
};

export const updateEmployee = async (id: number, employee: EmployeeRequest): Promise<void> => {
  await apiClient<void>(`/Employees/${id}`, {
    method: "PUT",
    body: JSON.stringify(employee),
  });
};

export const deleteEmployee = async (id: number): Promise<void> => {
  await apiClient<void>(`/Employees/${id}`, {
    method: "DELETE",
  });
};
