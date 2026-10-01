using EmployeeManager.Application.DTOs.JobPosition;
using EmployeeManager.Application.DTOs.JobPosition.Request;
using EmployeeManager.Application.DTOs.JobPosition.Response;

namespace EmployeeManager.Application.Interfaces;

public interface IJobPositionService
{
    Task<List<JobPositionResponseDto>> GetAllAsync();

    Task<JobPositionResponseDto?> GetByIdAsync(int id);

    Task<JobPositionResponseDto> CreateAsync(JobPositionRequestDto request);

    Task<bool> UpdateAsync(int id, JobPositionRequestDto request);

    Task<bool> DeleteAsync(int id);
}