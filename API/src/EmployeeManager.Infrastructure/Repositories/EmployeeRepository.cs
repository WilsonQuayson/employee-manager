using EmployeeManager.Application.Interfaces;
using EmployeeManager.Domain.Entities;
using EmployeeManager.Infrastructure.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.Infrastructure.Repositories
{
    public class EmployeeRepository : IEmployeeRepository
    {
        private readonly AppDbContext _context;

        public EmployeeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Employee>> GetAllAsync()
        {
            return await _context.Employees
                .Include(e => e.Department)
                .Include(e => e.JobPosition)
                .ToListAsync();
        }

        public async Task<Employee?> GetByIdAsync(int id)
        {
            return await _context.Employees
                .Include(e => e.Department)
                .Include(e => e.JobPosition)
                .FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<Employee> CreateAsync(Employee employee)
        {
            _context.Employees.Add(employee);

            await _context.SaveChangesAsync();

            // Load these so the service can use their names
            await _context.Entry(employee)
                .Reference(e => e.Department)
                .LoadAsync();

            await _context.Entry(employee)
                .Reference(e => e.JobPosition)
                .LoadAsync();

            return employee;
        }

        public async Task UpdateAsync(Employee employee)
        {
            _context.Employees.Update(employee);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Employee employee)
        {
            _context.Employees.Remove(employee);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> EmailExistsAsync(string email, int? excludeEmployeeId = null)
        {
            return await _context.Employees.AnyAsync(e =>
                e.Email == email &&
                (!excludeEmployeeId.HasValue || e.Id != excludeEmployeeId.Value));
        }

        public async Task<bool> PhoneNumberExistsAsync(string phoneNumber, int? excludeEmployeeId = null)
        {
            return await _context.Employees.AnyAsync(e =>
                e.PhoneNumber == phoneNumber &&
                (!excludeEmployeeId.HasValue || e.Id != excludeEmployeeId.Value));
        }
    }
}
