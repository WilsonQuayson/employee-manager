using EmployeeManager.Application.DTOs.Dashboard;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.Application.Interfaces
{
    public interface IDashboardRepository
    {
        Task<int> GetTotalEmployeesAsync();
        Task<decimal> GetAverageSalaryAsync();
        Task<int> GetTotalDepartmentsAsync();
        Task<int> GetNewHiresThisMonthAsync();

        Task<List<EmployeeGrowthDto>> GetEmployeeGrowthAsync();
        Task<List<DepartmentCountDto>> GetEmployeesByDepartmentAsync();
        Task<List<StatusCountDto>> GetEmployeesByStatusAsync();
        Task<List<MonthlyHireDto>> GetMonthlyHiresAsync();
    }
}
