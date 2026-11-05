using EmployeeManager.Application.Interfaces;
using EmployeeManager.Domain.Entities;
using EmployeeManager.Infrastructure.Data;
using Microsoft.EntityFrameworkCore;

namespace EmployeeManager.Infrastructure.Repositories;

public class JobPositionRepository : IJobPositionRepository
{
    private readonly AppDbContext _context;

    public JobPositionRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<JobPosition>> GetAllAsync(int organizationId)
    {
        return await _context.JobPositions
            .AsNoTracking()
            .Where(j => j.OrganizationId == organizationId)
            .ToListAsync();
    }

    public async Task<JobPosition?> GetByIdAsync(int id, int organizationId)
    {
        return await _context.JobPositions
            .FirstOrDefaultAsync(j =>
                j.Id == id &&
                j.OrganizationId == organizationId);
    }

    public async Task<JobPosition> CreateAsync(JobPosition jobPosition)
    {
        _context.JobPositions.Add(jobPosition);
        await _context.SaveChangesAsync();

        return jobPosition;
    }

    public async Task UpdateAsync(JobPosition jobPosition)
    {
        _context.JobPositions.Update(jobPosition);
        await _context.SaveChangesAsync();
    }

    public async Task DeleteAsync(JobPosition jobPosition)
    {
        _context.JobPositions.Remove(jobPosition);
        await _context.SaveChangesAsync();
    }


    public async Task<bool> TitleExistsAsync(
        string title,
        int organizationId,
        int? excludeJobPositionId = null)
    {
        return await _context.JobPositions.AnyAsync(j =>
            j.OrganizationId == organizationId &&
            j.Title == title &&
            (!excludeJobPositionId.HasValue || j.Id != excludeJobPositionId.Value));
    }

    public async Task<bool> HasEmployeesAsync(int jobPositionId, int organizationId)
    {
        return await _context.Employees.AnyAsync(e =>
            e.JobPositionId == jobPositionId &&
            e.OrganizationId == organizationId);
    }
}
