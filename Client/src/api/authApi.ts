import type { CurrentUser, LoginRequest, RegisterRequest } from "../types/auth";
import { apiClient, resetCsrfToken } from "./apiClient";

export const register = async (data: RegisterRequest): Promise<void> => {
  await apiClient("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
};

export const login = async (data: LoginRequest): Promise<void> => {
  await apiClient("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });

  resetCsrfToken();
};

export const logout = async (): Promise<void> => {
  await apiClient("/auth/logout", {
    method: "POST",
  });

  resetCsrfToken();
};

export const getCurrentUser = async (): Promise<CurrentUser> => {
  return apiClient<CurrentUser>("/auth/me");
};
