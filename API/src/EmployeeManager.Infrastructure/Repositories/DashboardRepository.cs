using EmployeeManager.Application.DTOs.Dashboard;
using EmployeeManager.Application.Interfaces;
using EmployeeManager.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.Infrastructure.Repositories
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly AppDbContext _context;

        public DashboardRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> GetTotalEmployeesAsync(int organizationId)
        {
            return await _context.Employees
                .CountAsync(e => e.OrganizationId == organizationId);
        }

        public async Task<decimal> GetAverageSalaryAsync(int organizationId)
        {
            return await _context.Employees
                .Where(e => e.OrganizationId == organizationId)
                .AverageAsync(e => (decimal?)e.Salary) ?? 0;
        }

        public async Task<int> GetTotalDepartmentsAsync(int organizationId)
        {
            return await _context.Departments
                .CountAsync(d => d.OrganizationId == organizationId);
        }

        public async Task<int> GetNewHiresThisMonthAsync(int organizationId)
        {
            var now = DateTime.UtcNow;
            var startOfMonth = new DateTime(now.Year, now.Month, 1);
            var startOfNextMonth = startOfMonth.AddMonths(1);

            return await _context.Employees.CountAsync(e =>
                e.OrganizationId == organizationId &&
                e.HireDate >= startOfMonth &&
                e.HireDate < startOfNextMonth);
        }

        public async Task<List<DepartmentCountDto>> GetEmployeesByDepartmentAsync(int organizationId)
        {
            return await _context.Departments
                .Where(d =>
                    d.OrganizationId == organizationId &&
                    d.Employees.Any(e => e.OrganizationId == organizationId))
                .Select(d => new DepartmentCountDto
                {
                    Department = d.Name,
                    Count = d.Employees.Count(e => e.OrganizationId == organizationId)
                })
                .ToListAsync();
        }

        public async Task<List<StatusCountDto>> GetEmployeesByStatusAsync(int organizationId)
        {
            return await _context.Employees
                .Where(e => e.OrganizationId == organizationId)
                .GroupBy(e => e.Status)
                .Select(g => new StatusCountDto
                {
                    Status = g.Key.ToString(),
                    Count = g.Count()
                })
                .ToListAsync();
        }

        public async Task<List<MonthlyHireDto>> GetMonthlyHiresAsync(int organizationId)
        {
            var startDate = DateTime.UtcNow.AddMonths(-7);
            startDate = new DateTime(startDate.Year, startDate.Month, 1);

            var hires = await _context.Employees
                .Where(e =>
                    e.OrganizationId == organizationId &&
                    e.HireDate >= startDate)
                .GroupBy(e => new
                {
                    e.HireDate.Year,
                    e.HireDate.Month
                })
                .Select(g => new
                {
                    g.Key.Year,
                    g.Key.Month,
                    Count = g.Count()
                })
                .ToListAsync();

            return Enumerable.Range(0, 8)
                .Select(i =>
                {
                    var month = startDate.AddMonths(i);

                    var count = hires
                        .Where(h =>
                            h.Year == month.Year &&
                            h.Month == month.Month)
                        .Select(h => h.Count)
                        .FirstOrDefault();

                    return new MonthlyHireDto
                    {
                        Month = month.ToString("MMM"),
                        Count = count
                    };
                })
                .ToList();
        }

        public async Task<List<EmployeeGrowthDto>> GetEmployeeGrowthAsync(int organizationId)
        {
            var startDate = DateTime.UtcNow.AddMonths(-7);
            startDate = new DateTime(startDate.Year, startDate.Month, 1);

            var employees = await _context.Employees
                .Where(e => e.OrganizationId == organizationId)
                .Select(e => e.HireDate)
                .ToListAsync();

            return Enumerable.Range(0, 8)
                .Select(i =>
                {
                    var month = startDate.AddMonths(i);
                    var endOfMonth = month.AddMonths(1);

                    return new EmployeeGrowthDto
                    {
                        Month = month.ToString("MMM"),
                        Count = employees.Count(hireDate =>
                            hireDate < endOfMonth)
                    };
                })
                .ToList();
        }

        public async Task<List<SalaryBandDto>> GetSalaryBandsByPositionAsync(int organizationId)
        {
            return await _context.JobPositions
                .AsNoTracking()
                .Where(j => j.OrganizationId == organizationId)
                .Select(j => new SalaryBandDto
                {
                    Position = j.Title,
                    MinimumSalary = j.MinimumSalary,
                    MaximumSalary = j.MaximumSalary,
                    AverageSalary = j.Employees
                        .Where(e => e.OrganizationId == organizationId)
                        .Average(e => (decimal?)e.Salary)
                })
                .ToListAsync();
        }
    }
}
