export interface JobPositionResponse {
    id: number;
    title: string;
    minimumSalary: number;
    maximumSalary: number;
}

export interface JobPositionRequest {
    title: string;
    minimumSalary: number;
    maximumSalary: number;
}