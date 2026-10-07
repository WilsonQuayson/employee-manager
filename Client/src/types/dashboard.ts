export interface EmployeeGrowth {
  month: string;
  count: number;
}

export interface DepartmentCount {
  department: string;
  count: number;
}

export interface StatusCount {
  status: string;
  count: number;
}

export interface MonthlyHire {
  month: string;
  count: number;
}

export interface DashboardResponse {
  totalEmployees: number;
  averageSalary: number;
  totalDepartments: number;
  newHiresThisMonth: number;

  employeeGrowth: EmployeeGrowth[];
  employeesByDepartment: DepartmentCount[];
  employeesByStatus: StatusCount[];
  monthlyHires: MonthlyHire[];
}