export interface EmployeeResponse {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string | null;
    dateOfBirth: string;
    hireDate: string;
    status: number;
    salary: number;
    departmentId: number;
    departmentName: string;
    jobPositionId: number;
    jobPositionTitle: string;
}

export interface EmployeeRequest {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string | null;
    dateOfBirth: string;
    hireDate: string;
    status: number;
    salary: number;
    departmentId: number;
    jobPositionId: number;
}