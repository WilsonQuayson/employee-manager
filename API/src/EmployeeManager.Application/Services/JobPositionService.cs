using EmployeeManager.Application.DTOs.JobPosition.Request;
using EmployeeManager.Application.DTOs.JobPosition.Response;
using EmployeeManager.Application.Exceptions;
using EmployeeManager.Application.Interfaces;
using EmployeeManager.Domain.Entities;

namespace EmployeeManager.Application.Services;

public class JobPositionService : IJobPositionService
{
    private readonly IJobPositionRepository _jobPositionRepository;
    private readonly ICurrentOrganization _currentOrganization;

    public JobPositionService(IJobPositionRepository jobPositionRepository, ICurrentOrganization currentOrganization)
    {
        _jobPositionRepository = jobPositionRepository;
        _currentOrganization = currentOrganization;
    }



    public async Task<List<JobPositionResponseDto>> GetAllAsync()
    {
        var organizationId = await _currentOrganization.GetOrganizationIdAsync();
        var jobPositions = await _jobPositionRepository.GetAllAsync(organizationId);

        return jobPositions.Select(MapToResponseDto).ToList();
    }

    public async Task<JobPositionResponseDto?> GetByIdAsync(int id)
    {
        var organizationId = await _currentOrganization.GetOrganizationIdAsync();
        var jobPosition = await _jobPositionRepository.GetByIdAsync(id, organizationId);

        if (jobPosition == null)
        {
            return null;
        }

        return MapToResponseDto(jobPosition);
    }

    public async Task<JobPositionResponseDto> CreateAsync(JobPositionRequestDto request)
    {
        var organizationId = await _currentOrganization.GetOrganizationIdAsync();
        var titleExists = await _jobPositionRepository.TitleExistsAsync(request.Title, organizationId);

        if (titleExists)
        {
            throw new ConflictException("A job position with this title already exists.");
        }

        if (request.MinimumSalary.HasValue &&
            request.MaximumSalary.HasValue &&
            request.MinimumSalary > request.MaximumSalary)
        {
            throw new BadRequestException("Minimum salary cannot be greater than maximum salary.");
        }

        var jobPosition = new JobPosition
        {
            OrganizationId = organizationId,
            Title = request.Title,
            MinimumSalary = request.MinimumSalary,
            MaximumSalary = request.MaximumSalary
        };

        var createdJobPosition = await _jobPositionRepository.CreateAsync(jobPosition);

        return MapToResponseDto(createdJobPosition);
    }

    public async Task<bool> UpdateAsync(int id, JobPositionRequestDto request)
    {
        var organizationId = await _currentOrganization.GetOrganizationIdAsync();
        var jobPosition = await _jobPositionRepository.GetByIdAsync(id, organizationId);

        if (jobPosition == null)
        {
            return false;
        }

        var titleExists = await _jobPositionRepository.TitleExistsAsync(request.Title, organizationId, id);

        if (titleExists)
        {
            throw new ConflictException("A job position with this title already exists.");
        }

        if (request.MinimumSalary.HasValue &&
            request.MaximumSalary.HasValue &&
            request.MinimumSalary > request.MaximumSalary)
        {
            throw new BadRequestException("Minimum salary cannot be greater than maximum salary.");
        }

        jobPosition.Title = request.Title;
        jobPosition.MinimumSalary = request.MinimumSalary;
        jobPosition.MaximumSalary = request.MaximumSalary;

        await _jobPositionRepository.UpdateAsync(jobPosition);

        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var organizationId = await _currentOrganization.GetOrganizationIdAsync();
        var jobPosition = await _jobPositionRepository.GetByIdAsync(id, organizationId);

        if (jobPosition == null)
        {
            return false;
        }

        var hasEmployees = await _jobPositionRepository.HasEmployeesAsync(id, organizationId);

        if (hasEmployees)
        {
            throw new ConflictException("The job position cannot be deleted because employees are assigned to it.");
        }

        await _jobPositionRepository.DeleteAsync(jobPosition);

        return true;
    }

    private static JobPositionResponseDto MapToResponseDto(JobPosition jobPosition)
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
