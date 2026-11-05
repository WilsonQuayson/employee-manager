using EmployeeManager.Application.DTOs.Dashboard;

namespace EmployeeManager.Application.Interfaces
{
    public interface IDashboardRepository
    {
        Task<int> GetTotalEmployeesAsync(int organizationId);
        Task<decimal> GetAverageSalaryAsync(int organizationId);
        Task<int> GetTotalDepartmentsAsync(int organizationId);
        Task<int> GetNewHiresThisMonthAsync(int organizationId);

        Task<List<EmployeeGrowthDto>> GetEmployeeGrowthAsync(int organizationId);
        Task<List<DepartmentCountDto>> GetEmployeesByDepartmentAsync(int organizationId);
        Task<List<StatusCountDto>> GetEmployeesByStatusAsync(int organizationId);
        Task<List<MonthlyHireDto>> GetMonthlyHiresAsync(int organizationId);
        Task<List<SalaryBandDto>> GetSalaryBandsByPositionAsync(int organizationId);
    }
}
