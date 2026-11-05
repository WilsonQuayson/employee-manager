using EmployeeManager.Domain.Entities;

namespace EmployeeManager.Application.Interfaces;

public interface IJobPositionRepository
{
    Task<List<JobPosition>> GetAllAsync(int organizationId);
    Task<JobPosition?> GetByIdAsync(int id, int organizationId);
    Task<JobPosition> CreateAsync(JobPosition jobPosition);
    Task UpdateAsync(JobPosition jobPosition);
    Task DeleteAsync(JobPosition jobPosition);
    Task<bool> TitleExistsAsync(string title, int organizationId, int? excludeJobPositionId = null);
    Task<bool> HasEmployeesAsync(int jobPositionId, int organizationId);
}
