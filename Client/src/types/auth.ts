export interface RegisterRequest {
  displayName: string;
  email: string;
  password: string;
  organizationName: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface CurrentUser {
  id: string;
  displayName: string;
  email: string;
  organizationId: number;
  organizationName: string;
}