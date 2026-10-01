using EmployeeManager.Application.DTOs.JobPosition;
using EmployeeManager.Application.DTOs.JobPosition.Request;
using EmployeeManager.Application.DTOs.JobPosition.Response;
using EmployeeManager.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeManager.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class JobPositionsController : ControllerBase
{
    private readonly IJobPositionService _jobPositionService;

    public JobPositionsController(IJobPositionService jobPositionService)
    {
        _jobPositionService = jobPositionService;
    }


    // GET: api/jobpositions
    [HttpGet]
    public async Task<ActionResult<List<JobPositionResponseDto>>> GetAll()
    {
        var jobPositions = await _jobPositionService.GetAllAsync();

        return Ok(jobPositions);
    }


    // GET: api/jobpositions/5
    [HttpGet("{id}")]
    public async Task<ActionResult<JobPositionResponseDto>> GetById(int id)
    {
        var jobPosition = await _jobPositionService.GetByIdAsync(id);

        if (jobPosition == null)
        {
            return NotFound();
        }

        return Ok(jobPosition);
    }


    // POST: api/jobpositions
    [HttpPost]
    public async Task<ActionResult<JobPositionResponseDto>> Create(
        JobPositionRequestDto request)
    {
        var jobPosition =
            await _jobPositionService.CreateAsync(request);

        return CreatedAtAction(
            nameof(GetById),
            new { id = jobPosition.Id },
            jobPosition);
    }


    // PUT: api/jobpositions/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(
        int id,
        JobPositionRequestDto request)
    {
        var updated =
            await _jobPositionService.UpdateAsync(id, request);

        if (!updated)
        {
            return NotFound();
        }

        return NoContent();
    }


    // DELETE: api/jobpositions/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted =
            await _jobPositionService.DeleteAsync(id);

        if (!deleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}