
using EmployeeManager.Domain.Entities;

namespace EmployeeManager.Application.Interfaces
{
    public interface IEmployeeRepository
    {
        Task<List<Employee>> GetAllAsync(int organizationId);
        Task<Employee?> GetByIdAsync(int id, int organizationId);
        Task<Employee> CreateAsync(Employee employee);
        Task UpdateAsync(Employee employee);
        Task DeleteAsync(Employee employee);
        Task<bool> EmailExistsAsync(string email, int organizationId, int? excludeEmployeeId = null);
        Task<bool> PhoneNumberExistsAsync(string phoneNumber, int organizationId, int? excludeEmployeeId = null);
    }
}
