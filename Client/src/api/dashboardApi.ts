import { apiClient } from "./apiClient";
import type { DashboardResponse } from "../types/dashboard";

export const getDashboard = async (): Promise<DashboardResponse> => {
  return apiClient<DashboardResponse>("/dashboard");
};