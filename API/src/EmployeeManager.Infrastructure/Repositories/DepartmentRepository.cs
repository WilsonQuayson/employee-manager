using EmployeeManager.Application.Interfaces;
using EmployeeManager.Domain.Entities;
using EmployeeManager.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.Infrastructure.Repositories
{
    public class DepartmentRepository : IDepartmentRepository
    {
        private readonly AppDbContext _context;

        public DepartmentRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Department>> GetAllAsync(int organizationId)
        {
            return await _context.Departments
                .AsNoTracking()
                .Where(d => d.OrganizationId == organizationId)
                .ToListAsync();
        }

        public async Task<Department?> GetByIdAsync(int id, int organizationId)
        {
            return await _context.Departments
                .FirstOrDefaultAsync(d =>
                    d.Id == id &&
                    d.OrganizationId == organizationId);
        }


        public async Task<Department> CreateAsync(Department department)
        {
            _context.Departments.Add(department);
            await _context.SaveChangesAsync();

            return department;
        }

        public async Task UpdateAsync(Department department)
        {
            _context.Departments.Update(department);
            await _context.SaveChangesAsync();
        }

        public async Task DeleteAsync(Department department)
        {
            _context.Departments.Remove(department);
            await _context.SaveChangesAsync();
        }

        public async Task<bool> NameExistsAsync(
            string name,
            int organizationId,
            int? excludeDepartmentId = null)
        {
            return await _context.Departments.AnyAsync(d =>
                d.OrganizationId == organizationId &&
                d.Name == name &&
                (!excludeDepartmentId.HasValue || d.Id != excludeDepartmentId.Value));
        }

        public async Task<bool> HasEmployeesAsync(int departmentId, int organizationId)
        {
            return await _context.Employees.AnyAsync(e =>
                e.DepartmentId == departmentId &&
                e.OrganizationId == organizationId);
        }
    }
}
