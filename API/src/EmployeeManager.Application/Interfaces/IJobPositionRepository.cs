using EmployeeManager.Domain.Entities;

namespace EmployeeManager.Application.Interfaces;

public interface IJobPositionRepository
{
    Task<List<JobPosition>> GetAllAsync();
    Task<JobPosition?> GetByIdAsync(int id);
    Task<JobPosition> CreateAsync(JobPosition jobPosition);
    Task UpdateAsync(JobPosition jobPosition);
    Task DeleteAsync(JobPosition jobPosition);
}