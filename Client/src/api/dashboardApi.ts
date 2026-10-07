import type { DashboardResponse } from "../types/dashboard";

const API_URL = "https://localhost:7101/api";

export async function getDashboard(): Promise<DashboardResponse> {
  const response = await fetch(`${API_URL}/dashboard`);

  if (!response.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return response.json();
}