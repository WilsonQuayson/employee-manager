using EmployeeManager.Application.DTOs.JobPosition;
using EmployeeManager.Application.DTOs.JobPosition.Request;
using EmployeeManager.Application.DTOs.JobPosition.Response;
using EmployeeManager.Application.Interfaces;
using EmployeeManager.Domain.Entities;

namespace EmployeeManager.Application.Services;

public class JobPositionService : IJobPositionService
{
    private readonly IJobPositionRepository _jobPositionRepository;

    public JobPositionService(IJobPositionRepository jobPositionRepository)
    {
        _jobPositionRepository = jobPositionRepository;
    }


    public async Task<List<JobPositionResponseDto>> GetAllAsync()
    {
        var jobPositions = await _jobPositionRepository.GetAllAsync();

        return jobPositions
            .Select(MapToResponseDto)
            .ToList();
    }


    public async Task<JobPositionResponseDto?> GetByIdAsync(int id)
    {
        var jobPosition = await _jobPositionRepository.GetByIdAsync(id);

        if (jobPosition == null)
        {
            return null;
        }

        return MapToResponseDto(jobPosition);
    }


    public async Task<JobPositionResponseDto> CreateAsync(
        JobPositionRequestDto request)
    {
        var jobPosition = new JobPosition
        {
            Title = request.Title,
            MinimumSalary = request.MinimumSalary,
            MaximumSalary = request.MaximumSalary
        };

        var createdJobPosition =
            await _jobPositionRepository.CreateAsync(jobPosition);

        return MapToResponseDto(createdJobPosition);
    }


    public async Task<bool> UpdateAsync(
        int id,
        JobPositionRequestDto request)
    {
        var jobPosition =
            await _jobPositionRepository.GetByIdAsync(id);

        if (jobPosition == null)
        {
            return false;
        }

        jobPosition.Title = request.Title;
        jobPosition.MinimumSalary = request.MinimumSalary;
        jobPosition.MaximumSalary = request.MaximumSalary;

        await _jobPositionRepository.UpdateAsync(jobPosition);

        return true;
    }


    public async Task<bool> DeleteAsync(int id)
    {
        var jobPosition =
            await _jobPositionRepository.GetByIdAsync(id);

        if (jobPosition == null)
        {
            return false;
        }

        await _jobPositionRepository.DeleteAsync(jobPosition);

        return true;
    }


    private static JobPositionResponseDto MapToResponseDto(
        JobPosition jobPosition)
    {
        return new JobPositionResponseDto
        {
            Id = jobPosition.Id,
            Title = jobPosition.Title,
            MinimumSalary = jobPosition.MinimumSalary,
            MaximumSalary = jobPosition.MaximumSalary
        };
    }
}