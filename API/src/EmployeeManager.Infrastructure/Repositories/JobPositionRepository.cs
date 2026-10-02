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

    public async Task<List<JobPosition>> GetAllAsync()
    {
        return await _context.JobPositions.ToListAsync();
    }

    public async Task<JobPosition?> GetByIdAsync(int id)
    {
        return await _context.JobPositions
            .FirstOrDefaultAsync(j => j.Id == id);
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

    public async Task<bool> TitleExistsAsync(string title, int? excludeJobPositionId = null)
    {
        return await _context.JobPositions.AnyAsync(j =>
            j.Title == title &&
            (!excludeJobPositionId.HasValue || j.Id != excludeJobPositionId.Value));
    }

    public async Task<bool> HasEmployeesAsync(int jobPositionId)
    {
        return await _context.Employees.AnyAsync(e => e.JobPositionId == jobPositionId);
    }
}