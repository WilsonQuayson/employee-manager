using EmployeeManager.Application.DTOs.Dashboard;
using EmployeeManager.Application.Interfaces;
using EmployeeManager.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EmployeeManager.Infrastructure.Repositories
{
    public class DashboardRepository : IDashboardRepository
    {
        private readonly AppDbContext _context;

        public DashboardRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<int> GetTotalEmployeesAsync()
        {
            return await _context.Employees.CountAsync();
        }

        public async Task<decimal> GetAverageSalaryAsync()
        {
            if (!await _context.Employees.AnyAsync())
            {
                return 0;
            }

            return await _context.Employees.AverageAsync(e => e.Salary);
        }

        public async Task<int> GetTotalDepartmentsAsync()
        {
            return await _context.Departments.CountAsync();
        }

        public async Task<int> GetNewHiresThisMonthAsync()
        {
            var now = DateTime.UtcNow;

            return await _context.Employees.CountAsync(e =>
                e.HireDate.Year == now.Year &&
                e.HireDate.Month == now.Month);
        }

        public async Task<List<DepartmentCountDto>> GetEmployeesByDepartmentAsync()
        {
            return await _context.Departments
                .Where(d => d.Employees.Any())
                .Select(d => new DepartmentCountDto
                {
                    Department = d.Name,
                    Count = d.Employees.Count
                })
                .ToListAsync();
        }

        public async Task<List<StatusCountDto>> GetEmployeesByStatusAsync()
        {
            return await _context.Employees
                .GroupBy(e => e.Status)
                .Select(g => new StatusCountDto
                {
                    Status = g.Key.ToString(),
                    Count = g.Count()
                })
                .ToListAsync();
        }

        public async Task<List<MonthlyHireDto>> GetMonthlyHiresAsync()
        {
            var startDate = DateTime.UtcNow
                .AddMonths(-7);

            startDate = new DateTime(
                startDate.Year,
                startDate.Month,
                1);

            var hires = await _context.Employees
                .Where(e => e.HireDate >= startDate)
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

        public async Task<List<EmployeeGrowthDto>> GetEmployeeGrowthAsync()
        {
            var startDate = DateTime.UtcNow
                .AddMonths(-7);

            startDate = new DateTime(
                startDate.Year,
                startDate.Month,
                1);

            var employees = await _context.Employees
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

        public async Task<List<SalaryBandDto>> GetSalaryBandsByPositionAsync()
        {
            return await _context.JobPositions
                .AsNoTracking()
                .Select(j => new SalaryBandDto
                {
                    Position = j.Title,
                    MinimumSalary = j.MinimumSalary,
                    MaximumSalary = j.MaximumSalary,
                    AverageSalary = j.Employees.Any()
                        ? Math.Round(
                            j.Employees.Average(e => (decimal?)e.Salary)!.Value, 0)
                        : null
                })
                .ToListAsync();
        }
    }
}
