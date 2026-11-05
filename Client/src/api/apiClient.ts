const API_BASE = "/api";

let csrfToken: string | null = null;

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
  }
}

const getCsrfToken = async (): Promise<string> => {
  const response = await fetch(`${API_BASE}/auth/csrf-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new ApiError(response.status, "Failed to retrieve CSRF token");
  }

  const data: { token: string } = await response.json();
  csrfToken = data.token;
  return data.token;
};

export const resetCsrfToken = () => {
  csrfToken = null;
};

export const apiClient = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const method = (options.method ?? "GET").toUpperCase();
  const headers = new Headers(options.headers);

  if (options.body != null && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  if (!["GET", "HEAD", "OPTIONS"].includes(method)) {
    headers.set("X-CSRF-TOKEN", csrfToken ?? await getCsrfToken());
  }

  const response = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    method,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    const errors = errorData?.errors;

    let message = `API request failed: ${response.status}`;

    if (Array.isArray(errors) && errors.length > 0) {
      message = errors.join("\n");
    } else if (errors && typeof errors === "object") {
      message = Object.values(errors).flat().join("\n");
    } else if (typeof errorData?.detail === "string") {
      message = errorData.detail;
    } else if (typeof errorData?.message === "string") {
      message = errorData.message;
    } else if (typeof errorData?.title === "string") {
      message = errorData.title;
    }

    throw new ApiError(response.status, message);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
};
