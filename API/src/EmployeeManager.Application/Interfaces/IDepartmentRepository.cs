using EmployeeManager.Domain.Entities;

namespace EmployeeManager.Application.Interfaces
{
    public interface IDepartmentRepository
    {
        Task<List<Department>> GetAllAsync(int organizationId);
        Task<Department?> GetByIdAsync(int id, int organizationId);
        Task<Department> CreateAsync(Department department);
        Task UpdateAsync(Department department);
        Task DeleteAsync(Department department);
        Task<bool> NameExistsAsync(string name, int organizationId, int? excludeDepartmentId = null);
        Task<bool> HasEmployeesAsync(int departmentId, int organizationId);
    }
}
