using EmployeeManager.Application.DTOs.Dashboard;
using EmployeeManager.Application.Interfaces;

namespace EmployeeManager.Application.Services
{
    public class DashboardService : IDashboardService
    {
        private readonly IDashboardRepository _dashboardRepository;
        private readonly ICurrentOrganization _currentOrganization;

        public DashboardService(
            IDashboardRepository dashboardRepository,
            ICurrentOrganization currentOrganization)
        {
            _dashboardRepository = dashboardRepository;
            _currentOrganization = currentOrganization;
        }

        public async Task<DashboardResponseDto> GetDashboardAsync()
        {
            var organizationId = await _currentOrganization.GetOrganizationIdAsync();

            return new DashboardResponseDto
            {
                TotalEmployees = await _dashboardRepository.GetTotalEmployeesAsync(organizationId),
                AverageSalary = await _dashboardRepository.GetAverageSalaryAsync(organizationId),
                TotalDepartments = await _dashboardRepository.GetTotalDepartmentsAsync(organizationId),
                NewHiresThisMonth = await _dashboardRepository.GetNewHiresThisMonthAsync(organizationId),

                EmployeeGrowth = await _dashboardRepository.GetEmployeeGrowthAsync(organizationId),
                EmployeesByDepartment = await _dashboardRepository.GetEmployeesByDepartmentAsync(organizationId),
                EmployeesByStatus = await _dashboardRepository.GetEmployeesByStatusAsync(organizationId),
                MonthlyHires = await _dashboardRepository.GetMonthlyHiresAsync(organizationId),
                SalaryBandsByPosition = await _dashboardRepository.GetSalaryBandsByPositionAsync(organizationId)
            };
        }
    }
}
