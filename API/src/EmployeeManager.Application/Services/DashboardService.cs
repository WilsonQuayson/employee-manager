using EmployeeManager.Application.DTOs.Dashboard;
using EmployeeManager.Application.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.Application.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IDashboardRepository _dashboardRepository;

        public DashboardService(IDashboardRepository dashboardRepository)
        {
            _dashboardRepository = dashboardRepository;
        }

        public async Task<DashboardResponseDto> GetDashboardAsync()
        {
            return new DashboardResponseDto
            {
                TotalEmployees = await _dashboardRepository.GetTotalEmployeesAsync(),
                AverageSalary = await _dashboardRepository.GetAverageSalaryAsync(),
                TotalDepartments = await _dashboardRepository.GetTotalDepartmentsAsync(),
                NewHiresThisMonth = await _dashboardRepository.GetNewHiresThisMonthAsync(),

                EmployeeGrowth = await _dashboardRepository.GetEmployeeGrowthAsync(),
                EmployeesByDepartment = await _dashboardRepository.GetEmployeesByDepartmentAsync(),
                EmployeesByStatus = await _dashboardRepository.GetEmployeesByStatusAsync(),
                MonthlyHires = await _dashboardRepository.GetMonthlyHiresAsync()
            };
        }
    }
}
